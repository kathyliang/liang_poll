var Q 				= require('q')
var Firebase 		= require('firebase');
var _				= require('lodash');
var dataRef		= new Firebase('https://liang-poll.firebaseio.com/');
var poll_ref 	= dataRef.child("polls");
var forms_ref	= dataRef.child("forms");
// var ans_ref	= dataRef.child("answer");

function set_form(form_content){
	var deferred = Q.defer();
		
		var option_length = 0;
		var times = 0;
		_.forEach(form_content.questions, function (question, key) {
			option_length += question.options.length;
		})
		_.forEach(form_content.questions, function (question, key) {
			
			_.forEach(question.options, function (option, key) {
				var new_poll_ref = poll_ref.push(0,function  (error) {
					if (error) {
						deferred.reject("Data could not be saved." + error);
					} else {
						var key = new_poll_ref.key()
						option.key = key;
						times += 1;

						if(times == option_length){
							var new_forms_ref =	forms_ref.push(form_content, function(error) {
								
							  	if (error) {
							     	deferred.reject("Data could not be saved." + error);
							  	} else {
									deferred.resolve("Data saved successfully.");
								}
							})
						}
					}
				})
			})
		});

		
	return deferred.promise;
}


function set_answer(ans_content){
	var deferred = Q.defer();
	console.log("ans_content",ans_content.title);
	

	_.forEach(ans_content.questions,function  (question,key) {
		
		_.forEach(question.options,function  (option,key) {
			// poll_ref.child(option.key).set(option.amount,function (error) {
			//   if (error) {
			   
			//      deferred.reject("Data could not be saved." + error);
			//   } else {
			   
			//     deferred.resolve("Data saved successfully.");
			//   }
			// })


			poll_ref.child(option.key).transaction(function (current_value) {
		  		return (current_value || 0) + option.amount;
			});
		})	

	})


	
		


	return deferred.promise;
}

function get_form_amount() {
	var deferred = Q.defer();
	var number = {};
	var form_amount=[];
	forms_ref.on("value", function(snapshot) {
	 	// var a = snapshot.numChildren();
	 	// number.length = a;
	  //   deferred.resolve(number);  
	  snapshot.forEach(function (form) {
	  	var form_content = {};
	  	form_content.key = form.key();
	  	form_content.title = form.child("title").val(); ;
	  	form_amount.push(form_content);
	  })
   		deferred.resolve(form_amount);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	  deferred.reject(errorObject);

	});
	
	
	return deferred.promise;
}


function update_answer(pid,ans_content){
	var deferred = Q.defer();

	_.forEach(ans_content, function(answer, key) {

		
	})
	return deferred.promise;
}





function get_form (id) {
		var deferred = Q.defer();
		
		forms_ref.child(id).on("value", function(snapshot) {
		 	var form = snapshot.val();
		  	deferred.resolve(form);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}
function remove_questions(){
	var deferred = Q.defer();
		// console.log(iv_sid)
		content_ref.child(fid).remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

// function set_question (fid, qid, question) {
// 	var deferred = Q.defer();
// 		poll_ref.child(fid).child("questions").child(qid).set(question, function(error) {
// 		  if (error) {
		   
// 		     deferred.reject("Data could not be saved." + error);
// 		  } else {
		   
// 		    deferred.resolve("Data saved successfully.");
// 		  }
// 		});

// 	return deferred.promise;
// }

module.exports	=	{
	set_form 	 	 : set_form,
	set_answer		 : set_answer,
	get_form 	 : get_form,
	remove_questions : remove_questions,
	get_form_amount:get_form_amount
	// set_question 	 : set_question

}