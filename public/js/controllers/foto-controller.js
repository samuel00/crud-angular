angular.module('alurapic').controller('FotoController', function($scope,cadastroDeFoto,$routeParams){
	$scope.foto = {};

	$scope.mensagem = '';

	if($routeParams.fotoId){
		cadastroDeFoto.getPorID($routeParams.fotoId)
		.then(function(retorno){
			console.log("Segundo")
			$scope.foto = retorno.fotos;
		})
		.catch(function(retorno){
			$scope.mensagem = retorno.mensagem;
		});	
	}	

	$scope.submeter = function(){
		if($scope.formulario.$valid){
			cadastroDeFoto.cadastrar($scope.foto)
			.then(function(retorno){
				$scope.mensagem = retorno.mensagem;
				if(retorno.inclusao) $scope.foto = {};
				/*$scope.focado = true;*/
				$scope.$broadcast('fotoCadastrada');
			})
			.catch(function(retorno){
				$scope.mensagem = retorno.mensagem;
			});
		}
	};
});



/*$http.get('v1/fotos/' + $routeParams.fotoId)
		.success(function(foto){
			$scope.foto = foto;
		})
		.error(function(erro){
			console.log(erro);
			$scope.mensagem ='Nao foi possivel obter foto';
		});*/



/*if($scope.foto._id){
			recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function(){
				$scope.mensagem ='Foto alterada com sucesso!';
			},function(error){
				$scope.mensagem ='Nao foi possivel alterar foto';
			});
			$http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
			.success(function(){
				$scope.mensagem ='Foto alterada com sucesso!';
			})
			.error(function(erro){
				console.log(erro);
				$scope.mensagem ='Nao foi possivel alterar foto';
			});
		}else{
			if($scope.formulario.$valid){
				recursoFoto.save($scope.foto,function(){
					$scope.foto = {};
					$scope.mensagem ='Foto cadastrada com sucesso!';
			},function(error){
				$scope.mensagem ='Nao foi possivel cadastrar foto';
			});
			/*$http.post('v1/fotos',$scope.foto).success(function(response){
				$scope.foto = [];
				$scope.mensagem ='Foto cadastrada com sucesso!';
			}).error(function(error){
				$scope.mensagem =error;
			})
		}*/