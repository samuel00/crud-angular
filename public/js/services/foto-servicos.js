angular.module('FotoServicos',['ngResource'])
.factory('recursoFoto',function($resource){

	return $resource('/v1/fotos/:fotoId', null,{
		update : {
			method : 'PUT'
		}
	})

}).factory('cadastroDeFoto', function(recursoFoto, $q, $rootScope){

	var servico = {}

	servico.cadastrar = function(foto){
		return $q(function(resolve, reject){
			if (foto._id) {
				recursoFoto.update({fotoId : foto._id}, foto, function(){
				$rootScope.$broadcast('fotoCadastrada');
				resolve({
					mensagem : "Foto alterada com sucesso!",
					inclusao : false
				});
			},function(error){
				console.log(error);
				reject({
					mensagem : "Foto alterada com sucesso!",
					inclusao : false
				})
			});
			}else{
				recursoFoto.save(foto,function(){
					$rootScope.$broadcast('fotoCadastrada');
					resolve({
						mensagem : "Foto " + foto.titulo + " cadastrada com sucesso!'",
						inclusao : true
				});
				},function(error){
					console.log(error);
					reject({
						mensagem : "Nao foi possivel cadastrar foto",
						inclusao : false
				})
			});
			}
		})
	}

	servico.remover = function(foto){
		return $q(function(resolve, reject){
			recursoFoto.delete({fotoId : foto._id}, function(){
				resolve({
						mensagem : "Foto " + foto.titulo + " deletada com sucesso!'",
						delete : true
				});
				},function(error){
					console.log(error);
					reject({
						mensagem : "Nao foi possivel deletar foto " + foto.titulo,
						delete : false
				})
			})
		});
	}

	servico.listar = function(){
		return $q(function(resolve, reject){
			recursoFoto.query(function(fotos){
				console.log(fotos);
				resolve({
						mensagem : "Foto recuperadas com sucesso!'",
						fotos : fotos,
						delete : true
				});
				},function(error){
					console.log(error);
					reject({
						mensagem : "Nao foi possivel recuperar fotos",
						delete : false
				})
			})	
		});
	}

	servico.getPorID = function(fotoId){
		return $q(function(resolve, reject){
			recursoFoto.get({fotoId : fotoId},function(fotos){
				console.log(fotos);
				resolve({
						mensagem : "Foto recuperadas com sucesso!'",
						fotos : fotos,
						delete : true
				});
				},function(error){
					console.log(error);
					reject({
						mensagem : "Nao foi possivel recuperar fotos",
						delete : false
				})
			})	
		});
	}

	return servico;
})