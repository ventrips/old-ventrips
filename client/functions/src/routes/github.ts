import * as _ from 'lodash';
import * as puppeteer from 'puppeteer';
import * as Utils from './../utils/utils';
export class GitHubRoutes {

    public routes(app: any, db: any): void {

        app.route('/trending/github')
        .get((req: any, res: any) => {
            let requestUrl = 'https://github.com/trending';
            if (!_.isNil(req.params.topic)) {
                requestUrl += `/${req.params.topic}`;
            }
            this.getTrendingGitHubRepos(requestUrl).then(data => {
                res.send(JSON.stringify(data, null, 4));
            }).catch(error => {
                res.send(JSON.stringify(error, null, 4));
            });
        });

        app.route('/trending/github')
        .post((req: any, res: any) => {
            let requestUrl = 'https://github.com/trending';
            if (!_.isNil(req.params.topic)) {
                requestUrl += `/${req.params.topic}`;
            }
            this.getTrendingGitHubRepos(requestUrl).then(data => {
                const collectionName = 'items';
                Utils.postBatchDocuments(db, data, collectionName, req, res);
            });
        });

    }

    async getTrendingGitHubRepos(requestUrl): Promise<Array<String>> {
        const responseBody: any[] = [];
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
        const page = await browser.newPage();

        page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        ).catch();

        await page.goto(requestUrl);
        await page.waitForSelector('.repo-list li');
        const sections = await page.$$('.repo-list li');
        for (const section of sections) {
            const name = await section.$eval(
                'h3 a',
                (item: any) => item.innerText.trim().replace(/\n/g, ' '),
            );
            const description = await section.$eval(
                '.py-1',
                (item: any) => item.innerText.trim().replace(/\n/g, ' '),
            );
            const url = await section.$eval(
                'h3 a',
                (item: any) => `https://github.com${item.getAttribute('href')}`,
            );
            const obj = {
                description,
                name,
                url
            };
            responseBody.push(obj);
        };
        await browser.close();

        return responseBody;
    }
}
