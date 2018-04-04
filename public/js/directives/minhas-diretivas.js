angular.module('minhasDiretivas',[]).directive('meuPainel', function (){

		var ddo = {};

		ddo.restrict = 'AE';
		ddo.transclude = true;

		ddo.scope = {
			titulo : '@'
		};

		ddo.templateUrl = 'js/directives/meu-painel.html';   

		return ddo;
	})
    	.directive('minhaFoto', function() {

        var ddo = {};

        ddo.restrict = "AE";

        ddo.scope = {
            titulo: '@',
            url: '@'
        };

        ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';           
        
        return ddo;
    })
    	.directive('botaoPerigo', function() {

        var ddo = {};

        ddo.restrict = "E";

        ddo.scope = {
            nome: '@',
            acao: '&'
        };

        ddo.template = '<button ng-click="acao(foto)" class="btn btn-danger btn-block">{{nome}}</button>';           
        
        return ddo;
    })
    	.directive('meuFocus', function() {

        var ddo = {};

        ddo.restrict = "A";

        /*ddo.scope = {
            focado: '='
        };*/

        ddo.link = function(scope,element){
        	/*scope.$watch('focado', function(){
        		if(scope.focado){
        			element[0].focus();
        			/*element.removeClass('btn-primary').addClass('btn-danger');
        		}
        	})*/
        	scope.$on('fotoCadastrada', function(){
        		element[0].focus();
        	})
        }
        
        return ddo;
    }).directive('meusTitulos', function() {
        var ddo = {};
        ddo.restrict = 'E';
        ddo.template = '<ul class="list-group"><li ng-repeat="titulo in titulos" class="list-group-item">{{titulo}}</li></ul>';
        ddo.controller = function($scope, recursoFoto) {
            recursoFoto.query(function(fotos) {
                $scope.titulos = fotos.map(function(foto) {
                    return foto.titulo;
                });    
            });
        };
        return ddo;
    });