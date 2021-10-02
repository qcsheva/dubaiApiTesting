const request = require('supertest')
const { assert } = require("chai");
const apilist = require("../apiList/apiDubai.js");
const data = require("../testData/dataDubai.js");
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');

let Cookies, Cookies1, Cookies2;
let getBanksDeposit;

// Applies to all tests in this file
beforeEach(async () => {
    let userBeforeEach = { username: "ricky03", password: "123456" };
    const resBeforeEach =  await request(data.baseUrl)
        .post(apilist.login)
        .set("User-Agent", data.useragent)
        .send(userBeforeEach)
        .timeout(100000);
    let userBeforeEach2 = { username: "ricky04", password: "123456" };
    const resBeforeEach2 =  await request(data.baseUrl)
        .post(apilist.login)
        .set("User-Agent", data.useragent)
        .send(userBeforeEach2)
        .timeout(100000);
    Cookies = resBeforeEach.headers["set-cookie"].pop().split(";")[0];
    Cookies2 = resBeforeEach2.headers["set-cookie"].pop().split(";")[0];
    // console.log("Cookies: "+Cookies);
    // console.log("Cookies2: "+Cookies2);
});

/* ---- PART 1:no NEED login Suites ---- */
describe('Suite 1: Register', () => {
    test('TC1.1: Verify with username', async () => {
        let reg = { username: "rickykaka05" }
        const res = await request(data.baseUrl)
            .post(apilist.verifyUsername)              
            .set("User-Agent", data.useragent)          
            .send(reg)                                  
            // .timeout(10000);

            console.log("TC1.1 res.body.exist " +res.body.exist);
            if(res.body.exist === true){
                console.log("TC1.1.1: Tên đăng nhập đã tồn tại. Hãy chọn tên đăng nhập khác");
            }
            else if (res.body.exist === false){
                console.log("TC1.1.2: Tên đăng nhập hợp lệ. Hãy tiếp tục tạo tài khoản với email này");
            }
            else {
                console.log("TC1.1.3: Unknown Status. Hãy check lại code");
            }
    }), //end of TC1.1

    test("TC1.2: Register account successfully", async () => {
            let reg1 = {username: data.username, password: data.password, confirmPassword: data.password, phone: data.phone}
           
            // set the desired timeout in options -> dang chua bit ap dung s
            const options = {timeout: 3000,};

            const res = await request(data.baseUrl)
                .post(apilist.register)
                .set("User-Agent", data.useragent)
                .send(reg1);
                console.log("TC1.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);

                if (res.body.code === 200) {
                    console.log("TC1.2.1 code: " + res.body.code + "  -  " + "message: " + res.body.message);
                    assert.equal(res.body.message, "Register successful");
                }
                else if (res.body.code === 400) {
                    console.log("TC1.2.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
                    assert.equal(res.body.message, "Có lỗi khi đăng ký.Vui lòng thử lại");
                    assert.equal(res.body.message, "Thao tác không hợp lệ");
                }
                else if (res.body.code === 500) {
                    console.log("TC1.2.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
                    assert.equal(res.body.message, "Phát hiện hành vi không cho phép. Liên hệ CSKH để được hỗ trợ");
                }
                else {
                    console.log("TC2 Code other: " + res.body.code + "  -  " + "message: " + res.body.message);
                }
    })  //end of TC1.2
});         //end of Suite 1

describe('Suite 2: Login and create Cookies Sessions', () => {
    test("TC2.1: Forgot/Reset Password - Verify email", async () => {
        let user = { email: "ricky03@mailnesia.com" };
        const res = await request(data.baseUrl)
            .post(apilist.verifyEmail)
            .set("User-Agent", data.useragent)
            .send(user)
            // .timeout(60000);
        console.log("TC2.1: res.body.exist: " + res.body.exist + " - res.req.method - " + res.req.method);
        if(res.body.exist === true){
            console.log("TC2.1.1 Email đã tồn tại. Hãy chọn Email khác");
        }
        else if (res.body.exist === false){
            console.log("TC2.1.2 Email hợp lệ. Hãy tiếp tục tạo tài khoản");
        }
        else {
            console.log("TC2.1.3 Unknown Status. Hãy check lại code");
        }
    })      //end of TC2.1
    test("TC2.2: Forgot/Reset Password - Success with correct email", async () => {
        let user = { email: "hanuteam00@gmail.com" };
        const res = await request(data.baseUrl)
            .post(apilist.forgotPassword)
            .set("User-Agent", data.useragent)
            .send(user)
            // .timeout(60000);
        assert.equal(res.body.code, 200);
        assert.equal(res.body.message, "Email đã được gửi, vui lòng kiểm tra hộp thư để cập nhật thông tin.");
        console.log("TC2.2 res.body.status: " + res.body.status + " - res.body.message: " + res.body.message);
    })      //end of TC2.2
    test("TC2.3: Check login with invalid user", async () => {
        let user3 = { username: "rickyy01", password: "123456" };
        const res = await request(data.baseUrl)
            .post(apilist.login)
            // .set("content-type", data.contenttype)
            .set("User-Agent", data.useragent)
            .send(user3);
        console.log("TC2.3 code: " + res.body.code + "  -  " + "message: " + res.body.message);
        assert.equal(res.body.code, 404);
        assert.equal(res.body.message, "Không tìm thấy người dùng");
    }),     //end of TC2.3
    test("TC2.6: Check login with valid user", async () => {
        let user4 = { username: "ricky04", password: "123456" };
        const res4 = await request(data.baseUrl)
            .post(apilist.login)
            .set("User-Agent", data.useragent)
            .send(user4)
            .timeout(100000);
        Cookies1 = res4.headers["set-cookie"].pop().split(";")[0];
        console.log("TC2.6 res4.body.code: " + res4.body.code + "  -  " + "message: " + res4.body.message);
        assert.equal(res4.body.code, 200);
        assert.equal(res4.body.message, "Đăng nhập thành công");
    });     //end of TC2.6
});         //end of Suite 2

describe('Suite 12: MORE APIs', () => {
    test("TC12.1: tintuc", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.tintuc)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.1 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.1.1 status - " + res.body.status + " - code - " + res.body.code);
            }
            else {
                console.log("TC12.1.2 status - " + res.body.status);
            }
    })      //end of TC12.1
    test("TC12.2: taisaochonchungtoi", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.taisaochonchungtoi)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.2 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.2.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC12.2.2 status - " + res.body.status);
            }
    })      //end of TC12.2
    test("TC12.3: soikeonhacaihomnay", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.soikeonhacaihomnay)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.3 status - " + res.body.status + " - code - " + res.body.code);
        if (res.body.code === 200) {
            assert.equal(res.body.code, 200);
            assert.equal(res.body.status, "OK");
            console.log("TC12.3.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
        }
        else {
            console.log("TC12.3.2 status - " + res.body.status);
        }
    })      //end of TC12.3
    test("TC12.4: dieukhoanvadieukien", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.dieukhoanvadieukien)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.4 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.4.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC12.4.2 Status - " + res.body.status);
            }
    })      //end of TC12.4
    test("TC12.5: keochaua", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.keochaua)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.5 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.5.1 status - " + res.body.status + " - url - " + res.body.data.url);
            }
            else {
                console.log("TC12.5.2 Status - " + res.body.status);
            }
    })      //end of TC12.5
    test("TC12.6: keochauau", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.keochauau)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.6 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.6.1 status - " + res.body.status + " - url - " + res.body.data.url);
            }
            else {
                console.log("TC12.6.2 Status - " + res.body.status);
            }
    })      //end of TC12.6
    test("TC12.7: nhungcauhoithuonggap", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.nhungcauhoithuonggap)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.7 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.7.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC12.7.2 status - " + res.body.status);
            }
    })      //end of TC12.7
    test("TC12.8: gioithieu", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.gioithieu)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.8 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.8.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC12.8.2 status - " + res.body.status);
            }
    })      //end of TC12.8
    test("TC12.9: chinhsachbaomat", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.chinhsachbaomat)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.9 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.9.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC12.9.2 status - " + res.body.status);
            }
    })      //end of TC12.9
    test("TC12.10: huongdannaptien", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.huongdannaptien)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            console.log("TC12.10 status - " + res.body.status + " - code - " + res.body.code);

            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.10.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC12.10.2 status - " + res.body.status);
            }
    })      //end of TC12.10
    test("TC12.11: huongdanruttien", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.huongdanruttien)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            // .set("sec-fetch-dest", data.secfetchdest)
            // .set("sec-fetch-mode", data.secfetchmode)
            // .set("sec-fetch-site", data.secfetchsite)
            .send()
            console.log("TC12.11 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.11.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC12.11.2 Status - " + res.body.status);
            }
    })      //end of TC12.11
    test("TC12.12: huongdancacuoc", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.huongdancacuoc)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            // .set("sec-fetch-dest", data.secfetchdest)
            // .set("sec-fetch-mode", data.secfetchmode)
            // .set("sec-fetch-site", data.secfetchsite)
            .send()
            console.log("TC12.12 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.12.1 status - " + res.body.status + " - alias - " + res.body.post.alias);
            }
            else {
                console.log("TC12.12.2 status - " + res.body.status);
            }
    })      //end of TC12.12
    test("TC12.13: hotmatch", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.hotmatch)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            // .set("sec-fetch-dest", data.secfetchdest)
            // .set("sec-fetch-mode", data.secfetchmode)
            // .set("sec-fetch-site", data.secfetchsite)
            .send()
            console.log("TC12.13 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.13.1 status - " + res.body.status + " - code - " + res.body.code);
            }
            else {
                console.log("TC12.13.2 status - " + res.body.status);
            }
    })      //end of TC12.13
    test("TC12.14: whitelist", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.whitelist)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            // .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            // .set("sec-fetch-dest", data.secfetchdest)
            // .set("sec-fetch-mode", data.secfetchmode)
            // .set("sec-fetch-site", data.secfetchsite)
            .send()
            .timeout(60000);
            console.log("TC12.14 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC12.14.1 status - " + res.body.status + " - code - " + res.body.code);
            }
            else {
                console.log("TC12.14.2 status - " + res.body.status);
            }
    })      //end of TC12.14    
    test("TC12.15: download", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.download)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            // .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            // .timeout(60000);
            console.log("TC12.15 res: " + JSON.stringify(res));
            console.log("TC12.15 status - " + res.status);
            if (res.status === 200) {
                expect(res.text).toContain("Redirecting to")
                console.log("TC12.15.1 status - " + res.status + " - text - " + JSON.stringify(res.text));
            }
            else if (res.status === 301) {
                expect(res.text).toContain("Redirecting to")
                console.log("TC12.15.2 status - " + res.status + " - text - " + JSON.stringify(res.text));
            }
            else {
            console.log("TC12.15.3 status - " + res.status);
            }
    })      //end of TC12.15
    test("TC12.16: favorites", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.favorites)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            // .timeout(60000);
            // console.log("TC12.16 res: " + JSON.stringify(res));
            console.log("TC12.16 res.body.code: " +res.body.code + " - res.status: "+res.status);
            if (res.status === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC 12.16.1 res.status === 200");
            }
            else if (res.status === "OK") {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC 12.16.2 res.status === OK");
            }
            else {
                console.log("TC12.16.3 code "+ res.body.code);
            }
    })      //end of TC12.16
});         //end of Suite 12

describe('Suite 13: SPORT', () => {
    test("TC13.1: psport", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.psport)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            // console.log("TC13.1 res: "+JSON.stringify(res))
            console.log("TC13.1 res.body.code - " + res.body.code + " - res.status - " +res.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC13.1.1 status - " + res.body.status + " - res.body.data - " + JSON.stringify(res.body.data));
            }
            else if(res.status === 302){
                console.log("TC13.1.2 status - " + res.status + " - res.text - " + JSON.stringify(res.text));
            }
            else if(res.status === 200){
                console.log("TC13.1.3 status - " + res.status + " - res.text - " + JSON.stringify(res.text.data));
            }
            else {
                console.log("TC13.1.4 status - " + res.body.status);
            }
    })      //end of TC13.1
    test("TC13.2: csport", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.csport)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            // console.log("TC13.2 res: "+JSON.stringify(res))
            console.log("TC13.2 res.body.code - " + res.body.code + " - res.status - " +res.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC13.2.1 status - " + res.body.status + " - res.body.data - " + JSON.stringify(res.body.data));
            }
            else if(res.status === 302){
                console.log("TC13.2.2 status - " + res.status + " - res.text - " + JSON.stringify(res.text));
            }
            else if(res.status === 200){
                console.log("TC13.2.3 status - " + res.status + " - res.text - " + JSON.stringify(res.text.data));
            }
            else {
                console.log("TC13.2.4 status - " + res.body.status);
            }
    })      //end of TC13.2
    test("TC13.3: ksport", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.ksport)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            // console.log("TC13.3 res: "+JSON.stringify(res))
            console.log("TC13.3 res.body.code - " + res.body.code + " - res.status - " +res.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC13.3.1 status - " + res.body.status + " - res.body.data - " + JSON.stringify(res.body.data));
            }
            else if(res.status === 302){
                console.log("TC13.3.2 status - " + res.status + " - res.text - " + JSON.stringify(res.text));
            }
            else if(res.status === 200){
                console.log("TC13.3.3 status - " + res.status + " - res.text - " + JSON.stringify(res.text.data));
            }
            else {
                console.log("TC13.3.4 status - " + res.body.status);
            }
    })      //end of TC13.3
    test("TC13.4: ssport", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.ssport)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            // console.log("TC13.4 res: "+JSON.stringify(res))
            console.log("TC13.4 res.body.code - " + res.body.code + " - res.status - " +res.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC13.4.1 status - " + res.body.status + " - res.body.data - " + JSON.stringify(res.body.data));
            }
            else if(res.status === 302){
                console.log("TC13.4.2 status - " + res.status + " - res.text - " + JSON.stringify(res.text));
            }
            else if(res.status === 200){
                console.log("TC13.4.3 status - " + res.status + " - res.text - " + JSON.stringify(res.text.data));
            }
            else {
                console.log("TC13.4.4 status - " + res.body.status);
            }
    })      //end of TC13.4
});         //end of Suite 13

describe('Suite 14: GAMES', () => {
    test("TC14.1: live casino", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.casino)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.1 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.1.1 status - " + res.body.status + " - data[0].id - " + JSON.stringify(res.body.data[0].id));
            }
            else {
                console.log("TC14.1.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.1
    test("TC14.2: gamebai", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.gamebai)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.2 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.2.1 status - " + res.body.status + " - name - " + JSON.stringify(res.body.data.name));
            }
            else {
                console.log("TC14.2.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.2
    test("TC14.3: keno", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.keno)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.3 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.3.1 status - " + res.body.status + " - url - " + JSON.stringify(res.body.data.url));
            }
            else {
                console.log("TC14.3.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.3
    test("TC14.4: lode", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.lode)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.4 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.4.1 status - " + res.body.status + " - url - " + JSON.stringify(res.body.data.url));
            }
            else {
                console.log("TC14.4.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.4
    test("TC14.5: lodesieutoc", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.lodesieutoc)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.5 status - " + res.body.status + " - code - " + res.body.code);

            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.5.1 status - " + res.body.status + " - url - " + JSON.stringify(res.body.data.url));
            }
            else {
                console.log("TC14.5.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.5
    test("TC14.6: quaysomunich", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.quaysomunich)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.6 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.6.1 status - " + res.body.status + " - data - " + JSON.stringify(res.body.data));
            }
            else {
                console.log("TC14.6.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.6
    test("TC14.7: quaysoberlin", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.quaysoberlin)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.7 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.7.1 status - " + res.body.status + " - data - " + JSON.stringify(res.body.data));
            }
            else {
                console.log("TC14.7.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.7
    test("TC14.8: quaysoatom", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.quaysoatom)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.8 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.8.1 status - " + res.body.status + " - data - " + JSON.stringify(res.body.data));
            }
            else {
                console.log("TC14.8.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.8
    test("TC14.9: banca", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.banca)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.9 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.9.1 status - " + res.body.status + " - name - " + JSON.stringify(res.body.data.name));
            }
            else {
                console.log("TC14.9.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.9
    test("TC14.10: congame", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.congame)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.10 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.10.1 status - " + res.body.status + " - name - " + JSON.stringify(res.body.data.name));
            }
            else {
                console.log("TC14.10.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.10
    test("TC14.11: ingame", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.ingame)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            .timeout(200000);
            console.log("TC14.11 status - " + res.body.status + " - code - " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC14.11.1 status - " + res.body.status + " - name - " + JSON.stringify(res.body.data.name));
            }
            else {
                console.log("TC14.11.2: " + "Status - " + res.body.status);
            }
    })      //end of TC14.11
})          //end of Suite 14

describe('Suite 16: Game Providers', () => {
    test("TC16.1: allproviders", async () => {
        // let user = { username: "ricky03", password: "123456" };
        const res = await request(data.baseUrl)
            .get(apilist.allproviders)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            // .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            // .timeout(200000);

        // console.log("res: " + JSON.stringify(res));
        console.log("TC16.1 code - " + res.body.code + " - status - " + res.body.status) ;

        if (res.body.code === 200) {               
            console.log("TC16.1.1 total games - " + JSON.stringify(res.body.data.total)) ;
        }
        else {
            console.log("TC16.1.2 ")
        }
    })      //end of TC16.1
})          //end of Suite 16
/* ---- end of PART 1:no NEED login Suites ---- */


/* ---- PART 2: NEED login Suites ---- */
describe('Suite 3: Deposit Internet Banking', () => {
    test("TC3.1: ibanking - ACB", async () => {
        let user = { to_bank_code: "ACB", to_bank_no: "10256967", to_bank_name: "Lương Hoàng Vũ", 
        bank_trancode: "", from_bank_name: "ricky01", amount_deposit: "551", amount_deposit_mask: "551", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);      
        console.log("TC3.1 Code: " + res.body.code);
        if (res.body.code === 200) {
            assert.equal(res.body.message, "Create Invoice successfully.");
            console.log("TC3.1.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
        }
        else if (res.body.code === 400) {
            assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
            console.log("TC3.1.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
        }
        else {
            console.log("TC3.1.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
        }
    })      //end of TC3.1
    test.skip("TC3.2: ibanking - BIDV", async () => {
        let user = { to_bank_code: "BIDV", to_bank_no: "15010000692808", to_bank_name: "Trương Văn Bảo", 
        bank_trancode: "bidvso tknh", from_bank_name: "ricky01", amount_deposit: "552", amount_deposit_mask: "552", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC3.2 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC3.2.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC3.2.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC3.2.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC3.2
    test.skip("TC3.3: ibanking - Vietinbank", async () => {
        let user = { to_bank_code: "Vietinbank", to_bank_no: "102871149391", to_bank_name: "Trương Văn Bảo", 
        bank_trancode: "Vietinbank_sotknhnguoichuyen", from_bank_name: "ricky01", amount_deposit: "553", amount_deposit_mask: "553", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC3.3 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC3.3.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC3.3.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC3.3.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC3.3
    test.skip("TC3.4: ibanking - Vietcombank", async () => {
        let user = { to_bank_code: "Vietcombank", to_bank_no: "1013121545", to_bank_name: "Lê Anh Thái", 
        bank_trancode: "vietcom ma giao dich", from_bank_name: "ricky01", amount_deposit: "554", amount_deposit_mask: "554", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC3.4 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC3.4.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC3.4.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC3.4.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC3.4
    test.skip("TC3.5: ibanking - DongA", async () => {
        let user = { to_bank_code: "DongA", to_bank_no: "0111191258", to_bank_name: "Lương Hoàng Vũ", 
        bank_trancode: "DongA magiaodich", from_bank_name: "ricky01", amount_deposit: "555", amount_deposit_mask: "555", method: "ibanking", package_id: 1 };
        console.log("TC5.5 Cookies: " + Cookies);
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC3.45Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC3.5.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC3.5.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC3.5.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC3.5
    test.skip("TC3.6: ibanking - Techcombank", async () => {
        let user = { to_bank_code: "Techcombank", to_bank_no: "19036786760017", to_bank_name: "Hoàng Hồng Quân", 
        bank_trancode: "techcom SỐ BÚT TOÁN (FTXXX)", from_bank_name: "ricky01", amount_deposit: "556", amount_deposit_mask: "556", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC3.6 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC3.6.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC3.6.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC3.6.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC3.6
    test.skip("TC3.7: ibanking - Sacombank", async () => {
        let user = { to_bank_code: "Sacombank", to_bank_no: "020084225259", to_bank_name: "Lương Hoàng Vũ", 
        bank_trancode: "Sacombank thoigianchuyen", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC3.7 Code: " + res.body.code);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC3.7.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC3.7.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC3.7.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }    
    })      //end of TC3.7
});         //end of Suite 3

describe('Suite 4: Deposit ATM', () => {
    test("TC4.1: ATM - ACB", async () => {
        let user = { to_bank_code: "ACB", to_bank_no: "10256967", to_bank_name: "Lương Hoàng Vũ", 
        bank_trancode: "", from_bank_name: "ricky01", amount_deposit: "551", amount_deposit_mask: "551", method: "atm", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
        console.log("TC4.1 Code: " + res.body.code);
        if (res.body.code === 200) {
            assert.equal(res.body.message, "Create Invoice successfully.");
            console.log("TC4.1.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
        }
        else if (res.body.code === 400) {
            assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
            console.log("TC4.1.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
        }
        else {
            console.log("TC4.1.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
        }
    })      //end of TC4.1
    test.skip("TC4.2: ATM - BIDV", async () => {
        let user = { to_bank_code: "BIDV", to_bank_no: "15010000692808", to_bank_name: "Trương Văn Bảo", 
        bank_trancode: "bidvso tknh", from_bank_name: "ricky01", amount_deposit: "552", amount_deposit_mask: "552", method: "atm", package_id: 1 };
        console.log("TC5.2 Cookies: " + Cookies);
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC4.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC4.2.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC4.2.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC4.2.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC4.2
    test.skip("TC4.3: ATM - Vietinbank", async () => {
        let user = { to_bank_code: "Vietinbank", to_bank_no: "102871149391", to_bank_name: "Trương Văn Bảo", 
        bank_trancode: "Vietinbank_sotknhnguoichuyen", from_bank_name: "ricky01", amount_deposit: "553", amount_deposit_mask: "553", method: "atm", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC4.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC4.3.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC4.3.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC4.3.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC4.3
    test.skip("TC4.4: ATM - Vietcombank", async () => {
        let user = { to_bank_code: "Vietcombank", to_bank_no: "1013121545", to_bank_name: "Lê Anh Thái", 
        bank_trancode: "vietcom ma giao dich", from_bank_name: "ricky01", amount_deposit: "554", amount_deposit_mask: "554", method: "atm", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC4.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC4.4.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC4.4.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC4.4.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC4.4
    test.skip("TC4.5: ATM - DongA", async () => {
        let user = { to_bank_code: "DongA", to_bank_no: "0111191258", to_bank_name: "Lương Hoàng Vũ", 
        bank_trancode: "DongA magiaodich", from_bank_name: "ricky01", amount_deposit: "555", amount_deposit_mask: "555", method: "atm", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC4.5 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC4.5.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC4.5.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC4.5.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }    
    })      //end of TC4.5
    test.skip("TC4.6: ATM - Techcombank", async () => {
        let user = { to_bank_code: "Techcombank", to_bank_no: "19036786760017", to_bank_name: "Hoàng Hồng Quân", 
        bank_trancode: "techcom SỐ BÚT TOÁN (FTXXX)", from_bank_name: "ricky01", amount_deposit: "556", amount_deposit_mask: "556", method: "atm", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC4.6 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC4.6.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC4.6.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC4.6.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC4.6
    test.skip("TC4.7: ATM - Sacombank", async () => {
        let user = { to_bank_code: "Sacombank", to_bank_no: "020084225259", to_bank_name: "Lương Hoàng Vũ", 
        bank_trancode: "Sacombank thoigianchuyen", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "atm", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC4.7 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC4.7.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC4.7.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC4.7.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }    
    })      //end of TC4.7
});         //end of Suite 4

describe('Suite 5: Deposit Bank - Tai Quay', () => {
    test("TC5.1: banking - ACB", async () => {
        let user = { to_bank_code: "ACB", to_bank_no: "10256967", to_bank_name: "Lương Hoàng Vũ", 
        bank_trancode: "", from_bank_name: "ricky01", amount_deposit: "551", amount_deposit_mask: "551", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
        console.log("TC5.1 Code: " + res.body.code);
        if (res.body.code === 200) {
            assert.equal(res.body.message, "Create Invoice successfully.");
            console.log("TC5.1.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
        }
        else if (res.body.code === 400) {
            assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
            console.log("TC5.1.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
        }
        else {
            console.log("TC5.1.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
        }
    })      //end of TC5.1
    test.skip("TC5.2: banking - BIDV", async () => {
        let user = { to_bank_code: "BIDV", to_bank_no: "15010000692808", to_bank_name: "Trương Văn Bảo", 
        bank_trancode: "bidvso tknh", from_bank_name: "ricky01", amount_deposit: "552", amount_deposit_mask: "552", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC5.2 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC5.2.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC5.2.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC5.2.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC5.2
    test.skip("TC5.3: banking - Vietinbank", async () => {
        let user = { to_bank_code: "Vietinbank", to_bank_no: "102871149391", to_bank_name: "Trương Văn Bảo", 
        bank_trancode: "Vietinbank_sotknhnguoichuyen", from_bank_name: "ricky01", amount_deposit: "553", amount_deposit_mask: "553", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC5.3 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC5.3.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC5.3.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC5.3.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC5.3
    test.skip("TC5.4: banking - Vietcombank", async () => {
        let user = { to_bank_code: "Vietcombank", to_bank_no: "1013121545", to_bank_name: "Lê Anh Thái", 
        bank_trancode: "vietcom ma giao dich", from_bank_name: "ricky01", amount_deposit: "554", amount_deposit_mask: "554", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC5.4 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC5.4.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC5.4.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC5.4.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC5.4
    test.skip("TC5.5: banking - DongA", async () => {
        let user = { to_bank_code: "DongA", to_bank_no: "0111191258", to_bank_name: "Lương Hoàng Vũ", bank_trancode: "DongA magiaodich", from_bank_name: "ricky01", amount_deposit: "555", amount_deposit_mask: "555", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC5.5 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC5.5.1 Code 1: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC5.5.2 Code 2: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC5.1.3 Code 3: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC5.5
    test.skip("TC5.6: banking - Techcombank", async () => {
        let user = { to_bank_code: "Techcombank", to_bank_no: "19036786760017", to_bank_name: "Hoàng Hồng Quân", bank_trancode: "techcom SỐ BÚT TOÁN (FTXXX)", from_bank_name: "ricky01", amount_deposit: "556", amount_deposit_mask: "556", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC5.6 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC5.6.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC5.6.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC5.6.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC5.6
    test.skip("TC5.7: DIB - Sacombank", async () => {
        let user = { to_bank_code: "Sacombank", to_bank_no: "020084225259", to_bank_name: "Lương Hoàng Vũ", bank_trancode: "Sacombank thoigianchuyen", from_bank_name: "ricky01", amount_deposit: "557", amount_deposit_mask: "557", method: "ibanking", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.ibanking)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC5.7 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            if (res.body.code === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC5.7.1 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC5.7.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC5.7.3 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
    })      //end of TC5.7
});         //end of Suite 5

describe('Suite 6: Deposit PAYWIN - smartpay', () => {
    test("TC6.1: smartpay - BIDV", async () => {
        let user = { to_bank_code: "BIDV", smartpay_code: "bidv", amount_smartpay: "101", amount_smartpay_mask: "101", method: "smartpay", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.paywin)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies2)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .set("sec-fetch-dest", data.secfetchdest)
            .set("sec-fetch-mode", data.secfetchmode)
            .set("sec-fetch-site", data.secfetchsite)
            .send(user)
            // .timeout(10000);
            // console.log("TC6.1 res: "+ JSON.stringify(res));
            console.log("TC6.1 Code: " + res.body.code + " - res.body.status - " +res.body.status);
            if (res.body.status === "OK") {
                assert.equal(res.body.status, "OK");
                console.log("TC6.1.1 res.body.status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC6.1.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC6.1.3 res.body.status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
    })      //end of TC6.1
    test.skip("TC6.2: smartpay - ATM", async () => {
        let user = { to_bank_code: "ACB", smartpay_code: "acb", amount_smartpay: "102", amount_smartpay_mask: "102", method: "smartpay", package_id: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.paywin)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .set("sec-fetch-dest", data.secfetchdest)
            .set("sec-fetch-mode", data.secfetchmode)
            .set("sec-fetch-site", data.secfetchsite)
            .send(user)
            // .timeout(10000);
            // console.log("TC6.1 res: "+ JSON.stringify(res));
            console.log("TC621 Code: " + res.body.code + " - res.body.status - " +res.body.status);
            if (res.body.status === "OK") {
                assert.equal(res.body.status, "OK");
                console.log("TC6.2.1 res.body.status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Bạn đã nạp 3 lần, vui lòng chờ xử lí xong");
                console.log("TC6.2.2 Code: " + res.body.code + "  -  " + "message: " + res.body.message);
            }
            else {
                console.log("TC6.2.3 res.body.status: " + res.body.status + "  -  " + "url: " + res.body.url);
            }
    })      //end of TC6.2
    //...continue here fore other banks ...
});         //end of Suite 6

describe('Suite 7: Deposit CARD - Nap the cao', () => {
    test("TC7.1: card - Viettel", async () => {
        let user = { to_telcom_code: "VIETTEL", card_code: "pin_of_viettel", card_serial: "serial_of_viettel", card_amount: 1000000, card_status: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.card)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies2)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC7.1 status: " + res.body.status);
            if (res.body.code === 200) {
                console.log("TC7.1.1 Code: " + res.body.status + "  -  " + "data: " + JSON.stringify(res.body.data));
                assert.equal(res.body.code, 200);
            }
            else if (res.body.code === 314) {
                console.log("TC7.1.2 Code: " + res.body.status + "  -  " + "message: " + res.body.message);
                assert.equal(res.body.message, "Quý khách đang có nhiều phiếu đang chờ xủ lý, vui lòng chờ trong giây lát.");
            }
            else {
                console.log("TC7.1.3 Code: res.body.status: " + res.body.status);
            }
    })      //end of TC7.1
            //...continue here fore other cards ...
});         //end of Suite 7

describe('Suite 8: Deposit MOMO', () => {
    test("TC8.1: momo", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.momo)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies2)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            // .timeout(10000);
            console.log("TC8.1 Status: " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                console.log("TC8.1 Code 1: " + "Status - " + res.body.status + "  -  " + "data: " + JSON.stringify(res.body.data));
            }
            else if (res.body.code === 404) {
                console.log("TC8.2 Code: " + "Status - " + res.body.status + "  -  " + "message: " + res.body.message);
                assert.equal(res.body.message, "Quý khách đang có nhiều phiếu đang chờ xủ lý, vui lòng chờ trong giây lát.");
            }
            else {
                console.log("TC8.3 Code: res.body.code: " + res.body.code + "  -  " + "status: " + res.body.status);
            }
    })      //end of TC8.1
});         //end of Suite 8

describe('Suite 9: Withdraw BANKS', () => {
    test("TC9.1: Withdraw with DongA bank", async () => {
        let user = { to_bank_code: "DongA", to_bank_no: "sotaikhoan_donga", to_bank_name: "ricky03", amount_withdraw: "100", amount_withdraw_mask: "100", verify_phone: "" };
        const res = await request(data.baseUrl)
            .post(apilist.withdrawbank)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            // console.log("TC9.1 res: "+ JSON.stringify(res));
            console.log("TC9.1 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC9.1.1 res.body.status - " + res.body.status + "  -  " + "data: " + res.body.data);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC9.1.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC9.1.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.status === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC9.1.4 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.status === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC9.1.5 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }              
            else {
                console.log("TC9.1.6 res.body.status: " + res.body.status + "  -  " + "data: " + res.body.message);
            }
    })      //end of TC9.1
    //...continue here fore other banks ...
});         //end of Suite 9

describe('Suite 10: Withdraw CARDS', () => {
    test("TC10.1: Viettel", async () => {
        let user = { to_telcom_code: "VIETTEL", card_amount_unit: 100000, card_number: "1", verify_phone: "", card_status: 1 };
        const res = await request(data.baseUrl)
            .post(apilist.withdrawcard)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            // console.log("TC9.1 res: "+ JSON.stringify(res));
            console.log("TC10.1 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC10.1.1 res.body.status - " + res.body.status + "  -  " + "data: " + res.body.data);
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC10.1.2 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC10.1.3 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.status === 200) {
                assert.equal(res.body.message, "Create Invoice successfully.");
                console.log("TC10.1.4 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }
            else if (res.status === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC10.1.5 res.body.status - " + res.body.status + "  -  " + "message: " + res.body.message);
            }              
            else {
                console.log("TC10.1.6 res.body.status: " + res.body.status + "  -  " + "data: " + res.body.message);
            }
    })      //end of TC10.1
//...continue here fore other cards ...
});         //end of Suite 10

describe('Suite 11: Update User Infor', () => {
    test("TC11.1: Update User Infor", async () => {
        let user = { fullname: "ricky03", bank_name: "ricky03_" + data.rNum, email: "ricky03_" + data.rNum + "@mailnesia.com", password: "123456", confirmPassword: "123456", ref_id: "" };
        const res = await request(data.baseUrl)
            .post(apilist.updateInfo)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send(user)
            // .timeout(10000);
            console.log("TC11.1 res.body.status - " + res.body.status);
            if (res.body.code === 200) {
                assert.equal(res.body.code, 200);
                assert.equal(res.body.status, "OK");
                console.log("TC11.1.1 res.body.user - " + JSON.stringify(res.body.user));
            }
            else if (res.body.code === 318) {
                assert.equal(res.body.message, "Tài khoản không đủ tiền để thực hiện lệnh rút");
                console.log("TC11.1.2 res.body.status - " + res.body.status + "  -  " + "user: " + JSON.stringify(res.body.user));
            }
            else if (res.body.code === 400) {
                assert.equal(res.body.message, "Không tìm thấy khuyến mãi");
                console.log("TC11.1.3 res.body.status - " + res.body.status + "  -  " + "user: " + JSON.stringify(res.body.user));
            }
            else {
                console.log("TC11.1.4 res.body.status - " + res.body.status + "  -  " + "user: " + JSON.stringify(res.body.user));
            }
    })      //end of TC11.1
});         //end of Suite 11

describe('Suite 15: Account', () => {
    test("TC15.1: indexaccount", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.indexaccount)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            // .set("sec-fetch-dest", data.secfetchdest)
            // .set("sec-fetch-mode", data.secfetchmode)
            // .set("sec-fetch-site", data.secfetchsite)
            // .send(user)
            .send();

        // console.log("res: " + JSON.stringify(res));
        console.res.body.balance("TC15.1 res.body.balance - " + JSON.stringify(res.body.balance) + " - res.status - " + res.status);

        if (!res.body.plan) {               //ko tham gia km
            assert.equal(res.status, 200);
            console.log("TC15.1.1 res.body.balance - " + JSON.stringify(res.body.balance) + " - res.status - " + res.status+ " - res.text - " + res.text);
        }
        else if (res.body.plan){
            assert.equal(res.status, 200);  //co tham gia km
            console.log("TC15.1.2 res.body.balance - " + JSON.stringify(res.body.balance) + " - res.status - " + res.status+ " - res.body.plan.name - " + res.body.plan.name);
        }
        else {
            console.log("TC15.1.3 res.status - " + res.status);
        }
    })      //end of TC15.1
    test("TC15.2: lichsucacuoc", async () => {
        // let user = { username: "ricky03", password: "123456" };
        const res = await request(data.baseUrl)
            .get(apilist.lichsucacuoc)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            // .set("sec-fetch-dest", data.secfetchdest)
            // .set("sec-fetch-mode", data.secfetchmode)
            // .set("sec-fetch-site", data.secfetchsite)
            // .send(user)
            .send()
            .timeout(200000);

            // console.log("res: " + JSON.stringify(res));
        console.log("TC15.2 status - " + res.body.status + " - code - " + res.body.code);

        if (res.body.code === 200) {
            assert.equal(res.body.code, 200);
            console.log("TC15.2.1 status - " + res.body.status + " - total - " + res.body.total);
        }
        else if(res.status === "Unauthorized"){
            console.log("TC15.2.2 message - " + res.message);
        }
        else {
            console.log("TC15.2.3: " + "Status - " + res.body.status);
        }
    })      //end of TC15.2
    test("TC15.3: lichsupsport", async () => {
        // let user = { username: "ricky03", password: "123456" };
        const res = await request(data.baseUrl)
            .get(apilist.lichsupsport)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            // .set("sec-fetch-dest", data.secfetchdest)
            // .set("sec-fetch-mode", data.secfetchmode)
            // .set("sec-fetch-site", data.secfetchsite)
            // .send(user)
            .send()
            .timeout(200000);

            // console.log("res: " + JSON.stringify(res));
        console.log("TC15.3 status - " + res.body.status + " - code - " + res.body.code);

        if (res.body.code === 200) {
            assert.equal(res.body.code, 200);
            console.log("TC15.3.1 status - " + res.body.status + " - total - " + res.body.total);
        }
        else if(res.status === "Unauthorized"){
            console.log("TC15.3.2 message - " + res.message);
        }
        else {
            console.log("TC15.3.3: " + "Status - " + res.body.status);
        }
    })      //end of TC15.3
    test("TC15.4: lichsugiaodich", async () => {
        // let user = { username: "ricky03", password: "123456" };
        const res = await request(data.baseUrl)
            .get(apilist.lichsugiaodich)
            .set("Accept", data.accept)
            // .set("accept-encoding", data.acceptencoding)
            // .set("accept-language", data.acceptlanguage)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            // .set("secchua", data.secchua)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            // .set("sec-fetch-dest", data.secfetchdest)
            // .set("sec-fetch-mode", data.secfetchmode)
            // .set("sec-fetch-site", data.secfetchsite)
            // .send(user)
            .send()
            .timeout(200000);

            // console.log("res: " + JSON.stringify(res));
        console.log("TC15.4 status - " + res.body.status + " - code - " + res.body.code);

        if (res.body.code === 200) {
            assert.equal(res.body.code, 200);
            console.log("TC15.4.1 status - " + res.body.status + " - total - " + res.body.total);
        }
        else if(res.status === "Unauthorized"){
            console.log("TC15.4.2 message - " + res.message);
        }
        else {
            console.log("TC15.4.3: " + "Status - " + res.body.status);
        }
    })      //end of TC15.4
    test("TC15.5: Get user waller", async () => {
        const res = await request(data.baseUrl)
            .get(apilist.wallet)
            .set("Accept", data.accept)
            .set("ContentLength", data.ContentLength)
            .set("Content-Type", data.contenttype)
            .set("cookie", Cookies)
            .set("DNT", data.DNT)
            .set("Connection", data.Connection)
            .set("secchuamobile", data.secchuamobile)
            .set("secchuaplatform", data.secchuaplatform)
            .set("Host", data.Host)
            .set("user-agent", data.useragent)
            .send()
            // .timeout(10000);
        console.log("TC15.5: code - " + res.body.code + "  -  " + "status: " + res.body.status + "  -  " + "data: " + JSON.stringify(res.body.data));
        if (res.body.code === 200) {
            assert.equal(res.body.status, "OK");
            console.log("TC15.5.1 res.body.code === 200");
        }
        else {
            console.log("TC15.5.2 res.body.code: " + res.body.code);
        }
    })  //end of TC15.5
})          //end of Suite 15

/* ---- end of PART 2: NEED login Suites ---- */

