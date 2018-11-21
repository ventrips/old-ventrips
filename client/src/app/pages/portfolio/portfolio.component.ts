import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl, SafeScript } from '@angular/platform-browser';
import { environment } from './../../../environments/environment';
import { ProductsService } from '../../services/firebase/products/products.service';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  public _ = _;
  public selected = false;
  public environment = environment;
  public portfolio: Array<Object>;
  public youTubeChannelUrl = 'https://www.youtube.com/channel/UCtif_sUZk9_F7CUzP3rPf2w';
  public videography: Array<SafeResourceUrl>;
  public isLoading = true;

  constructor(
    private seoService: SeoService,
    private domSanitizer: DomSanitizer,
    private productsService: ProductsService,
    private spinner: NgxSpinnerService
  ) {
    this.seoService.generateTags(
      {
        title: `Johnson Huynh | Full-Stack Developer & UX/UI Designer`,
        description: `Hey! 👋 My name is Johnson Huynh. I am a Full-Stack Developer & UX/UI Designer
        with a demonstrated history of working on web applications`
      }
    );
  }

  ngOnInit(): void {
    this.spinner.show();

    const portfolioCollection = 'portfolio';
    this.productsService.getCollection(portfolioCollection).subscribe(portfolioData => {
      this.portfolio = portfolioData;
      this.spinner.hide();
      this.isLoading = false;
    }, () => {
      this.spinner.hide();
      this.isLoading = false;
    });

    const videographyCollection = 'videography';
    this.productsService.getCollection(videographyCollection).subscribe(videographyData => {
      this.videography = this.getYouTubeUrls(videographyData);
    }, () => {});

  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getYouTubeUrls(youTubeUrls: Array<string>): Array<SafeResourceUrl> {
    return _.map(youTubeUrls, (youTubeUrl) => this.sanitizeUrl(youTubeUrl['url']));
  }
}
