angular.module('starter')
.controller('pre_ctrl',function ($scope,$http,$location,poll_service) {
	var pre_ctrl = this;
    var lo_info;
    // pre_ctrl.hello = "hello pre_ctrl";
    pre_ctrl.submit = function () {
    	
    	var eo_info = {};
    	eo_info.title 		= pre_ctrl.lo_info.title;
    	eo_info.des 		= pre_ctrl.lo_info.des; 	
    	eo_info.questions	= [];

    	_.forEach(pre_ctrl.lo_info.questions,function  (question,key) {
    		var eo_question		= {};
    		eo_question.qes 	= question.qes;
    		eo_question.options = [];
    		
    		_.forEach(question.options,function  (option,key) {
    			var eo_option		= {};
    			eo_option.name 		= option.name;
    			eo_question.options.push(eo_option);
    		})	
			eo_info.questions.push(eo_question);
    	})
    	console.log(eo_info)
    	// make sure it is usefulness
    	// if (eo_info.title&&eo_info.des&&eo_info.questions.qes){
	    	$http({
	    	  method: 'POST',
	    	  url: 'http://localhost:3011/set_form',
	    	  data: eo_info
	    	}).then(function successCallback(response) {
	    			console.log(response);
	    	  }, function errorCallback(response) {
					console.log(response);
	    	  });
    	// };
    	

    }
    // ng-click count
 //    pre_ctrl.count = function (qid,oid) {
 //    	console.log(pre_ctrl.lo_info.questions)
 //    	if(!pre_ctrl.lo_info.questions[qid].options[oid].amount){
 //    		pre_ctrl.lo_info.questions[qid].options[oid].amount = 1; 
 //    	}else{
 //    		pre_ctrl.lo_info.questions[qid].options[oid].amount += 1 
 //    	}
    	
	// }
	

	
	pre_ctrl.preview = function  () {
	        pre_ctrl.lo_info =  poll_service.get()
        // 	pre_ctrl.lo_info = {
								//     "title": "hello word",
								//     "des": "description",
								//     "questions": [
								//         {
								//             "qes": "howareyou?",
								//             "options": [
								//                 {
								//                     "name": "k"
								//                 },
								//                 {
								//                     "name": "good"
								//                 }
								//             ]
								//         },
								//         {
								//             "qes": "howareyou?",
								//             "options": [
								//                 {
								//                     "name": "k2"
								//                 },
								//                 {
								//                     "name": "good2"
								//                 }
								//             ]
								//         }
								//     ]
								// }
	        console.log(poll_service.get())
    }
	
	$scope.$on('$ionicView.enter', function() {
	   	pre_ctrl.preview();
	   	lo_info = null;
	});
	 
})