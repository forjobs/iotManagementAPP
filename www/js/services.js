angular.module('iotApp.services', [])
.service('mqtt',function(){
    var mqtt={};
    mqtt.user="";
    mqtt.password="";
    mqtt.port="";
    return mqtt;
}
);