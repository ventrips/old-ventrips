import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  public environment = environment;

  constructor(
    private seoService: SeoService
  ) {
    this.seoService.generateTags();
  }

  ngOnInit(): void {
  }

}
