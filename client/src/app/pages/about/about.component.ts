import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private seoService: SeoService
  ) {
    this.seoService.generateTags();
  }

  ngOnInit() {
  }

}
