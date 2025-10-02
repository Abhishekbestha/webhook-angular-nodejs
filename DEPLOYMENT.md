# Deployment Guide - Vercel

This guide explains how to deploy the Webhook Manager application on Vercel with GitHub integration.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed locally
- Project pushed to GitHub

## Deployment Steps

### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Webhook Manager application"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 2. Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Authorize Vercel to access your repository if needed

### 3. Configure Project Settings

Vercel should auto-detect the configuration from `vercel.json`. Verify these settings:

**Framework Preset**: Other (monorepo detected)

**Build Settings**:
- Build Command: `npm run vercel-build`
- Output Directory: (leave empty, handled by vercel.json)
- Install Command: `npm install`

**Root Directory**: `./` (root of the monorepo)

### 4. Environment Variables (Optional)

For production deployment, you typically don't need additional environment variables as the app uses relative URLs. However, if you want to customize:

1. Go to Project Settings → Environment Variables
2. Add any custom variables:
   - `NODE_ENV`: `production` (usually set by default)
   - `PORT`: `3000` (optional, Vercel handles this)

### 5. Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll get a production URL like: `https://your-project.vercel.app`

## Vercel Configuration Explained

The `vercel.json` file configures the monorepo deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/package.json",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/dist/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/webhook-frontend/$1"
    }
  ]
}
```

**Builds**:
- Backend: Uses `@vercel/node` to run the Node.js Express server
- Frontend: Uses `@vercel/static-build` to build and serve the Angular app

**Routes**:
- `/api/*` → Routes to backend API
- `/*` → Routes to frontend Angular app

## Continuous Deployment

Once deployed, Vercel automatically:

1. **Watches your GitHub repository**
2. **Auto-deploys on every push to main branch**
3. **Creates preview deployments for pull requests**
4. **Provides deployment logs and analytics**

### Trigger a Deployment

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push

# Vercel automatically deploys the changes
```

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Vercel automatically provisions SSL certificate

## Monitoring & Logs

### View Deployment Logs

1. Go to your project on Vercel Dashboard
2. Click on "Deployments"
3. Select a deployment
4. View build and runtime logs

### View Function Logs

1. Go to your project
2. Click on "Functions"
3. Click on the backend function
4. View real-time logs

## Troubleshooting

### Build Failures

**Check build logs**:
1. Go to failed deployment
2. Review build output
3. Common issues:
   - TypeScript errors → Fix in code
   - Missing dependencies → Check package.json
   - Build command errors → Verify scripts in package.json

**Solution**:
```bash
# Test build locally first
npm run vercel-build

# Fix any errors, then push
git add .
git commit -m "Fix build errors"
git push
```

### API Routes Not Working

**Symptom**: 404 on `/api/*` routes

**Solution**:
1. Verify `vercel.json` routes configuration
2. Check that backend builds to `backend/dist/index.js`
3. Ensure Express routes are properly exported

### Frontend Not Loading

**Symptom**: Blank page or 404

**Solution**:
1. Check Angular build output path: `frontend/dist/webhook-frontend`
2. Verify `vercel.json` frontend route
3. Check browser console for errors
4. Ensure `frontend/vercel.json` has correct rewrites

### Environment Issues

If API calls fail in production:

**Check**: `frontend/src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: '/api'  // Must be relative path
};
```

## Rollback Deployment

If a deployment has issues:

1. Go to Deployments
2. Find the last working deployment
3. Click "..." menu → "Promote to Production"

## Performance Optimization

### Enable Edge Caching

Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Optimize Bundle Size

**Frontend**:
```bash
# Analyze bundle
cd frontend
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/webhook-frontend/stats.json
```

## Alternative: Vercel CLI Deployment

### Install CLI
```bash
npm i -g vercel
```

### Login
```bash
vercel login
```

### Deploy
```bash
# Development deployment
vercel

# Production deployment
vercel --prod
```

### Link to Existing Project
```bash
vercel link
```

## Cost Considerations

**Vercel Free Tier**:
- 100GB bandwidth/month
- Unlimited personal projects
- Automatic SSL
- Perfect for development and small applications

**Pro Plan** (if needed):
- More bandwidth
- Team collaboration
- Advanced analytics

## Production Checklist

Before going live:

- [ ] Test all webhook endpoints
- [ ] Verify link creation works
- [ ] Test request viewing
- [ ] Check auto-refresh functionality
- [ ] Test on mobile devices
- [ ] Verify SSL certificate
- [ ] Set up custom domain (if needed)
- [ ] Configure monitoring/alerts
- [ ] Review security settings
- [ ] Test with real webhook providers

## Security Notes

1. **HTTPS**: Vercel provides automatic HTTPS
2. **Environment Variables**: Never commit sensitive data to GitHub
3. **CORS**: Configured in backend for security
4. **Rate Limiting**: Consider adding for production
5. **Authentication**: Add user auth for production use

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions
- **Status**: https://vercel-status.com

## Next Steps

After deployment:
1. Test your webhook URLs
2. Share with team
3. Monitor usage in Vercel dashboard
4. Set up custom domain (optional)
5. Configure alerts (optional)
