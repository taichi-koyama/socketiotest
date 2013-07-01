var io = require('socket.io');
var express = require('express');
var http = require('http');

var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app).listen(8080);
var io = io.listen(server);

io.sockets.on('connection',  function(socket){
	console.log('connection');
	//���u���E�U�ŃA�N�Z�X�������ɕ\�������
    socket.emit('status',  'connect' );
    
	//1�b���ƂɃN���C�A���g��push����
	//�f�[�^��JSON�`���ő���
	var interval = setInterval(function() {
		//socket.emit('msg', new Date().getSeconds());
		var data = {"hour": new Date().getHours(),
					"min": new Date().getMinutes(),
					"sec": new Date().getSeconds()};
		//socket.json.emit('msg', data);
		socket.json.broadcast.emit('msg', data);
	},1000);	
	//�N���C�A���g�ؒf��
	socket.on('disconnect', function(){
		console.log('Client disconnect');
	});
	//�N���C�A���g�����M�������b�Z�[�W
//	socket.on('msg', function(msg){
//		socket.emit('msg', msg);
//		socket.broadcast.emit('msg', msg);
//	});
});