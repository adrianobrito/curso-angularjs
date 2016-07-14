var ModalContentFactory = {
  create: function(section){
    return {
      restrict: 'E',
      templateUrl: 'templates/modal-content.html',
      transclude: true,
      scope: true,
      replace: true,
      link: function(scope){
        scope.section = section;
      }
    };
  }
};

app.directive('modal', ['$timeout',function($timeout){
  return {
    restrict: 'E',
    templateUrl: 'templates/modal.html',
    transclude: true,
    replace: true,
    scope:{
      bindTo: '='
    },
    link: function(scope, attrs, elem){
      if(scope.bindTo){
        var modal = scope.bindTo;
        modal.show = function(){
          $('#' + elem.id).modal("show");
        };
        modal.hide = function(){
          $('#' + elem.id).modal("hide");
        };
      }
    }
  };
}]);

app.directive('modalHeader', function(){
  return ModalContentFactory.create('modal-header');
});

app.directive('modalBody', function(){
  return ModalContentFactory.create('modal-body');
});

app.directive('modalFooter', function(){
  return ModalContentFactory.create('modal-footer');
});

app.directive('messagesFor', [function($http){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/messages-for.html',
    scope: {
      bindTo: '='
    }
  };
}]);
