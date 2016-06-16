(function(){
    'use strict';

    angular
        .module('GuestBook')
        .controller('GuestBookControllerAjax', guestBookControllerAjax);

    guestBookControllerAjax.$inject = ['$scope', 'HttpService'];

    function guestBookControllerAjax($scope, httpService){
        $scope.comments = [];
        httpService.getAllComments().then(function(data){
            $scope.comments = data.data;
            $scope.totalItems = $scope.comments.length*10/5;
        });

        /*
         * Table header
         * */
        $scope.commentsHead = {
            name: 'Name',
            email: 'Email',
            data: 'Date',
            msgText: 'Text'
        };

        /**
         * Pagination configurations
         **/
        $scope.currentPage = 1;
        $scope.startIndex = 0;
        $scope.endIndex = 5;
        $scope.maxSize = 5;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function(){
            $scope.startIndex = ($scope.currentPage-1)*5;
            $scope.endIndex = $scope.startIndex + 5;
        };

        /*
         * Sorting
         * */
        $scope.sort = {};
        $scope.sort.column = 'name';
        $scope.sort.descending = true;

        $scope.selectedCls = function(columnName){
            if($scope.sort.column !== columnName){
                return
            }
            return $scope.sort.descending ?'glyphicon glyphicon-chevron-down':'glyphicon glyphicon-chevron-up';
        };

        $scope.changeSorting = function(columnName){
            if($scope.sort.column === columnName){
                $scope.sort.descending = !$scope.sort.descending;
            }
            $scope.sort.column = columnName;
        };

        /*
         * Add new comment
         **/
        $scope.submitForm = function(){
            httpService.addComment(convertMsgToTransferObj($scope.userMsg)).then(function(data){
                //$scope.$apply(function(){
                //    $scope.comments.push(data.data);
                //});
            });
        };

        function convertMsgToTransferObj(userMsg){
            return{
                name: userMsg.name,
                email: userMsg.email,
                date: Date.now(),
                msgText: userMsg.msgText
            }
        }
    }
})();

