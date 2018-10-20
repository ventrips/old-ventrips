import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import * as _ from 'lodash';
import { environment } from './../../../environments/environment';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  public environment = environment;

  constructor(
    private seoService: SeoService
  ) {
    this.seoService.generateTags();
  }

  ngOnInit(): void {}

}
