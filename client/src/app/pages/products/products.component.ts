import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../services/firebase/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ NgbTypeaheadConfig ] // add NgbTypeaheadConfig to the component providers
})
export class ProductsComponent implements OnInit {
  public _ = _;
  public searchTerm: any;
  public products: Array<Object>;
  public searchOptions: Array<String>;

  public isLoading = true;

  constructor(
    private productsService: ProductsService,
    private config: NgbTypeaheadConfig,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.searchOptions = _.map(products, (product) => product.name);
      this.spinner.hide();
      this.isLoading = false;
    }, () => {
      this.spinner.hide();
      this.isLoading = false;
    });
    // customize default values of typeaheads used by this component tree
    this.config.showHint = true;
  }

  ngOnInit(): void {
  }

  filterSearch(data: Array<Object>): any[] {
    if (_.isEmpty(this.searchTerm)) { return data; }
    return _.filter(data, (item: Object) => _.includes(_.toLower(item['name']), _.toLower(this.searchTerm)));
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(0),
      distinctUntilChanged(),
      map(term => term.length < 5 ? []
        : this.searchOptions.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
    )
}
