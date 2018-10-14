const async = require('async');
const Request = require('request');
const Q = require('q');
const cheerio = require('cheerio');
import * as _ from 'lodash';

import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';
import { serialize } from './renderer';
import * as fetch from 'node-fetch';

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const appURL = 'https://ventrips-214422.firebaseapp.com/';
const renderURL = 'https://us-central1-ventrips-214422.cloudfunctions.net/render';


  export const render = functions
  .runWith({ memory: '1GB' })
  .https.onRequest(async (request, response) => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const requestURL = request.query.requestURL;

    const page = await browser.newPage();
    const { status, content } = await serialize(page, requestURL, false);

    response.status(status).send(content);
  });

export const ssr = functions.https.onRequest(async (request, response) => {
  const bots = [
    'googlebot',
    'twitterbot',
    'facebookexternalhit',
    'linkedinbot',
    'pinterest',
    'slackbot'
  ];

  const userAgent = request.headers['user-agent'] as string;

  const isBot = bots.filter(bot => userAgent.toLowerCase().includes(bot))
    .length;

  const requestURL = appURL + request.url;

  if (isBot) {
    const html = await fetch(`${renderURL}?requestURL=${requestURL}`);
    const body = await html.text();
    response.send(body.toString());
  } else {
    const html = await fetch(appURL);
    const body = await html.text();

    response.send(body.toString());
  }
});

//   const getTrendingGitHubRepos = function() {
//   const deferred = Q.defer();
//   const baseUrl = 'https://github.com';
//   const url = baseUrl + '/trending';
//   Request(url, function (error, response, body) {
//     if (!error && _.isEqual(response.statusCode, 200)) {
//       const $ = cheerio.load(body);
//       const trendingGitHubRepos = [];
//       $(".repo-list li").each(function() {
//         // tslint:disable-next-line:no-invalid-this
//         const selection = $(this).find('h3 a');
//         const name = selection.text().trim();
//         const selectionUrl = baseUrl + selection.attr('href');
//         // tslint:disable-next-line:no-invalid-this
//         const description = $(this).find('.py-1').text().trim();
//         trendingGitHubRepos.push({name, selectionUrl, description})
//       });
//       deferred.resolve(trendingGitHubRepos);
//     }
//   });
//   return deferred.promise;
// }

// function postDocuments(data, collectionName) {
//   const writeBatch = db.batch();
//   _.forEach(data, item => {
//     const documentRef = db.collection(collectionName).doc();
//     writeBatch.create(documentRef, item);
//   });
//   writeBatch.commit().then(() => {
//     console.log('Successfully executed batch.');
//   }).catch(error => {
//     console.error('Failed to execute batch.')
//     console.log(error);
//   });
// }

// export const postTrendingGitHubRepos = functions.https.onRequest((req, res) => {
//   getTrendingGitHubRepos().then(function(data) {
//     postDocuments(data, 'items');
//   }).catch(error => {
//     console.error('Failed to get trending GitHub Repos');
//     console.error(error);
//   });

//   const requestBody = {
//     title: 'Testing Cloud Functions',
//     description: 'Hey',
//     category: 'Awesome',
//     date: 'Sept 24'    
//   }
//   // db.collection('items').add(requestBody);
//   // .then(docRef => {
//   //   return res.send(`Added ${docRef.id}`);
//   // })
//   // .catch(res.send(console.error));
//   // .then(docRef => {

// });

// export const updateDocument = functions.https.onRequest((req, res) => {
//   const requestBody = {
//     title: 'Testing Update Cloud Functions!!!',
//   }
//   db.collection('items').doc('C5rhwJEbgcWsNBGIid94').update(requestBody);
//   // .then(docRef => {
//   //   return res.send(`Added ${docRef.id}`);
//   // })
//   // .catch(res.send(console.error));
// });
