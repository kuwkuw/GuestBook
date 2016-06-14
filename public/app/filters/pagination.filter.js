(function(){
    'use strict';

    angular
        .module('GuestBook')
        .filter('pagination', pagination);

     function pagination() {
        return function(arr, start, end) {
            if(!end) {
                return (arr || []).slice(start);
            }
            return (arr || []).slice(start, end);
        };
    }
})();
