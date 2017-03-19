var http = require("http");
var superagent= require("superagent");
var cheerio =require("cheerio");
var fs= require("fs")
var events = require("events");
var path = require('path');
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



getweb();
function getweb(){

    let cookies = fs.readFileSync('./c.txt');
    console.log(cookies.toString());
    superagent.get("http://xiaoxue.zujuan.com/yuwen/zhishidian/38463/?tx=0&nd=0&nf=0&px=0&p=1")
        .set("Cookie",cookies)
        .end(function(err,res){
        if(err){
            console.log("error"+err);
        }
        var $ = cheerio.load(res.text,{decodeEntities: false});
        var len=$("#ctl00_ContentPlaceHolder1_queslistbox_div").children(".quesbox").length;
        console.log(len);
        for(var i = 0 ;i<len;i++){
            var img=$("#ctl00_ContentPlaceHolder1_queslistbox_div").children(".quesbox").eq(i).find(".quesdiv").find(".quesbody").find("div").html();
            var anser=$("#ctl00_ContentPlaceHolder1_queslistbox_div").children(".quesbox").eq(i).find(".quesanswer").find("div").html();
            console.log("------------"+img);
            console.log("++++++++++++"+anser);
        }
    })
}


function obj2string(o){
    var r=[];
    if(typeof o=="string"){
        return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
    }
    if(typeof o=="object"){
        if(!o.sort){
            for(var i in o){
                r.push(i+":"+obj2string(o[i]));
            }
            if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
                r.push("toString:"+o.toString.toString());
            }
            r="{"+r.join()+"}";
        }else{
            for(var i=0;i<o.length;i++){
                r.push(obj2string(o[i]))
            }
            r="["+r.join()+"]";
        }
        return r;
    }
    return o.toString();
}