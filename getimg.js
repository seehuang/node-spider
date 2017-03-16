var http = require('http');
var superagent =require('superagent');
var cheerio =require('cheerio');
var fs = require("fs")
superagent.get('http://www.sccnn.com/gaojingtuku').end(function(err,res){
	console.log('状态码：' + res.statusCode);
	console.log('响应码：' +JSON.stringify(res.headers));
	res.setEncoding('utf8');
	var $ = cheerio.load(res.text);
	var imglist=$("table").find("div").find("img");
	console.log(imglist.length+"==================");
	for(var i=1 ;i< imglist.length-1 ;i++){
		console.log(imglist.eq(i).attr("src")+"+++++++++++++")
		superagent.get(imglist.eq(i).attr("src"),function(err,res){
			 if (err) {
		        console.log('err: '+ err);
		        return false;
		    }
		}).pipe(fs.createWriteStream('images/'+i+'.jpg')).on('close', function(){
			console.log("down OK");
		});  //调用request的管道来下载到 images文件夹下

	}

})




// var http = require('http');
// var superagent =require('superagent');
// var cheerio =require('cheerio');
// var fs = require("fs")
// superagent.get('http://www.sccnn.com/gaojingtuku').end(function(err,res){
// 	console.log('状态码：' + res.statusCode);
// 	console.log('响应码：' +JSON.stringify(res.headers));
// 	res.setEncoding('utf8');
// 	var $ = cheerio.load(res.text);
// 	var imglist=$("table").find("div").find("img");
// 	console.log(imglist.length+"==================");
// 	for(var i=0 ;i< imglist.length ;i++){
// 		console.log(imglist.eq(i).attr("src")+"+++++++++++++")
// 		superagent.get(imglist.eq(i).attr("src"),function(err,res){
// 			 if (err) {
// 		        console.log('err: '+ err);
// 		        return false;
// 		    }
// 		}).pipe(fs.createWriteStream('images/'+i+'.jpg')).on('close', function(){
// 			console.log("down OK");
// 		});  //调用request的管道来下载到 images文件夹下

// 	}

// })
