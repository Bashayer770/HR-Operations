import { Routes } from '@angular/router';
import { AuthWrapperComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: AuthWrapperComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
