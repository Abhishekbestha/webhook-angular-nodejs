import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhook.routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: '*/*', limit: '10mb' }));

// Routes
app.use('/api/webhooks', webhookRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Webhook API Server',
    version: '1.0.0',
    endpoints: {
      createLink: 'POST /api/webhooks/links',
      getLinks: 'GET /api/webhooks/links',
      getLink: 'GET /api/webhooks/links/:linkId',
      deleteLink: 'DELETE /api/webhooks/links/:linkId',
      getRequests: 'GET /api/webhooks/links/:linkId/requests',
      clearRequests: 'DELETE /api/webhooks/links/:linkId/requests',
      receiveWebhook: 'ANY /api/webhooks/receive/:linkId'
    }
  });
});

app.listen(PORT, () => {
  console.log(`⚡️ Server running on port ${PORT}`);
});

export default app;
