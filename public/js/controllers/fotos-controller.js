angular.module('alurapic').controller('FotosController', function($scope, $routeParams, cadastroDeFoto) {

	$scope.fotos = [];
	$scope.filtro = '';
	$scope.mensagem = '';


	cadastroDeFoto.listar()
	.then(function(retorno){
		$scope.fotos = retorno.fotos;
	})
	.catch(function(retorno){
		$scope.mensagem = retorno.mensagem;
	});	

	$scope.remover = function(foto){
		
		cadastroDeFoto.remover(foto)
		.then(function(retorno){
			removerFotoDaLista(foto);			
			$scope.mensagem = retorno.mensagem;
		})
		.catch(function(retorno){
			$scope.mensagem = retorno.mensagem;
		});
	}

	function removerFotoDaLista(foto){
		var indiceFoto = $scope.fotos.indexOf(foto)
		$scope.fotos.splice(indiceFoto,1);
	}
});













/*recursoFoto.delete({fotoId : foto._id}
			, function(){
				var indiceFoto = $scope.fotos.indexOf(foto)
				$scope.fotos.splice(indiceFoto,1);
				$scope.mensagem = 'Foto removida com sucesso ' + foto.titulo;
			},function(error){
				$scope.mensagem = 'Foto Não removida ' + foto.titulo;
		});*/
/*$http.delete('v1/fotos/' + foto._id)
		.success(function(){
			var indiceFoto = $scope.fotos.indexOf(foto)
			$scope.fotos.splice(indiceFoto,1);
			console.log('Foto removida com sucesso ' + foto.titulo);
			$scope.mensagem = 'Foto removida com sucesso ' + foto.titulo;
		})
		.error(function(erro){
			console.log(erro)
			console.log('Foto Não removida ' + foto.titulo)
			$scope.mensagem = 'Foto Não removida ' + foto.titulo;
		});*/

/*var promise = $http.get('v1/fotos');

	promise.then(function(resposta){
		$scope.fotos = resposta.data;
	}).catch (function(error){
		console.log(error);
	});*/