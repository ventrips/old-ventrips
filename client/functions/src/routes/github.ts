import * as _ from 'lodash';
import * as puppeteer from 'puppeteer';

export class GitHubRoutes {

    public routes(app: any): void {

        app.route('/trending/github')
        .get((req: any, res: any) => {
            let url = 'https://github.com/trending';
            if (!_.isNil(req.params.topic)) {
                url += `/${req.params.topic}`;
            }
            this.getTrendingGitHubRepos(req, res, url);
        });

        // app.route('/github/topics/:topic')
        // .get((req: any, res: any) => {
        //     const url = `https://github.com/topics/${req.params.topic}`;
        //     // this.getTrendingGitHubRepos(req, res, url);
        // });
    }

    private getTrendingGitHubRepos(req: any, res: any, url: string): void {
        (async function main() {
            try {
                const responseBody: any[] = [];
                const browser = await puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                // tslint:disable-next-line:max-line-length
                page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                await page.goto(url);
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
                    const obj = {
                        description,
                        name,
                    };
                    responseBody.push(obj);
                }
                console.log(responseBody);
                res.status(200).send(JSON.stringify(responseBody, null, 4));
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        })();
    }

}
