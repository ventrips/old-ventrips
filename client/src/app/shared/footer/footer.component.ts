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
      name: 'Twitter',
      class: 'fab fa-twitter',
      url: `https://twitter.com/${_.startCase(environment.name)}`
    },
    {
      name: 'Facebook',
      class: 'fab fa-facebook-f',
      url: `https://facebook.com/Official${_.startCase(environment.name)}`
    },
    {
      name: 'Instagram',
      class: 'fab fa-instagram',
      url: `https://www.instagram.com/${_.startCase(environment.name)}`
    },
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  showInverse(): boolean {
    return _.includes(this.router.url, 'splash');
  }

}
