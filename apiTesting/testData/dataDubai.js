//faker.js - generate massive amounts of fake data in the browser and node.js
//https://www.npmjs.com/package/faker
//https://rawgit.com/Marak/faker.js/master/examples/browser/index.html
let faker = require('faker')
const randomUseragent = require('random-useragent');

module.exports = {
    // baseUrl: "https://fabet.me",
    baseUrl: "https://debet.top",
    username: "auto" + faker.finance.account(), //faker.finance.account(): random account, ex 20321283
    password: faker.internet.password(), //faker.internet.password(): random password, ex d8Z4QxhItEf0CZE
    email: faker.internet.email(), //faker.internet.email(), ex Juliet57@yahoo.com
    phone: "0" + Math.floor(Math.random() * 1000000001), //random phone number
    rNum: Math.floor(Math.random() * 10),
    rNum2: (Math.random()).toString(36).substring(11),
    // Math.random() returns a random number between 0 (included) and 1 (excluded)
    // toString() method returns a string representing the specified Number object

    // contenttype: "application/json; charset=utf-8",
    contenttype: "application/json;charset=UTF-8",
    // agent: randomUseragent.getRandom(),
    // agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36"
    accept: "application/json, text/plain, */*",
    useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
    agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
    Connection: "keep-alive",
    // secchua: "Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"",
    secchuamobile: "?0",
    secchuaplatform: "Windows",
    DNT: "1",
    ContentLength: "214",
    Host: "debet.top",
    acceptencoding: "gzip, deflate, br",
    acceptlanguage: "en-US,en;q=0.9,vi;q=0.8",
    secfetchdest: "empty",
    secfetchmode: "cors",
    secfetchsite: "same-origin"

}
