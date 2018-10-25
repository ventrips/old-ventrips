import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/firebase/auth/auth.service';
import { SeoService } from '../../../services/seo/seo.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as faker from 'faker';
import { AngularFirestore } from '@angular/fire/firestore';
import { ArticlesService } from '../../../services/firebase/articles/articles.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public _ = _;
  public environment = environment;
  public collection: string;
  public article: Object;
  public articleCopy: Object;
  public url: string;
  public id: string;
  public isLoading = true;

  constructor(
    private seoService: SeoService,
    public authService: AuthService,
    private articlesService: ArticlesService,
    private db: AngularFirestore,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.url = this.router.url;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.collection = this.router.url.split('/')[1];
    this.spinner.show();
    this.articlesService.getDocumentById(this.collection, this.id).subscribe(article => {
      this.article = article;
      this.seoService.generateTags({
        title: this.article['title'],
        description: _.toString(this.article['content']),
        image: this.article['imageUrl']
      });
      this.spinner.hide();
      this.isLoading = false;
    }, () => {
      this.spinner.hide();
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}

  create(): void {
    if (!this.authService.isAdmin()) { return; }
    this.articlesService.createDocument(this.collection, this.article)
    .then(() => {
      this.toastr.success(`Added ${this.article['title']}`);
    }).catch((error) => {
      this.toastr.error(`Unable to add ${this.article['title']}`);
    });
  }

  update(): void {
    if (!this.authService.isAdmin()) { return; }
    this.articlesService.updateDocument(this.collection, this.id, this.article)
    .then(() => {
      this.toastr.success(`Added ${this.article['title']}`);
    }).catch((error) => {
      this.toastr.error(`Unable to add ${this.article['title']}`);
    });
  }

}
