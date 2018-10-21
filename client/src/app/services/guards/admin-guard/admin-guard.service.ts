import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../firebase/auth/auth.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
      // Redirect to Login if user is not authenticated
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);

        return false;
      }

      // Redirect non-admin user to home screen
      if (!this.authService.isAdmin()) {
        this.router.navigate(['/']);

        return false;
      }

      // Access Admin Screens if user is an admin
      if (this.authService.isAdmin()) {
        return true;
      }
   }
}
