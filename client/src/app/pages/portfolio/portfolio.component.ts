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
  public selected = false;
  public resumeUrl = './assets/pdf/Johnson-Huynh-Resume.pdf';
  public portfolioWorks = [
    {
      title: 'Data360'
    },
    {
      title: 'AskGet'
    },
    {
      title: 'AIC Ozone'
    },
    {
      title: 'Order Capture Express'
    },
    {
      title: 'Business Solutions'
    },
    {
      title: 'TripTips'
    }
  ];
  public youTubeChannelUrl = 'https://www.youtube.com/channel/UCtif_sUZk9_F7CUzP3rPf2w';
  public youTubeUrls: Array<SafeResourceUrl>;

  constructor(
    private seoService: SeoService,
    private domSanitizer: DomSanitizer
  ) {
    this.seoService.generateTags();
    const youTubeVideos = [
      'Yd61DtkEXzM',
      'ceTBRll9GLo',
      'ZCDY0SmSIrI',
      'QTcfoTJEFOE'
    ];
    this.youTubeUrls = this.getYouTubeUrls(youTubeVideos);
  }

  ngOnInit(): void {
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getYouTubeUrls(youTubeUrls: Array<string>): Array<SafeResourceUrl> {
    return _.map(youTubeUrls, (youTubeUrl) => this.sanitizeUrl(`${'https://www.youtube.com/embed/'}${youTubeUrl}`));
  }
}
