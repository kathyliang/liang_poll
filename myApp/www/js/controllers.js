angular.module('starter.controllers', [])

.controller('DashCtrl', function($http, poll_service) {
    var DashCtrl = this;
    
    DashCtrl.lo_info = {};
    var lo_info =  DashCtrl.lo_info;
    // var lo_info2 =  DashCtrl.lo_info 
    // lv lo la 
    // iv io ia 
    // ev eo ea
    DashCtrl.co = 0;
    DashCtrl.count = function () {
   		// console.log("in there",DashCtrl.string);
   		DashCtrl.co += 1;
		var lo_info2 = {};
		lo_info2.Untitled 	= lo_info.Untitled
		lo_info2.Form2 		= lo_info.Form
		lo_info2.Question1 	= lo_info.Question1
		lo_info2.Option1_1 	= lo_info.Option1_1
		lo_info2.Option2_1 	= lo_info.Option2_1
		lo_info2.Question2 	= lo_info.Question2
		lo_info2.Option1_2 	= lo_info.Option1_2
		lo_info2.Option2_2 	= lo_info.Option2_2

		DashCtrl.preview(lo_info2,'angular')
   		
   }
   	DashCtrl.get = function  () {
   		
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
    

    DashCtrl.preview = function  (data) {
        var eo_data = data
        poll_service.save(eo_data)

        console.log(poll_service.get())
    }


   	DashCtrl.post = function  (data,url) {
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

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
	Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  console.log('hi')
  $scope.settings = {
	enableFriends: true
  };
   setTimeout(function() {
	
	console.log($scope.settings.enableFriends)
   }, 3000);
   


});
