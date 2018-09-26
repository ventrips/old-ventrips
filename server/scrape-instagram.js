const _ = require('lodash');
const rp = require('request-promise');
const cheerio = require('cheerio');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What key word do you want to scrape? ', (answer) => {
  if (_.isEmpty(answer)) {
    console.log('Not a valid answer');
    rl.close();
    return;
  }

  let keyWord = answer;
  let URL = `https://www.instagram.com/explore/tags/${keyWord}/`
  
  rp(URL)
  .then((html) => {
      let hashtags = scrapeHashtags(html);
      hashtags = removeDuplicates(hashtags);
      hashtags = hashtags.map(ele => "#" + ele)
      console.log(hashtags);
  })
  .catch((err) => {
      console.log(err);
  });

  rl.close();
});

const scrapeHashtags = (html) => {  
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(html))) {
        matches.push(match[1]);
    }

    return matches;
}

const removeDuplicates = (arr) => {
    let newArr = [];

    arr.map(ele => {
        if (newArr.indexOf(ele) == -1){
            newArr.push(ele)
        }
    })
    
    return newArr;
}