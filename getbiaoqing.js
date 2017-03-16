var http = require("http");
var superagent= require("superagent");
var cheerio =require("cheerio");
var fs= require("fs")
var mkdirp = require("mkdirp");
var path = require('path');
//本地存储目录
var dir="./images/bqb/";

mkdirp(dir,function(err){
	if(err){
		console.log("err创建目录失败"+err)
	}
})

var allurl=[];

for(var x=0;x<200;x++){
	allurl.push("https://www.doutula.com/article/list/?page="+x+1);
}
var kk=0;
var al=allurl.length-1;
var inter=setInterval(getweb,1500)

function getweb(){
	
	superagent.get(allurl[al]).end(function(err,res){
		if(err){
			console.log("error"+err);
		}
		var $ = cheerio.load(res.text);
		//var img=$(".nav-slide .col-xs-6 img:lastchild");
		var img=$(".nav-slide").find(".col-xs-6").find("img").filter(".lazy");
		console.log(img.length+"------------");
		for(var i= 0; i<img.length;i++){
			var filename=parsefilename(img.eq(i).attr("data-original"));
			//console.log(filename+"----filename111")
			getFile(img.eq(i).attr("data-original"),filename,i);
		}
	})
	al--;
	if(al==0){
		clearInterval(inter);
		console.log("关闭循环")
	}
}

// for(var k=0;k<allurl.length;k++){
// 	superagent.get(allurl[k]).end(function(err,res){
// 		if(err){
// 			console.log("error"+err);
// 		}
// 		var $ = cheerio.load(res.text);
// 		//var img=$(".nav-slide .col-xs-6 img:lastchild");
// 		var img=$(".nav-slide").find(".col-xs-6").find("img").filter(".lazy");
// 		console.log(img.length+"------------");
// 		for(var i= 0; i<img.length;i++){
// 			var filename=parsefilename(img.eq(i).attr("data-original"));
// 			//console.log(filename+"----filename111")
// 			getFile(img.eq(i).attr("data-original"),filename,i);
// 		}
// 	})
// }
	
function getFile(url,filename,i){
	var url=url.substring(2)
	var filename=filename.substring(2)
	console.log(url+"---url");
	console.log(filename+"+++filename");
	superagent.get(url).end(function(err,res){
		if(err){
			console.log("getFile 失败")
		}
		console.log("下载第个")
	}).pipe(fs.createWriteStream(dir+filename)).on('close', function(){
			console.log("down OK");
	});  //调用request的管道来下载到 images文件夹下
}	

function parsefilename(address){
	var filename=path.basename(address);
	return filename;
}