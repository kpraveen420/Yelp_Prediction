/**
 * http://usejsdoc.org/
 */

var request = require("request");

function predictRating(req, res) {

	// request(
	// "http://localhost:9999/getdata/-1qDklczWpxON-3_Nj9NgA/Alcohol/full_bar",
	// function(error, response, body) {
	//
	// // console.log(body);
	// // console.log(body.new_rating)
	// console.log(response);
	// console.log(response.body.new_rating);
	// body = JSON.parse(body);
	// console.log(body);
	//
	// console.log(body.new_rating);
	// if (body !== null && body.new_rating !== null) {
	// res.send({
	// status : 'success',
	// new_rating : body.new_rating
	// });
	// } else {
	// res.send({
	// status : 'failed'
	// });
	// }
	// });
	console.log("in predict rating");
	var rest_id = req.param('id');
	var key = req.param('key');
	var value = req.param('value');
	console.log(rest_id);
	// console.log(req);
	console.log(key);
	console.log(value);
	var dummy = "{ '"+key+"' : '"+value+"'}";
	console.log(dummy)
	request({
		// uri: "http://localhost:9999/getdata/-1qDklczWpxON-3_Nj9NgA",
		uri : "http://localhost:9999/getdata/" + rest_id,
		method : "POST",
		// body: "{ Alcohol:'full_bar' }"
//		body : JSON.stringify({
//			key : value
//		})
		body: dummy
	}, function(error, response, body) {
		console.log(error);
		// console.log(body);
		// console.log(body.new_rating)
//		console.log(response);
		console.log(response.body.new_rating);
		body = JSON.parse(body);
		console.log(body);

		console.log(body.new_rating);
		if (body !== null && body.new_rating !== null) {
			res.send({
				status : 'success',
				new_rating : body.new_rating
			});
		} else {
			res.send({
				status : 'failed'
			});
		}
	});
}

exports.predictRating = predictRating;