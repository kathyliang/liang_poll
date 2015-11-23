angular.module('starter')
.controller('viewForm_ctrl',function ($scope,$location,$http,poll_service,view_service) {
	 var viewForm_ctrl = this;
    var lo_info={};
    var fid; 
    
	    
	 viewForm_ctrl.view = function  (form) {
	        // console.log("1");
	        $location.url('/tab/form?fid='+form.key);
	    


		// console.log(id);
		// $location.url('/tab/form?fid='+ form.key);
	        $http({
			  method: 'post',
			  url: 'http://localhost:3011/get_form',
			  data: form
			})	.then(function successCallback(response) {
			   
	        	viewForm_ctrl.lo_form = response.data
	        	view_service.save(viewForm_ctrl.lo_form )
			   		console.log('success:',viewForm_ctrl.lo_form)

			   		
			  	}, function errorCallback(response) {
			    	
			    	console.log('error:',response)

			  	});

    }

    viewForm_ctrl.get_form_amount = function  () {
	        $http({
			  method: 'get',
			  url: 'http://localhost:3011/get_form_amount',
			  // headers: {
			  //   'fid': fid
			  // }
			})	.then(function successCallback(response) {
			   		
			   		viewForm_ctrl.lo_form_amount = response.data
			   		
			   		
			   		
			  	}, function errorCallback(response) {
			    	
			    	console.log('error:',response)

			  	});

    }
	
	$scope.$on('$ionicView.enter', function() {

	   	viewForm_ctrl.get_form_amount();

	});
})