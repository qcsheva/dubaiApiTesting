const data = require("../testData/data.js");
const apilist = require("../apiList/apiPhattai.js");

module.exports ={
    login(username, pass){
        let user = { username: username, password: pass };
        const res = await request(data.baseUrl)
            .post(apilist.login)
            .set("content-type", data.contenttype)
            .set("user-agent", data.agent)
            .send(user);
    }
}