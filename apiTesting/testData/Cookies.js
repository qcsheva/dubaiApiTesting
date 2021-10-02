const request = require('supertest')
const { assert } = require("chai");
const apilist = require("../apiList/apiDubai.js");
const data = require("./dataDubai.js");

let Cookies;

// describe('Cookie: Login', () => {
// test("Cookie: Get Cookies", async () => {
    function cookieFunc() {
    let user4 = { username: "ricky03", password: "123456" };
    const res4 = await request(data.baseUrl)
        .post(apilist.login)
        // .set("content-type", data.contenttype)
        // .set("Accept", data.accept)
        .set("User-Agent", data.useragent)
        .send(user4)
        .timeout(100000);

    console.log("res4: " + res4);

    Cookies = res4.headers["set-cookie"].pop().split(";")[0];

    console.log("Cookies in Cookies.js: " + Cookies);
    }
    // return Cookies;
    // };
    // cookieFunc();
// })
// })
// module.exports = cookieFunc

// export const onLogin() => {
//     return Cookies;
//   };