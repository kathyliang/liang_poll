angular.module('starter')
.controller('poll_ctrl',function ($http, $location, $ionicScrollDelegate, poll_service) {
	    var poll_ctrl 		= this;
	    var poll_content 	= $ionicScrollDelegate.$getByHandle('poll_content');
	   
	    setTimeout(function() {
	    	console.log(poll_content.getScrollView())
	    }, 100);
	   

	    poll_ctrl.lo_info 				= {};
	   	poll_ctrl.lo_info.questions 	= [];
	   	
	   	// init question
	   	var la_questions 				= poll_ctrl.lo_info.questions;
	   	

	  	poll_ctrl.add_question = function  () {
	  		var lo_question 			= {};
	  		lo_question.options 		= [];
	  		la_questions.push(lo_question);
	  		poll_content.resize()
	  	}

	  	poll_ctrl.add_option= function  (id) {
	  		var lo_opiton 				= {"name":""};
	  		la_questions[id].options.push(lo_opiton);
	  		poll_content.resize()
	  	}			

	  
	    
	 
	   	poll_ctrl.get = function  () {
	   		
			$http({
			  method: 'GET',
			  url: 'http://localhost:3011/angular'
			})	.then(function successCallback(response) {
			   		
			   		
			   		var data = response.data
			   		console.log('success:',data)

			  	}, function errorCallback(response) {
			    	
			    	console.log('error:',response)

			  	});

	   	}
	    

	    poll_ctrl.preview = function  () {
	        var eo_data = poll_ctrl.lo_info;
	        poll_service.save(eo_data)
	        // id = "fid=" + id
	        $location.url('/tab/preview');
	    }


	   	poll_ctrl.post = function  (data,url) {
	   		var eo_data = data
	   		console.log(data)

	  		$http({
	  		  method: 'POST',
	  		  url: 'http://localhost:3011/'+url,
	  		  data:eo_data
	  		})	.then(function successCallback(response) {
	  		   		
	  		   		
	  		   		var data = response.data
	  		   		console.log('success:',data)

	  		  	}, function errorCallback(response) {
	  		    	
	  		    	console.log('error:',response)

	  		  	});

	   	}




})