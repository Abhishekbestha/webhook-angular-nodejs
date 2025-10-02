# Webhook Manager

A full-stack webhook management application with a 3-tier architecture built with Node.js, Angular, and designed for deployment on Vercel.

## Features

- **Generate Unique Webhook Links**: Create multiple webhook endpoints with unique IDs
- **30-Day Validity**: Each link automatically expires after 30 days
- **Request Monitoring**: View all incoming webhook requests in real-time
- **Auto-Refresh**: Automatically refresh requests every 5 seconds
- **Request Details**: Inspect headers, body, query parameters, and metadata
- **Multiple Links**: Create and manage multiple webhook links simultaneously
- **Clean UI**: Modern, responsive interface built with Angular

## Architecture

### Backend (Node.js + Express)
- RESTful API for managing webhook links and requests
- In-memory storage (can be easily replaced with a database)
- CORS enabled for cross-origin requests
- TypeScript for type safety

### Frontend (Angular 17)
- Standalone components architecture
- Reactive UI with RxJS
- Auto-refresh functionality
- Responsive design

### Deployment (Vercel)
- Monorepo setup
- Automatic builds via GitHub integration
- Environment configuration

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

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd webhook-angular-nodejs
```

2. Install dependencies:
```bash
# Install all dependencies
npm run install:all

# Or install separately
npm run install:backend
npm run install:frontend
```

3. Create environment files:
```bash
# Backend
cp backend/.env.example backend/.env

# Root
cp .env.example .env
```

### Development

Run both frontend and backend in development mode:

**Backend** (Terminal 1):
```bash
npm run dev:backend
```
Backend runs on http://localhost:3000

**Frontend** (Terminal 2):
```bash
npm run dev:frontend
```
Frontend runs on http://localhost:4200

### Building for Production

```bash
# Build both backend and frontend
npm run vercel-build

# Or build separately
npm run build:backend
npm run build:frontend
```

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

## Deployment on Vercel

### Via GitHub Integration (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration from `vercel.json`
6. Click "Deploy"

### Via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link to your project

### Environment Variables (Vercel)

No additional environment variables are required for basic functionality. The app uses relative API URLs in production.

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
- Node.js
- Express.js
- TypeScript
- UUID for unique ID generation
- CORS for cross-origin support

### Frontend
- Angular 17 (Standalone Components)
- RxJS
- TypeScript
- CSS3

### DevOps
- Vercel for deployment
- GitHub for version control

## Troubleshooting

### Port Already in Use

If port 3000 or 4200 is already in use:

**Backend**: Edit `backend/.env`:
```
PORT=3001
```

**Frontend**: Edit `frontend/src/environments/environment.ts`:
```typescript
apiUrl: 'http://localhost:3001/api'
```

### CORS Issues

Make sure the backend CORS is properly configured in `backend/src/index.ts`

### Build Errors

Clear node_modules and reinstall:
```bash
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install:all
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

## Support

For issues and questions, please open an issue on GitHub.
