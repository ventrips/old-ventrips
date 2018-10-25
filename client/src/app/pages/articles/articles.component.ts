import { SeoService } from '../../services/seo/seo.service';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as faker from 'faker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticlesService } from '../../services/firebase/articles/articles.service';

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
  public isLoading = true;
  constructor(
    private seoService: SeoService,
    private articlesService: ArticlesService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.url = this.router.url;
    this.collection = this.router.url.split('/')[1];
    this.seoService.generateTags();
    this.spinner.show();
    this.articlesService.getCollection(this.collection).subscribe(articles => {
      this.articles = articles;
      this.isLoading = false;
      this.spinner.hide();
    }, () => {
      this.isLoading = false;
      this.spinner.hide();
    });
  }

  ngOnInit(): void {}
}
