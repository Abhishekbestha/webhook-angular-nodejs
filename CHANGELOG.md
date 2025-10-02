# Changelog

## [2.0.0] - 2024 - Major Refactor

### 🎉 Major Changes

#### Architecture
- ✅ **Separated Backend & Frontend** - Now independent deployable projects
- ✅ **Dynamic API Configuration** - Runtime configuration without rebuilds
- ✅ **Platform Independence** - Deploy to any platform separately

### ✨ New Features

#### Configuration
- **Runtime API Configuration** via `env.js`
- **Configuration Helper Scripts**: `configure-api.sh` and `configure-api.bat`
- **Environment Templates**: `env.production.js`
- **Build-once, deploy-many** workflow

#### UI/UX Improvements
- **Professional Dark Theme** with gradient effects
- **Inter Font Family** from Google Fonts
- **Icon-Enhanced Buttons**: 📋 📊 🗑 ✨ ✓ 🔄
- **Animated Status Indicators** with pulsing effects
- **Smooth Transitions** and hover effects
- **Improved Visual Hierarchy**
- **Enhanced Mobile Experience**

#### Documentation
- **Backend README.md** - Complete API documentation
- **Frontend README.md** - Setup and configuration guide
- **DEPLOYMENT_GUIDE.md** - Comprehensive deployment instructions
- **DEPLOYMENT_CHECKLIST.md** - Pre-deployment checklist
- **QUICK_REFERENCE.md** - Command and API reference
- **WHATS_NEW.md** - Overview of changes
- **SEPARATION_SUMMARY.md** - Technical implementation details
- **BEFORE_AFTER.md** - Visual comparison
- **CHANGELOG.md** - This file

### 📁 New Files

#### Frontend
- `frontend/src/env.js` - Runtime configuration
- `frontend/src/env.production.js` - Production template
- `frontend/configure-api.sh` - Linux/Mac config script
- `frontend/configure-api.bat` - Windows config script
- `frontend/.gitignore` - Frontend-specific ignores
- `frontend/README.md` - Frontend documentation
- `frontend/DEPLOYMENT_CHECKLIST.md` - Deployment checklist

#### Backend
- `backend/.gitignore` - Backend-specific ignores
- `backend/README.md` - Backend API documentation

#### Documentation
- `DEPLOYMENT_GUIDE.md` - Platform-specific deployment
- `WHATS_NEW.md` - Changes overview
- `QUICK_REFERENCE.md` - Quick commands
- `SEPARATION_SUMMARY.md` - Technical summary
- `BEFORE_AFTER.md` - Visual comparison
- `CHANGELOG.md` - This changelog

### 🔧 Modified Files

#### Frontend
- `frontend/src/index.html` - Added Inter font, env.js script
- `frontend/src/styles.css` - Updated to use Inter font
- `frontend/src/environments/environment.ts` - Dynamic API URL
- `frontend/src/environments/environment.prod.ts` - Dynamic API URL
- `frontend/angular.json` - Added env.js to assets
- `frontend/src/app/components/links/links.component.html` - Added icons and subtitle
- `frontend/src/app/components/links/links.component.css` - Added subtitle styles
- `frontend/src/app/components/requests/requests.component.html` - Added icons and status dots
- `frontend/src/app/components/requests/requests.component.css` - Added status dot styles

#### Root
- `README.md` - Comprehensive updates for new architecture

### 🚀 Deployment Changes

#### Before
```bash
npm run vercel-build
vercel --prod
```

#### After
```bash
# Backend
cd backend && vercel --prod

# Frontend
cd frontend
npm run build
./configure-api.sh
vercel --prod
```

### 💡 Breaking Changes

⚠️ **API Configuration Method Changed**

**Old Method**:
- Edit `environment.ts` and rebuild

**New Method**:
- Edit `env.js` at runtime (no rebuild)

**Migration**:
1. Build frontend: `npm run build`
2. Configure API: `./configure-api.sh`
3. Deploy

### 🎯 Benefits

1. **Independent Deployment**
   - Deploy backend and frontend separately
   - Update one without touching the other
   - Choose different platforms for each

2. **Runtime Configuration**
   - No rebuild for environment changes
   - Single build for all environments
   - Easy testing across environments

3. **Platform Flexibility**
   - Backend: Any Node.js platform
   - Frontend: Any static hosting
   - Mix and match as needed

4. **Professional UI**
   - Modern, polished design
   - Better user experience
   - Improved accessibility

5. **Better Documentation**
   - Comprehensive guides
   - Quick reference cards
   - Platform-specific instructions

### 📊 Statistics

- **New Files**: 15+
- **Modified Files**: 10+
- **Documentation Pages**: 8
- **Helper Scripts**: 2
- **Deployment Options**: 20+

### 🔄 Migration Guide

From v1.x to v2.0:

1. **Backend** - No changes needed
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend** - Use new configuration
   ```bash
   cd frontend
   npm install
   npm run build
   ./configure-api.sh  # Enter backend URL
   npm start
   ```

3. **Deployment** - Follow new workflow
   - Deploy backend first
   - Configure frontend API URL
   - Deploy frontend

### 🐛 Bug Fixes

- Fixed CORS configuration documentation
- Improved error handling documentation
- Added troubleshooting guides

### 🔒 Security

- Documented CORS best practices
- Added security checklist to deployment guide
- Recommended HTTPS enforcement

### 📝 Notes

- All existing functionality preserved
- Backward compatible API
- No breaking changes to API endpoints

### 👥 Contributors

- Major refactor and separation
- UI/UX redesign
- Documentation overhaul

---

## [1.0.0] - Initial Release

### Features
- Webhook link generation
- Request tracking
- Real-time monitoring
- Auto-refresh
- Request details viewer
- Dark theme UI
- Monorepo deployment

---

## Version Comparison

| Version | Architecture | Configuration | UI | Docs |
|---------|-------------|---------------|----|----- |
| 1.0.0 | Monorepo | Hardcoded | Basic | Single README |
| 2.0.0 | Separated | Dynamic | Professional | Comprehensive |

---

**For detailed changes, see:**
- [WHATS_NEW.md](./WHATS_NEW.md) - Overview
- [BEFORE_AFTER.md](./BEFORE_AFTER.md) - Comparison
- [SEPARATION_SUMMARY.md](./SEPARATION_SUMMARY.md) - Technical details
