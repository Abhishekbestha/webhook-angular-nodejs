# Webhook Manager - Deployment Guide

This guide covers deploying the backend and frontend as separate services.

## Architecture

- **Backend**: Node.js/Express API server
- **Frontend**: Angular SPA
- **Communication**: REST API with CORS enabled

## Prerequisites

- Node.js 18+
- Git
- Account on deployment platform (Vercel, Heroku, Render, etc.)

## Backend Deployment

### Option 1: Vercel

1. Navigate to backend directory:
```bash
cd backend
```

2. Deploy:
```bash
vercel --prod
```

3. Note the deployment URL (e.g., `https://your-backend.vercel.app`)

### Option 2: Heroku

1. Create Heroku app:
```bash
cd backend
heroku create your-backend-name
```

2. Deploy:
```bash
git subtree push --prefix backend heroku main
```

3. Note the URL: `https://your-backend-name.herokuapp.com`

### Option 3: Render

1. Create new Web Service on Render
2. Connect your repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Add `PORT` variable (optional, defaults to 3000)

### Option 4: Railway

1. Create new project on Railway
2. Connect repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### Option 5: Docker

```bash
cd backend

# Build image
docker build -t webhook-backend .

# Run container
docker run -p 3000:3000 webhook-backend
```

## Frontend Deployment

### Step 1: Configure API URL

Before deploying, you need to configure the backend API URL.

#### Edit env.js

After building, edit `dist/webhook-frontend/env.js`:

```javascript
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = 'https://your-backend-url.com/api';
}(this));
```

### Step 2: Build Frontend

```bash
cd frontend
npm install
npm run build
```

### Option 1: Vercel

1. Deploy:
```bash
cd frontend
vercel --prod
```

2. After deployment, update env.js with your backend URL

### Option 2: Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy:
```bash
netlify deploy --prod --dir=dist/webhook-frontend
```

3. Update env.js on Netlify dashboard or redeploy with updated file

### Option 3: Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize and deploy:
```bash
firebase login
firebase init hosting
firebase deploy
```

3. Update env.js after deployment

### Option 4: AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/webhook-frontend s3://your-bucket-name
```

3. Configure CloudFront distribution
4. Update env.js in S3

### Option 5: Docker + Nginx

```bash
cd frontend
npm run build

# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM nginx:alpine
COPY dist/webhook-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Build and run
docker build -t webhook-frontend .
docker run -p 80:80 webhook-frontend
```

## Environment Configuration Examples

### Same Domain Deployment

If frontend and backend are on the same domain:

**Backend**: `https://api.yourapp.com`
**Frontend**: `https://yourapp.com`

Frontend env.js:
```javascript
window.__env.apiUrl = 'https://api.yourapp.com/api';
```

### Different Domains

**Backend**: `https://webhook-backend.herokuapp.com`
**Frontend**: `https://webhook-frontend.vercel.app`

Frontend env.js:
```javascript
window.__env.apiUrl = 'https://webhook-backend.herokuapp.com/api';
```

### Relative Path (Same Origin)

If using reverse proxy to serve both on same domain:

Frontend env.js:
```javascript
window.__env.apiUrl = '/api';
```

## CORS Configuration

The backend has CORS enabled by default. For production, you may want to restrict origins:

Edit `backend/src/index.ts`:
```typescript
app.use(cors({
  origin: ['https://yourfrontend.com'],
  credentials: true
}));
```

## Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=production
```

### Frontend (env.js)
```javascript
window.__env.apiUrl = 'https://your-backend-url/api';
```

## Testing the Deployment

1. Open frontend URL in browser
2. Create a new webhook link
3. Copy the webhook URL
4. Send a test request:
```bash
curl -X POST https://your-backend-url/webhook/YOUR_LINK_ID \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```
5. Verify request appears in frontend

## Troubleshooting

### CORS Errors
- Verify backend CORS configuration includes frontend URL
- Check that API URL in env.js is correct

### API Not Found
- Verify env.js has correct backend URL
- Check backend is running and accessible
- Verify API endpoints include `/api` prefix

### 404 on Refresh
For SPAs, configure your hosting to redirect all routes to index.html:

**Netlify** - Create `_redirects`:
```
/*    /index.html   200
```

**Vercel** - Add to `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Monitoring

### Backend Logs
- Vercel: `vercel logs`
- Heroku: `heroku logs --tail`
- Render: Check dashboard logs

### Frontend Errors
- Use browser DevTools Console
- Check Network tab for API calls

## Scaling

### Backend
- Use environment variable for PORT
- Configure auto-scaling on your platform
- Consider adding Redis for session storage

### Frontend
- CDN distribution (CloudFront, Cloudflare)
- Enable caching headers
- Optimize bundle size

## Security Checklist

- [ ] HTTPS enabled on both frontend and backend
- [ ] CORS configured with specific origins
- [ ] Environment variables secured
- [ ] API rate limiting implemented (optional)
- [ ] Content Security Policy headers set

## Updating Deployments

### Backend Updates
```bash
cd backend
git add .
git commit -m "Update backend"
vercel --prod  # or your deployment command
```

### Frontend Updates
```bash
cd frontend
npm run build
# Update env.js if needed
vercel --prod  # or your deployment command
```

## Recommended Production Stack

**Starter**:
- Backend: Render/Railway (free tier)
- Frontend: Vercel/Netlify (free tier)

**Professional**:
- Backend: AWS ECS/Fargate
- Frontend: CloudFront + S3
- Database: Redis (ElastiCache)

**Enterprise**:
- Backend: Kubernetes cluster
- Frontend: Multi-region CDN
- Database: Redis Cluster
- Monitoring: DataDog/New Relic

## Support

For issues or questions, refer to:
- Backend README: `/backend/README.md`
- Frontend README: `/frontend/README.md`
