import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(
    private seoService: SeoService
  ) {
    this.seoService.generateTags();
  }

  ngOnInit() {
  }

}
