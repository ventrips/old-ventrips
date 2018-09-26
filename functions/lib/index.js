"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
const async = require('async');
const Q = require('q');
const cheerio = require('cheerio');
const functions = require("firebase-functions");
const _ = require("lodash");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
const getTrendingGitHubRepos = function () {
    const deferred = Q.defer();
    const baseUrl = 'https://github.com';
    const url = baseUrl + '/trending';
    request(url, function (error, response, body) {
        if (!error && _.isEqual(response.statusCode, 200)) {
            const $ = cheerio.load(body);
            const trendingGitHubRepos = [];
            $(".repo-list li").each(function () {
                // tslint:disable-next-line:no-invalid-this
                const selection = $(this).find('h3 a');
                const name = selection.text().trim();
                const selectionUrl = baseUrl + selection.attr('href');
                // tslint:disable-next-line:no-invalid-this
                const description = $(this).find('.py-1').text().trim();
                trendingGitHubRepos.push({ name, selectionUrl, description });
            });
            deferred.resolve(trendingGitHubRepos);
        }
    });
    return deferred.promise;
};
exports.postDocument = functions.https.onRequest((req, res) => {
    getTrendingGitHubRepos().then(function (data) {
        res.send(data);
        _.forEach(data, item => {
            db.collection('items').add(item);
        });
    });
    const requestBody = {
        title: 'Testing Cloud Functions',
        description: 'Hey',
        category: 'Awesome',
        date: 'Sept 24'
    };
    // db.collection('items').add(requestBody);
    // .then(docRef => {
    //   return res.send(`Added ${docRef.id}`);
    // })
    // .catch(res.send(console.error));
    // .then(docRef => {
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