angular.module('starter')
.controller('form_ctrl',function ($scope,$http,$location,view_service) {
	var form_ctrl = this;
	var lo_form={};
	form_ctrl.get = function  (form) {
		form_ctrl.lo_form =  view_service.get()
		
		}
    form_ctrl.share = function  () {
        
        console.log($location.absUrl());
    }
    form_ctrl.count = function  () {
    	console.log("in there ", lo_form);
		var eo_answer = {};
    	eo_answer.title 		= form_ctrl.lo_form.title;
    	eo_answer.des 		= form_ctrl.lo_form.des; 	
    	eo_answer.questions	= [];

		_.forEach(form_ctrl.lo_form.questions,function  (question,key) {
			var eo_question		= {};
    		eo_question.qes 	= question.qes;
    		eo_question.options = [];
    		_.forEach(question.options,function  (option,key) {
    			console.log("form_ctrl",option.checked);
    			var eo_option		= {};
    			eo_option.name 		= option.name;
    			eo_option.key		= option.key;
    			eo_option.amount	= option.amount;
    			if (!eo_option.amount) {
					eo_option.amount	= 0;    				
    			};
    			
    			if(option.checked){
    				if(option.checked == true){
				    	eo_option.amount += 1;
    				}
    			}
    			else{
    				eo_option.amount;
    			}
    			eo_question.options.push(eo_option);
    			// console.log("option",option);


    		})	
    		eo_answer.questions.push(eo_question);
	    	// console.log("iiiii",eo_answer)
    	})
    	$http({
    	  method: 'POST',
    	  url: 'http://localhost:3011/set_answer',
    	  data: eo_answer
    	}).then(function successCallback(response) {
    			console.log(response);
    	  }, function errorCallback(response) {
				console.log(response);
    	  });
	}
		

    $scope.$on('$ionicView.enter', function() {
	   	form_ctrl.get();
	   	lo_form = null;
	});
})



