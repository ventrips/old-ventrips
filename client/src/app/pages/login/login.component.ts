import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private angularFireAuth: AngularFireAuth,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.seoService.generateTags();

    this.angularFireAuth.authState.subscribe((user) => {
      if (!_.isNil(user)) {
        this.toastrService.success('You are logged in');
        this.router.navigate(['/products']);
      } else {
        this.toastrService.success('You are logged out');
      }
    });

  }

  ngOnInit(): void {
  }

}
