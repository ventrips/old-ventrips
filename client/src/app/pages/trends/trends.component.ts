import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { SeoService } from '../../services/seo/seo.service';
import { GitHubService } from '../../services/api/github/github.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  public isLoading = false;
  public items: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private seoService: SeoService,
    private gitHubService: GitHubService
  ) {
    this.seoService.generateTags();
    this.items = db.collection('/items').valueChanges();
  }

  ngOnInit(): void {}

  postTrendingGitHubRepos(): void {
    this.isLoading = true;
    this.spinner.show();
    this.gitHubService.postTrendingGitHubRepos().subscribe((response) => {
      this.toastrService.success(`${response.length} Results`, 'Success!');
      this.isLoading = false;
      this.spinner.hide();
    }, (error) => {
      this.toastrService.error(error, 'Error!');
      this.isLoading = false;
      this.spinner.hide();
    });
  }

}
