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

app.directive('modal', function(){
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
});

app.directive('modalHeader', function(){
  return ModalContentFactory.create('modal-header');
});

app.directive('modalBody', function(){
  return ModalContentFactory.create('modal-body');
});

app.directive('modalFooter', function(){
  return ModalContentFactory.create('modal-footer');
});

app.directive('messagesFor', ['$http', '$compile',function($http, $compile){
  return {
    restrict: 'A',
    replace: true,
    scope: false,
    link: function(scope, elem, attrs){
      var applyFields = function(template, replacement){
        var find = /FIELD/g;
        return template.replace(find, replacement);
      }

      $http.get('templates/messages-for.html')
        .then(function(response){
          var template = applyFields(response.data, attrs.messagesFor);
          var elementTemplate = angular.element(template);
          elementTemplate.insertAfter(elem);
          $compile(elementTemplate)(scope);
        }
      );
    }
  };
}]);
