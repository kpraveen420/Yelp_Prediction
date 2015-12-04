
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , analysis = require('./routes/analysis')
  , prediction = require('./routes/prediction');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.configure(function() {
    app.use(allowCrossDomain);
    //some other code
});



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/analysis', user.analysis);
app.get('/home',user.home);
app.get('/prediction',user.prediction);
app.get('/users', user.list);
app.get('/getStates', analysis.getStates);
app.post('/getCities', analysis.getCities);
app.post('/getRestaurants', analysis.getRestaurants);
app.post('/getActualRating', analysis.getActualRating);
app.post('/getFeatures', analysis.getFeatures);
app.post('/getAvgRatingPerDay', analysis.getAvgRatingPerDay);
app.post('/predict', prediction.predictRating);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
