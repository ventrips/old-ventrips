import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.products = this.getProducts();
  }

  ngOnInit(): void {
  }

  documentToDomainObject = obj => {
    const object = obj.payload.doc.data();
    object.id = obj.payload.doc.id;
    return object;
  }

  getProducts(): Observable<any[]> {
    return this.db.collection('/products').snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));
  }
}
