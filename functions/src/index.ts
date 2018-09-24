import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const postDocument = functions.https.onRequest((req, res) => {
  const requestBody = {
    title: 'Testing Cloud Functions',
    description: 'Hey',
    category: 'Awesome',
    date: 'Sept 24'    
  }
  db.collection('items').add(requestBody);
  // .then(docRef => {
  //   return res.send(`Added ${docRef.id}`);
  // })
  // .catch(res.send(console.error));
});

export const updateDocument = functions.https.onRequest((req, res) => {
  const requestBody = {
    title: 'Testing Update Cloud Functions!!!',
  }
  db.collection('items').doc('C5rhwJEbgcWsNBGIid94').update(requestBody);
  // .then(docRef => {
  //   return res.send(`Added ${docRef.id}`);
  // })
  // .catch(res.send(console.error));
});
