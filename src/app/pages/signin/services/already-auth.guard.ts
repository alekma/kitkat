import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthGuard implements CanActivate {
  constructor(
    private authService: AutenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (user) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
