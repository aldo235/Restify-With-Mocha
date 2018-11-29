
module.exports = {
	connection: {
		mongodb
	}
};

/**
 * MongoDB Configuration for connection.
 * @return {string}
 */
function mongodb(){
    let dbConnection = 'mongodb';
    let NODE_ENV = process.env.NODE_ENV;
    if(NODE_ENV === 'development'){
        let DRIVER = getDriver(dbConnection) || 'mongodb',
		HOST = getHost(dbConnection) || 'localhost',
		PORT = getPort(dbConnection) || 27017,
		DATABASE = getDatabase(dbConnection) || '';
	    return `${DRIVER}://${HOST}:${PORT}/${DATABASE}`;
    }else{
        return 'mongodb://localhost:27017/restful_test';
    }
}

/**
 * Get database driver.
 *
 * @param dbConnection
 * @return {string|null}
 */
function getDriver(dbConnection) {
    let connection = JSON.parse(process.env.DB_CONNECTION);
	return connection[dbConnection].driver || null;
}

/**
 * Get database host.
 *
 * @param dbConnection
 * @return {*|null}
 */
function getHost(dbConnection) {
    let connection = JSON.parse(process.env.DB_CONNECTION);
	return connection[dbConnection].host || null;
}

/**
 * Get database port.
 *
 * @param dbConnection
 * @return {*|null}
 */
function getPort(dbConnection) {
    let connection = JSON.parse(process.env.DB_CONNECTION);
	return connection[dbConnection].port || null;
}

/**
 * Get database name.
 *
 * @param dbConnection
 * @return {string|null}
 */
function getDatabase(dbConnection) {
    let connection = JSON.parse(process.env.DB_CONNECTION);
	return connection[dbConnection].database || null;
}