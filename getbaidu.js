var http= require('http');
var superagent= require('superagent')
var cheerio =require('cheerio')
// var address= 'http://www.cnblogs.com/pick?CategoryType=Picked&ParentCategoryId=0&CategoryId=-2&PageIndex=2'
//http://www.cnblogs.com/pick/#p2
superagent.get('http://www.cnblogs.com/pick?CategoryType=Picked&ParentCategoryId=0&CategoryId=-2&PageIndex=2').end(function(err,res){
	console.log('状态码：' + res.statusCode);
	console.log('响应码：' +JSON.stringify(res.headers));
	res.setEncoding('utf8');
	console.log()
	var $=cheerio.load(res.text);
	// var title=$(".titlelnk").text();
	var title=$("h3").find("a.titlelnk");
	for(var i=0;i<title.length;i++){
		console.log("=======")
		console.log($("h3").eq(i).find("a.titlelnk").text())
	}
})


// var option1 ="www.baidu.com"
// var option = {
// 	hostname: 'www.baidu.com',
// 	port: 80,
// 	path: '/',
// 	method: 'GET'
// };
// var req =http.request(option1,function(res){
// 	console.log('状态码：' + res.statusCode);
// 	console.log('响应码：' +JSON.stringify(res.headers));
// 	res.setEncoding('utf8');
// 	res.on('data',function (chunk){
// 		console.log('响应内容:' +chunk)
// 	})
// })
// req.end();