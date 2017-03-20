var superagent = require('superagent');
var events = require("events");
eventproxy = require('eventproxy');

var emitter = new events.EventEmitter()

setCookeie ();
emitter.on("setCookeie", getTitles)            //监听setCookeie事件



function setCookeie () {
	superagent.post('http://www.ourob.cn/bbs/member.php?mod=logging&action=login&loginsubmit=yes&infloat=yes&lssubmit=yes&inajax=1')  //学校里的一个论坛，这是登录提交地址
		.type("form")
		.send({fastloginfield:"username"})
		.send({username:"foo"})                                                                                       //这肯定不是我真的用户名和密码啦
		.send({password:"bar"})
		.send({quickforward:"yes"})
		.send({handlekey:"ls"})
		.end(function(err, res){
			if (err) throw err;
			var cookie = res.header['set-cookie']             //从response中得到cookie
			emitter.emit("setCookeie", cookie)
		})
}

function getTitles (cookie) {
	superagent.get("http://www.ourob.cn/bbs/forum.php?mod=forumdisplay&fid=82&filter=typeid&typeid=185")             //随便论坛里的一个地址
		.set("Cookie", cookie[3])                 //在resquest中设置得到的cookie，只设置第四个足以（具体情况具体分析）
		.end(function(err, res){
			if (err){
				throw err;
			};
			//do something
		})
};