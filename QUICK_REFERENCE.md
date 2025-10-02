# Quick Reference Guide

## 📦 Project Structure

```
webhook-angular-nodejs/
├── backend/          → Standalone Node.js API
├── frontend/         → Standalone Angular app
└── docs/            → Documentation
```

## 🚀 Common Commands

### Development

```bash
# Backend (Terminal 1)
cd backend && npm run dev

# Frontend (Terminal 2)
cd frontend && npm start
```

### Build

```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

### Deploy

```bash
# Backend (Vercel)
cd backend && vercel --prod

# Frontend (Vercel)
cd frontend && npm run build && vercel --prod
```

## 🔧 Configuration

### Backend API URL

**Development**: `http://localhost:3000/api`

**Production**: Configure in `frontend/dist/webhook-frontend/env.js`

```javascript
window.__env.apiUrl = 'https://your-backend.com/api';
```

### Quick Config Script

```bash
# Windows
npm run build
configure-api.bat

# Linux/Mac
npm run build
./configure-api.sh
```

## 📡 API Endpoints

### Links
- `POST /api/webhooks/links` - Create link
- `GET /api/webhooks/links` - List links
- `DELETE /api/webhooks/links/:id` - Delete link

### Requests
- `GET /api/webhooks/links/:id/requests` - Get requests
- `DELETE /api/webhooks/links/:id/requests` - Clear requests
- `ALL /webhook/:id` - Receive webhook

## 🎨 UI Features

### Icons
- ✨ Create New Link
- 📋 Copy
- 📊 View Requests
- 🗑 Delete
- 🔄 Refresh

### Status
- 🟢 Active (pulsing)
- 🔴 Expired

## 🐛 Troubleshooting

### API Connection Failed
1. Check backend is running
2. Verify `env.js` exists and has correct URL
3. Check CORS configuration

### CORS Error
Update backend `src/index.ts`:
```typescript
app.use(cors({
  origin: ['http://localhost:4200', 'https://yourfrontend.com']
}));
```

### Build Error
```bash
rm -rf node_modules .angular
npm install
```

## 📚 Documentation

- [README.md](./README.md) - Main docs
- [WHATS_NEW.md](./WHATS_NEW.md) - Recent changes
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy guide
- [backend/README.md](./backend/README.md) - Backend docs
- [frontend/README.md](./frontend/README.md) - Frontend docs

## 🔗 URLs

### Development
- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- API: http://localhost:3000/api

### Example Production
- Frontend: https://webhook.yourdomain.com
- Backend: https://api.yourdomain.com
- API: https://api.yourdomain.com/api

## ⚡ Quick Deploy Checklist

Backend:
- [ ] Deploy to chosen platform
- [ ] Note the URL

Frontend:
- [ ] Run `npm run build`
- [ ] Configure API URL in `env.js`
- [ ] Deploy to chosen platform
- [ ] Test functionality

## 🎯 Testing

```bash
# Test webhook
curl -X POST https://your-backend.com/webhook/abc123 \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Health check
curl https://your-backend.com/api/health
```

## 💡 Tips

1. **Always deploy backend first** - Frontend needs backend URL
2. **Use configuration script** - Easier than manual editing
3. **Check env.js is deployed** - Visit `/env.js` on frontend
4. **Monitor console** - Check for errors in DevTools
5. **Test full flow** - Create link → Send request → View in UI

## 🆘 Quick Help

**Can't connect to API?**
→ Check `dist/webhook-frontend/env.js` has correct URL

**404 on page refresh?**
→ Configure hosting for SPA routing

**CORS errors?**
→ Update backend CORS with frontend URL

**Build fails?**
→ Clean install: `rm -rf node_modules && npm install`

## 📞 Support

- Issues: GitHub Issues
- Docs: See documentation links above
- Deployment: Check DEPLOYMENT_GUIDE.md
