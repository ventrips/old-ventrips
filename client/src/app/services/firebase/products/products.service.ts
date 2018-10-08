import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map, tap } from 'rxjs/operators';
import { SeoService } from '../../seo/seo.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private db: AngularFirestore,
    private seoService: SeoService
  ) { }

  getProducts(): Observable<any[]> {
    return this.db.collection('/products').snapshotChanges()
    .pipe(map(actions => actions.map((obj: any) => {
        const object = obj.payload.doc.data();
        object.id = obj.payload.doc.id;
        return object;
    })));
  }

  getDetail(id: string): any {
    const itemDoc = this.db.doc(`products/${id}`);
    return itemDoc.valueChanges()
    .pipe(
      tap(product => {
        this.seoService.generateTags({
          title: product['name'],
          description: _.toString(product['features']),
          image: product['images'][0]
        });
      })
    );
  }

}
