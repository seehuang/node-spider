var http = require('http');
var server=http.createServer(function (req,res){
	res.writeHeader(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':'*'});
	//res.setHeader('Content-Type','text/html');
	res.write('<html><head><meta charset="utf-8"></head></html>');
	res.write("你好");
	res.write("<br/>");
	res.write("您输入路由地址为"+req.url);
	res.end();
}).listen(8083,function(){
	console.log("程序已经启动完毕...")
})