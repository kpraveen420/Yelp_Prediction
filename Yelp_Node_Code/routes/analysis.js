var db = require("./connections");

function getStates(req, res)

{
	console.log("getStates");
	var connection = db.dbConnection();
	var query = connection.query("SELECT state " + "FROM restaurant "
			+ "GROUP BY state " + "ORDER BY state ASC", function(err, rows) {

		connection.end();
		if (err) {
			console.log("DB query failed " + err);
			res.error = err;
		} else {
			var data = [];
			if (rows.length > 0) {
				for (var index = 0; index < rows.length; index++) {
					// console.log(rows[index].state);
					data.push(rows[index].state);
				}
				res.code = '200';
				console.log(rows);
				console.log(data);
				res.send({
					'status' : "Success",
					'states' : data
				});
			} else {
				res.send({
					'status' : "Failed"
				});
			}
		}
	});
}

function getCities(req, res) {
	var user_state = req.param("selectedState");
	// var user_state = "WI";
	var connection = db.dbConnection();
	var query = connection.query("SELECT city " + "FROM restaurant "
			+ "WHERE state = ? " + "GROUP BY city " + "ORDER BY city ASC ",
			[ user_state ], function(err, rows) {

				connection.end();
				if (err) {
					console.log("DB query failed " + err.errno);
					res.error = err;
				} else {
					var data = [];
//					data.push(' ');
					if (rows.length > 0) {
						for (var index = 0; index < rows.length; index++) {
							// console.log(rows[index].state);
							data.push(rows[index].city);
						}
						res.code = '200';
						console.log(rows);
						console.log(data);
						res.send({
							'status' : "Success",
							'cities' : data
						});
					} else {
						res.send({
							'status' : "Failed"
						});
					}
				}
			});
}

function getRestaurants(req, res) {

	var user_state = req.param("selectedState");
	var user_city = req.param("selectedCity");
	console.log("restaurants api");
	console.log(user_state);
	console.log(user_city);

	var connection = db.dbConnection();
	var query = connection.query("SELECT business_id,name "
			+ "FROM restaurant "
			+ "WHERE state = ? and city = ? ORDER BY name ASC", [ user_state,
			user_city ], function(err, rows) {

		connection.end();
		if (err) {
			console.log("DB query failed " + err.errno);
			res.error = err;
		} else {
			var data = [];
			if (rows.length > 0) {
//				data.push({
//					'ID' : ' ',
//					'name' : ' '
//				});
				for (var index = 0; index < rows.length; index++) {
					// console.log(rows[index].state);
					data.push({
						'ID' : rows[index].business_id,
						'name' : rows[index].name
					});
				}
				res.code = '200';
				console.log(rows);
				console.log(data);
				res.send({
					'status' : "Success",
					'restaurantName' : data
				});
			} else {
				res.send({
					'status' : "Failed"
				});
			}
		}
	});
}

function getActualRating(req, res) {

	// var restaurant_name = req.param("selectedRestaurant");
	var business_id = req.param("selectedRestaurant_businessId");
	console.log(business_id);

	var connection = db.dbConnection();
	var query = connection.query("SELECT business_id,name,stars "
			+ "FROM restaurant " + "WHERE business_id = ? ", [ business_id ],
			function(err, rows) {

				connection.end();
				if (err) {
					console.log("DB query failed " + err.errno);
					res.error = err;
				} else {
					var data = [];
					if (rows.length > 0) {
						for (var index = 0; index < rows.length; index++) {
							// console.log(rows[index].state);
							data.push({
								"name" : rows[index].name,
								"stars" : rows[index].stars
							});
						}
						res.code = '200';
						console.log(rows);
						console.log(data);
						res.send({
							'status' : "Success",
							'actualRating' : data
						});
					} else {
						res.send({
							'status' : "Failed"
						});
					}
				}
			});
}

function getFeatures(req, res) {
	var business_id = req.param("selectedRestaurant_businessId");
	console.log(business_id);

	var connection = db.dbConnection();
	var query = connection.query("select * " + "from restaurant_features "
			+ "where restaurant_business_id=? ", [ business_id ], function(err,
			rows) {

		connection.end();
		if (err) {
			console.log("DB query failed getFeatures " + err.errno);
			res.error = err;
		} else {
			var available = [];
			var unavailable = [];
			if (rows.length === 1) {
				// take out
				if (rows[0].takeOut === 1) {
					available.push("takeOut");
				} else {
					unavailable.push("takeOut");
				}
				// noise level
				var noise = [ "average", "loud", "very_loud", "quiet" ];
				if (rows[0].noiseLevel !== null
						|| rows[0].noiseLevel !== undefined) {
					for (var i = 0; i < noise.length; i++) {
						if (noise[i] === rows[0].noiseLevel) {
							available.push({
								"noise" : "noise-" + rows[0].noiseLevel
							});
						} else {
							unavailable.push({
								"noise" : "noise-" + noise[i]
							});
						}
					}
				}

				// take reservation
				if (rows[0].takesReservations === 1) {
					available.push("takesReservations");
				} else {
					unavailable.push("takesReservations");
				}
				// delivery
				if (rows[0].delivery === 1) {
					available.push("delivery");
				} else {
					unavailable.push("delivery");
				}
				// ambience
				if (rows[0].ambience_romantic === 1) {
					available.push("ambience_romantic");
				} else {
					unavailable.push("ambience_romantic");
				}
				if (rows[0].ambience_intimate === 1) {
					available.push("ambience_intimate");
				} else {
					unavailable.push("ambience_intimate");
				}
				if (rows[0].ambience_touristy === 1) {
					available.push("ambience_touristy");
				} else {
					unavailable.push("ambience_touristy");
				}
				if (rows[0].ambience_hipster === 1) {
					available.push("ambience_hipster");
				} else {
					unavailable.push("ambience_hipster");
				}
				if (rows[0].ambience_divery === 1) {
					available.push("ambience_divery");
				} else {
					unavailable.push("ambience_divery");
				}
				if (rows[0].ambience_classy === 1) {
					available.push("ambience_classy");
				} else {
					unavailable.push("ambience_classy");
				}
				if (rows[0].ambience_trendy === 1) {
					available.push("ambience_trendy");
				} else {
					unavailable.push("ambience_trendy");
				}
				if (rows[0].ambience_upscale === 1) {
					available.push("ambience_upscale");
				} else {
					unavailable.push("ambience_upscale");
				}
				if (rows[0].ambience_casual === 1) {
					available.push("ambience_casual");
				} else {
					unavailable.push("ambience_casual");
				}

				// parking
				if (rows[0].parking_garage === 1) {
					available.push("parking_garage");
				} else {
					unavailable.push("parking_garage");
				}
				if (rows[0].parking_street === 1) {
					available.push("parking_street");
				} else {
					unavailable.push("parking_street");
				}
				if (rows[0].parking_validated === 1) {
					available.push("parking_validated");
				} else {
					unavailable.push("parking_validated");
				}
				if (rows[0].parking_lot === 1) {
					available.push("parking_lot");
				} else {
					unavailable.push("parking_lot");
				}
				if (rows[0].parking_valet === 1) {
					available.push("parking_valet");
				} else {
					unavailable.push("parking_valet");
				}
				// hasTV
				if (rows[0].hasTV === 1) {
					available.push("hasTV");
				} else {
					unavailable.push("hasTV");
				}
				// outdoor seating
				if (rows[0].Outdoor_Seating === 1) {
					available.push("Outdoor_Seating");
				} else {
					unavailable.push("Outdoor_Seating");
				}
				// Attire
				var attire = [ "casual", "dressy" ];
				if (rows[0].Attire !== null || rows[0].Attire !== undefined) {
					for (var j = 0; j < attire.length; j++) {
						if (attire[j] === rows[0].Attire) {
							available.push({
								"attire" : "attire-" + rows[0].Attire
							});
						} else {
							unavailable.push({
								"attire" : "attire-" + attire[j]
							});
						}
					}
				}
				// Alcohol
				var alcohol = [ "none", "full_bar", "beer_and_wine" ];
				if (rows[0].Alcohol !== null || rows[0].Alcohol !== undefined) {
					for (var k = 0; k < alcohol.length; k++) {
						if (alcohol[k] === rows[0].Alcohol) {
							available.push({
								"alcohol" : "alcohol-" + rows[0].Alcohol
							});
						} else {
							unavailable.push({
								"alcohol" : "alcohol-" + alcohol[k]
							});
						}
					}
				}
				// Waiter service
				if (rows[0].Waiter_Service === 1) {
					available.push("Waiter_Service");
				} else {
					unavailable.push("Waiter_Service");
				}
				// Credit cards accepted
				if (rows[0].AcceptsCreditCards === 1) {
					available.push("AcceptsCreditCards");
				} else {
					unavailable.push("AcceptsCreditCards");
				}
				// good for kids
				if (rows[0].GoodforKids === 1) {
					available.push("GoodforKids");
				} else {
					unavailable.push("GoodforKids");
				}
				// good for groups
				if (rows[0].GoodForGroups === 1) {
					available.push("GoodForGroups");
				} else {
					unavailable.push("GoodForGroups");
				}
				// Price range
				var price = [ 1, 2, 3, 4 ];
				if (rows[0].PriceRange !== null) {
					available.push({
						"price" : "Price-" + rows[0].PriceRange
					});
				} else {
					for (var l = 0; l < price.length; l++) {
						if (l !== (rows[0].PriceRange - 1)) {
							unavailable.push({
								"price" : "Price-" + price[l]
							});
						}
					}
				}

				res.code = '200';
				console.log(rows);
				console.log(available);
				console.log(unavailable);
				res.send({
					'status' : "Success",
					'available' : available,
					'unavailable' : unavailable
				});
			} else {
				res.send({
					'status' : "Failed"
				});
			}
		}
	});
}

function getAvgRatingPerDay(req, res) {

	var restaurant_business_id = req.param("restaurant_business_id");

	console.log(restaurant_business_id);

	var connection = db.dbConnection();

	var query = connection.query(
			"SELECT restaurant_business_id, date, AVG(stars) as AvgValue "
					+ "FROM reviews " + "WHERE restaurant_business_id = ? "
					+ "GROUP BY date " + "ORDER BY date ASC",
			[ restaurant_business_id ], function(err, rows) {

				connection.end();
				if (err) {
					console.log("DB query failed " + err);
					res.error = err;
				} else {
					var data = [];
					if (rows.length > 0) {
						for (var index = 0; index < rows.length; index++) {
							data.push({
								"date" : rows[index].date,
								"average" : rows[index].AvgValue
							});
						}
						res.code = '200';
						res.data = rows;
						console.log(rows);
						console.log(data);
						res.send({
							'status' : "Success",
							'graph' : data
						});
					} else {
						res.send({
							'status' : "Failed"
						});
					}
				}
			});
}

exports.getStates = getStates;
exports.getCities = getCities;
exports.getRestaurants = getRestaurants;
exports.getActualRating = getActualRating;
exports.getAvgRatingPerDay = getAvgRatingPerDay;
exports.getFeatures = getFeatures;
