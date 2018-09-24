"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
exports.postDocument = functions.https.onRequest((req, res) => {
    const requestBody = {
        title: 'Testing Cloud Functions',
        description: 'Hey',
        category: 'Awesome',
        date: 'Sept 24'
    };
    db.collection('items').add(requestBody);
    // .then(docRef => {
    //   return res.send(`Added ${docRef.id}`);
    // })
    // .catch(res.send(console.error));
});
exports.updateDocument = functions.https.onRequest((req, res) => {
    const requestBody = {
        title: 'Testing Update Cloud Functions!!!',
    };
    db.collection('items').doc('C5rhwJEbgcWsNBGIid94').update(requestBody);
    // .then(docRef => {
    //   return res.send(`Added ${docRef.id}`);
    // })
    // .catch(res.send(console.error));
});
//# sourceMappingURL=index.js.map