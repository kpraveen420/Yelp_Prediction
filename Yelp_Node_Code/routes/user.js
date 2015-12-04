
exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.analysis = function(req, res){
	  res.render('analysis', { title: 'Yelp' });
};
exports.home = function(req, res){
	  res.render('index', { title: 'Yelp' });
};
exports.prediction = function(req, res){
	  res.render('prediction', { title: 'Yelp' });
};