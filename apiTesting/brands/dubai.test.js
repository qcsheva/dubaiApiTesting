const request = require('supertest')
const { assert } = require("chai");
const apilist = require("../apiList/apiDubai.js");
const data = require("../testData/dataDubai.js");
const https = require('https');
const { Telegraf } = require('telegraf');
var fs = require('fs');
let Cookies, Cookies1, Cookies2, Cookies3, Cookies4, Cookies5;

/*
beforeAll( async() => {
    // welcome Text by Telebot
    // https.get(data.telebot + data.welcomeTest);

    //login with account 1 - ricky03
    try {
        let userBeforeEach = { username: "ricky03", password: "123456" };
        const resBeforeEach = await request(data.baseUrl)
            .post(apilist.login)
            .set("User-Agent", data.useragent)
            .set("content-type", data.contenttype)
            .send(userBeforeEach);
        console.log("beforeAll - login success with ricky03");
        Cookies = resBeforeEach.headers["set-cookie"].pop().split(";")[0];
    } catch (e) {
        console.log("beforeAll 1 error: " + e);
        console.log("beforeAll - cannot login with ricky03");
    }

    //login with account 2 - ricky04
    try {
        let userBeforeEach2 = { username: "ricky04", password: "123456" };
        const resBeforeEach2 = await request(data.baseUrl)
            .post(apilist.login)
            .set("User-Agent", data.useragent)
            .set("content-type", data.contenttype)
            .send(userBeforeEach2);
        console.log("beforeAll - login success with ricky04");
        Cookies2 = resBeforeEach2.headers["set-cookie"].pop().split(";")[0];
    } catch (e) {
        console.log("beforeAll 2 error: " + e);
        console.log("beforeAll - cannot login with ricky04");
    }

    //login with account 3 - ricky05
    try {
        let userBeforeEach3 = { username: "ricky05", password: "123456" };
        const resBeforeEach3 = await request(data.baseUrl)
            .post(apilist.login)
            .set("User-Agent", data.useragent)
            .set("content-type", data.contenttype)
            .send(userBeforeEach3);
        console.log("beforeAll - login success with ricky05");
        Cookies3 = resBeforeEach3.headers["set-cookie"].pop().split(";")[0];
    } catch (e) {
        console.log("beforeAll 3 error: " + e);
        console.log("beforeAll - cannot login with ricky05");
    }

    //login with account 4 - ricky06
    try {
        let userBeforeEach4 = { username: "ricky06", password: "123456" };
        const resBeforeEach4 = await request(data.baseUrl)
            .post(apilist.login)
            .set("User-Agent", data.useragent)
            .set("content-type", data.contenttype)
            .send(userBeforeEach4);
        console.log("beforeAll - login success with ricky06");
        Cookies4 = resBeforeEach4.headers["set-cookie"].pop().split(";")[0];
    } catch (e) {
        console.log("beforeAll 4 error: " + e);
        console.log("beforeAll - cannot login with ricky06");
    }

});

*/
/* ---- PART 1:no NEED login Suites ---- */
describe('Suite 1: Register', () => {
    test.only('TC1.1: Verify with username', async () => {
        try {
        let reg = { username: "rickykaka05" }
            const res = await request(data.baseUrl)
                .post(apilist.verifyUsername)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send(reg)
            console.log("TC1.1 res.body.exist " + res.body.exist);
            if (res.body.exist === true) {
                console.log("TC1.1.1: Tên đăng nhập đã tồn tại. Hãy chọn tên đăng nhập khác");
            }
            else if (res.body.exist === false) {
                console.log("TC1.1.2: Tên đăng nhập hợp lệ. Hãy tiếp tục tạo tài khoản với email này");
            }
            else {
                console.log("TC1.1.3: Unknown Status. Hãy check lại code");
            }
            }
        catch (e) {
                console.log("TC1.1 error: " + e);
                // https.get(data.telebot + data.TC1_1);
        }
    })     //end of TC1.1

    test("TC1.2: Register account successfully", async () => {
            let reg1 = { username: data.username, password: data.password, confirmPassword: data.password, phone: data.phone }
            try {
                const res = await request(data.baseUrl)
                    .post(apilist.register)
                    .set("User-Agent", data.useragent)
                    .set("content-type", data.contenttype)
                    .send(reg1);
                console.log("TC1.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
                if (res.body.code === 200) {
                    console.log("TC1.2.1 code: " + res.body.code + "  -  " + "message: " + res.body.message);
                    assert.equal(res.body.message, "Register successful");
                }
                else if (res.body.code === 400) {
                    assert.equal(res.body.message, "Có lỗi khi đăng ký.Vui lòng thử lại");
                    assert.equal(res.body.message, "Thao tác không hợp lệ");
                    console.log("TC1.2.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
                }
                else if (res.body.code === 500) {
                    console.log("TC1.2.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
                    assert.equal(res.body.message, "Phát hiện hành vi không cho phép. Liên hệ CSKH để được hỗ trợ");
                }
                else {
                    console.log("TC2 Code other: " + res.body.code + "  -  " + "message: " + res.body.message);
                }
            }
            catch (e) {
                console.log("TC1.2 error: " + e);
                https.get(data.telebot + data.TC1_2);
            }
    })      //end of TC1.2
});         //end of Suite 1

describe('Suite 2: Login and create Cookies Sessions', () => {
    test("TC2.1: Forgot/Reset Password - Verify email", async () => {
        let user = { email: "ricky03@mailnesia.com" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.verifyEmail)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send(user);
            console.log("TC2.1: res.body.exist: " + res.body.exist + " - res.req.method - " + res.req.method);
            if (res.body.exist === true) {
                console.log("TC2.1.1 Email đã tồn tại. Hãy chọn Email khác");
            }
            else if (res.body.exist === false) {
                console.log("TC2.1.2 Email hợp lệ. Hãy tiếp tục tạo tài khoản");
            }
            else {
                console.log("TC2.1.3 Unknown Status. Hãy check lại code");
            }
        }
        catch (e) {
            console.log("TC2.1 error: " + e);
            https.get(data.telebot + data.TC2_1);
        }
    })      //end of TC2.1
    test("TC2.2: Forgot/Reset Password - Success with correct email", async () => {
        let user = { email: "hanuteam00@gmail.com" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.forgotPassword)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send(user)
            console.log("TC2.2 res.body.code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.message, "Email đã được gửi, vui lòng kiểm tra hộp thư để cập nhật thông tin.");
                console.log("TC2.2.1 res.body.status: " + res.body.status + " - res.body.message: " + res.body.message);
            }
            else {
                console.log("TC2.2.2 Unknown Status. Hãy check lại code");
            }
        }
        catch (e) {
            console.log("TC2.2 error: " + e);
            https.get(data.telebot + data.TC2_2);
        }
    })      //end of TC2.2
    test("TC2.3: Check login with invalid user", async () => {
        let user3 = { username: "rickyy01", password: "123456" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.login)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send(user3);
            console.log("TC2.3 res.body.code: " + res.body.code);
            if (res.body.code === 404) {
                assert.equal(res.body.code, 404);
                assert.equal(res.body.message, "Không tìm thấy người dùng");
                console.log("TC2.2.1 res.body.status: " + res.body.status + " - res.body.message: " + res.body.message);
            }
            else {
                console.log("TC2.3.2 Unknown Status. Hãy check lại code");
            }
        }
        catch (e) {
            console.log("TC2.3 error: " + e);
            https.get(data.telebot + data.TC2_3);
        }
    }),     //end of TC2.3
    test("TC2.4: Check login with valid user", async () => {
            let user = { username: "rickykaka07", password: "123456" };
            try {
                const res = await request(data.baseUrl)
                    .post(apilist.login)
                    .set("User-Agent", data.useragent)
                    .set("content-type", data.contenttype)
                    .send(user);
                console.log("TC2.4 res.body.code: " + res.body.code);
                if (res.body.code === 200) {
                    assert.equal(res.body.code, 200);
                    assert.equal(res.body.message, "Đăng nhập thành công");
                    console.log("TC2.4.1 res.body.status: " + res.body.status + " - res.body.message: " + res.body.message);
                }
                else if (res.body.code === 500) {
                    assert.equal(res.body.code, 500);
                    assert.equal(res.body.message, "Tên đăng nhập và mật khẩu không đúng");
                    console.log("TC2.4.2 res.body.status: " + res.body.status + " - res.body.message: " + res.body.message);
                }
                else {
                    console.log("TC2.4.3 Unknown Status. Hãy check lại code");
                }
            }
            catch (e) {
                console.log("TC2.4 error: " + e);
                https.get(data.telebot + data.TC2_4);
            }
    });     //end of TC2.4
});         //end of Suite 2

describe('Suite 3: MORE APIs', () => {
    test("TC3.1: tintuc", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.tintuc)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.1 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.1.1 status - " + res.body.status + " - code - " + res.body.code);
            }
            else {
                console.log("TC3.1.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.1 error: " + e);
            https.get(data.telebot + data.TC3_1);
        }
    })      //end of TC3.1
    test("TC3.2: taisaochonchungtoi", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.taisaochonchungtoi)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.2 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.2.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC3.2.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.2 error: " + e);
            https.get(data.telebot + data.TC3_2);
        }
    })      //end of TC3.2
    test("TC3.3: soikeonhacaihomnay", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.soikeonhacaihomnay)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.3 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.3.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC3.3.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC.3 error: " + e);
            https.get(data.telebot + data.TC3_3);
        }
    })      //end of TC3.3
    test("TC3.4: dieukhoanvadieukien", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.dieukhoanvadieukien)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.4 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.4.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC3.4.2 Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.4 error: " + e);
            https.get(data.telebot + data.TC3_4);
        }
    })      //end of TC3.4
    test("TC3.5: keochaua", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.keochaua)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.5 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.5.1 status - " + res.body.status + " - url - " + res.body.data.url);
            }
            else {
                console.log("TC3.5.2 Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.5 error: " + e);
            https.get(data.telebot + data.TC3_5);
        }
    })      //end of TC3.5
    test("TC3.6: keochauau", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.keochauau)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.6 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.6.1 status - " + res.body.status + " - url - " + res.body.data.url);
            }
            else {
                console.log("TC3.6.2 Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.6 error: " + e);
            https.get(data.telebot + data.TC3_6);
        }
    })      //end of TC3.6
    test("TC3.7: nhungcauhoithuonggap", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.nhungcauhoithuonggap)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.7 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.7.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC3.7.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.7 error: " + e);
            https.get(data.telebot + data.TC3_7);
        }
    })      //end of TC3.7
    test("TC3.8: gioithieu", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.gioithieu)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.8 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.8.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC3.8.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.8 error: " + e);
            https.get(data.telebot + data.TC3_8);
        }
    })      //end of TC3.8
    test("TC3.9: chinhsachbaomat", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.chinhsachbaomat)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.9 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.9.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC3.9.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.9 error: " + e);
            https.get(data.telebot + data.TC3_9);
        }
    })      //end of TC3.9
    test("TC3.10: huongdannaptien", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.huongdannaptien)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.10 status - " + res.body.status + " - code - " + res.body.code);

            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.10.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC3.10.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.10 error: " + e);
            https.get(data.telebot + data.TC3_10);
        }
    })      //end of TC3.10
    test("TC3.11: huongdanruttien", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.huongdanruttien)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.11 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.11.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC3.11.2 Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.11 error: " + e);
            https.get(data.telebot + data.TC3_11);
        }
    })      //end of TC3.11
    test("TC3.12: huongdancacuoc", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.huongdancacuoc)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.12 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.3.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC3.3.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.12 error: " + e);
            https.get(data.telebot + data.TC3_12);
        }
    })      //end of TC3.12
    test("TC3.13: hotmatch", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.hotmatch)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.13 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.13.1 status - " + res.body.status + " - code - " + res.body.code);
            }
            else {
                console.log("TC3.13.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.13 error: " + e);
            https.get(data.telebot + data.TC3_13);
        }
    })      //end of TC3.13
    test("TC3.14: whitelist", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.whitelist)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(60000);
            console.log("TC3.14 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC3.14.1 status - " + res.body.status + " - code - " + res.body.code);
            }
            else {
                console.log("TC3.14.2 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC3.14 error: " + e);
            https.get(data.telebot + data.TC3_14);
        }
    })      //end of TC3.14    
    test("TC3.15: download", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.download)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            // console.log("TC3.15 res: " + JSON.stringify(res));
            console.log("TC3.15 status - " + res.status);
            if (res.status === 200) {
                expect(res.text).toContain("Redirecting to")
                console.log("TC3.15.1 status - " + res.status + " - text - " + JSON.stringify(res.text));
            }
            else if (res.status === 301) {
                expect(res.text).toContain("Redirecting to")
                console.log("TC3.15.2 status - " + res.status + " - text - " + JSON.stringify(res.text));
            }
            else {
                console.log("TC3.15.3 status - " + res.status);
            }
        }
        catch (e) {
            console.log("TC3.15 error: " + e);
            https.get(data.telebot + data.TC3_15);
        }
    })      //end of TC3.15
    test("TC3.16: favorites", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.favorites)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC3.16 res.body.code: " + res.body.code + " - res.status: " + res.status);
            if (res.status === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC 3.16.1 res.status === 200");
            }
            else if (res.status === "OK") {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC 3.16.2 res.status === OK");
            }
            else {
                console.log("TC3.16.3 code " + res.body.code);
            }
        }
        catch (e) {
            console.log("TC3.16 error: " + e);
            https.get(data.telebot + data.TC3_16);
        }
    })      //end of TC3.16
});         //end of Suite 3

describe('Suite 4: SPORT', () => {
    test("TC4.1: psport", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.psport)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            console.log("TC4.1 res.body.code - " + res.body.code + " - res.status - " + res.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC4.1.1 status - " + res.body.status + " - res.body.data - " + JSON.stringify(res.body.data));
            }
            else if (res.status === 302) {
                console.log("TC4.1.2 status - " + res.status + " - res.text - " + JSON.stringify(res.text));
            }
            else if (res.status === 200) {
                console.log("TC4.1.3 status - " + res.status + " - res.text - " + JSON.stringify(res.text.data));
            }
            else {
                console.log("TC4.1.4 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC4.1 error: " + e);
            https.get(data.telebot + data.TC4_1);
        }
    })      //end of TC4.1
    test("TC4.2: csport", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.csport)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC4.2 res.body.code - " + res.body.code + " - res.status - " + res.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC4.2.1 status - " + res.body.status + " - res.body.data - " + JSON.stringify(res.body.data));
            }
            else if (res.status === 302) {
                console.log("TC4.2.2 status - " + res.status + " - res.text - " + JSON.stringify(res.text));
            }
            else if (res.status === 200) {
                console.log("TC4.2.3 status - " + res.status + " - res.text - " + JSON.stringify(res.text.data));
            }
            else {
                console.log("TC4.2.4 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC4.2 error: " + e);
            https.get(data.telebot + data.TC4_2);
        }
    })      //end of TC4.2
    test("TC4.3: ksport", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.ksport)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC4.3 res.body.code - " + res.body.code + " - res.status - " + res.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC4.3.1 status - " + res.body.status + " - res.body.data - " + JSON.stringify(res.body.data));
            }
            else if (res.status === 302) {
                console.log("TC4.3.2 status - " + res.status + " - res.text - " + JSON.stringify(res.text));
            }
            else if (res.status === 200) {
                console.log("TC4.3.3 status - " + res.status + " - res.text - " + JSON.stringify(res.text.data));
            }
            else {
                console.log("TC4.3.4 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC4.3 error: " + e);
            https.get(data.telebot + data.TC4_3);
        }
    })      //end of TC4.3
    test("TC4.4: ssport", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.ssport)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            // console.log("res: "+ JSON.stringify(res));
            console.log("TC4.4 res.body.code - " + res.body.code + " - res.status - " + res.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC4.4.1 status - " + res.body.status + " - res.body.data - " + JSON.stringify(res.body.data));
            }
            else if (res.status === 302) {
                console.log("TC4.4.2 status - " + res.status + " - res.text - " + JSON.stringify(res.text));
            }
            else if (res.status === 200) {
                console.log("TC4.4.3 status - " + res.status + " - res.text - " + JSON.stringify(res.text.data));
            }
            else {
                console.log("TC4.4.4 status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC4.4 error: " + e);
            https.get(data.telebot + data.TC4_4);
        }
    })      //end of TC4.4
});         //end of Suite 4

describe('Suite 5: GAMES', () => {
    test("TC5.1: live casino", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.casino)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.1 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.1.1 status - " + res.body.status + " - data[0].id - " + JSON.stringify(res.body.data[0].id));
            }
            else {
                console.log("TC5.1.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.1 error: " + e);
            https.get(data.telebot + data.TC5_1);
        }
    })      //end of TC5.1
    test("TC5.2: gamebai", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.gamebai)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.2 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.2.1 status - " + res.body.status + " - name - " + JSON.stringify(res.body.data.name));
            }
            else {
                console.log("TC5.2.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.2 error: " + e);
            https.get(data.telebot + data.TC5_2);
        }
    })      //end of TC5.2
    test("TC5.3: keno", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.keno)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.3 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.3.1 status - " + res.body.status + " - url - " + JSON.stringify(res.body.data.url));
            }
            else {
                console.log("TC5.3.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.3 error: " + e);
            https.get(data.telebot + data.TC5_3);
        }
    })      //end of TC5.3
    test("TC5.4: lode", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.lode)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.4 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.4.1 status - " + res.body.status + " - url - " + JSON.stringify(res.body.data.url));
            }
            else {
                console.log("TC5.4.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.4 error: " + e);
            https.get(data.telebot + data.TC5_4);
        }
    })      //end of TC5.4
    test("TC5.5: lodesieutoc", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.lodesieutoc)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.5 status - " + res.body.status + " - code - " + res.body.code);

            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.5.1 status - " + res.body.status + " - url - " + JSON.stringify(res.body.data.url));
            }
            else {
                console.log("TC5.5.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.5 error: " + e);
            https.get(data.telebot + data.TC5_5);
        }
    })      //end of TC5.5
    test("TC5.6: quaysomunich", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.quaysomunich)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.6 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.6.1 status - " + res.body.status + " - data - " + JSON.stringify(res.body.data));
            }
            else {
                console.log("TC5.6.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.6 error: " + e);
            https.get(data.telebot + data.TC5_6);
        }
    })      //end of TC5.6
    test("TC5.7: quaysoberlin", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.quaysoberlin)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.7 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.7.1 status - " + res.body.status + " - data - " + JSON.stringify(res.body.data));
            }
            else {
                console.log("TC5.7.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.7 error: " + e);
            https.get(data.telebot + data.TC5_7);
        }
    })      //end of TC5.7
    test("TC5.8: quaysoatom", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.quaysoatom)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.8 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.8.1 status - " + res.body.status + " - data - " + JSON.stringify(res.body.data));
            }
            else {
                console.log("TC5.8.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.8 error: " + e);
            https.get(data.telebot + data.TC5_8);
        }
    })      //end of TC5.8
    test("TC5.9: banca", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.banca)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.9 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.9.1 status - " + res.body.status + " - name - " + JSON.stringify(res.body.data.name));
            }
            else {
                console.log("TC5.9.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.9 error: " + e);
            https.get(data.telebot + data.TC5_9);
        }
    })      //end of TC5.9
    test("TC5.10: congame", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.congame)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.10 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.10.1 status - " + res.body.status + " - name - " + JSON.stringify(res.body.data.name));
            }
            else {
                console.log("TC5.10.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.10 error: " + e);
            https.get(data.telebot + data.TC5_10);
        }
    })      //end of TC5.10
    test("TC5.11: ingame", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.ingame)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            //.timeout(200000);
            console.log("TC5.11 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC5.11.1 status - " + res.body.status + " - name - " + JSON.stringify(res.body.data.name));
            }
            else {
                console.log("TC5.11.2: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC5.11 error: " + e);
            https.get(data.telebot + data.TC5_11);
        }
    })      //end of TC5.11
})          //end of Suite 5

describe('Suite 6: Game Providers', () => {
    test("TC6.1: allproviders", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.allproviders)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send();

            console.log("TC6.1 code - " + res.body.code + " - status - " + res.body.status);

            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.1.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.1.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.1 error: " + e);
            https.get(data.telebot + data.TC6_1);
        }
    })      //end of TC6.1
    test("TC6.2: microgaming", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.microgaming)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send();

            console.log("TC6.2 code - " + res.body.code + " - status - " + res.body.status);

            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.2.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.2.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.2 error: " + e);
            https.get(data.telebot + data.TC6_2);
        }
    })      //end of TC6.2
    test("TC6.3: pragmaticplay", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.pragmaticplay)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send();
            console.log("TC6.3 code - " + res.body.code + " - status - " + res.body.status);
            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.3.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.3.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.3 error: " + e);
            https.get(data.telebot + data.TC6_3);
        }
    })      //end of TC6.3
    test("TC6.4: cq9", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.cq9)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send()
            // //.timeout(200000);

            console.log("TC6.4 code - " + res.body.code + " - status - " + res.body.status);
            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.4.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.4.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.4 error: " + e);
            https.get(data.telebot + data.TC6_4);
        }
    })      //end of TC6.4
    test("TC6.5: evoplay", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.evoplay)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send();
            console.log("TC6.5 code - " + res.body.code + " - status - " + res.body.status);
            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.5.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.5.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.5 error: " + e);
            https.get(data.telebot + data.TC6_5);
        }
    })      //end of TC6.5
    test("TC6.6: playngo", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.playngo)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send();
            console.log("TC6.6 code - " + res.body.code + " - status - " + res.body.status);
            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.6.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.6.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.6 error: " + e);
            https.get(data.telebot + data.TC6_6);
        }
    })      //end of TC6.6
    test("TC6.7: techplay", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.techplay)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send();
            console.log("TC6.7 code - " + res.body.code + " - status - " + res.body.status);
            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.7.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.7.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.7 error: " + e);
            https.get(data.telebot + data.TC6_7);
        }
    })      //end of TC6.7
    test("TC6.8: qtech", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.qtech)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send();
            console.log("TC6.8 code - " + res.body.code + " - status - " + res.body.status);
            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.8.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.8.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.8 error: " + e);
            https.get(data.telebot + data.TC6_8);
        }
    })      //end of TC6.8
    test("TC6.9: evo", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.evo)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send();
            console.log("TC6.9 code - " + res.body.code + " - status - " + res.body.status);
            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.9.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.9.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.9 error: " + e);
            https.get(data.telebot + data.TC6_9);
        }
    })      //end of TC6.9
    test("TC6.10: spribe", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.spribe)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .send();
            console.log("TC6.10 code - " + res.body.code + " - status - " + res.body.status);
            if (res.body.code === 200) {
                expect(res.body.code).toEqual(200);
                expect(res.body.status).toEqual("OK");
                console.log("TC6.10.1 total games - " + JSON.stringify(res.body.data.total));
            }
            else {
                console.log("TC6.10.2 unknown status")
            }
        }
        catch (e) {
            console.log("TC6.10 error: " + e);
            https.get(data.telebot + data.TC6_10);
        }
    })      //end of TC6.10
})          //end of Suite 6
/* ---- end of PART 1:no NEED login Suites ---- */


/* ---- PART 2: NEED login Suites ---- */
describe('Suite 11: Deposit Internet Banking', () => {
    test("TC11.1: ibanking - ACB", async () => {
        try {
            let user = {
                to_bank_code: "ACB", to_bank_no: "10256967", to_bank_name: "Lương Hoàng Vũ",
                bank_trancode: "", from_bank_name: "ricky01", amount_deposit: "551", amount_deposit_mask: "551", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);      
            console.log("TC11.1 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC11.1.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC11.1.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC11.1.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC11.1 error: " + e);
            https.get(data.telebot + data.TC11_1);
        }
    })      //end of TC11.1
    test("TC11.2: ibanking - BIDV", async () => {
        try {
            let user = {
                to_bank_code: "BIDV", to_bank_no: "15010000692808", to_bank_name: "Trương Văn Bảo",
                bank_trancode: "bidvso tknh", from_bank_name: "ricky01", amount_deposit: "552", amount_deposit_mask: "552", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);
            console.log("TC11.2 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC11.2.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC11.2.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC11.2.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC11.2 error: " + e);
            https.get(data.telebot + data.TC11_2);
        }
    })      //end of TC11.2
    test("TC11.3: ibanking - Vietinbank", async () => {
        try {
            let user = {
                to_bank_code: "Vietinbank", to_bank_no: "102871149391", to_bank_name: "Trương Văn Bảo",
                bank_trancode: "Vietinbank_sotknhnguoichuyen", from_bank_name: "ricky01", amount_deposit: "553", amount_deposit_mask: "553", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);
            console.log("TC11.3 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC11.3.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC11.3.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC11.3.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC11.3 error: " + e);
            https.get(data.telebot + data.TC11_3);
        }
    })      //end of TC11.3
    test("TC11.4: ibanking - Vietcombank", async () => {
        try {
            let user = {
                to_bank_code: "VCB", to_bank_no: "1013121545", to_bank_name: "Lê Anh Thái",
                bank_trancode: "vietcom ma giao dich", from_bank_name: "ricky01", amount_deposit: "554", amount_deposit_mask: "554", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            // //.timeout(10000);
            console.log("TC11.4 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC11.4.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC11.4.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC11.4.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC11.4 error: " + e);
            https.get(data.telebot + data.TC11_4);
        }
    })      //end of TC11.4
    test("TC11.5: ibanking - DongA", async () => {
        try {
            let user = {
                to_bank_code: "DongA", to_bank_no: "0111191258", to_bank_name: "Lương Hoàng Vũ",
                bank_trancode: "DongA magiaodich", from_bank_name: "ricky01", amount_deposit: "555", amount_deposit_mask: "555", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            // //.timeout(10000);
            console.log("TC11.5 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC11.5.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC11.5.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC11.5.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC11.5 error: " + e);
            https.get(data.telebot + data.TC11_5);
        }
    })      //end of TC11.5
    test("TC11.6: ibanking - Techcombank", async () => {
        try {
            let user = {
                to_bank_code: "Techcombank", to_bank_no: "19036786760017", to_bank_name: "Hoàng Hồng Quân",
                bank_trancode: "techcom SỐ BÚT TOÁN (FTXXX)", from_bank_name: "ricky01", amount_deposit: "556", amount_deposit_mask: "556", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            // //.timeout(10000);
            console.log("TC11.6 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC11.6.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC11.6.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC11.6.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC11.6 error: " + e);
            https.get(data.telebot + data.TC11_6);
        }
    })      //end of TC11.6
    test("TC11.7: ibanking - Sacombank", async () => {
        try {
            let user = {
                to_bank_code: "Sacombank", to_bank_no: "020084225259", to_bank_name: "Lương Hoàng Vũ",
                bank_trancode: "Sacombank thoigianchuyen", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            // //.timeout(10000);
            console.log("TC11.7 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC11.7.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC11.7.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC11.7.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC11.7 error: " + e);
            https.get(data.telebot + data.TC11_7);
        }
    })      //end of TC11.7
    test("TC11.8: ibanking - VPbank", async () => {
        try {
            let user = {
                to_bank_code: "VPbank", to_bank_no: "232902841", to_bank_name: "Hoàng Hồng Quân",
                bank_trancode: "111", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            // //.timeout(10000);
            console.log("TC11.8 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC11.8.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC11.8.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC11.8.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC11.8 error: " + e);
            https.get(data.telebot + data.TC11_8);
        }
    })      //end of TC11.8
    test("TC11.9: ibanking - VietCapital", async () => {
        try {
            let user = {
                to_bank_code: "VietCapital", to_bank_no: "0047041037984", to_bank_name: "Hoàng Hồng Quân",
                bank_trancode: "222", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            console.log("TC11.9 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC11.9.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC11.9.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC11.9.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC11.9 error: " + e);
            https.get(data.telebot + data.TC11_9);
        }
    })      //end of TC11.9
});         //end of Suite 11

describe('Suite 12: Deposit ATM', () => {
    test("TC12.1: Deposit ATM - ACB", async () => {
        try {
            let user = {
                to_bank_code: "ACB", to_bank_no: "10256967", to_bank_name: "Lương Hoàng Vũ",
                bank_trancode: "", from_bank_name: "ricky01", amount_deposit: "551", amount_deposit_mask: "551", method: "atm", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);
            console.log("TC12.1 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC12.1.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC12.1.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC12.1.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC12.1 error: " + e);
            https.get(data.telebot + data.TC12_1);
        }
    })      //end of TC12.1
    test("TC12.2: Deposit ATM - BIDV", async () => {
        try {
            let user = {
                to_bank_code: "BIDV", to_bank_no: "15010000692808", to_bank_name: "Trương Văn Bảo",
                bank_trancode: "bidvso tknh", from_bank_name: "ricky01", amount_deposit: "552", amount_deposit_mask: "552", method: "atm", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);
            console.log("TC12.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC12.2.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC12.2.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC12.2.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC12.2 error: " + e);
            https.get(data.telebot + data.TC12_2);
        }
    })      //end of TC12.2
    test("TC12.3: Deposit ATM - Vietinbank", async () => {
        try {
            let user = {
                to_bank_code: "Vietinbank", to_bank_no: "102871149391", to_bank_name: "Trương Văn Bảo",
                bank_trancode: "Vietinbank_sotknhnguoichuyen", from_bank_name: "ricky01", amount_deposit: "553", amount_deposit_mask: "553", method: "atm", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);
            console.log("TC12.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC12.3.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC12.3.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC12.3.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC12.3 error: " + e);
            https.get(data.telebot + data.TC12_3);
        }
    })      //end of TC12.3
    test("TC12.4: Deposit ATM - Vietcombank", async () => {
        try {
            let user = {
                to_bank_code: "VCB", to_bank_no: "1013121545", to_bank_name: "Lê Anh Thái",
                bank_trancode: "vietcom ma giao dich", from_bank_name: "ricky01", amount_deposit: "554", amount_deposit_mask: "554", method: "atm", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            // //.timeout(10000);
            console.log("TC12.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC12.4.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC12.4.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC12.4.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC12.4 error: " + e);
            https.get(data.telebot + data.TC12_4);
        }
    })      //end of TC12.4
    test("TC12.5: Deposit ATM - DongA", async () => {
        try {
            let user = {
                to_bank_code: "DongA", to_bank_no: "0111191258", to_bank_name: "Lương Hoàng Vũ",
                bank_trancode: "DongA magiaodich", from_bank_name: "ricky01", amount_deposit: "555", amount_deposit_mask: "555", method: "atm", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            // //.timeout(10000);
            console.log("TC12.5 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC12.5.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC12.5.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC12.5.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC12.5 error: " + e);
            https.get(data.telebot + data.TC12_5);
        }
    })      //end of TC12.5
    test("TC12.6: Deposit ATM - Techcombank", async () => {
        try {
            let user = {
                to_bank_code: "Techcombank", to_bank_no: "19036786760017", to_bank_name: "Hoàng Hồng Quân",
                bank_trancode: "techcom SỐ BÚT TOÁN (FTXXX)", from_bank_name: "ricky01", amount_deposit: "556", amount_deposit_mask: "556", method: "atm", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            // //.timeout(10000);
            console.log("TC12.6 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC12.6.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC12.6.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC12.6.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC12.6 error: " + e);
            https.get(data.telebot + data.TC12_6);
        }
    })      //end of TC12.6
    test("TC12.7: Deposit ATM - Sacombank", async () => {
        try {
            let user = {
                to_bank_code: "Sacombank", to_bank_no: "020084225259", to_bank_name: "Lương Hoàng Vũ",
                bank_trancode: "Sacombank thoigianchuyen", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "atm", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            // //.timeout(10000);
            console.log("TC12.7 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC12.7.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC12.7.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC12.7.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC12.7 error: " + e);
            https.get(data.telebot + data.TC12_7);
        }
    })      //end of TC12.7
    test("TC12.8: Deposit ATM - VPbank", async () => {
        try {
            let user = {
                to_bank_code: "VPbank", to_bank_no: "232902841", to_bank_name: "Hoàng Hồng Quân",
                bank_trancode: "sotknh", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ATM", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            console.log("TC12.8 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC12.8.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC12.8.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC12.8.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC12.8 error: " + e);
            https.get(data.telebot + data.TC12_8);
        }
    })      //end of TC12.8
    test("TC12.9: Deposit ATM - VietCapital", async () => {
        try {
            let user = {
                to_bank_code: "VietCapital", to_bank_no: "0047041037984", to_bank_name: "Hoàng Hồng Quân",
                bank_trancode: "sotknh", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ATM", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            console.log("TC12.9 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC12.9.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC12.9.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC12.9.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC12.9 error: " + e);
            https.get(data.telebot + data.TC12_9);
        }
    })      //end of TC12.9
});         //end of Suite 12

describe('Suite 13: Deposit Bank - Tai Quay', () => {
    test("TC13.1: banking - ACB", async () => {
        try {
            let user = {
                to_bank_code: "ACB", to_bank_no: "10256967", to_bank_name: "Lương Hoàng Vũ",
                bank_trancode: "", from_bank_name: "ricky01", amount_deposit: "551", amount_deposit_mask: "551", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);
            console.log("TC13.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC13.1.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC13.1.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC13.1.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC13.1 error: " + e);
            https.get(data.telebot + data.TC13_1);
        }
    })      //end of TC13.1
    test("TC13.2: DIB - BIDV", async () => {
        try {
            let user = {
                to_bank_code: "BIDV", to_bank_no: "15010000692808", to_bank_name: "Trương Văn Bảo",
                bank_trancode: "bidvso tknh", from_bank_name: "ricky01", amount_deposit: "552", amount_deposit_mask: "552", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);
            console.log("TC13.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC13.2.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC13.2.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC13.2.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC13.2 error: " + e);
            https.get(data.telebot + data.TC13_2);
        }
    })      //end of TC13.2
    test("TC13.3: DIB - Vietinbank", async () => {
        try {
            let user = {
                to_bank_code: "Vietinbank", to_bank_no: "102871149391", to_bank_name: "Trương Văn Bảo",
                bank_trancode: "Vietinbank_sotknhnguoichuyen", from_bank_name: "ricky01", amount_deposit: "553", amount_deposit_mask: "553", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);
            console.log("TC13.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC13.3.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC13.3.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC13.3.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC13.3 error: " + e);
            https.get(data.telebot + data.TC13_3);
        }
    })      //end of TC13.3
    test("TC13.4: DIB - Vietcombank", async () => {
        try {
            let user = {
                to_bank_code: "Vietcombank", to_bank_no: "1013121545", to_bank_name: "Lê Anh Thái",
                bank_trancode: "vietcom ma giao dich", from_bank_name: "ricky01", amount_deposit: "554", amount_deposit_mask: "554", method: "ibanking", package_id: 1
            };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            // //.timeout(10000);
            console.log("TC13.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC13.4.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC13.4.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC13.4.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC13.4 error: " + e);
            https.get(data.telebot + data.TC13_4);
        }
    })      //end of TC13.4
    test("TC13.5: DIB - DongA", async () => {
        try {
            let user = { to_bank_code: "DongA", to_bank_no: "0111191258", to_bank_name: "Lương Hoàng Vũ", bank_trancode: "DongA magiaodich", from_bank_name: "ricky01", amount_deposit: "555", amount_deposit_mask: "555", method: "ibanking", package_id: 1 };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            // //.timeout(10000);
            console.log("TC13.5 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC13.5.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC13.5.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC13.5.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC13.5 error: " + e);
            https.get(data.telebot + data.TC13_5);
        }
    })      //end of TC13.5
    test("TC13.6: DIB - Techcombank", async () => {
        try {
            let user = { to_bank_code: "Techcombank", to_bank_no: "19036786760017", to_bank_name: "Hoàng Hồng Quân", bank_trancode: "techcom SỐ BÚT TOÁN (FTXXX)", from_bank_name: "ricky01", amount_deposit: "556", amount_deposit_mask: "556", method: "ibanking", package_id: 1 };
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            // //.timeout(10000);
            console.log("TC13.6 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC13.6.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC13.6.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC13.6.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC13.6 error: " + e);
            https.get(data.telebot + data.TC13_6);
        }
    })      //end of TC13.6
    test("TC13.7: DIB - Sacombank", async () => {
        let user = { to_bank_code: "Sacombank", to_bank_no: "020084225259", to_bank_name: "Lương Hoàng Vũ", bank_trancode: "Sacombank thoigianchuyen", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ibanking", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            // //.timeout(10000);
            console.log("TC13.7 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC13.7.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC13.7.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC13.7.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC13.7 error: " + e);
            https.get(data.telebot + data.TC13_7);
        }
    })      //end of TC13.7
    test("TC13.8: DIB - VPbank", async () => {
        let user = { to_bank_code: "VPbank", to_bank_no: "232902841", to_bank_name: "Hoàng Hồng Quân", bank_trancode: "hotentrenbienlai", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ibanking", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            // //.timeout(10000);
            console.log("TC13.8 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC13.8.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC13.8.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC13.8.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC13.8 error: " + e);
            https.get(data.telebot + data.TC13_8);
        }
    })      //end of TC13.8
    test("TC13.9: DIB - VietCapital", async () => {
        let user = { to_bank_code: "VietCapital", to_bank_no: "0047041037984", to_bank_name: "Hoàng Hồng Quân", bank_trancode: "hotentrenbienli", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ibanking", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.ibanking)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            // //.timeout(10000);
            console.log("TC13.9 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC13.9.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC13.9.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC13.9.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC13.9 error: " + e);
            https.get(data.telebot + data.TC13_9);
        }
    })      //end of TC13.9
});         //end of Suite 13

describe('Suite 14: Deposit PAYWIN - smartpay', () => {
    test("TC14.1: smartpay - BIDV", async () => {
        let user = { to_bank_code: "BIDV", smartpay_code: "bidv", amount_smartpay: "101", amount_smartpay_mask: "101", method: "smartpay", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.paywin)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // console.log("res: " +JSON.stringify(res));
            console.log("TC14.1 res.body.status: " + res.body.status);
            if (res.body.status === "OK") {
                assert.equal(res.body.status, "OK");
                console.log("TC14.1.1 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
            else if (res.body.status === "Unauthorized") {
                assert.equal(res.body.message, "require login");
                console.log("TC14.1.2 status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.status === "ERROR") {
                console.log("TC14.1.3 status: " + res.body.status + "  -  " + "msg: " + res.body.msg);
            }
            else if (res.body.code === 400) {
                // assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC14.1.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC14.1.5 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
        }
        catch (e) {
            console.log("TC14.1 error: " + e);
            https.get(data.telebot + data.TC14_1);
        }
    })      //end of TC14.1
    test("TC14.2: smartpay - ACB", async () => {
        let user = { to_bank_code: "ACB", smartpay_code: "acb", amount_smartpay: "102", amount_smartpay_mask: "102", method: "smartpay", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.paywin)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            console.log("TC14.2 res.body.status: " + res.body.status);
            if (res.body.status === "OK") {
                assert.equal(res.body.status, "OK");
                console.log("TC14.2.1 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
            else if (res.body.status === "Unauthorized") {
                assert.equal(res.body.message, "require login");
                console.log("TC14.2.2 status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.status === "ERROR") {
                console.log("TC14.2.3 status: " + res.body.status + "  -  " + "msg: " + res.body.msg);
            }
            else if (res.body.code === 400) {
                // assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC14.2.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC14.2.5 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
        }
        catch (e) {
            console.log("TC14.2 error: " + e);
            https.get(data.telebot + data.TC14_2);
        }
    })      //end of TC14.2
    test("TC14.3: smartpay - Techcombank", async () => {
        let user = { to_bank_code: "Techcombank", smartpay_code: "tcb", amount_smartpay: "101", amount_smartpay_mask: "101", method: "smartpay", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.paywin)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            console.log("TC14.3 res.body.status: " + res.body.status);
            if (res.body.status === "OK") {
                assert.equal(res.body.status, "OK");
                console.log("TC14.3.1 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
            else if (res.body.status === "Unauthorized") {
                assert.equal(res.body.message, "require login");
                console.log("TC14.3.2 status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.status === "ERROR") {
                console.log("TC14.3.3 status: " + res.body.status + "  -  " + "msg: " + res.body.msg);
            }
            else if (res.body.code === 400) {
                // assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC14.3.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC14.3.5 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
        }
        catch (e) {
            console.log("TC14.3 error: " + e);
            https.get(data.telebot + data.TC14_3);
        }
    })      //end of TC14.3
    test("TC14.4: smartpay - DongA", async () => {
        let user = { to_bank_code: "DongA", smartpay_code: "eab", amount_smartpay: "102", amount_smartpay_mask: "102", method: "smartpay", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.paywin)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            console.log("TC14.4 res.body.status: " + res.body.status);
            if (res.body.status === "OK") {
                assert.equal(res.body.status, "OK");
                console.log("TC14.4.1 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
            else if (res.body.status === "Unauthorized") {
                assert.equal(res.body.message, "require login");
                console.log("TC14.4.2 status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.status === "ERROR") {
                console.log("TC14.4.3 status: " + res.body.status + "  -  " + "msg: " + res.body.msg);
            }
            else if (res.body.code === 400) {
                // assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC14.4.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC14.4.5 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
        }
        catch (e) {
            console.log("TC14.4 error: " + e);
            https.get(data.telebot + data.TC14_4);
        }
    })      //end of TC14.4
    test("TC14.5: smartpay - VCB", async () => {
        let user = { to_bank_code: "VCB", smartpay_code: "vcb", amount_smartpay: "101", amount_smartpay_mask: "101", method: "smartpay", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.paywin)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            console.log("TC14.5 res.body.status: " + res.body.status);
            if (res.body.status === "OK") {
                assert.equal(res.body.status, "OK");
                console.log("TC14.5.1 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
            else if (res.body.status === "Unauthorized") {
                assert.equal(res.body.message, "require login");
                console.log("TC14.5.2 status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.status === "ERROR") {
                console.log("TC14.5.3 status: " + res.body.status + "  -  " + "msg: " + res.body.msg);
            }
            else if (res.body.code === 400) {
                // assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC14.5.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC14.5.5 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
        }
        catch (e) {
            console.log("TC14.5 error: " + e);
            https.get(data.telebot + data.TC14_5);
        }
    })      //end of TC14.5
    test("TC14.6: smartpay - Sacombank", async () => {
        let user = { to_bank_code: "Sacombank", smartpay_code: "sab", amount_smartpay: "102", amount_smartpay_mask: "102", method: "smartpay", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.paywin)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            console.log("TC14.6 res.body.status: " + res.body.status);
            if (res.body.status === "OK") {
                assert.equal(res.body.status, "OK");
                console.log("TC14.6.1 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
            else if (res.body.status === "Unauthorized") {
                assert.equal(res.body.message, "require login");
                console.log("TC14.6.2 status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.status === "ERROR") {
                console.log("TC14.6.3 status: " + res.body.status + "  -  " + "msg: " + res.body.msg);
            }
            else if (res.body.code === 400) {
                // assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC14.6.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC14.6.5 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
        }
        catch (e) {
            console.log("TC14.6 error: " + e);
            https.get(data.telebot + data.TC14_6);
        }
    })      //end of TC14.6
    test("TC14.7: smartpay - VietinBank", async () => {
        let user = { to_bank_code: "VietinBank", smartpay_code: "vtb", amount_smartpay: "101", amount_smartpay_mask: "101", method: "smartpay", package_id: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.paywin)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            console.log("TC14.7 res.body.status: " + res.body.status);
            if (res.body.status === "OK") {
                assert.equal(res.body.status, "OK");
                console.log("TC14.7.1 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
            else if (res.body.status === "Unauthorized") {
                assert.equal(res.body.message, "require login");
                console.log("TC14.7.2 status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.status === "ERROR") {
                console.log("TC14.7.3 status: " + res.body.status + "  -  " + "msg: " + res.body.msg);
            }
            else if (res.body.code === 400) {
                // assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC14.7.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC14.7.5 status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
        }
        catch (e) {
            console.log("TC14.7 error: " + e);
            https.get(data.telebot + data.TC14_7);
        }
    })      //end of TC14.7
});         //end of Suite 14

describe('Suite 15: Deposit CARD - Nap the cao', () => {
    test("TC15.1: card - VIETTEL", async () => {
        let user = { to_telcom_code: "VIETTEL", card_code: "pin_of_viettel", card_serial: "serial_of_viettel", card_amount: 1000000, card_status: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.card)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            console.log("TC15.1 code: " + res.body.code);
            if (res.body.code === 200) {
                console.log("TC15.1.1 Status: " + res.body.status + "  -  " + "data: " + JSON.stringify(res.body.data));
                assert.equal(res.body.code, 200);
            }
            else if (res.body.code === 314) {
                console.log("TC15.1.2 Status: " + res.body.status + "  -  " + "message: " + res.body.message);
                assert.equal(res.body.message, "Quý khách đang có nhiều phiếu đang chờ xủ lý, vui lòng chờ trong giây lát.");
            }
            else {
                console.log("TC15.1.3 Status: " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC15.1 error: " + e);
            https.get(data.telebot + data.TC15_1);
        }
    })      //end of TC15.1
    test("TC15.2: card - MOBIFONE", async () => {
        let user = { to_telcom_code: "MOBIFONE", card_code: "pin_of_MOBIFONE", card_serial: "serial_of_MOBIFONE", card_amount: 10000, card_status: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.card)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            console.log("TC15.2 code: " + res.body.code);
            if (res.body.code === 200) {
                console.log("TC15.2.1 Status: " + res.body.status + "  -  " + "data: " + JSON.stringify(res.body.data));
                assert.equal(res.body.code, 200);
            }
            else if (res.body.code === 314) {
                console.log("TC15.2.2 Status: " + res.body.status + "  -  " + "message: " + res.body.message);
                assert.equal(res.body.message, "Quý khách đang có nhiều phiếu đang chờ xủ lý, vui lòng chờ trong giây lát.");
            }
            else {
                console.log("TC15.2.3 Status: " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC15.2 error: " + e);
            https.get(data.telebot + data.TC15_2);
        }
    })      //end of TC15.2
    test("TC15.3: card - VINAPHONE", async () => {
        let user = { to_telcom_code: "VINAPHONE", card_code: "pin_of_VINAPHONE", card_serial: "serial_of_VINAPHONE", card_amount: 300000, card_status: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.card)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            console.log("TC15.3 code: " + res.body.code);
            if (res.body.code === 200) {
                console.log("TC15.3.1 Status: " + res.body.status + "  -  " + "data: " + JSON.stringify(res.body.data));
                assert.equal(res.body.code, 200);
            }
            else if (res.body.code === 314) {
                console.log("TC15.3.2 Status: " + res.body.status + "  -  " + "message: " + res.body.message);
                assert.equal(res.body.message, "Quý khách đang có nhiều phiếu đang chờ xủ lý, vui lòng chờ trong giây lát.");
            }
            else {
                console.log("TC15.3.3 Status: " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC15.3 error: " + e);
            https.get(data.telebot + data.TC15_3);
        }
    })      //end of TC15.3
});         //end of Suite 15

describe('Suite 16: Deposit MOMO', () => {
    test("TC16.1: momo", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.momo)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send()
            // //.timeout(10000);
            console.log("TC16.1 Status: " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC16.1 Code: " + "Status - " + res.body.status + "  -  " + "data: " + JSON.stringify(res.body.data));
            }
            else if (res.body.code === 404) {
                console.log("TC16.2 Code: " + "Status - " + res.body.status + "  -  " + "message: " + res.body.message);
                assert.equal(res.body.message, "Quý khách đang có nhiều phiếu đang chờ xủ lý, vui lòng chờ trong giây lát.");
            }
            else {
                console.log("TC16.3 Code: res.body.code: " + res.body.code + "  -  " + "status: " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC16.1 error: " + e);
            https.get(data.telebot + data.TC16_1);
        }
    })      //end of TC16.1
});         //end of Suite 16

describe('Suite 17: Withdraw BANKS', () => {
    test("TC17.1: Withdraw with DongA bank", async () => {
        let user = { to_bank_code: "DongA", to_bank_no: "sotaikhoan_donga", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawbank)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            console.log("TC17.1 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC17.1.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC17.1.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC17.1.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC17.1.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC17.1 error: " + e);
            https.get(data.telebot + data.TC17_1);
        }
    })      //end of TC17.1
    test("TC17.2: Withdraw with VCB", async () => {
        let user = { to_bank_code: "VCB", to_bank_no: "sotaikhoan_vcb", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawbank)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            console.log("TC17.2 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC17.2.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC17.2.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC17.2.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC17.2.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC17.2 error: " + e);
            https.get(data.telebot + data.TC17_2);
        }

    })      //end of TC17.2
    test("TC17.3: Withdraw with ACB", async () => {
        let user = { to_bank_code: "ACB", to_bank_no: "sotaikhoan_acb", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawbank)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            console.log("TC17.3 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC17.3.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC17.3.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC17.3.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC17.3.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC17.3 error: " + e);
            https.get(data.telebot + data.TC17_3);
        }
    })      //end of TC17.3
    test("TC17.4: Withdraw with Vietinbank", async () => {
        let user = { to_bank_code: "Vietinbank", to_bank_no: "sotaikhoan_Vietinbank", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawbank)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            console.log("TC17.4 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC17.4.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC17.4.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC17.4.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC17.4.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC17.4 error: " + e);
            https.get(data.telebot + data.TC17_4);
        }
    })      //end of TC17.4
    test("TC17.5: Withdraw with BIDV", async () => {
        let user = { to_bank_code: "BIDV", to_bank_no: "sotaikhoan_BIDV", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawbank)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            console.log("TC17.5 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC17.5.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC17.5.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC17.5.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC17.5.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC17.5 error: " + e);
            https.get(data.telebot + data.TC17_5);
        }
    })      //end of TC17.5
    test("TC17.6: Withdraw with Sacombank", async () => {
        let user = { to_bank_code: "Sacombank", to_bank_no: "sotaikhoan_Sacombank", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawbank)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies2)
                .send(user)
            console.log("TC17.6 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC17.6.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC17.6.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC17.6.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC17.6.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC17.6 error: " + e);
            https.get(data.telebot + data.TC17_6);
        }
    })      //end of TC17.6
    test("TC17.7: Withdraw with Techcombank", async () => {
        let user = { to_bank_code: "Techcombank", to_bank_no: "sotaikhoan_donga", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawbank)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            console.log("TC17.7 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC17.7.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC17.7.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC17.7.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC17.7.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC17.7 error: " + e);
            https.get(data.telebot + data.TC17_7);
        }
    })      //end of TC17.7
    test("TC17.8: Withdraw with VPbank", async () => {
        let user = { to_bank_code: "VPbank", to_bank_no: "sotaikhoan_VPbank", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawbank)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            console.log("TC17.8 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC17.8.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC17.8.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC17.8.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC17.8.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC17.8 error: " + e);
            https.get(data.telebot + data.TC17_8);
        }
    })      //end of TC17.8
    test("TC17.9: Withdraw with Techcombank", async () => {
        let user = { to_bank_code: "Techcombank", to_bank_no: "sotaikhoan_donga", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawbank)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies3)
                .send(user)
            console.log("TC17.9 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC17.9.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC17.9.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC17.9.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC17.9.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC17.9 error: " + e);
            https.get(data.telebot + data.TC17_9);
        }
    })      //end of TC17.9
});         //end of Suite 17

describe('Suite 18: Withdraw CARDS', () => {
    test("TC18.1: VIETTEL", async () => {
        let user = { to_telcom_code: "VIETTEL", card_amount_unit: 100000, card_number: "1", verify_phone: "", card_status: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawcard)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies4)
                .send(user)
            console.log("TC18.1 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC18.1.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC18.1.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC18.1.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC18.1.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC18.1 error: " + e);
            https.get(data.telebot + data.TC18_1);
        }
    })      //end of TC18.1
    test("TC18.2: MOBIFONE", async () => {
        let user = { to_telcom_code: "MOBIFONE", card_amount_unit: 100000, card_number: "1", verify_phone: "", card_status: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawcard)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies4)
                .send(user)
            console.log("TC18.2 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC18.2.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC18.2.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC18.2.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC18.2.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC18.2 error: " + e);
            https.get(data.telebot + data.TC18_2);
        }
    })      //end of TC18.2
    test("TC18.3: VINAPHONE", async () => {
        let user = { to_telcom_code: "VINAPHONE", card_amount_unit: 100000, card_number: "1", verify_phone: "", card_status: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawcard)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies4)
                .send(user)
            console.log("TC18.3 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC18.3.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC18.3.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC18.3.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC18.3.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC18.3 error: " + e);
            https.get(data.telebot + data.TC18_3);
        }
    })      //end of TC18.3
    test("TC18.4: VIETNAMOBILE", async () => {
        let user = { to_telcom_code: "VIETNAMOBILE", card_amount_unit: 100000, card_number: "1", verify_phone: "", card_status: 1 };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.withdrawcard)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies4)
                .send(user)
            console.log("TC18.4 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC18.4.1 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC18.4.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC18.4.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC18.4.4 res.body.status: " + res.body.status + "  -  " + "message: " + res.body.message);
            }
        }
        catch (e) {
            console.log("TC18.4 error: " + e);
            https.get(data.telebot + data.TC18_4);
        }
    })      //end of TC18.4
});         //end of Suite 18

describe('Suite 19: Update User Infor', () => {
    test("TC19.1: Update User Infor", async () => {
        let user = {
            fullname: "ricky03", bank_name: "ricky03_" + data.rNum, email: "ricky03_" + data.rNum + "@mailnesia.com",
            password: "123456", confirmPassword: "123456", ref_id: ""
        };
        try {
            const res = await request(data.baseUrl)
                .post(apilist.updateInfo)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send(user)
            // //.timeout(10000);
            console.log("TC19.1 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.status, "OK");
                console.log("TC19.1.1 res.body.user - " + JSON.stringify(res.body.user));
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC19.1.2 res.body.status - " + res.body.status + "  -  " + "user: " + JSON.stringify(res.body.user));
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC19.1.3 res.body.status - " + res.body.status + "  -  " + "user: " + JSON.stringify(res.body.user));
            }
            else {
                console.log("TC19.1.4 res.body.status - " + res.body.status + "  -  " + "user: " + JSON.stringify(res.body.user));
            }
        }
        catch (e) {
            console.log("TC19.1 error: " + e);
            https.get(data.telebot + data.TC19_1);
        }
    })      //end of TC19.1
});         //end of Suite 19

describe('Suite 20: Account', () => {
    test("TC20.1: indexaccount", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.indexaccount)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send();

            // console.log("res: " + JSON.stringify(res));
            console.log("TC20.1 res.body.balance - " + JSON.stringify(res.body.balance) + " - res.status - " + res.status);

            if (!res.body.plan) {               //ko tham gia km
                if (res.body.message) {
                    console.log("TC20.1.1a res.body.balance - " + JSON.stringify(res.body.balance) + " - res.body.status - " + res.status + " - res.text - " + res.text + " - res.body.message - " + res.body.message);
                }
                else {
                    assert.equal(res.status, 401);
                    console.log("TC20.1.1b res.body.balance - " + JSON.stringify(res.body.balance) + " - res.status - " + res.status + " - res.text - " + res.text);
                }
            }
            else if (res.body.plan) {
                assert.equal(res.status, 200);  //co tham gia km
                console.log("TC20.1.2 res.body.balance - " + JSON.stringify(res.body.balance) + " - res.status - " + res.status + " - res.body.plan.name - " + res.body.plan.name);
            }
            else {
                console.log("TC20.1.3 res.text - " + res.text);
            }
        }
        catch (e) {
            console.log("TC20.1 error: " + e);
            https.get(data.telebot + data.TC20_1);
        }
    })      //end of TC20.1
    test("TC20.2: lichsucacuoc", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.lichsucacuoc)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send()
            console.log("TC20.2 status - " + res.body.status + " - code - " + res.body.code);

            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC20.2.1 status - " + res.body.status + " - total - " + res.body.total);
            }
            else if (res.status === "Unauthorized") {
                console.log("TC20.2.2 message - " + res.message);
            }
            else {
                console.log("TC20.2.3: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC20.2 error: " + e);
            https.get(data.telebot + data.TC20_2);
        }
    })      //end of TC20.2
    test("TC20.3: lichsupsport", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.lichsupsport)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send()

            console.log("TC20.3 status - " + res.body.status + " - code - " + res.body.code);

            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC20.3.1 status - " + res.body.status + " - total - " + res.body.total);
            }
            else if (res.status === "Unauthorized") {
                console.log("TC20.3.2 message - " + res.message);
            }
            else {
                console.log("TC20.3.3: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC20.3 error: " + e);
            https.get(data.telebot + data.TC20_3);
        }
    })      //end of TC20.3
    test("TC20.4: lichsugiaodich", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.lichsugiaodich)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send()

            // console.log("res: " + JSON.stringify(res));
            console.log("TC20.4 status - " + res.body.status + " - code - " + res.body.code);

            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC20.4.1 status - " + res.body.status + " - total - " + res.body.total);
            }
            else if (res.status === "Unauthorized") {
                console.log("TC20.4.2 message - " + res.message);
            }
            else {
                console.log("TC20.4.3: " + "Status - " + res.body.status);
            }
        }
        catch (e) {
            console.log("TC20.4 error: " + e);
            https.get(data.telebot + data.TC20_4);
        }
    })      //end of TC20.4
    test("TC20.5: Get user waller", async () => {
        try {
            const res = await request(data.baseUrl)
                .get(apilist.wallet)
                .set("User-Agent", data.useragent)
                .set("content-type", data.contenttype)
                .set("cookie", Cookies)
                .send()
            console.log("TC20.5: code - " + res.body.code + "  -  " + "status: " + res.body.status + "  -  " + "data: " + JSON.stringify(res.body.data));
            if (res.body.code === 200) {
                assert.equal(res.body.status, "OK");
                console.log("TC20.5.1 res.body.code === 200");
            }
            else {
                console.log("TC20.5.2 res.body.code: " + res.body.code);
            }
        }
        catch (e) {
            console.log("TC20.5 error: " + e);
            https.get(data.telebot + data.TC20_5);
        }
    })      //end of TC20.5
})          //end of Suite 20

/* ---- end of PART 2: NEED login Suites ---- */

afterAll( () => {
    // https.get(data.telebot + data.afterAll);

    //send report via telegram bot
    const bot = new Telegraf(data.bottoken); //token of tele bot

    bot.start((ctx) => ctx.reply('Welcome'))
    bot.help((ctx) => ctx.reply('Send me a sticker'))
    bot.on('sticker', (ctx) => ctx.reply('👍'))
    bot.hears('hi', (ctx) => {
        ctx.reply('Hey there');
        ctx.telegram.sendDocument(ctx.chat.id, { source: 'test-report.html' });
    });
    bot.launch()
    
    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))

    // app.stop();
    /*
    console.log("3")
    fs.watchFile(filePath, function() {
        console.log("4")
        file = fs.readFileSync(filePath);
        app.telegram.sendMessage("File content at: " + new Date() + " is: \n" + file);
    })
    console.log("5")
*/

    /*
    bot.start((ctx) => {
        ctx.reply('Hello');
        // ctx.telegram.sendDocument(ctx.chat.id, { source: 'test-report.html' });

        // bot.telegram.sendDocument(ctx.chat.id, { source: 'test-report.html' });
    })

    
    
    bot.hears('report', (ctx) => {
        ctx.telegram.sendDocument(ctx.chat.id, { source: 'test-report.html' });
    })

*/    
    // bot.launch();
    // bot.stop();
});
