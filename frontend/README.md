# Webhook Frontend

A modern Angular application for creating and monitoring webhook endpoints.

## Features

- 🎨 Modern, professional dark-themed UI
- ⚡ Real-time webhook request monitoring
- 📊 Request history and details viewer
- 🔄 Auto-refresh functionality
- 📱 Responsive design
- 🌐 Dynamic API configuration

## Prerequisites

- Node.js 18+
- npm or yarn

## Environment Configuration

The application uses a dynamic API URL configuration that can be set at runtime.

### Method 1: Edit env.js (Recommended for Production)

Edit the `dist/webhook-frontend/env.js` file after building:

```javascript
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = 'https://your-backend-api.com/api';
}(this));
```

### Method 2: Environment Variables (Development)

The default API URLs are:
- Development: `http://localhost:3000/api`
- Production: `/api` (relative path)

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

Application will run on `http://localhost:4200`

## Production Build

```bash
npm run build
```

The build artifacts will be in the `dist/webhook-frontend` directory.

### Configuring API URL for Production

**Option 1: Use Configuration Script (Recommended)**

Windows:
```bash
npm run build
configure-api.bat
```

Linux/Mac:
```bash
npm run build
./configure-api.sh
```

**Option 2: Manual Configuration**

After building, edit `dist/webhook-frontend/env.js`:

```javascript
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = 'https://your-backend-url.com/api';
}(this));
```

## Deployment

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist/webhook-frontend
```

### Docker

Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY dist/webhook-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t webhook-frontend .
docker run -p 80:80 webhook-frontend
```

### Static Hosting (S3, Azure, etc.)

Upload the contents of `dist/webhook-frontend` to your static hosting service.

**Important:** Update `env.js` with your backend API URL before deploying!

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── links/          # Webhook links management
│   │   └── requests/       # Request monitoring
│   ├── models/             # TypeScript interfaces
│   ├── services/           # API services
│   └── app.component.ts    # Root component
├── environments/           # Environment configs
├── styles.css             # Global styles
└── index.html             # Main HTML
```

## Features Guide

### Creating Webhook Links
1. Click "Create New Link"
2. Copy the generated webhook URL
3. Use it in your integrations

### Viewing Requests
1. Click "View Requests" on any link
2. Select a request to view details
3. See headers, body, query params, etc.

### Auto-Refresh
- Toggle auto-refresh to automatically fetch new requests
- Pauses automatically when viewing request details

## Customization

### Themes
Edit `src/styles.css` to customize colors:
```css
:root {
  --primary: #6366f1;
  --bg-primary: #0f172a;
  /* ... */
}
```

### API Service
Edit `src/app/services/webhook.service.ts` to modify API calls.

## License

MIT
