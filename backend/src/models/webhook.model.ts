export interface WebhookLink {
  id: string;
  linkId: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

export interface WebhookRequest {
  id: string;
  linkId: string;
  method: string;
  headers: Record<string, string>;
  body: any;
  query: Record<string, string>;
  timestamp: Date;
  ipAddress?: string;
}
