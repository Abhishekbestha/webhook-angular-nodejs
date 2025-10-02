# Webhook Manager

A modern full-stack webhook management application with separate backend and frontend deployments. Built with Node.js, Angular, and designed for independent deployment.

## Features

- 🪝 **Generate Unique Webhook Links**: Create multiple webhook endpoints with unique IDs
- ⏰ **30-Day Validity**: Each link automatically expires after 30 days
- 📊 **Request Monitoring**: View all incoming webhook requests in real-time
- 🔄 **Auto-Refresh**: Automatically refresh requests every 5 seconds
- 🔍 **Request Details**: Inspect headers, body, query parameters, and metadata
- 📱 **Multiple Links**: Create and manage multiple webhook links simultaneously
- 🎨 **Professional UI**: Modern, dark-themed responsive interface with Inter font
- 🌐 **Dynamic Configuration**: Configure API URL at runtime without rebuilding

## Architecture

This project is structured as **two independent applications** that can be deployed separately:

### Backend (Node.js + Express)
- RESTful API for managing webhook links and requests
- In-memory storage (can be easily replaced with a database)
- CORS enabled for cross-origin requests
- TypeScript for type safety
- Standalone deployment ready

### Frontend (Angular 17)
- Standalone components architecture
- Reactive UI with RxJS
- Auto-refresh functionality
- Responsive design
- Dynamic API URL configuration
- Modern dark theme with professional styling

### Deployment
- **Separate Deployments**: Deploy backend and frontend independently
- **Any Platform**: Deploy to Vercel, Heroku, Render, AWS, etc.
- **Runtime Configuration**: Change API URL without rebuilding frontend

## Project Structure

```
webhook-angular-nodejs/
├── backend/
│   ├── src/
│   │   ├── models/           # Data models
│   │   ├── routes/           # API routes
│   │   ├── storage/          # Data storage layer
│   │   └── index.ts          # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Angular components
│   │   │   ├── services/     # API services
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   └── app.routes.ts
│   │   └── environments/     # Environment configs
│   ├── package.json
│   └── angular.json
├── package.json              # Root package.json
├── vercel.json              # Vercel configuration
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Development Setup

#### Backend

1. Navigate to backend:
```bash
cd backend
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```
Backend runs on http://localhost:3000

#### Frontend

1. Navigate to frontend:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```
Frontend runs on http://localhost:4200

The frontend will automatically connect to `http://localhost:3000/api` in development.

### Production Deployment

See the comprehensive [Deployment Guide](./DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to various platforms.

#### Quick Deploy Steps

1. **Deploy Backend** (choose one):
   - Vercel: `cd backend && vercel --prod`
   - Heroku: `heroku create && git push heroku main`
   - Render: Connect repo and set root directory to `backend`

2. **Configure Frontend API URL**:
   - After building, edit `dist/webhook-frontend/env.js`
   - Set `window.__env.apiUrl` to your backend URL

3. **Deploy Frontend** (choose one):
   - Vercel: `cd frontend && vercel --prod`
   - Netlify: `npm run build && netlify deploy --dir=dist/webhook-frontend`
   - Any static host: Upload `dist/webhook-frontend` contents

## API Endpoints

### Webhook Links

- `POST /api/webhooks/links` - Create a new webhook link
- `GET /api/webhooks/links` - Get all webhook links
- `GET /api/webhooks/links/:linkId` - Get a specific webhook link
- `DELETE /api/webhooks/links/:linkId` - Delete a webhook link

### Webhook Requests

- `GET /api/webhooks/links/:linkId/requests` - Get all requests for a link
- `DELETE /api/webhooks/links/:linkId/requests` - Clear all requests for a link
- `ANY /api/webhooks/receive/:linkId` - Receive webhook (accepts any HTTP method)

### Health Check

- `GET /api/health` - Server health check

## Dynamic API Configuration

The frontend supports runtime API URL configuration without rebuilding:

### How It Works

1. The frontend loads `env.js` on startup
2. `env.js` sets `window.__env.apiUrl`
3. Angular reads this value in `environment.ts`

### Changing API URL

Edit `frontend/dist/webhook-frontend/env.js` after building:

```javascript
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = 'https://your-backend-url.com/api';
}(this));
```

### Benefits

- ✅ No rebuild required
- ✅ Same build for multiple environments
- ✅ Configure at deployment time
- ✅ Easy environment switching

## Usage

1. **Create a Webhook Link**:
   - Click "Create New Link" on the home page
   - Copy the generated webhook URL

2. **Send Requests**:
   - Use the webhook URL to receive POST/GET/PUT/DELETE requests
   - Example with curl:
   ```bash
   curl -X POST https://your-app.vercel.app/api/webhooks/receive/abc12345 \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

3. **View Requests**:
   - Click "View Requests" on any webhook link
   - See all incoming requests in real-time
   - Click on a request to see full details

4. **Manage Links**:
   - Delete expired or unwanted links
   - Clear request history
   - Create multiple links for different purposes

## Storage

By default, the application uses in-memory storage. This means:
- Data is lost when the server restarts
- Suitable for development and testing
- For production, consider implementing persistent storage (MongoDB, PostgreSQL, etc.)

### Adding Persistent Storage

To add database support:

1. Install database driver (e.g., MongoDB, PostgreSQL)
2. Replace `backend/src/storage/memory.storage.ts` with a database implementation
3. Keep the same interface for compatibility

## Customization

### Changing Link Expiration

Edit `backend/src/routes/webhook.routes.ts`:

```typescript
// Change from 30 days to desired duration
const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
```

### Auto-Refresh Interval

Edit `frontend/src/app/components/requests/requests.component.ts`:

```typescript
// Change from 5 seconds to desired interval
this.refreshSubscription = interval(5000).subscribe(() => {
  this.loadRequests();
});
```

## Technologies Used

### Backend
- Node.js 18+
- Express.js
- TypeScript
- UUID for unique ID generation
- CORS for cross-origin support

### Frontend
- Angular 17 (Standalone Components)
- RxJS
- TypeScript
- CSS3 with modern dark theme
- Inter font family
- Dynamic runtime configuration

### UI/UX
- Professional dark theme
- Gradient effects and animations
- Responsive design
- Modern iconography
- Smooth transitions

## Troubleshooting

### Port Already in Use

**Backend**: Edit `backend/.env`:
```env
PORT=3001
```

**Frontend**: Edit `frontend/src/env.js`:
```javascript
window.__env.apiUrl = 'http://localhost:3001/api';
```

### CORS Issues

Ensure backend CORS configuration in `backend/src/index.ts` includes your frontend URL:
```typescript
app.use(cors({
  origin: ['http://localhost:4200', 'https://yourfrontend.com']
}));
```

### API Connection Failed

1. Verify backend is running and accessible
2. Check `env.js` has correct API URL
3. Open browser DevTools → Network tab to inspect failed requests
4. Ensure CORS headers are present in response

### Build Errors

Clear node_modules and reinstall:
```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd frontend
rm -rf node_modules .angular
npm install
```

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Webhook forwarding to external URLs
- [ ] Request filtering and search
- [ ] Export request data (JSON/CSV)
- [ ] Rate limiting
- [ ] Webhook signatures for security
- [ ] Email notifications for new requests
- [ ] Custom link aliases
- [ ] Request analytics and statistics

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Documentation

- [Backend README](./backend/README.md) - Backend API documentation
- [Frontend README](./frontend/README.md) - Frontend setup and configuration
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Comprehensive deployment instructions

## Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using Node.js, Angular, and TypeScript**
