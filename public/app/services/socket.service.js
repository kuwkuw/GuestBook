(function(){
    'use strict';

    angular
        .module('GuestBook')
        .factory('SocketService', SocketService);

    function SocketService($q){
        var deferred = $q.defer();
        var socket = io.connect();
        var dataMoq = [];
        socket.on('connection-msg', function(data){
            console.log(data);
            deferred.resolve(data);
        });
        return {
            send: function(msgObj){
                socket.emit('new-msg', msgObj);
            },
            onReceive: function(collback){
                socket.on('new-msg', collback);
            },
            getMoqData: function(){
                return deferred.promise;
            }
        };
    }
})();
