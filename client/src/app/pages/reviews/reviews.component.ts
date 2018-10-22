import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import { environment } from './../../../environments/environment';
import * as _ from 'lodash';
import * as faker from 'faker';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public _ = _;
  public environment = environment;
  public collection = 'reviews';
  // people;

  constructor(
    private seoService: SeoService
  ) {
    this.seoService.generateTags();
    // this.people = Array(100)
    //   .fill(1)
    //   // tslint:disable-next-line:no-shadowed-variable
    //   .map(_ => {
    //     return {
    //       name: faker.name.findName(),
    //       bio: faker.hacker.phrase()
    //     };
    //   });
  }

  ngOnInit(): void {
  }

}
