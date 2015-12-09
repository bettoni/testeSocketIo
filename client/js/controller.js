angular.module("chatSocketIO",[]);
angular.module("chatSocketIO").controller("chatSocketIOCtrl", function($scope){
  $scope.app = "Chat com Socket.IO";
  $scope.mensagens = [];
  var socket = io();

  socket.on("novaMensagem", function(mensagem){
    $scope.$apply(function () {
      $scope.mensagens.push(mensagem);
    });
  });

  socket.on("buscarTodoHistorico", function(mensagens){
    $scope.$apply(function () {
      $scope.mensagens = mensagens;
    });
  });

  $scope.buscarHistorico = function(){
    socket.emit("buscarTodoHistorico");
  }

  $scope.enviarMsg = function(mensagem, $event){
    if($event.keyCode !== 13 || !mensagem || mensagem ===""){
      return;
    }
    var novaMensagem = {  dataHora:Date(), usuario:$scope.usuario, texto:mensagem}
    socket.emit("novaMensagem", novaMensagem);
    delete $scope.mensagem;
  };

  $scope.entrar = function($event){
    if($event.keyCode !== 13){
      return;
    }
    $scope.possuiUsuario = true;
  };
})
