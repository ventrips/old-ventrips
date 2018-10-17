import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { SeoService } from '../../services/seo/seo.service';
import { GitHubService } from '../../services/api/github/github.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  public items: Observable<any[]>;

  constructor(
    db: AngularFirestore,
    private seoService: SeoService,
    private gitHubService: GitHubService
  ) {
    this.seoService.generateTags();
    this.items = db.collection('/items').valueChanges();
  }

  ngOnInit(): void {
    this.gitHubService.getTrendingGitHubRepos().subscribe((response) => {
      console.log('response', response);
    }, (error) => {
      console.log('error', error);
    });
  }

}
