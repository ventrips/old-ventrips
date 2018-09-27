import { Firestore } from '@google-cloud/firestore';
import * as _ from 'lodash';

export const firestore = new Firestore({
    keyFilename: './../../../../ventrips-214422-firebase-adminsdk-w9d9x-fa4567e61b.json',
    projectId: 'ventrips-214422',
});

export function postBatchDocuments(data: object[], collectionName: string) {
    const writeBatch = firestore.batch();
    _.forEach(data, (item: any) => {
      const documentRef = firestore.collection(collectionName).doc();
      writeBatch.create(documentRef, item);
    });
    writeBatch.commit().then(() => {
      console.log('Successfully executed batch.');
    }).catch((error) => {
      console.error('Failed to execute batch.');
      console.log(error);
    });
}
