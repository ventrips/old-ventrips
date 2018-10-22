import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import { environment } from './../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public _ = _;
  public environment = environment;
  public collection = 'reviews';

  constructor(
    private seoService: SeoService
  ) {
    this.seoService.generateTags();
  }

  ngOnInit(): void {
  }

}
