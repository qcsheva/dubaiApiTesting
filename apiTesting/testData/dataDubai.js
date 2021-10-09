//faker.js - generate massive amounts of fake data in the browser and node.js
//https://www.npmjs.com/package/faker
//https://rawgit.com/Marak/faker.js/master/examples/browser/index.html
let faker = require('faker')

const randomUseragent = require('random-useragent');

let d = new Date();
const date = d.getFullYear()  + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0"+d.getDate()).slice(-2) + " " +
("0"+d.getHours()).slice(-2) + ":" + ("0"+d.getMinutes()).slice(-2);

let TC1_1_title = "TC1_1: Verify with username";
let TC1_2_title = "TC1_2: Register account successfully";

let TC2_1_title = "TC2_1: Forgot/Reset Password - Verify email";
let TC2_2_title = "TC2_2: Forgot/Reset Password - Success with correct email";
let TC2_3_title = "TC2_3: Check login with invalid user";
let TC2_4_title = "TC2_4: Check login with valid user";

let TC3_1_title = "TC3_1: tintuc";
let TC3_2_title = "TC3_2: taisaochonchungtoi";
let TC3_3_title = "TC3_3: soikeonhacaihomnay";
let TC3_4_title = "TC3_4: dieukhoanvadieukien";
let TC3_5_title = "TC3_5: keochaua";
let TC3_6_title = "TC3_6: keochauau";
let TC3_7_title = "TC3_7: nhungcauhoithuonggap";
let TC3_8_title = "TC3_8: gioithieu";
let TC3_9_title = "TC3_9: chinhsachbaomat";
let TC3_10_title = "TC3_10: huongdannaptien";
let TC3_11_title = "TC3_11: huongdanruttien";
let TC3_12_title = "TC3_12: huongdancacuoc";
let TC3_13_title = "TC3_13: hotmatch";
let TC3_14_title = "TC3_14: whitelist";
let TC3_15_title = "TC3_15: download";
let TC3_16_title = "TC3_16: favorites";

let TC4_1_title = "TC4_1: psport";
let TC4_2_title = "TC4_2: csport";
let TC4_3_title = "TC4_3: ksport";
let TC4_4_title = "TC4_4: ssport";

let TC5_1_title = "TC5_1: live casino";
let TC5_2_title = "TC5_2: gamebai";
let TC5_3_title = "TC5_3: keno";
let TC5_4_title = "TC5_4: lode";
let TC5_5_title = "TC5_5: lodesieutoc";
let TC5_6_title = "TC5_6: quaysomunich";
let TC5_7_title = "TC5_7: quaysoberlin";
let TC5_8_title = "TC5_8: quaysoatom";
let TC5_9_title = "TC5_9: banca";
let TC5_10_title = "TC5_10: congame";
let TC5_11_title = "TC5_11: ingame";

let TC6_1_title = "TC6_1: allproviders";
let TC6_2_title = "TC6_2: microgaming";
let TC6_3_title = "TC6_3: pragmaticplay";
let TC6_4_title = "TC6_4: cq9";
let TC6_5_title = "TC6_5: evoplay";
let TC6_6_title = "TC6_6: playngo";
let TC6_7_title = "TC6_7: techplay";
let TC6_8_title = "TC6_8: qtech";
let TC6_9_title = "TC6_9: evo";
let TC6_10_title = "TC6_10: spribe";

let TC11_1_title = "TC11_1: ibanking - ACB";
let TC11_2_title = "TC11_2: ibanking - BIDV";
let TC11_3_title = "TC11_3: ibanking - Vietinbank";
let TC11_4_title = "TC11_4: ibanking - Vietcombank";
let TC11_5_title = "TC11_5: ibanking - DongA";
let TC11_6_title = "TC11_6: ibanking - Techcombank";
let TC11_7_title = "TC11_7: ibanking - Sacombank";
let TC11_8_title = "TC11_8: ibanking - VPbank";
let TC11_9_title = "TC11_9: ibanking - VietCapital";

let TC12_1_title = "TC12_1: Deposit ATM - ACB";
let TC12_2_title = "TC12_2: Deposit ATM - BIDV";
let TC12_3_title = "TC12_3: Deposit ATM - Vietinbank";
let TC12_4_title = "TC12_4: Deposit ATM - Vietcombank";
let TC12_5_title = "TC12_5: Deposit ATM - DongA";
let TC12_6_title = "TC12_6: Deposit ATM - Techcombank";
let TC12_7_title = "TC12_7: Deposit ATM - Sacombank";
let TC12_8_title = "TC12_8: Deposit ATM - VPbank";
let TC12_9_title = "TC12_9: Deposit ATM - VietCapital";

let TC13_1_title = "TC13_1: banking - ACB";
let TC13_2_title = "TC13_2: DIB - BIDV";
let TC13_3_title = "TC13_3: DIB - Vietinbank";
let TC13_4_title = "TC13_4: DIB - Vietcombank";
let TC13_5_title = "TC13_5: DIB - DongA";
let TC13_6_title = "TC13_6: DIB - Techcombank";
let TC13_7_title = "TC13_7: DIB - Sacombank";
let TC13_8_title = "TC13_8: DIB - VPbank";
let TC13_9_title = "TC13_9: DIB - VietCapital";

let TC14_1_title = "TC14_1: smartpay - BIDV";
let TC14_2_title = "TC14_2: smartpay - ACB";
let TC14_3_title = "TC14_3: smartpay - Techcombank";
let TC14_4_title = "TC14_4: smartpay - DongA";
let TC14_5_title = "TC14_5: smartpay - VCB";
let TC14_6_title = "TC14_6: smartpay - Sacombank";
let TC14_7_title = "TC14_7: smartpay - VietinBank";

let TC15_1_title = "TC15_1: card - VIETTEL";
let TC15_2_title = "TC15_2: card - MOBIFONE";
let TC15_3_title = "TC15_3: card - VINAPHONE";

let TC16_1_title = "TC16_1: momo";

let TC17_1_title = "TC17_1: Withdraw with DongA bank";
let TC17_2_title = "TC17_2: Withdraw with VCB";
let TC17_3_title = "TC17_3: Withdraw with ACB";
let TC17_4_title = "TC17_4: Withdraw with Vietinbank";
let TC17_5_title = "TC17_5: Withdraw with BIDV";
let TC17_6_title = "TC17_6: Withdraw with Sacombank";
let TC17_7_title = "TC17_7: Withdraw with Techcombank";
let TC17_8_title = "TC17_8: Withdraw with VPbank";
let TC17_9_title = "TC17_9: Withdraw with Techcombank";

let TC18_1_title = "TC18_1: VIETTEL";
let TC18_2_title = "TC18_2: MOBIFONE";
let TC18_3_title = "TC18_3: VINAPHONE";
let TC18_4_title = "TC18_4: VIETNAMOBILE";

let TC19_1_title = "TC19_1: Update User Infor";

let TC20_1_title = "TC20_1: indexaccount";
let TC20_2_title = "TC20_2: lichsucacuoc";
let TC20_3_title = "TC20_3: lichsupsport";
let TC20_4_title = "TC20_4: lichsugiaodich";
let TC20_5_title = "TC20_5: Get user waller";



module.exports = {
// baseUrl: "https://fabet.me",
baseUrl: "https://debet.top",
urloftelegramapi: "https://api.telegram.org",
chatid: 1857166911,
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
secfetchsite: "same-origin",

//bot of qms-notify-bot
telebot: "https://api.telegram.org/bot2077415979:AAH4-1uNrhe8Cgu5bhoA5tCR5EbmMmwUhLc/sendMessage?chat_id=-560784399&text=",
telebot1b: "https://api.telegram.org/bot2030179065:AAEmtAX1vaWuKKpySsc8W5INQFEp1halOiE/sendMessage?chat_id=-560784399&text=",

//bot of group apiTest1
telebot2: "https://api.telegram.org/bot2049901241:AAESImHHL06gTDCnEFvRsgHfQE6-tKC6LKI/sendMessage?chat_id=-1001592400530&text=",

//bot of group apiTest2
telebot3: "https://api.telegram.org/bot2077415979:AAH4-1uNrhe8Cgu5bhoA5tCR5EbmMmwUhLc/sendMessage?chat_id=-529361749&text=",

//bot token of dubai-notify-bot
bottoken1: "2077415979:AAH4-1uNrhe8Cgu5bhoA5tCR5EbmMmwUhLc",

//bot token of S4 - QMS Notify
bottoken2: "2030179065:AAEmtAX1vaWuKKpySsc8W5INQFEp1halOiE",

//bot token of dubaiApiTesting
bottoken: "2049901241:AAESImHHL06gTDCnEFvRsgHfQE6-tKC6LKI",

afterAll: "Finish running TC at: " +date+"%0aReply by text \"report\" to get the report!",

welcomeTest: "Start running TC at: " +date,

TC1_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC1_1_title+" %0a\
@dev pls check %0a\
==========",
TC1_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC1_2_title+" %0a\
@dev pls check %0a\
==========",

TC2_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC2_1_title+" %0a\
@dev pls check %0a\
==========",
TC2_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC2_2_title+" %0a\
@dev pls check %0a\
==========",
TC2_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC2_3_title+" %0a\
@dev pls check %0a\
==========",
TC2_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC2_4_title+" %0a\
@dev pls check %0a\
==========",

TC3_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_1_title+" %0a\
@dev pls check %0a\
==========",
TC3_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_2_title+" %0a\
@dev pls check %0a\
==========",
TC3_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_3_title+" %0a\
@dev pls check %0a\
==========",
TC3_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_4_title+" %0a\
@dev pls check %0a\
==========",
TC3_5:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_5_title+" %0a\
@dev pls check %0a\
==========",
TC3_6:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_6_title+" %0a\
@dev pls check %0a\
==========",
TC3_7:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_7_title+" %0a\
@dev pls check %0a\
==========",
TC3_8:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_8_title+" %0a\
@dev pls check %0a\
==========",
TC3_9:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_9_title+" %0a\
@dev pls check %0a\
==========",
TC3_10:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_10_title+" %0a\
@dev pls check %0a\
==========",
TC3_11:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_11_title+" %0a\
@dev pls check %0a\
==========",
TC3_12:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_12_title+" %0a\
@dev pls check %0a\
==========",
TC3_13:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_13_title+" %0a\
@dev pls check %0a\
==========",
TC3_14:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_14_title+" %0a\
@dev pls check %0a\
==========",
TC3_15:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_15_title+" %0a\
@dev pls check %0a\
==========",
TC3_16:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC3_16_title+" %0a\
@dev pls check %0a\
==========",

TC4_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC4_1_title+" %0a\
@dev pls check %0a\
==========",
TC4_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC4_2_title+" %0a\
@dev pls check %0a\
==========",
TC4_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC4_3_title+" %0a\
@dev pls check %0a\
==========",
TC4_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC4_4_title+" %0a\
@dev pls check %0a\
==========",

TC5_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_1_title+" %0a\
@dev pls check %0a\
==========",
TC5_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_2_title+" %0a\
@dev pls check %0a\
==========",
TC5_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_3_title+" %0a\
@dev pls check %0a\
==========",
TC5_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_4_title+" %0a\
@dev pls check %0a\
==========",
TC5_5:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_5_title+" %0a\
@dev pls check %0a\
==========",
TC5_6:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_6_title+" %0a\
@dev pls check %0a\
==========",
TC5_7:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_7_title+" %0a\
@dev pls check %0a\
==========",
TC5_8:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_8_title+" %0a\
@dev pls check %0a\
==========",
TC5_9:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_9_title+" %0a\
@dev pls check %0a\
==========",
TC5_10:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_10_title+" %0a\
@dev pls check %0a\
==========",
TC5_11:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC5_11_title+" %0a\
@dev pls check %0a\
==========",

TC6_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_1_title+" %0a\
@dev pls check %0a\
==========",
TC6_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_2_title+" %0a\
@dev pls check %0a\
==========",
TC6_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_3_title+" %0a\
@dev pls check %0a\
==========",
TC6_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_4_title+" %0a\
@dev pls check %0a\
==========",
TC6_5:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_5_title+" %0a\
@dev pls check %0a\
==========",
TC6_6:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_6_title+" %0a\
@dev pls check %0a\
==========",
TC6_7:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_7_title+" %0a\
@dev pls check %0a\
==========",
TC6_8:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_8_title+" %0a\
@dev pls check %0a\
==========",
TC6_9:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_9_title+" %0a\
@dev pls check %0a\
==========",
TC6_10:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC6_10_title+" %0a\
@dev pls check %0a\
==========",

TC11_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC11_1_title+" %0a\
@dev pls check %0a\
==========",
TC11_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC11_2_title+" %0a\
@dev pls check %0a\
==========",
TC11_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC11_3_title+" %0a\
@dev pls check %0a\
==========",
TC11_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC11_4_title+" %0a\
@dev pls check %0a\
==========",
TC11_5:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC11_5_title+" %0a\
@dev pls check %0a\
==========",
TC11_6:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC11_6_title+" %0a\
@dev pls check %0a\
==========",
TC11_7:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC11_7_title+" %0a\
@dev pls check %0a\
==========",
TC11_8:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC11_8_title+" %0a\
@dev pls check %0a\
==========",
TC11_9:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC11_9_title+" %0a\
@dev pls check %0a\
==========",

TC12_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC12_1_title+" %0a\
@dev pls check %0a\
==========",
TC12_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC12_2_title+" %0a\
@dev pls check %0a\
==========",
TC12_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC12_3_title+" %0a\
@dev pls check %0a\
==========",
TC12_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC12_4_title+" %0a\
@dev pls check %0a\
==========",
TC12_5:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC12_5_title+" %0a\
@dev pls check %0a\
==========",
TC12_6:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC12_6_title+" %0a\
@dev pls check %0a\
==========",
TC12_7:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC12_7_title+" %0a\
@dev pls check %0a\
==========",
TC12_8:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC12_8_title+" %0a\
@dev pls check %0a\
==========",
TC12_9:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC12_9_title+" %0a\
@dev pls check %0a\
==========",

TC13_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC13_1_title+" %0a\
@dev pls check %0a\
==========",
TC13_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC13_2_title+" %0a\
@dev pls check %0a\
==========",
TC13_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC13_3_title+" %0a\
@dev pls check %0a\
==========",
TC13_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC13_4_title+" %0a\
@dev pls check %0a\
==========",
TC13_5:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC13_5_title+" %0a\
@dev pls check %0a\
==========",
TC13_6:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC13_6_title+" %0a\
@dev pls check %0a\
==========",
TC13_7:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC13_7_title+" %0a\
@dev pls check %0a\
==========",
TC13_8:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC13_8_title+" %0a\
@dev pls check %0a\
==========",
TC13_9:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC13_9_title+" %0a\
@dev pls check %0a\
==========",

TC14_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC14_1_title+" %0a\
@dev pls check %0a\
==========",
TC14_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC14_2_title+" %0a\
@dev pls check %0a\
==========",
TC14_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC14_3_title+" %0a\
@dev pls check %0a\
==========",
TC14_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC14_4_title+" %0a\
@dev pls check %0a\
==========",
TC14_5:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC14_5_title+" %0a\
@dev pls check %0a\
==========",
TC14_6:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC14_6_title+" %0a\
@dev pls check %0a\
==========",
TC14_7:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC14_7_title+" %0a\
@dev pls check %0a\
==========",

TC15_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC15_1_title+" %0a\
@dev pls check %0a\
==========",
TC15_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC15_2_title+" %0a\
@dev pls check %0a\
==========",
TC15_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC15_3_title+" %0a\
@dev pls check %0a\
==========",

TC16_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC16_1_title+" %0a\
@dev pls check %0a\
==========",

TC17_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC17_1_title+" %0a\
@dev pls check %0a\
==========",
TC17_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC17_2_title+" %0a\
@dev pls check %0a\
==========",
TC17_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC17_3_title+" %0a\
@dev pls check %0a\
==========",
TC17_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC17_4_title+" %0a\
@dev pls check %0a\
==========",
TC17_5:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC17_5_title+" %0a\
@dev pls check %0a\
==========",
TC17_6:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC17_6_title+" %0a\
@dev pls check %0a\
==========",
TC17_7:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC17_7_title+" %0a\
@dev pls check %0a\
==========",
TC17_8:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC17_8_title+" %0a\
@dev pls check %0a\
==========",
TC17_9:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC17_9_title+" %0a\
@dev pls check %0a\
==========",

TC18_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC18_1_title+" %0a\
@dev pls check %0a\
==========",
TC18_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC18_2_title+" %0a\
@dev pls check %0a\
==========",
TC18_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC18_3_title+" %0a\
@dev pls check %0a\
==========",
TC18_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC18_4_title+" %0a\
@dev pls check %0a\
==========",

TC19_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC19_1_title+" %0a\
@dev pls check %0a\
==========",

TC20_1:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC20_1_title+" %0a\
@dev pls check %0a\
==========",
TC20_2:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC20_2_title+" %0a\
@dev pls check %0a\
==========",
TC20_3:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC20_3_title+" %0a\
@dev pls check %0a\
==========",
TC20_4:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC20_4_title+" %0a\
@dev pls check %0a\
==========",
TC20_5:
"==========%0a\
Brand: dubai %0a\
Date: " +date + "%0a\
Case fail: "+TC20_5_title+" %0a\
@dev pls check %0a\
==========",

}