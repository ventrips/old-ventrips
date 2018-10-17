import cheerio from 'cheerio';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import requestPromise from 'request-promise';
import * as utils from './../lib/utils';
export class InstagramRoutes {
    private baseUrl = `https://www.instagram.com/explore/tags`;

    public routes(app: any): void {
        app.route('/trending/instagram/:topic')
        .get((req: any, res: any) => {
            const url = `${this.baseUrl}/${req.params.topic}`;
            requestPromise(url)
            .then((html: any) => {
                let hashtags = this.scrapeHashtags(html);
                hashtags = this.removeDuplicates(hashtags);
                hashtags = hashtags.map((ele) => '#' + ele);
                console.log(hashtags);
                res.status(200).send(hashtags);
            })
            .catch((error: any) => {
                console.log(error);
                res.status(500).send(error);
            });
        });

    }

    private scrapeHashtags = (html: any) => {
        const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        const matches = [];
        let match;

        // tslint:disable-next-line:no-conditional-assignment
        while ((match = regex.exec(html))) {
            matches.push(match[1]);
        }

        return matches;
      }

    private removeDuplicates = (arr: any) => {
        const newArr: any = [];
        arr.map((ele: any) => {
            if (_.findIndex(newArr, ele) === -1) {
                newArr.push(ele);
            }
        });

        return newArr;
    }

}
