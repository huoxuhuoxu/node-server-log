// test
var inputLog = require("../index");

var req = {
    method: "GET",
    path: "/test",
    body: {
        "name": "test"
    }
};

const test = function(params, done){
    var res = {
        end: function(){},
        statusCode: 200,
    };
    let fn = inputLog(params);
    fn(req, res, () => {});
    res.end();
    done();
};


describe("测试日志中间件", function(){

    it("默认参数", (done) => {
        test(undefined, done);
    });

    it("字符串修改: 日期格式", (done) => {
        test("YYYY-mm-dd HH/MM/SS", done);
    });

    it("字符串修改: 日期格式2", (done) => {
        test("YYYY-mm-dd HH", done);
    });

    it("字符串修改: 日期格式3", (done) => {
        test("YYYY-mm", done);
    });

    it("字符串修改: 日期格式4", (done) => {
        test("YYYY/dd", done);
    });

    it("字符串修改: 日期格式5", (done) => {
        test("YYYY/dd HH:MM", done);
    });

    it("不存在的关键字", (done) => {
        test("YYYY/ZZ", done);
    });

    it("空值", (done) => {
        test("", done);
    });

});

