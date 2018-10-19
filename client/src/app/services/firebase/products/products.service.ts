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

  getCollection(collection: string): Observable<any[]> {
    return this.db.collection(`/${collection}`).snapshotChanges()
    .pipe(map(actions => actions.map((obj: any) => {
        const object = obj.payload.doc.data();
        object.id = obj.payload.doc.id;
        return object;
    })));
  }

  getDocumentById(collection: string, id: string): any {
    const itemDoc = this.db.doc(`${collection}/${id}`);
    return itemDoc.valueChanges();
    // .pipe(
    //   tap(product => {
    //     this.seoService.addTwitterCard({
    //       title: product['name'],
    //       description: _.toString(product['features']),
    //       image: product['images'][0]
    //     });
    //   })
    // );
  }

}
