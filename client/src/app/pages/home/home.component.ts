import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import * as _ from 'lodash';
import { environment } from './../../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public environment = environment;

  constructor(
    private seoService: SeoService
  ) {
    this.seoService.generateTags();
  }

  ngOnInit(): void {}

}
