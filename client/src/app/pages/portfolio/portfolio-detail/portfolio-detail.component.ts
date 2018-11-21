import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SeoService } from '../../../services/seo/seo.service';
import { ProductsService } from '../../../services/firebase/products/products.service';
import { environment } from './../../../../environments/environment';
import * as _ from 'lodash';
@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.scss']
})
export class PortfolioDetailComponent implements OnInit {
  public _ = _;
  public collection: string;
  public id: string;
  public work: Object;
  public environment = environment;
  public url: string;
  public isLoading = true;

  constructor(
    private productsService: ProductsService,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.spinner.show();

    const portfolioCollection = 'portfolio';
    this.productsService.getDocumentById(portfolioCollection, this.id).subscribe(data => {
      this.work = data;
      this.seoService.generateTags({
        title: this.work['title'],
        description: _.toString(this.work['description'])
      });
      this.spinner.hide();
      this.isLoading = false;
    }, () => {
      this.spinner.hide();
      this.isLoading = false;
    });

  }

}
