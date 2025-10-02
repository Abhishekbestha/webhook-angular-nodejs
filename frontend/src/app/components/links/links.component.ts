import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WebhookService } from '../../services/webhook.service';
import { WebhookLink } from '../../models/webhook.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  links: WebhookLink[] = [];
  loading = false;
  copiedLinkId: string | null = null;

  constructor(
    private webhookService: WebhookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadLinks();
  }

  loadLinks() {
    this.loading = true;
    this.webhookService.getLinks().subscribe({
      next: (links) => {
        this.links = links;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading links:', error);
        this.loading = false;
      }
    });
  }

  createLink() {
    this.loading = true;
    this.webhookService.createLink().subscribe({
      next: (link) => {
        this.links.unshift(link);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error creating link:', error);
        this.loading = false;
      }
    });
  }

  deleteLink(linkId: string) {
    if (!confirm('Are you sure you want to delete this webhook link?')) {
      return;
    }

    this.webhookService.deleteLink(linkId).subscribe({
      next: () => {
        this.links = this.links.filter(link => link.linkId !== linkId);
      },
      error: (error) => {
        console.error('Error deleting link:', error);
      }
    });
  }

  viewRequests(linkId: string) {
    this.router.navigate(['/links', linkId]);
  }

  getWebhookUrl(linkId: string): string {
    const baseUrl = environment.production
      ? window.location.origin
      : 'http://localhost:3000';
    return `${baseUrl}/api/webhooks/receive/${linkId}`;
  }

  copyToClipboard(linkId: string) {
    const url = this.getWebhookUrl(linkId);
    navigator.clipboard.writeText(url).then(() => {
      this.copiedLinkId = linkId;
      setTimeout(() => {
        this.copiedLinkId = null;
      }, 2000);
    });
  }

  getDaysRemaining(expiresAt: string): number {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  isExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
  }
}
