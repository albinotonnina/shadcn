import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Base paths for registry files
const PUBLIC_PATH = join(process.cwd(), 'public');

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req;
  const path = url?.replace(/^\/api/, '') || '/';

  // Health check
  if (path === '/health' || path === '/') {
    return res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      message: 'shadcn Custom Registry Server'
    });
  }

  // Registry index
  if (path === '/r/index.json') {
    const indexPath = join(PUBLIC_PATH, 'r', 'index.json');
    
    if (!existsSync(indexPath)) {
      return res.status(404).json({ error: 'Registry index not found' });
    }
    
    try {
      const index = JSON.parse(readFileSync(indexPath, 'utf-8'));
      return res.json(index);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read registry index' });
    }
  }

  // Component manifest: /r/styles/:style/:component.json
  const stylesMatch = path.match(/^\/r\/styles\/([^/]+)\/([^/]+)\.json$/);
  if (stylesMatch) {
    const [, style, component] = stylesMatch;
    const manifestPath = join(PUBLIC_PATH, 'r', 'styles', style, `${component}.json`);
    
    if (!existsSync(manifestPath)) {
      return res.status(404).json({ 
        error: `Component "${component}" not found in style "${style}"` 
      });
    }
    
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
      return res.json(manifest);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read component manifest' });
    }
  }

  // Colors: /r/colors/:base/:name.json
  const colorsMatch = path.match(/^\/r\/colors\/([^/]+)\/([^/]+)\.json$/);
  if (colorsMatch) {
    const [, base, name] = colorsMatch;
    const colorPath = join(PUBLIC_PATH, 'r', 'colors', base, `${name}.json`);
    
    if (!existsSync(colorPath)) {
      return res.json({});
    }
    
    try {
      const colors = JSON.parse(readFileSync(colorPath, 'utf-8'));
      return res.json(colors);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read colors' });
    }
  }

  // 404 for unknown routes
  return res.status(404).json({ 
    error: 'Not found',
    availableEndpoints: [
      'GET /health',
      'GET /r/index.json',
      'GET /r/styles/:style/:component.json'
    ]
  });
}
