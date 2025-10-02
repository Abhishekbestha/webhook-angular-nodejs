# Webhook Backend API

A Node.js/Express backend for webhook link generation and request tracking.

## Features

- Create temporary webhook links
- Track incoming webhook requests
- RESTful API architecture
- TypeScript support
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js 18+
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Server will start on `http://localhost:3000`

## Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Create Webhook Link
```
POST /api/webhooks/links
```

### Get All Links
```
GET /api/webhooks/links
```

### Get Single Link
```
GET /api/webhooks/links/:linkId
```

### Delete Link
```
DELETE /api/webhooks/links/:linkId
```

### Get Requests for Link
```
GET /api/webhooks/links/:linkId/requests
```

### Clear Requests
```
DELETE /api/webhooks/links/:linkId/requests
```

### Webhook Endpoint (receives webhooks)
```
ALL /webhook/:linkId
```

## Deployment

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker build -t webhook-backend .
docker run -p 3000:3000 webhook-backend
```

### Other Platforms
Build the project and deploy the `dist` folder with Node.js runtime.

## License

MIT
