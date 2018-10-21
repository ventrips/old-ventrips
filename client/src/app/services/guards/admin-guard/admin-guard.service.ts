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
      // Access Admin Screens if user is an admin
      if (this.authService.isAdmin()) {
        return true;
      }

      // Redirect to home screen if user is not an admin
      this.router.navigate(['/']);
      return false;
    }
}
