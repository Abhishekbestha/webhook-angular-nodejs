#!/bin/bash

# Frontend API Configuration Script
# This script helps configure the backend API URL for the frontend

echo "🚀 Webhook Frontend - API Configuration"
echo "========================================"
echo ""

# Check if dist folder exists
if [ ! -d "dist/webhook-frontend" ]; then
  echo "❌ Error: dist/webhook-frontend folder not found"
  echo "   Please run 'npm run build' first"
  exit 1
fi

# Get backend URL from user
echo "Enter your backend API URL (without /api suffix):"
echo "Examples:"
echo "  - https://your-backend.vercel.app"
echo "  - https://webhook-api.herokuapp.com"
echo "  - https://api.yourdomain.com"
echo ""
read -p "Backend URL: " BACKEND_URL

# Validate URL is not empty
if [ -z "$BACKEND_URL" ]; then
  echo "❌ Error: Backend URL cannot be empty"
  exit 1
fi

# Remove trailing slash if present
BACKEND_URL=${BACKEND_URL%/}

# Add /api suffix
API_URL="${BACKEND_URL}/api"

# Create env.js file
cat > dist/webhook-frontend/env.js << EOF
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = '${API_URL}';
}(this));
EOF

echo ""
echo "✅ Configuration complete!"
echo ""
echo "📝 Created: dist/webhook-frontend/env.js"
echo "🔗 API URL: ${API_URL}"
echo ""
echo "Next steps:"
echo "1. Deploy the frontend: vercel --prod"
echo "   OR: netlify deploy --prod --dir=dist/webhook-frontend"
echo ""
echo "2. Test the deployment by visiting your frontend URL"
echo ""
