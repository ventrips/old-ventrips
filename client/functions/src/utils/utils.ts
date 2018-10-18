import * as _ from 'lodash';
import * as cors from 'cors';
const corsHandler = cors({origin: true});

export function postBatchDocuments(db: any, data: object[], collectionName: string, req, res) {
  const collectionRef = db.collection(collectionName);

  // Delete Existing Data
  collectionRef.get()
  .then(querySnapshot => {
    querySnapshot.forEach((doc) => {
      doc.ref.delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });

  const writeBatch = db.batch();
  // Add New Data
  _.forEach(data, item => {
    const documentRef = collectionRef.doc();
    writeBatch.create(documentRef, item);
  });
  writeBatch.commit().then(() => {
    console.log('Successfully executed batch.');
    corsHandler(req, res, () => {
      res.send(JSON.stringify(data, null, 4));
    });
  }).catch(error => {
    console.error('Failed to execute batch.')
    res.send(JSON.stringify(error, null, 4));
  });
}


export function updateDocument(db: any, req, res) {
  const requestBody = {
    title: 'Testing Update Cloud Functions!!!',
  }
  db.collection('items').doc('C5rhwJEbgcWsNBGIid94').update(requestBody);
  // .then(docRef => {
  //   return res.send(`Added ${docRef.id}`);
  // })
  // .catch(res.send(console.error));



  // ADD
  // const requestBody = {
  //   title: 'Testing Cloud Functions',
  //   description: 'Hey',
  //   category: 'Awesome',
  //   date: 'Sept 24'    
  // }
  // db.collection('items').add(requestBody);
  // .then(docRef => {
  //   return res.send(`Added ${docRef.id}`);
  // })
  // .catch(res.send(console.error));
  // .then(docRef => {
}
