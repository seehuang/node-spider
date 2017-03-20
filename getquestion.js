var http = require("http");
var superagent= require("superagent");
var cheerio =require("cheerio");
var fs= require("fs")
var events = require("events");
var path = require('path');
var async = require("async");
//var emitter = new events.EventEmitter()
//setCookeie();
//emitter.on("setCookeie", getweb)
//function setCookeie () {
//    superagent.post('https://sso.zxxk.com/login?service=http://xiaoxue.zujuan.com/default.aspx')
//        //.type("form")
//        //.send({username:"xcsjyj"})
//        //.send({password:"789097"})
//        .end(function(err, res){
//            if (err) throw err;
//            console.log(res.header)
//            //var cookie = res.header['set-cookie'];  //从response中得到cookie
//            //console.log(cookie+"-----------cookie");
//            //emitter.emit("setCookeie", cookie)
//        })
//}

var pageCount=[];

for(var p=0;p<15;p++){
    pageCount.push("http://xiaoxue.zujuan.com/yuwen/zhishidian/38456/?tx=0&nd=0&nf=2015&px=0&p="+p);
}

var curCount = 0;
function getweb(url,callback){
    let cookies = fs.readFileSync('./c.txt');
    var delay = parseInt((Math.random() * 30000000) % 10000, 10);
    curCount++;
    console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
    superagent.get(url)
        .set("Cookie",cookies)
        .end(function(err,res){
            if(err){
                console.log("error"+err);
            }

            var $ = cheerio.load(res.text,{decodeEntities: false});
            var len=$("#ctl00_ContentPlaceHolder1_queslistbox_div").children(".quesbox").length;
            for(var i = 0 ;i<len;i++){
                var img=$("#ctl00_ContentPlaceHolder1_queslistbox_div").children(".quesbox").eq(i).find(".quesdiv").find(".quesbody").find("div").html();
                var anser=$("#ctl00_ContentPlaceHolder1_queslistbox_div").children(".quesbox").eq(i).find(".quesanswer").find("div").html();
                console.log("------------"+img);
                console.log("++++++++++++"+anser);
            }
    })
    setTimeout(function() {
        curCount--;
        callback(null,url +'Call back content');
    }, delay);

}

async.mapLimit(pageCount, 5 ,function (url, callback) {
    getweb(url, callback);
}, function (pageCount,result) {

})


