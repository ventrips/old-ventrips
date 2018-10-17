import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ContactsRoutes } from './routes/contacts';
import { GitHubRoutes } from './routes/github';
import { HackerNewsRoutes } from './routes/hacker';
import { InstagramRoutes } from './routes/instagram';
import { YouTubeRoutes } from './routes/youtube';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
main.use('/api', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.https.onRequest(main);

const contactsRoutes: ContactsRoutes = new ContactsRoutes();
contactsRoutes.routes(app, db);

const gitHubRoutes: GitHubRoutes = new GitHubRoutes();
gitHubRoutes.routes(app);
const hackerNewsRoutes: HackerNewsRoutes = new HackerNewsRoutes();
hackerNewsRoutes.routes(app);
const instagramRoutes: InstagramRoutes = new InstagramRoutes();
instagramRoutes.routes(app);
const youTubeRoutes: YouTubeRoutes = new YouTubeRoutes();
youTubeRoutes.routes(app);
