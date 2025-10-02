// Production Environment Configuration Template
// Copy this file to dist/webhook-frontend/env.js after building
// and update the apiUrl with your backend URL

(function(window) {
  window.__env = window.__env || {};

  // Backend API URL - CHANGE THIS TO YOUR BACKEND URL
  // Examples:
  // - Same domain with reverse proxy: '/api'
  // - Different domain: 'https://your-backend.com/api'
  // - Vercel: 'https://your-backend.vercel.app/api'
  // - Heroku: 'https://your-app.herokuapp.com/api'
  // - Custom domain: 'https://api.yourdomain.com/api'

  window.__env.apiUrl = 'YOUR_BACKEND_URL_HERE/api';

  // Example configurations:
  // window.__env.apiUrl = 'https://webhook-backend.vercel.app/api';
  // window.__env.apiUrl = 'https://api.yourdomain.com/api';
  // window.__env.apiUrl = '/api'; // If using same domain
}(this));
