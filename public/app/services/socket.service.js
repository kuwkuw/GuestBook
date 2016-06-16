(function(){
    'use strict';

    angular
        .module('GuestBook')
        .factory('SocketService', SocketService);

    SocketService.$inject = ['$q'];

    function SocketService($q){
        var deferred = $q.defer();
        var socket = io.connect();

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
            getData: function(){
                return deferred.promise;
            }
        };
    }
})();
