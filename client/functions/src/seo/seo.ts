// SSR
import * as puppeteer from 'puppeteer';
import { Renderer } from './renderer';
import * as fetch from 'node-fetch';
import * as functions from 'firebase-functions';

// SSR
const appURL = 'https://ventrips-214422.firebaseapp.com/';
const renderURL = 'https://us-central1-ventrips-214422.cloudfunctions.net/render';

export const render = functions
.runWith({ memory: '1GB' })
.https.onRequest(async (request, response) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process'
        ]
    });

    const requestURL = request.query.requestURL;

    const renderer = new Renderer(browser);

    const { status, content } = await renderer.serialize(requestURL, false);

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
