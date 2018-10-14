import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public selectedNav: string;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((route) => {
      if (!_.isNil(route['url'])) {
        this.selectedNav = route['url'];
      }
    });
  }

  ngOnInit(): void {}

  isHome(): boolean {
    return _.isEqual(this.selectedNav, '/') || _.includes(this.selectedNav, 'home');
  }

}
