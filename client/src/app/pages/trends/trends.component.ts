import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { SeoService } from '../../services/seo/seo.service';
import { GitHubService } from '../../services/api/github/github.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/firebase/auth/auth.service';
import { ProductsService } from '../../services/firebase/products/products.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  public collection = 'items';
  public trends: Array<Object>;
  public isLoading = true;

  constructor(
    private db: AngularFirestore,
    private spinner: NgxSpinnerService,
    private seoService: SeoService,
    private gitHubService: GitHubService,
    private productsService: ProductsService,
    private angularFireAuth: AngularFireAuth,
    private toastrService: ToastrService,
    public authService: AuthService
  ) {
    this.seoService.generateTags('View trending GitHub repositories!');
    this.spinner.show();
    this.productsService.getCollection(this.collection).subscribe(trends => {
      this.trends = trends;
      this.isLoading = false;
      this.spinner.hide();
    }, () => {
      this.isLoading = false;
      this.spinner.hide();
    });
  }

  ngOnInit(): void {}

  postTrendingGitHubRepos(): void {
    if (!this.authService.isUser()) { return; }

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
