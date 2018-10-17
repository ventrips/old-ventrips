import * as _ from 'lodash';
import puppeteer from 'puppeteer';

export class HackerNewsRoutes {

    public routes(app: any): void {

        app.route('/trending/hacker')
        .get((req: any, res: any) => {
            const url = 'https://news.ycombinator.com/news';
            this.getTrendingHackerNews(req, res, url);
        });
    }

    private getTrendingHackerNews(req: any, res: any, url: string): void {
        (async function main() {
            try {
                const responseBody: any[] = [];
                const browser = await puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                // tslint:disable-next-line:max-line-length
                page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                await page.goto(url);
                await page.waitForSelector('td.title');
                const sections = await page.$$('.athing');
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    const name = await section.$eval(
                        '.title a',
                        (item: any) => item.innerText.trim().replace(/\n/g, ' '),
                    );
                    const obj = {
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
