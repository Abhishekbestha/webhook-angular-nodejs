import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebhookLink, WebhookRequest } from '../models/webhook.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebhookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createLink(): Observable<WebhookLink> {
    return this.http.post<WebhookLink>(`${this.apiUrl}/webhooks/links`, {});
  }

  getLinks(): Observable<WebhookLink[]> {
    return this.http.get<WebhookLink[]>(`${this.apiUrl}/webhooks/links`);
  }

  getLink(linkId: string): Observable<WebhookLink> {
    return this.http.get<WebhookLink>(`${this.apiUrl}/webhooks/links/${linkId}`);
  }

  deleteLink(linkId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/webhooks/links/${linkId}`);
  }

  getRequests(linkId: string): Observable<WebhookRequest[]> {
    return this.http.get<WebhookRequest[]>(`${this.apiUrl}/webhooks/links/${linkId}/requests`);
  }

  clearRequests(linkId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/webhooks/links/${linkId}/requests`);
  }
}
