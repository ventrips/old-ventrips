import * as _ from 'lodash';
import * as puppeteer from 'puppeteer';
export class YouTubeRoutes {
    public routes(app: any): void {

        app.route('/trending/youtube')
        .get(async (req: any, res: any) => {
            this.getTrendingYouTubeVideos(req, res);
        });

    }

    private getTrendingYouTubeVideos(req: any, res: any): void {
        (async function main() {
            try {
                const responseBody = [];
                const browser = await puppeteer.launch({ headless: false });
                const page = await browser.newPage();
                // tslint:disable-next-line:max-line-length
                page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                await page.goto('https://www.youtube.com/feed/trending');
                await page.waitForSelector('.ytd-video-renderer');
                const sections = await page.$$('div#dismissable.ytd-video-renderer');
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    const title = await section.$eval(
                        'a#video-title',
                        (item: any) => item.innerText.trim().replace(/\n/g, ' '),
                    );
                    console.log(title);
                    await section.$eval('a#video-title', (item: any) => item.click());
                    await page.waitForSelector('.ytd-compact-video-renderer');
                    const description = await page.$eval(
                        '#description .ytd-video-secondary-info-renderer',
                        (item: any) => item.innerText.trim().replace(/\n/g, ' '),
                    );
                    console.log(description);

                    const obj = {
                        description,
                        title,
                    };
                    responseBody.push(obj);
                }
                res.status(200).send(JSON.stringify(responseBody, null, 4));
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        })();
    }
}
