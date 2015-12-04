function test(aa1) {

var data = [];

if(aa1 !== null && aa1 !== undefined)
{	
for(var index = 0; index<aa1.length; index++){
	var date = new Date(aa1[index].date);
	var dataPoint = [];
	dataPoint.push(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
	dataPoint.push(aa1[index].average);
	
	data.push(dataPoint);
	//console.log(Date.UTC(date.getUTCFullYear(), date.getUTCMonth()+1, date.getUTCDate()));
}

}
$(function () {
    $('#container').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Yelp Real-time Ratings'
        },
        xAxis: {
        	type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                year: '%b %y'
            },
            labels: {
            	formatter: function() {
                    return Highcharts.dateFormat('%d %b %Y', this.value);
                }
            },
            title: {
                text: 'Date'
            }

           },
        yAxis: {
            title: {
                text: 'Ratings'
            },
            min: 0,
            max: 5
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e.%b.%Y}: {point.y:.1f} '
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        series: [{
            name : 'analysis',
            data: data
        }]
    });
});
}
