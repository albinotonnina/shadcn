# shadcn Custom Registry

A custom component registry server for shadcn/ui that allows you to host and distribute your own custom components.

## 🎯 Purpose

This registry serves as a **remote component library** that can be pulled into any project using the shadcn CLI. Instead of manually copying components, users can install them with a single command:

```bash
npx shadcn@latest add custom/fancy-button
```

## 📂 Project Structure

```
packages/registry/
├── api/
│   └── index.ts              # Vercel serverless function (production)
├── src/
│   └── server.ts             # Express server (local development)
├── registry/                 # Component source files (templates)
│   └── ui/
│       ├── fancy-button.tsx
│       ├── gradient-card.tsx
│       └── animated-counter.tsx
├── public/
│   └── r/                    # Registry manifest files
│       ├── index.json        # Component listing
│       └── styles/
│           └── default/      # Component metadata
│               ├── fancy-button.json
│               ├── gradient-card.json
│               └── animated-counter.json
└── package.json
```

### Key Directories

| Directory | Purpose | Source Control |
|-----------|---------|----------------|
| `registry/` | Raw component source files (React/TSX) | ✅ Commit |
| `public/r/` | JSON manifests with component metadata | ✅ Commit |
| `src/` | Local Express server for development | ✅ Commit |
| `api/` | Vercel serverless functions for production | ✅ Commit |

## 🚀 Running Locally

### Development Server (Express)

```bash
# From the monorepo root
pnpm dev:registry

# Or from this directory
pnpm dev
```

Server runs at: **http://localhost:3001**

### Test Endpoints

```bash
# Health check
curl http://localhost:3001/health

# Component index
curl http://localhost:3001/r/index.json

# Component manifest
curl http://localhost:3001/r/styles/default/fancy-button.json
```

## 📦 Available Components

### Fancy Button
Gradient buttons with multiple color variants, loading states, and icon support.

**Variants:** `gradient` | `ocean` | `sunset` | `forest` | `neon`  
**Sizes:** `sm` | `md` | `lg` | `xl`

### Gradient Card
Cards with animated gradient borders and hover effects.

**Gradients:** `rainbow` | `sunset` | `ocean` | `forest` | `fire` | `aurora`  
**Features:** Animated borders, glow effects, scale on hover

### Animated Counter
Numbers that smoothly animate to their target value with viewport detection.

**Features:** Multiple easing functions, locale formatting, prefix/suffix support

## 🎨 Adding New Components

### 1. Create Component Source File

Create your React component in `registry/ui/`:

```tsx
// registry/ui/my-component.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface MyComponentProps 
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("my-component-base", className)}
        {...props}
      />
    );
  }
);
MyComponent.displayName = "MyComponent";

export { MyComponent };
```

### 2. Create Component Manifest

Create a JSON manifest in `public/r/styles/default/`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "A custom component that does amazing things",
  "dependencies": ["clsx"],
  "registryDependencies": [],
  "files": [
    {
      "path": "ui/my-component.tsx",
      "type": "registry:ui",
      "content": "... paste your component code here (escaped) ..."
    }
  ],
  "tailwind": {
    "config": {
      "theme": {
        "extend": {
          "colors": {
            "custom": "#ff0000"
          }
        }
      }
    }
  },
  "cssVars": {
    "light": {},
    "dark": {}
  }
}
```

**Note:** The `content` field should contain the entire component code as a string (with proper escaping of quotes and newlines).

### 3. Update Registry Index

Add your component to `public/r/index.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "custom-registry",
  "homepage": "http://localhost:3001",
  "items": [
    {
      "name": "my-component",
      "type": "registry:ui",
      "title": "My Component",
      "description": "A custom component that does amazing things"
    }
  ]
}
```

### 4. Test Locally

```bash
# Verify the manifest is accessible
curl http://localhost:3001/r/styles/default/my-component.json

# Try installing it in a test project
npx shadcn@latest add custom/my-component
```

## 🌐 API Endpoints

The registry implements the shadcn/ui registry API specification:

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |
| `GET` | `/r/index.json` | List all available components |
| `GET` | `/r/styles/:style/:component.json` | Get component manifest and code |
| `GET` | `/r/registry/*` | Get raw component source files (dev only) |
| `GET` | `/r/colors/:base/:name.json` | Get theme colors (optional) |

### Response Formats

**Index Response:**
```json
{
  "name": "custom-registry",
  "items": [
    {
      "name": "component-name",
      "type": "registry:ui",
      "title": "Component Title",
      "description": "Component description"
    }
  ]
}
```

**Component Manifest:**
```json
{
  "name": "component-name",
  "type": "registry:ui",
  "dependencies": ["package-name"],
  "files": [{
    "path": "ui/component.tsx",
    "type": "registry:ui",
    "content": "component source code"
  }],
  "tailwind": {},
  "cssVars": {}
}
```

## 🚢 Deployment

### Deploy to Vercel

1. **Create a new Vercel project:**
   ```bash
   vercel
   ```

2. **Configure the project:**
   - Framework: **Other**
   - Root Directory: `packages/registry`
   - Build Command: (leave default)
   - Output Directory: `public`

3. **Deploy:**
   ```bash
   vercel --prod
   ```

Your registry will be available at: `https://your-project.vercel.app`

### Environment Variables

No environment variables required for basic setup.

### Update Client Configuration

After deploying, update your app's `components.json`:

```json
{
  "registries": {
    "custom": {
      "url": "https://your-registry.vercel.app/r"
    }
  }
}
```

## 🔧 Configuration

### Vercel (Production)

The registry uses serverless functions for Vercel deployment:
- **Function:** `api/index.ts`
- **Config:** `vercel.json`
- **Rewrites:** All requests to `/api`
- **CORS:** Enabled for all origins

### Express (Development)

Local development server:
- **Port:** 3001 (configurable in `src/server.ts`)
- **CORS:** Enabled
- **Hot reload:** Enabled with `tsx watch`

## 📝 Best Practices

### Component Files

1. ✅ **Use TypeScript** for type safety
2. ✅ **Include prop interfaces** with JSDoc comments
3. ✅ **Use forwardRef** for proper ref handling
4. ✅ **Export display names** for better debugging
5. ✅ **Follow shadcn/ui patterns** (cn utility, variants, etc.)

### Manifests

1. ✅ **List all dependencies** (npm packages)
2. ✅ **List registry dependencies** (other custom components)
3. ✅ **Include Tailwind config** if using custom styles
4. ✅ **Escape special characters** in the content field
5. ✅ **Keep descriptions clear** and concise

### Registry Management

1. ✅ **Version control everything** (source + manifests)
2. ✅ **Test locally first** before deploying
3. ✅ **Document breaking changes** in component descriptions
4. ✅ **Use semantic naming** for components
5. ✅ **Keep the index.json updated** with all components

## 🐛 Troubleshooting

### Component Not Found (404)

**Problem:** `npx shadcn add custom/my-component` returns 404

**Solutions:**
1. Check the component exists in `public/r/styles/default/my-component.json`
2. Verify the registry URL in your `components.json`
3. Test the endpoint directly: `curl YOUR_REGISTRY_URL/r/styles/default/my-component.json`

### TypeScript Errors in Build

**Problem:** Vercel build fails with TypeScript errors in `registry/` folder

**Solution:** The `registry/` folder is excluded from TypeScript compilation via `tsconfig.json`. These are template files, not compiled code.

### CORS Errors

**Problem:** Browser console shows CORS errors when accessing the registry

**Solution:** CORS is enabled in both Express and Vercel configs. Verify:
- `src/server.ts` has `cors()` middleware
- `vercel.json` has proper CORS headers
- Your registry URL matches the configured URL

### Missing Dependencies

**Problem:** Component fails to compile after installation

**Solution:** Ensure all dependencies are listed in the manifest's `dependencies` array.

## 📚 Additional Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Custom Registry Guide](https://ui.shadcn.com/docs/registry)
- [Registry API Specification](https://ui.shadcn.com/schema/registry.json)
- [Component Schema](https://ui.shadcn.com/schema/registry-item.json)

## 🤝 Contributing

When adding new components:

1. Follow the component creation steps above
2. Test thoroughly in a sample project
3. Document any special requirements
4. Update this README if needed

## 📄 License

This registry structure is based on the shadcn/ui project.
