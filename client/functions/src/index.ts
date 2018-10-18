// SSR
import * as puppeteer from 'puppeteer';
import { Renderer } from './seo/renderer';
import * as fetch from 'node-fetch';

// FIREBASE
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ContactsRoutes } from './routes/contacts';
import { GitHubRoutes } from './routes/github';
import { HackerNewsRoutes } from './routes/hacker';
import { InstagramRoutes } from './routes/instagram';
import { YouTubeRoutes } from './routes/youtube';

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

// FIREBASE
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);
const app = express();
const main = express();
// Add headers
// main.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:13214');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', 'true');

//     // Pass to next layer of middleware
//     next();
// });
main.use('/api', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.runWith({ memory: '1GB' }).https.onRequest(main);

const contactsRoutes: ContactsRoutes = new ContactsRoutes();
contactsRoutes.routes(app, db);

const gitHubRoutes: GitHubRoutes = new GitHubRoutes();
gitHubRoutes.routes(app, db);
const hackerNewsRoutes: HackerNewsRoutes = new HackerNewsRoutes();
hackerNewsRoutes.routes(app);
const instagramRoutes: InstagramRoutes = new InstagramRoutes();
instagramRoutes.routes(app);
const youTubeRoutes: YouTubeRoutes = new YouTubeRoutes();
youTubeRoutes.routes(app);
