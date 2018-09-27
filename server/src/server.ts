import * as bodyParser from 'body-parser';
import express from 'express';
import { InstagramRoutes } from './routes/instagram';

class App {

    public app: any;

    public instagramRoutes: InstagramRoutes = new InstagramRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.instagramRoutes.routes(this.app);

        this.app.get('/', (req: any, res: any) => res.send('Hello World!'));
        this.app.listen(3000, () => console.log('Example app listening on port 3000!'));
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;

// Open two terminals and run:
// npm run watch-ts
// npm run watch-node