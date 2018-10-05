import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public _ = _;
  public id: string;
  public detail: Object;

  constructor(
    private db: AngularFirestore,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.detail = this.getDetail(this.id);
  }

  ngOnInit(): void {
  }

  getDetail(id: string): any {
    const itemDoc = this.db.doc(`products/${id}`);
    return itemDoc.valueChanges();
  }

}
