import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl, SafeScript } from '@angular/platform-browser';
import { environment } from './../../../environments/environment';
import * as _ from 'lodash';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  public _ = _;
  public selected = false;
  public environment = environment;
  public portfolioWorks = [
    {
      title: 'Data 360',
      description: 'Migrated and rebuilt entire existing AngularJS web application to the latest Angular for Data 360 Team',
      languages: ['html5', 'css3', 'js', 'angular', 'node', 'npm', 'git']
    },
    {
      title: 'AskGET',
      description: 'Built an internal software store using the latest Angular 6 & Bootstrap 4 for AskGET Portal',
      languages: ['html5', 'css3', 'js', 'angular', 'node', 'npm', 'git']
    },
    {
      title: 'AIC Ozone',
      description: 'Built and redesigned internal cloud web application for AIC Ozone',
      languages: ['html5', 'css3', 'js', 'angular', 'node', 'npm', 'git']
    },
    {
      title: 'Order Capture Express',
      description: 'Redesigned the interface and improved the usability of the Order Capture Express application',
      languages: ['html5', 'css3', 'js', 'angular', 'node', 'npm', 'git']
    },
    {
      title: 'TripTips',
      description: `Designed the front-end and built a fully responsive web
      application using the MEAN Stack`,
      languages: ['html5', 'css3', 'js', 'angular', 'node', 'npm', 'git']
    },
    {
      title: 'Business Solutions',
      description: 'Helped improve page load times and performance on www.att.com',
      languages: ['html5', 'css3', 'js']
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
