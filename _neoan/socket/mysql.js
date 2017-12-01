// database

var mysqlConnection;
fs.readFile('/opt/bitnami/apache2/htdocs/frame/_socket/socket.json','utf8',function(err,data){
    if(err){
        return console.log(err);
    }
    mysqlConnection = data;
});
var mysql = require('mysql');
var connection = mysql.createConnection(mysqlConnection);

function call(query){

    connection.connect();
    connection.query(query,function(error,results,fields){
        if (error) throw error;
        return results;
    });
    connection.end();
}
