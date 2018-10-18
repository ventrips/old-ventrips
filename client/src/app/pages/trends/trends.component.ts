import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { SeoService } from '../../services/seo/seo.service';
import { GitHubService } from '../../services/api/github/github.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/firebase/auth/auth.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  public items: Observable<any[]>;
  public isLoading = false;

  constructor(
    private db: AngularFirestore,
    private spinner: NgxSpinnerService,
    private seoService: SeoService,
    private gitHubService: GitHubService,
    private angularFireAuth: AngularFireAuth,
    private toastrService: ToastrService,
    public authService: AuthService
  ) {
    this.seoService.generateTags();
    this.items = db.collection('/items').valueChanges();
  }

  ngOnInit(): void {}

  postTrendingGitHubRepos(): void {
    if (!this.authService.isAdmin()) { return; }

    this.isLoading = true;
    this.spinner.show();
    this.gitHubService.postTrendingGitHubRepos().subscribe((response) => {
      this.toastrService.success(`${response.length} Results`, 'Trends Data Loaded!');
      this.isLoading = false;
      this.spinner.hide();
    }, (error) => {
      this.toastrService.error(error, 'Error!');
      this.isLoading = false;
      this.spinner.hide();
    });
  }

}
