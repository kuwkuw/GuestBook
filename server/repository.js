var db = require('mysql');

var pool = db.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'Gim03033',
    database : 'guest_book',
    debug    :  false
});


var Repository  = {
    getAllComments : function(callback){
        pool.getConnection(function(err, connection){
           if(err){
               console.log(err);
               connection.release();
               return;
           }
            connection.query('select * from comments', function(err,rows){
                connection.release();
                if(!err) {
                    rows = rows.map(function(item){
                        return {
                            name: item.user_name,
                            email: item.email,
                            url: item.url,
                            msgText: item.comment_text,
                            date: item.date
                        }
                    });
                    callback(rows);
                }
            });
        });
    },
    insertComment: function(msg){
        console.log('Inserting',msg);
        pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
                connection.release();
            }
            connection.query('INSERT INTO comments SET ?', {
                user_name: msg.name,
                email: msg.email,
                url: msg.url,
                ip: msg.ip,
                comment_text: msg.msgText
            },
                function(err){
                    connection.release();
                    if(!err){
                        console.log('new date is inserted');
                    }
                });
        });
    }
};


module.exports = Repository;