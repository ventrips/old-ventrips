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
            this.getTrendingGitHubRepos(db, requestUrl, req, res);
        });

        // app.route('/github/topics/:topic')
        // .get((req: any, res: any) => {
        //     const url = `https://github.com/topics/${req.params.topic}`;
        //     // this.getTrendingGitHubRepos(requestUrl, req, res);
        // });
    }

    private getTrendingGitHubRepos(db: any, requestUrl: string, req: any, res: any): void {
        (async function main() {
            try {
                const responseBody: any[] = [];
                const browser = await puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                // tslint:disable-next-line:max-line-length
                page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
                .catch();
                await page.goto(requestUrl);
                await page.waitForSelector('.repo-list li');
                const sections = await page.$$('.repo-list li');
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    const name = await section.$eval(
                        'h3 a',
                        (item: any) => item.innerText.trim().replace(/\n/g, ' '),
                    );
                    // const url = baseUrl + selection.attr('href');
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
                }
                console.log(responseBody);
                const collectionName = 'items';
                Utils.postBatchDocuments(db, responseBody, collectionName, req, res);
                // res.status(200).send(JSON.stringify(responseBody, null, 4));
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        })().catch();
    }

}
