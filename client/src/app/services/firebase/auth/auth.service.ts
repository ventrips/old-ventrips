import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private admins: Array<string>;
  private user: Object;

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private toastrService: ToastrService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.getAdminIds().subscribe(admins => {
      this.admins = admins;
    }, () => {});
    this.angularFireAuth.authState.subscribe((user) => {
      if (!_.isNil(user)) {
        this.user = user;
        this.toastrService.info(`Welcome, ${this.user['displayName']}`);
      } else {
        this.user = undefined;
      }
    });
  }

  getUser(): Object {
    return this.user;
  }

  getUid(): String {
    return this.user['uid'];
  }

  getDisplayName(): string {
    return this.user['displayName'];
  }

  getPhotoURL(): string {
    return this.user['photoURL'];
  }

  getAdmins(): Array<string> {
    return this.admins;
  }

  getAdminIds(): Observable<any[]> {
    return this.db.collection('/admins').snapshotChanges()
    .pipe(map(actions => actions.map((obj: any) => {
        return obj.payload.doc.id;
    })));
  }

  isAuthenticated(): boolean {
    return !_.isNil(this.user);
  }

  isAdmin(): boolean {
    return !_.isNil(this.admins) && this.isAuthenticated() && _.includes(this.admins, this.user['uid']);
  }

  signOut(): void {
    this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }

}
