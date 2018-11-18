import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public environment = environment;
  public socialMedia = [
    {
      name: 'Email',
      class: 'fa fa-envelope',
      url: `mailto:huynhjjk@gmail.com?Subject=Hey`
    },
    {
      name: 'LinkedIn',
      class: 'fab fa-linkedin',
      url: `https://www.linkedin.com/in/johnsonhuynh`
    },
    {
      name: 'Instagram',
      class: 'fab fa-instagram',
      url: `https://www.instagram.com/jamztuh`
    },
    {
      name: 'Facebook',
      class: 'fab fa-facebook-f',
      url: `https://www.facebook.com/JaMzTeR`
    }
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  showInverse(): boolean {
    return _.includes(this.router.url, 'splash');
  }

}
