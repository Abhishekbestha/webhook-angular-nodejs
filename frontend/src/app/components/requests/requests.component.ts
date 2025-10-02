import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WebhookService } from '../../services/webhook.service';
import { WebhookRequest, WebhookLink } from '../../models/webhook.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {
  linkId: string = '';
  link: WebhookLink | null = null;
  requests: WebhookRequest[] = [];
  loading = false;
  selectedRequest: WebhookRequest | null = null;
  autoRefresh = true;
  private refreshSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webhookService: WebhookService
  ) {}

  ngOnInit() {
    this.linkId = this.route.snapshot.paramMap.get('linkId') || '';
    this.loadLink();
    this.loadRequests();
    this.startAutoRefresh();
  }

  ngOnDestroy() {
    this.stopAutoRefresh();
  }

  loadLink() {
    this.webhookService.getLink(this.linkId).subscribe({
      next: (link) => {
        this.link = link;
      },
      error: (error) => {
        console.error('Error loading link:', error);
      }
    });
  }

  loadRequests() {
    this.loading = true;
    this.webhookService.getRequests(this.linkId).subscribe({
      next: (requests) => {
        this.requests = requests;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading requests:', error);
        this.loading = false;
      }
    });
  }

  clearRequests() {
    if (!confirm('Are you sure you want to clear all requests?')) {
      return;
    }

    this.webhookService.clearRequests(this.linkId).subscribe({
      next: () => {
        this.requests = [];
        this.selectedRequest = null;
      },
      error: (error) => {
        console.error('Error clearing requests:', error);
      }
    });
  }

  selectRequest(request: WebhookRequest) {
    this.selectedRequest = request;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  toggleAutoRefresh() {
    this.autoRefresh = !this.autoRefresh;
    if (this.autoRefresh) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }

  startAutoRefresh() {
    if (this.autoRefresh) {
      this.refreshSubscription = interval(5000).subscribe(() => {
        this.loadRequests();
      });
    }
  }

  stopAutoRefresh() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  formatJson(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  getMethodClass(method: string): string {
    const classes: Record<string, string> = {
      'GET': 'method-get',
      'POST': 'method-post',
      'PUT': 'method-put',
      'DELETE': 'method-delete',
      'PATCH': 'method-patch'
    };
    return classes[method] || 'method-other';
  }

  isLinkExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
  }

  isLinkActive(expiresAt: string): boolean {
    return new Date(expiresAt) > new Date();
  }

  hasQueryParams(query: Record<string, string>): boolean {
    return Object.keys(query).length > 0;
  }
}
