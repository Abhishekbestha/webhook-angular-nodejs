import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app">
      <header>
        <div class="container">
          <div class="logo-section">
            <div class="logo">🪝</div>
            <div class="title-section">
              <h1>Webhook Manager</h1>
              <p>Generate unique webhook endpoints and monitor incoming requests in real-time</p>
            </div>
          </div>
        </div>
      </header>
      <main class="container">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
    }

    header {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
      border-bottom: 1px solid var(--border);
      padding: 40px 0;
      margin-bottom: 40px;
      backdrop-filter: blur(10px);
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .logo {
      font-size: 48px;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      border-radius: 16px;
      box-shadow: var(--shadow-lg), var(--shadow-glow);
    }

    .title-section h1 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .title-section p {
      color: var(--text-secondary);
      font-size: 15px;
      letter-spacing: -0.01em;
    }

    @media (max-width: 768px) {
      .logo {
        width: 60px;
        height: 60px;
        font-size: 36px;
      }

      .title-section h1 {
        font-size: 24px;
      }

      .title-section p {
        font-size: 13px;
      }
    }
  `]
})
export class AppComponent {}
