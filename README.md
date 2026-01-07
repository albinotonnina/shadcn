# shadcn Custom Registry Monorepo

A demonstration of how to create and use a custom shadcn/ui registry for your own components.

## 📁 Project Structure

```
shadcn/
├── apps/
│   └── web/                    # 🏠 LOCAL - Your Next.js application
│       ├── src/
│       │   ├── app/            # Next.js app router pages
│       │   ├── components/ui/  # Components pulled from registry
│       │   └── lib/            # Utilities
│       └── components.json     # shadcn config pointing to custom registry
│
├── packages/
│   └── registry/               # 🌐 ELSEWHERE - Deployable registry server
│       ├── src/
│       │   └── server.ts       # Express server
│       ├── registry/           # Component source files
│       │   └── ui/
│       │       ├── fancy-button.tsx
│       │       ├── gradient-card.tsx
│       │       └── animated-counter.tsx
│       └── public/
│           └── r/              # Registry JSON manifests
│               ├── index.json
│               └── styles/default/
│                   ├── fancy-button.json
│                   ├── gradient-card.json
│                   └── animated-counter.json
│
├── package.json                # Root workspace config
└── pnpm-workspace.yaml         # Monorepo workspace definition
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development Servers

Start both the registry server and the Next.js app:

```bash
pnpm dev
```

Or start them individually:

```bash
# Terminal 1 - Start the registry server (port 3001)
pnpm dev:registry

# Terminal 2 - Start the Next.js app (port 3000)
pnpm dev:web
```

### 3. View the Demo

Open [http://localhost:3000](http://localhost:3000) to see the demo app with all custom components.

## 🎨 Available Custom Components

| Component | Description |
|-----------|-------------|
| `fancy-button` | Gradient buttons with hover animations and loading states |
| `gradient-card` | Cards with animated gradient borders |
| `animated-counter` | Numbers that animate when scrolled into view |

## 📥 Using the Custom Registry

### In the Demo App

The `apps/web/components.json` is already configured:

```json
{
  "registries": {
    "custom": {
      "url": "http://localhost:3001/r"
    }
  }
}
```

### In Any Other Project

1. Add the registry to your `components.json`:

```json
{
  "registries": {
    "custom": {
      "url": "http://localhost:3001/r"
    }
  }
}
```

2. Pull components:

```bash
# Add a single component
npx shadcn@latest add custom/fancy-button

# Add multiple components
npx shadcn@latest add custom/gradient-card custom/animated-counter
```

## 🔧 Registry API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `GET /r/index.json` | List all available components |
| `GET /r/styles/:style/:component.json` | Get component manifest |
| `GET /r/registry/*` | Get raw component source files |

## 📝 Adding New Components

1. **Create the component** in `packages/registry/registry/ui/your-component.tsx`

2. **Create the manifest** in `packages/registry/public/r/styles/default/your-component.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "your-component",
  "type": "registry:ui",
  "title": "Your Component",
  "description": "Description of your component",
  "dependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "ui/your-component.tsx",
      "type": "registry:ui",
      "content": "... your component code ..."
    }
  ]
}
```

3. **Add to index** in `packages/registry/public/r/index.json`:

```json
{
  "items": [
    {
      "name": "your-component",
      "type": "registry:ui",
      "title": "Your Component",
      "description": "Description of your component"
    }
  ]
}
```

## 🚢 Deploying to Vercel

This monorepo is set up for Vercel deployment. You'll deploy **two separate projects**:

### 1. Deploy the Registry Server

```bash
cd packages/registry
vercel
```

Or via Vercel Dashboard:
1. Import the repo → Set **Root Directory** to `packages/registry`
2. Framework: **Other**
3. Deploy

Your registry will be at: `https://your-registry.vercel.app`

### 2. Deploy the Next.js App

```bash
cd apps/web
vercel
```

Or via Vercel Dashboard:
1. Import the repo → Set **Root Directory** to `apps/web`
2. Framework: **Next.js** (auto-detected)
3. Deploy

### 3. Update Registry URL for Production

After deploying the registry, update `apps/web/components.json`:

```json
{
  "registries": {
    "custom": {
      "url": "https://your-registry.vercel.app/r"
    }
  }
}
```

### Environment Variables

| Project | Variable | Value |
|---------|----------|-------|
| `apps/web` | `NEXT_PUBLIC_REGISTRY_URL` | `https://your-registry.vercel.app` |

### Vercel Project Structure

```
Vercel Dashboard
├── your-registry      (packages/registry)  → https://your-registry.vercel.app
└── your-web-app       (apps/web)           → https://your-app.vercel.app
```

## 📚 Learn More

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Custom Registry Guide](https://ui.shadcn.com/docs/registry)
- [Next.js Documentation](https://nextjs.org/docs)
