import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/firebase/auth/auth.service';
import { AdminGuard } from './services/guards/admin-guard/admin-guard.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  onActivate(event) {
    window.scrollTo(0, 0);
  }

  constructor(
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
    private adminGuard: AdminGuard
  ) {}

}
