angular.module('iotApp.controllers', [])
.controller('setupController',function($scope,mqtt,$q){
    console.log(mqtt);
    $scope.mqtt={};
    $scope.class="button button-dark";
    $scope.mqtt=mqtt;
    $scope.connect=function(){
        //created a random id clieant
        var clientId = "iotApp" + Math.random();
        $scope.mqtt.client = new Paho.MQTT.Client("m10.cloudmqtt.com", 39141, clientId);
        console.log(mqtt);
        mqtt.client.connect({
          useSSL: true,
          userName: "axnhhzim",
          password: "UvqsWKPukxuH",
          onSuccess: mqtt.onSuccess,
          onFailure: mqtt.onFailure
        });
        
        var test = function(){
            var defer = $q.defer();
            $timeout(function() {
            defer.resolve();
            }, 5000);
            return defer.promise;
        };
        
        
        
        test().then(
        function() {
            Console.log("finished");
            // do something
        },
        function(error) {
            // report something
        },
        function() {
        // report progress
        console.log("in progress");
        });
        
        
        
        
        
        $scope.class="button button-balanced";
        console.log(mqtt.client.isConnected());
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
});