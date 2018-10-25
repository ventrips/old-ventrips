import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) {}

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
  }

  createDocument(collection: string, data: object): Promise<any> {
    return this.db
    .collection(collection)
    .add(JSON.parse(JSON.stringify(data)));
  }

  updateDocument(collection: string, id: string, data: object): Promise<any> {
    return this.db
    .collection(collection)
    .doc(id)
    .update(JSON.parse(JSON.stringify(data)));
  }

}
