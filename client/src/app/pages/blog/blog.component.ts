import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private seoService: SeoService
  ) {
    this.seoService.generateTags();
  }

  ngOnInit(): void {
  }

}
