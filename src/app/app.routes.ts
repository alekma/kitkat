import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './pages/signin/services/auth.guard';
import { AlreadyAuthGuard } from './pages/signin/services/already-auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AlreadyAuthGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];
