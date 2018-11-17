import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl, SafeScript } from '@angular/platform-browser';
import * as _ from 'lodash';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  public youTubeUrls: Array<SafeResourceUrl>;

  constructor(
    private seoService: SeoService,
    private domSanitizer: DomSanitizer
  ) {
    this.seoService.generateTags();
  }

  ngOnInit(): void {
    const youTubeVideos = [
      'Yd61DtkEXzM',
      'ceTBRll9GLo',
      'ZCDY0SmSIrI',
      'QTcfoTJEFOE'
    ];
    this.youTubeUrls = this.getYouTubeUrls(youTubeVideos);
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getYouTubeUrls(youTubeUrls: Array<string>): Array<SafeResourceUrl> {
    return _.map(youTubeUrls, (youTubeUrl) => this.sanitizeUrl(`${'https://www.youtube.com/embed/'}${youTubeUrl}`));
  }
}
