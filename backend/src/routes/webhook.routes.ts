import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../storage/memory.storage';
import { WebhookLink, WebhookRequest } from '../models/webhook.model';

const router = Router();

// Generate a new webhook link
router.post('/links', (req: Request, res: Response) => {
  const linkId = uuidv4().substring(0, 8);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const link: WebhookLink = {
    id: uuidv4(),
    linkId,
    createdAt: now,
    expiresAt,
    isActive: true,
  };

  storage.createLink(link);
  res.json(link);
});

// Get all webhook links
router.get('/links', (req: Request, res: Response) => {
  storage.cleanupExpiredLinks();
  const links = storage.getAllLinks();
  res.json(links);
});

// Get a specific webhook link
router.get('/links/:linkId', (req: Request, res: Response) => {
  const { linkId } = req.params;
  const link = storage.getLink(linkId);

  if (!link) {
    return res.status(404).json({ error: 'Link not found' });
  }

  if (link.expiresAt < new Date()) {
    return res.status(410).json({ error: 'Link expired' });
  }

  res.json(link);
});

// Delete a webhook link
router.delete('/links/:linkId', (req: Request, res: Response) => {
  const { linkId } = req.params;
  const deleted = storage.deleteLink(linkId);

  if (!deleted) {
    return res.status(404).json({ error: 'Link not found' });
  }

  res.json({ message: 'Link deleted successfully' });
});

// Get all requests for a specific link
router.get('/links/:linkId/requests', (req: Request, res: Response) => {
  const { linkId } = req.params;
  const link = storage.getLink(linkId);

  if (!link) {
    return res.status(404).json({ error: 'Link not found' });
  }

  const requests = storage.getRequests(linkId);
  res.json(requests);
});

// Clear all requests for a specific link
router.delete('/links/:linkId/requests', (req: Request, res: Response) => {
  const { linkId } = req.params;
  const link = storage.getLink(linkId);

  if (!link) {
    return res.status(404).json({ error: 'Link not found' });
  }

  storage.clearRequests(linkId);
  res.json({ message: 'Requests cleared successfully' });
});

// Receive webhook (catch-all for any HTTP method)
const handleWebhook = (req: Request, res: Response) => {
  const { linkId } = req.params;
  const link = storage.getLink(linkId);

  if (!link) {
    return res.status(404).json({ error: 'Webhook link not found' });
  }

  if (link.expiresAt < new Date()) {
    return res.status(410).json({ error: 'Webhook link expired' });
  }

  const webhookRequest: WebhookRequest = {
    id: uuidv4(),
    linkId,
    method: req.method,
    headers: req.headers as Record<string, string>,
    body: req.body,
    query: req.query as Record<string, string>,
    timestamp: new Date(),
    ipAddress: req.ip || req.socket.remoteAddress,
  };

  storage.addRequest(webhookRequest);
  res.json({
    message: 'Webhook received successfully',
    requestId: webhookRequest.id
  });
};

router.all('/receive/:linkId', handleWebhook);

export default router;
