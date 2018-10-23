import { SeoService } from '../../services/seo/seo.service';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as faker from 'faker';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public _ = _;
  public environment = environment;
  public collection: string;
  public articles: Array<Object>;
  public url: string;
  constructor(
    private seoService: SeoService,
    private router: Router
  ) {
    this.url = this.router.url;
    this.collection = this.router.url.split('/')[1];
    this.seoService.generateTags();
    this.articles = Array(10)
      .fill(10)
      // tslint:disable-next-line:no-shadowed-variable
      .map(_ => {
        return {
          uid: faker.random.uuid(),
          displayName: faker.name.findName(),
          title: faker.hacker.phrase(),
          category: faker.company.bsNoun(),
          content: faker.random.words(),
          created: faker.date.recent(),
          imageUrl: faker.image.imageUrl(),
          id: faker.random.uuid()
        };
      });
  }

  ngOnInit(): void {}
}