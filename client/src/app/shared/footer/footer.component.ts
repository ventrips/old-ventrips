import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  isHome(): boolean {
    return _.isEqual(this.router.url, '/') || _.includes(this.router.url, 'home');
  }

}
