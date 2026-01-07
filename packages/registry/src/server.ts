import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Enable CORS for local development
app.use(cors());
app.use(express.json());

// Registry base path - component sources and manifests
const REGISTRY_PATH = join(__dirname, '..', 'registry');
const PUBLIC_PATH = join(__dirname, '..', 'public');

/**
 * Health check endpoint
 */
app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Registry index - lists all available components
 * GET /r/index.json
 */
app.get('/r/index.json', (_, res) => {
  const indexPath = join(PUBLIC_PATH, 'r', 'index.json');
  
  if (!existsSync(indexPath)) {
    return res.status(404).json({ error: 'Registry index not found' });
  }
  
  try {
    const index = JSON.parse(readFileSync(indexPath, 'utf-8'));
    res.json(index);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read registry index' });
  }
});

/**
 * Component manifest - returns component metadata and file contents
 * GET /r/styles/:style/:component.json
 * 
 * shadcn/ui expects this format for custom registries
 */
app.get('/r/styles/:style/:component.json', (req, res) => {
  const { style, component } = req.params;
  const manifestPath = join(PUBLIC_PATH, 'r', 'styles', style, `${component}.json`);
  
  if (!existsSync(manifestPath)) {
    return res.status(404).json({ 
      error: `Component "${component}" not found in style "${style}"` 
    });
  }
  
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    res.json(manifest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read component manifest' });
  }
});

/**
 * Raw component source file
 * GET /r/registry/:path
 */
app.get('/r/registry/*', (req, res) => {
  const filePath = (req.params as Record<string, string>)[0];
  const fullPath = join(REGISTRY_PATH, filePath);
  
  if (!existsSync(fullPath)) {
    return res.status(404).json({ error: `File not found: ${filePath}` });
  }
  
  try {
    const content = readFileSync(fullPath, 'utf-8');
    res.type('text/plain').send(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read file' });
  }
});

/**
 * Colors endpoint for themes
 * GET /r/colors/:base/:name.json
 */
app.get('/r/colors/:base/:name.json', (req, res) => {
  const { base, name } = req.params;
  const colorPath = join(PUBLIC_PATH, 'r', 'colors', base, `${name}.json`);
  
  if (!existsSync(colorPath)) {
    // Return empty colors if not found (optional)
    return res.json({});
  }
  
  try {
    const colors = JSON.parse(readFileSync(colorPath, 'utf-8'));
    res.json(colors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read colors' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🎨 shadcn Custom Registry Server                        ║
║                                                            ║
║   Running at: http://localhost:${PORT}                      ║
║                                                            ║
║   Endpoints:                                               ║
║   • GET /health              - Health check                ║
║   • GET /r/index.json        - Component index             ║
║   • GET /r/styles/:s/:c.json - Component manifest          ║
║   • GET /r/registry/*        - Raw source files            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
