require('./core/mongoose');
const restify = require('restify');
const app = restify.createServer({});

/**
 * Declare controller files.
 */
const
	userController = require('./controllers/user');

app
	.pre(restify.CORS({ origins: ['*'], credentials: false, headers: ['authorization', 'x-localization'] }))
	.pre(restify.pre.sanitizePath());

app
    .use(restify.plugins.acceptParser(app.acceptable))
    .use(restify.plugins.authorizationParser())
    .use(restify.plugins.CORS())
	.use(restify.plugins.queryParser())
	.use(restify.plugins.bodyParser({ maxBodySize: 25000000 }))
    .use(restify.plugins.fullResponse());

restify.CORS.ALLOW_HEADERS.push("authorization");
restify.CORS.ALLOW_HEADERS.push("x-localization");

app.get('v1/users', userController.list);
app.post('v1/users', userController.create);
app.get('v1/users/:id', userController.details);
app.put('v1/users/:id', userController.update);
app.del('v1/users/:id', userController.softDelete);

/*-----------------------------------------------------------------------------------------------------------*/

let port = process.env.PORT || 8000;
port = (process.env.NODE_ENV === 'development') ? port : 8100;
app.listen(port, function (err) {
	var host = (app.address().address ==  '::') ? 'localhost' : app.address().address;
	(err)
		? console.log('Restful-API app error:' + err)
		: console.log('Restful-API app is running @ '+ host+':'+ port);
});

/*------------------------------------|     Custom Response Handler      |------------------------------------*/

/**
 * Custom Bad Request format.
 */
app.on('InvalidContent', (req, res, error, next) => {
	error.body = { error: { message: "Invalid JSON format" }, status: "BAD_REQUEST" };
	return next();
});

/**
 * Custom Method Not Allowed format.
 */
app.on('MethodNotAllowed', (req, res, error, next) => {
	error.body = { error: { message: error.message }, status: "METHOD_NOT_ALLOWED" };
	return res.json(405, result);//next();
});

/**
 * Custom JWT invalid credential response.
 */
app.on('InvalidCredentials', (req, res, error, next) => {
	error.body = { error: { message: "Unauthenticated" }, status: "FORBIDDEN" };
	return next();
});
module.exports = app
/*-----------------------------------------------------------------------------------------------------------*/