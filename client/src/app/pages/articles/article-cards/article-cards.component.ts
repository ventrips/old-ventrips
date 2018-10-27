import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/firebase/auth/auth.service';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { Article } from './../../../interfaces/article';
import * as _ from 'lodash';
import * as faker from 'faker';

@Component({
  selector: 'app-article-cards',
  templateUrl: './article-cards.component.html',
  styleUrls: ['./article-cards.component.scss']
})
export class ArticleCardsComponent implements OnInit {
  @Input() cards: Array<Object>;
  public _ = _;
  public environment = environment;
  public collection: string;
  public data: Object;

  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.collection = this.router.url.split('/')[1];
  }

  create(): void {
    if (_.includes(['reviews'], this.collection)) {
      this.data = _.assign(new Article(), this.data);
    }
  }
}
