"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const contacts_1 = require("./routes/contacts");
const github_1 = require("./routes/github");
const hacker_1 = require("./routes/hacker");
const instagram_1 = require("./routes/instagram");
const youtube_1 = require("./routes/youtube");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
main.use('/api', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
// webApi is your functions name, and you will pass main as 
// a parameter
exports.webApi = functions.https.onRequest(main);
const contactsRoutes = new contacts_1.ContactsRoutes();
contactsRoutes.routes(app, db);
const gitHubRoutes = new github_1.GitHubRoutes();
gitHubRoutes.routes(app);
const hackerNewsRoutes = new hacker_1.HackerNewsRoutes();
hackerNewsRoutes.routes(app);
const instagramRoutes = new instagram_1.InstagramRoutes();
instagramRoutes.routes(app);
const youTubeRoutes = new youtube_1.YouTubeRoutes();
youTubeRoutes.routes(app);
//# sourceMappingURL=index.js.map