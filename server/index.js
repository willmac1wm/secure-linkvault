import express from 'express';
import cors from 'cors';
import { spawn, exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

// Track running processes
const runningProcesses = new Map();

// Check if a port is in use
async function isPortInUse(port) {
  try {
    const { stdout } = await execAsync(`lsof -i :${port} -t`);
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

// Start an app server
app.post('/api/start', async (req, res) => {
  const { projectPath, port, name } = req.body;
  
  if (!projectPath) {
    return res.status(400).json({ error: 'Project path required' });
  }

  // Check if already running
  const portNum = port || 3000;
  const isRunning = await isPortInUse(portNum);
  
  if (isRunning) {
    return res.json({ status: 'already_running', port: portNum });
  }

  try {
    // Start the dev server
    const child = spawn('npm', ['run', 'dev', '--', '--port', portNum.toString()], {
      cwd: projectPath,
      detached: true,
      stdio: 'ignore'
    });
    
    child.unref();
    runningProcesses.set(name || projectPath, { pid: child.pid, port: portNum });

    // Wait for server to be ready (max 15 seconds)
    let ready = false;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 500));
      if (await isPortInUse(portNum)) {
        ready = true;
        break;
      }
    }

    if (ready) {
      res.json({ status: 'started', port: portNum, pid: child.pid });
    } else {
      res.json({ status: 'starting', port: portNum, pid: child.pid });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check app status
app.post('/api/status', async (req, res) => {
  const { port } = req.body;
  const isRunning = await isPortInUse(port || 3000);
  res.json({ running: isRunning });
});

// Stop an app
app.post('/api/stop', async (req, res) => {
  const { port } = req.body;
  try {
    const { stdout } = await execAsync(`lsof -i :${port} -t`);
    const pids = stdout.trim().split('\n');
    for (const pid of pids) {
      if (pid) {
        await execAsync(`kill -9 ${pid}`);
      }
    }
    res.json({ status: 'stopped' });
  } catch {
    res.json({ status: 'not_running' });
  }
});

// List all running apps
app.get('/api/running', async (req, res) => {
  const ports = [3000, 3001, 3002, 3003, 5173, 5174, 5175, 8080];
  const results = [];
  
  for (const port of ports) {
    if (await isPortInUse(port)) {
      results.push({ port, running: true });
    }
  }
  
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`🚀 LinkVault Server running on http://localhost:${PORT}`);
  console.log('Ready to start your apps!');
});

