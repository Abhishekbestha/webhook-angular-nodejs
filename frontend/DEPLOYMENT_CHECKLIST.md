# Frontend Deployment Checklist

## Pre-Deployment

- [ ] Backend is deployed and URL is known
- [ ] Node.js 18+ installed locally
- [ ] All dependencies installed (`npm install`)

## Build Process

### Step 1: Build the Application

```bash
npm run build
```

This creates production files in `dist/webhook-frontend/`

### Step 2: Configure API URL

**Option A: Copy and Edit Template**
```bash
# Copy the template
cp src/env.production.js dist/webhook-frontend/env.js

# Edit the file and replace YOUR_BACKEND_URL_HERE
# Example: https://your-backend.vercel.app/api
```

**Option B: Create New env.js**

Create `dist/webhook-frontend/env.js`:
```javascript
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = 'https://your-backend.vercel.app/api';
}(this));
```

### Step 3: Verify Configuration

Check that `env.js` exists and has correct URL:
```bash
cat dist/webhook-frontend/env.js
```

## Platform-Specific Deployment

### Vercel

```bash
vercel --prod
```

After deployment, verify `env.js` was uploaded:
- Visit: `https://your-app.vercel.app/env.js`
- Should show your API URL configuration

### Netlify

```bash
netlify deploy --prod --dir=dist/webhook-frontend
```

### AWS S3

```bash
# Sync to S3
aws s3 sync dist/webhook-frontend s3://your-bucket-name

# Set public read permissions
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

### Firebase Hosting

```bash
firebase deploy --only hosting
```

### Docker + Nginx

```bash
# Build Docker image
docker build -t webhook-frontend .

# Run container
docker run -d -p 80:80 webhook-frontend
```

## Post-Deployment Verification

### 1. Check env.js is Loaded

Visit `https://your-frontend-url.com/env.js`

Should see:
```javascript
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = 'https://your-backend.com/api';
}(this));
```

### 2. Test API Connection

1. Open frontend in browser
2. Open DevTools → Network tab
3. Click "Create New Link"
4. Check request goes to correct API URL
5. Verify response is successful

### 3. Test Full Flow

- [ ] Create webhook link
- [ ] Copy webhook URL
- [ ] Send test request to webhook
- [ ] View requests in frontend
- [ ] Verify request details display correctly

### 4. Check Console for Errors

Open DevTools → Console:
- [ ] No API connection errors
- [ ] No CORS errors
- [ ] No 404 errors for env.js

## Troubleshooting

### env.js not loading

**Symptom**: API calls go to localhost
**Solution**:
1. Verify `env.js` exists in `dist/webhook-frontend/`
2. Check angular.json includes `env.js` in assets
3. Rebuild and redeploy

### CORS Errors

**Symptom**: API calls blocked by CORS policy
**Solution**:
1. Update backend CORS configuration
2. Add frontend URL to allowed origins
3. Redeploy backend

### Wrong API URL

**Symptom**: 404 or connection refused errors
**Solution**:
1. Edit `dist/webhook-frontend/env.js`
2. Update `apiUrl` value
3. Redeploy (or just update the file if possible)

### 404 on Page Refresh

**Symptom**: Page refresh shows 404
**Solution**: Configure hosting for SPA

**Netlify** - Create `_redirects`:
```
/*    /index.html   200
```

**Vercel** - Already configured in `vercel.json`

**Nginx** - Add to config:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Environment-Specific Configurations

### Development
```javascript
window.__env.apiUrl = 'http://localhost:3000/api';
```

### Staging
```javascript
window.__env.apiUrl = 'https://staging-backend.yourapp.com/api';
```

### Production
```javascript
window.__env.apiUrl = 'https://api.yourapp.com/api';
```

## Security Checklist

- [ ] HTTPS enabled (not HTTP)
- [ ] API URL uses HTTPS
- [ ] No sensitive data in env.js
- [ ] CSP headers configured (if applicable)
- [ ] CORS properly configured on backend

## Performance Checklist

- [ ] Production build created (not dev build)
- [ ] Assets compressed (gzip/brotli)
- [ ] CDN configured (optional)
- [ ] Caching headers set
- [ ] Bundle size optimized

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npx http-server dist/webhook-frontend -p 8080

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=dist/webhook-frontend

# Build Docker image
docker build -t webhook-frontend .
```

## Success Criteria

✅ Frontend loads without errors
✅ API calls reach backend successfully
✅ Can create webhook links
✅ Can view requests
✅ Can copy webhook URLs
✅ All features work as expected
✅ No console errors
✅ Mobile responsive
✅ Page refresh works (no 404)

## Support

If issues persist:
1. Check [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md)
2. Check [README.md](./README.md)
3. Verify backend is running and accessible
4. Check browser DevTools for specific errors
