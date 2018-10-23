import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-article-banner',
  templateUrl: './article-banner.component.html',
  styleUrls: ['./article-banner.component.scss']
})
export class ArticleBannerComponent implements OnInit {
  public _ = _;
  public environment = environment;
  public collection: string;

  constructor(
    private router: Router
  ) {
    this.collection = this.router.url.split('/')[1];
  }

  ngOnInit(): void {
  }

}
