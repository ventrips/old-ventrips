import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private admins: Array<string>;
  private user: Object;

  constructor(
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
      }
    });
  }


  getUser(): Object {
    return this.user;
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

  isAdmin(): boolean {
    return !_.isNil(this.admins) && !_.isNil(this.user) && _.includes(this.admins, this.user['uid']);
  }

}
