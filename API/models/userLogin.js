var Q 			= require('q')
var Firebase 	= require('firebase');
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("OVRvSYFOJJ4BKsLGc9ieuAlzA91IF3qSEC6IASUO");

// var token_generator 		= require('./token_generator');
var dataRef		= new Firebase('https://liang-poll.firebaseio.com/');
var usersRef 	= dataRef.child("users");



var login = function(username,password) {
	var deferred = Q.defer();
	if (password == 'liangliang123') {
		deferred.resolve('success');
	} else{
		deferred.reject('fail')
	};

	return deferred.promise;
};

var firebase_login	= function(email,password) {
	var deferred = Q.defer();

		console.log(email,password);
		dataRef.authWithPassword({
		  "email": email,
		  "password": password
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		    deferred.reject('fail')
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    // var token = tokenGenerator.createToken(authData);
		    var auth_uid = authData.uid;
		    var token1 = token_generator.create_token(auth_uid);
		    deferred.resolve("Authenticated successfully with payload: " + token1);
		  }
		});

	return deferred.promise;

};

function firebase_token(token){
	var deferred = Q.defer();

		dataRef.authWithCustomToken(token, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		    deferred.reject("Login Failed!" + error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    deferred.resolve("Authenticated successfully with payload:");
		  }
		});
	return deferred.promise;
};

function set_user_data(userData){
	var deferred = Q.defer();
	// get time.
		userData.time = new Date().getTime();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		usersRef.child(userData.uid).set(userData, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function firebase_register(email,password){
	// reg func Q  
	var deferred = Q.defer();
		dataRef.createUser({
		  email: email,
		  password: password
		}, function(error, userData) {
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("The new user account cannot be created because the email is already in use.");
		        // reg Q reject.
		        deferred.reject('The new user account cannot be created because the email is already in use.') 
		        break;
		      case "INVALID_EMAIL":
		        console.log("The specified email is not a valid email.");
		        // reg Q reject.
		        deferred.reject('The specified email is not a valid email.')
		        break;
		      default:
		        console.log("Error creating user:", error);
		        // reg Q reject.
		        deferred.reject('"Error creating user:', error)
		    }
		  } else {
		    console.log("Successfully created user account with uid:", userData);
		    // deferred.resolve(userData)  ---> next ;

		    set_user_data(userData)
		    	.then(function(ud_result) {
		    		console.log('1')
		    		return ud_result;
		    	})
		    	.then(function(ud_result) {
		    		// then func Q
		    		var deferred = Q.defer();
		    			console.log('2')
		    			firebase_login(email,password)
    						.then(function(result) {
    							console.log('3')
    							deferred.resolve('Successfully login and created user account with uid: ' + userData.uid);
    							// then func Q resolve
    						})
    						.catch(function(error) {
    							deferred.reject('login fail', error) // then func Q reject.
    						})
		    		return deferred.promise;// then func Q end.

		    	})
		    	.then(function() {
		    		console.log('4')
		    		// reg Q resolve.
		    		deferred.resolve('Successfully login, set data and created user account with uid: ');
    						
		    	})
		    	.catch(function(error) {
		    		// reg Q reject.
		    		 deferred.reject( error)
		    	})
		    	.finally(function() {
		    		
		    		console.log('finally')
		    	})
		   }
		});
	// reg Q end.
	return deferred.promise;	
}

function firebase_logout () {
	var deferred = Q.defer();
	
	return deferred.promise;
}
module.exports	=	{
	
	login				:login,
	firebase_login		:firebase_login,
	firebase_register	:firebase_register,
	firebase_token		:firebase_token,
	firebase_logout		:firebase_logout
}










