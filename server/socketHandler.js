var io = require('socket.io');

function ioHandler(http){
    this.webSocket = io(http);

    this.webSocket.on('connection', function(socket){

        socket.emit('connection-msg', getMoqData());
        socket.on('new-msg', function(msg){
            console.log('message: ' + JSON.stringify(msg));
            socket.emit('new-msg', msg);
        });
    });
}

ioHandler.prototype.sendMsg = function(msg){
    io.emit('new-msg',{test:'hello'});
};

function getMoqData(){
    var data = [];
    for(var i = 0; i< 43; i++){
        data.push({
            name: 'Jon' + (i+1),
            email: 'Jon' + (i+1)+'mail.com',
            date: Date.now(),
            msgText: 'Jon text' + (i+1)
        })
    }
    return data
}


module.exports = ioHandler;