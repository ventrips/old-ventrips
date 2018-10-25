import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/firebase/auth/auth.service';
import { SeoService } from '../../../services/seo/seo.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as faker from 'faker';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public environment = environment;
  public collection: string;
  public article: Object;
  public url: string;

  constructor(
    private seoService: SeoService,
    public authService: AuthService,
    private db: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.url = this.router.url;
    this.collection = this.router.url.split('/')[1];
    this.article = {
      uid: faker.random.uuid(),
      displayName: faker.name.findName(),
      title: faker.hacker.phrase(),
      category: faker.company.bsNoun(),
      content: `${faker.random.words()}`,
      created: faker.date.recent(),
      imageUrl: faker.image.imageUrl(),
      refId: faker.random.uuid()
    };
    this.seoService.generateTags({
      title: this.article['title'],
      description: _.toString(this.article['content']),
      image: this.article['imageUrl']
    });
  }
  ngOnInit(): void {}

  create(): void {
    if (!this.authService.isAdmin()) { return; }
    this.db
    .collection(this.collection)
    .add(JSON.parse(JSON.stringify(this.article)))
    .then(() => {
      this.toastr.success(`Added ${this.article['title']}`);
    }).catch((error) => {
      this.toastr.error(`Unable to add ${this.article['title']}`);
    });
  }

  save(): void {
    if (!this.authService.isAdmin()) { return; }
    this.db
    .collection(this.collection)
    .doc(this.article['refId'])
    .update(JSON.parse(JSON.stringify(this.article)))
    .then(() => {
      this.toastr.success(`Added ${this.article['title']}`);
    }).catch((error) => {
      this.toastr.error(`Unable to add ${this.article['title']}`);
    });
  }

}
