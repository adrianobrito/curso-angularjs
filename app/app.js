var app = angular.module('app', ['ngMessages']);

app.controller('MainCtrl', ['$scope', function($scope){

  var MOVIMENTACOES_STORAGE = 'movimentacoes';
  $scope.lastIndex = -1;
  $scope.mode = 'add';
  $scope.onlyNumbers = /^\d+$/;
  $scope.modal = {};

  var getMovimentacoesStorage = function(){
    if(localStorage.getItem(MOVIMENTACOES_STORAGE)){
      return JSON.parse(localStorage.getItem('movimentacoes'));
    } else{
      return [];
    }
  }

  var updateMovimentacoesStorage = function(movimentacoes){
    localStorage.setItem(MOVIMENTACOES_STORAGE, JSON.stringify(movimentacoes));
  }

  $scope.movimentacoes = getMovimentacoesStorage();
  $scope.tipos = ['Despesa', 'Receita'];

  $scope.openModal = function(mode, movimentacao){
    $scope.mode = !mode ? 'add' : mode;

    if($scope.mode === 'add'){
      $scope.movimentacao = {};
    } else if($scope.mode === 'edit'){
      $scope.lastIndex = $scope.movimentacoes.indexOf(movimentacao);
      $scope.movimentacao = {};
      angular.copy(movimentacao, $scope.movimentacao);
    }

    $scope.modal.show();
  };

  $scope.closeModal = function(){
    $scope.modal.hide();
  }

  $scope.add = function(movimentacao){
    $scope.movimentacoes.push(movimentacao);
    updateMovimentacoesStorage($scope.movimentacoes);
    $scope.closeModal();
  }

  $scope.edit = function(movimentacao, index){
    $scope.movimentacoes[index] = movimentacao;
    updateMovimentacoesStorage($scope.movimentacoes);
    $scope.closeModal();
  };

  $scope.delete = function(movimentacao){
    var movimentacoes = $scope.movimentacoes;
    if(confirm("Você realmente deseja remover este item?")){
      var index = movimentacoes.indexOf(movimentacao);
      movimentacoes.splice(index, 1);
      updateMovimentacoesStorage(movimentacoes);
    }
  }

  $scope.getTipoClass = function(movimentacao){
    return movimentacao.tipo === 'Despesa' ? 'alert-danger' : 'alert-success';
  };

  $scope.getTotalClass = function(){
    return $scope.getTotal() < 0 ? 'alert-danger' : 'alert-success';
  };

  $scope.getSaveButtonClass = function(mode){
    return mode === 'add' ? 'glyphicon-plus' : 'glyphicon-edit';
  }

  $scope.getTotal = function(){
    var movimentacoes = $scope.movimentacoes;
    return movimentacoes
            .map(function(m){ return m.tipo === 'Despesa' ? parseFloat(m.valor) * -1 : parseFloat(m.valor); })
            .reduce(function (a, b) { return a + b; }, 0);
  };

}]);
