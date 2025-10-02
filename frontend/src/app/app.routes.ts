import { Routes } from '@angular/router';
import { LinksComponent } from './components/links/links.component';
import { RequestsComponent } from './components/requests/requests.component';

export const routes: Routes = [
  { path: '', component: LinksComponent },
  { path: 'links/:linkId', component: RequestsComponent },
  { path: '**', redirectTo: '' }
];
