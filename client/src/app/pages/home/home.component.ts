import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private seoService: SeoService
  ) {
    this.seoService.addTwitterCard(
      'Home',
      'A one-stop shop for all your travel essentials',
      './../../../favicon.ico'
    );
  }

  ngOnInit(): void {}

}
