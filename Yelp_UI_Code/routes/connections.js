var database = require('mysql');
function dbConnection()
{
	var sqlDB = database.createConnection({
										host     : '54.218.47.42',
										user     : 'root',
										password : 'root',
										database: 'yelp_v2'
									  });
	sqlDB.connect();
	return sqlDB;
}



exports.dbConnection = dbConnection;



