(function(){
    'use strict';

    angular
        .module('GuestBook')
        .factory('HttpService', httpService);

    httpService.$inject = ['$http'];

    function httpService($http){
        return{
            getAllComments: function(){
                return $http.get('api/comments');
            },
            addComment: function(newComment){
                return $http.post('api/comments', newComment);
            }
        }

    }
})();
