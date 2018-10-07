import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from '../../../services/firebase/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
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

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.category = this.activatedRoute.snapshot.params['category'];
    this.spinner.show();
    this.productsService.getDetail(this.id).subscribe(product => {
      this.product = product;
      this.spinner.hide();
      this.isLoading = false;
    }, () => {
      this.spinner.hide();
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}

}
