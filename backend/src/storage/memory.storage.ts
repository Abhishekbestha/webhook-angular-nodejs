import { WebhookLink, WebhookRequest } from '../models/webhook.model';

class MemoryStorage {
  private webhookLinks: Map<string, WebhookLink> = new Map();
  private webhookRequests: Map<string, WebhookRequest[]> = new Map();

  // Webhook Links
  createLink(link: WebhookLink): WebhookLink {
    this.webhookLinks.set(link.linkId, link);
    this.webhookRequests.set(link.linkId, []);
    return link;
  }

  getLink(linkId: string): WebhookLink | undefined {
    return this.webhookLinks.get(linkId);
  }

  getAllLinks(): WebhookLink[] {
    return Array.from(this.webhookLinks.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  deleteLink(linkId: string): boolean {
    this.webhookRequests.delete(linkId);
    return this.webhookLinks.delete(linkId);
  }

  // Webhook Requests
  addRequest(request: WebhookRequest): WebhookRequest {
    const requests = this.webhookRequests.get(request.linkId) || [];
    requests.push(request);
    this.webhookRequests.set(request.linkId, requests);
    return request;
  }

  getRequests(linkId: string): WebhookRequest[] {
    return (this.webhookRequests.get(linkId) || [])
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  clearRequests(linkId: string): void {
    this.webhookRequests.set(linkId, []);
  }

  // Cleanup expired links
  cleanupExpiredLinks(): number {
    const now = new Date();
    let count = 0;

    this.webhookLinks.forEach((link, linkId) => {
      if (link.expiresAt < now) {
        this.deleteLink(linkId);
        count++;
      }
    });

    return count;
  }
}

export const storage = new MemoryStorage();
