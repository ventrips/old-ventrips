import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../services/firebase/auth/auth.service';
import { ProductsService } from '../../../services/firebase/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Renderer } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { environment } from './../../../../environments/environment';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public _ = _;
  public collection = 'products';
  public id: string;
  public category: string;
  public product: Object;
  public environment = environment;
  public url: string;
  public isLoading = true;

  public scrollPosition = 0;
  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    this.scrollPosition = window.pageYOffset;
  }

  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private render: Renderer,
    private cdr: ChangeDetectorRef,
    private seoService: SeoService,
    private router: Router
  ) {
    this.url = this.router.url;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.category = this.activatedRoute.snapshot.params['category'];
    this.spinner.show();
    this.productsService.getDocumentById(this.collection, this.id).subscribe(product => {
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
