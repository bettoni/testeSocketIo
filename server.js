var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var mensagensSessao = []
// seta diretório default para execução
app.use(express.static("client"));

io.on('connection', function(socket){
  console.log('alguem entrou no chat :)');

  socket.on('disconnect', function(){
    console.log('alguem saiu do chat :´(');
  });

  socket.on('buscarTodoHistorico', function(){
    io.emit('buscarTodoHistorico', mensagensSessao);
  });

  socket.on('novaMensagem', function(novaMensagem){
    mensagensSessao.push(novaMensagem);
    console.log('nova mensagem. Total de mensagens: ' + mensagensSessao.length);

    io.emit('novaMensagem', novaMensagem);
  });
});


server.listen(process.env.PORT || 3000);
console.log("Beba ServerUP!!!!");
