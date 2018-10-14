import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from '../../../services/firebase/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { Renderer } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public _ = _;
  public id: string;
  public category: string;
  public product: Object;

  public isLoading = true;

  public scrollPosition = 0;
  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    this.scrollPosition = window.pageYOffset;
  }

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private render: Renderer,
    private cdr: ChangeDetectorRef,
    private seoService: SeoService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.category = this.activatedRoute.snapshot.params['category'];
    this.spinner.show();
    this.productsService.getDetail(this.id).subscribe(product => {
      this.product = product;
      this.seoService.generateTags({
        title: this.product['name'],
        description: _.toString(this.product['features']),
        image: this.product['images'][0]
      });
      this.spinner.hide();
      this.isLoading = false;
    }, () => {
      this.spinner.hide();
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}

  getImagePosition(itemRef) {
    const offsetTop = 50;
    return this.scrollPosition + offsetTop >= itemRef.offsetTop &&
    this.scrollPosition + offsetTop <= (itemRef.offsetTop + itemRef.scrollHeight) ||
    (this.scrollPosition + window.innerHeight) === document.body.scrollHeight;
  }
}
