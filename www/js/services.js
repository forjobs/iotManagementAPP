angular.module('iotApp.services', [])
.service('mqtt',function(){
    var mqtt={};
    mqtt.server="";
    mqtt.username="";
    mqtt.password="";
    mqtt.port="";
    mqtt.ssl=false;
    mqtt.client={};
    mqtt.onSuccess=function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        mqtt.client.subscribe("#");
    };
    return mqtt;
}
);