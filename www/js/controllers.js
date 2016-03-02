angular.module('iotApp.controllers', [])
.controller('setupController',function($scope,mqtt,$q,$ionicLoading){
    console.log(mqtt);
    $scope.mqtt={};
    $scope.class="button button-dark";
    $scope.mqtt=mqtt;
    $scope.connect=function(){
        //created a random id clieant
          $ionicLoading.show({
             template: '<p>Loading...</p><ion-spinner></ion-spinner>'
         });
        var clientId = "iotApp" + Math.random();
        $scope.mqtt.client = new Paho.MQTT.Client("m10.cloudmqtt.com", 3789, clientId);
        //$scope.mqtt.client = new Paho.MQTT.Client("127.0.0.1", 9001, clientId);
        console.log(mqtt);
        mqtt.client.connect({
            useSSL: true,
            userName: "ylfqyweh",
            password: "OmyBRcCKjwpi",
            onSuccess: mqtt.onSuccess,
            onFailure: mqtt.onFailure
        });
  
    };
    mqtt.onFailure=function onFailure(invocationContext, errorCode, errorMessage) {
         console.log("this is a pretty bad erro!!!!"+ errorMessage);
          $ionicLoading.hide();
    };
})
.controller('deviceController',function($scope,mqtt){
    mqtt.client.onMessageArrived=function onMessageArrived(message) {
            var msg="";
            msg="Topic:" + message.destinationName;
            msg+=", Message:" + message.payloadString;
            console.log(msg);
            $scope.msg=msg;
            $scope.$apply();
   };
})
.controller('mapsController',function($scope,ionic){
        $scope.init=function() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
        console.log("tester");
        $scope.map = map;
      }
      ionic.Platform.ready($scope.init);
      //google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
})
;