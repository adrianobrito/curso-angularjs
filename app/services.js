app.factory('MovimentacaoRepository', [function(){
  var movimentacoes = localStorage.getItem('movimentacoes');
  var updateStorage = function(){
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));
  };

  if(!movimentacoes){
    movimentacoes = [];
    updateStorage();
  } else{
    movimentacoes = JSON.parse(movimentacoes);
    movimentacoes.forEach(function(m){
      m.$$hashKey = undefined;
    });
  }

  return {
    create: function(movimentacao){
      movimentacoes.push(movimentacao);
      updateStorage();
    },
    read: function(index){
      return movimentacoes[index];
    },
    update: function(newMovimentacao, index){
      movimentacoes[index] = newMovimentacao;
      updateStorage();
    },
    delete: function(movimentacao){
      var index = movimentacoes.indexOf(movimentacao);
      movimentacoes.splice(index, 1);
      updateStorage();
    },
    getMovimentacoes: function(){
      return movimentacoes;
    }
  };
}]);

app.factory('CotacaoService', ['$http', function($http){
  return {
    realToDolar: function(){
      return $http.get("http://api.fixer.io/latest?base=BRL&symbols=USD");
    }
  };
}]);
