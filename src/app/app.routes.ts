import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserInfoComponent } from './Components/user-info/user-info.component';
import { LocationComponent } from './pages/location/location.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { ManageUsersComponent } from './pages/hr/manage-users/manage-users.component';
import { NodeComponent } from './pages/node/node.component';
import { RoleGuard } from './services/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'location', component: LocationComponent, canActivate: [RoleGuard] },
  { path: 'node', component: NodeComponent, canActivate: [RoleGuard] },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [RoleGuard],
  },
];
