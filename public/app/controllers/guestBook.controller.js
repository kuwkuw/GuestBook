(function(){
    'use strict';

    angular
        .module('GuestBook')
        .controller('GuestBookController', guestBookController);

    homeController.$inject = ['SocketService', '$scope'];

    function guestBookController(socketService, $scope){
        $scope.comments = [];
        socketService.getMoqData().then(function(data){
            console.log(data);
            $scope.comments = data;
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

        $scope.userMsg;

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
            console.log($scope.startIndex, $scope.endIndex);
            $scope.startIndex = ($scope.currentPage-1)*5;
            $scope.endIndex = $scope.startIndex + 5;
            console.log($scope.startIndex, $scope.endIndex);
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
        * Socket handlers
        * */
        socketService.onReceive(function(msg){
            $scope.$apply(function(){
                $scope.comments.push(msg);
            });
        });

        $scope.submitForm = function(){
            socketService.send(convertMsgToTransferObj($scope.userMsg));
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
