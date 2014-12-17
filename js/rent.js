var path = "data/rent/";
var url = "/api/files?q="+path;
console.log("Rent files URL: " + url);

$(document).ready(function() {

});

// Retrieve files
$.get(url, function(files) {
    // Append building types to dropdown
    $.each(files, function(i, file) {
        $("#buildings").append("<option value='"+file+"'>"+file+"</option>");
    });
}).fail(function() {
    alert("Failed to perform API call to " + url);
});

// Listen to buildings dropdown
$("#buildings").on("change", function() {
    var file = $(this).val();
    parseCSV(path + file);
});

// Retrieves a CSV file and then parses it
var csv = null;
function parseCSV(location) {
    console.log("Parsing CSV from: " + location);
    
    // Parse data
    Papa.parse(location, {
        download: true,
        complete: function(results) {
            csv = results;
            console.log("Remote file parsed!", results);
            
            // Determine cities
            var cities = _.chain(results.data).map(function(row) { return row[0]; } ).rest(1).value();
            console.log("Cities:", cities);
            
            // Determine years
            
            
            // Determine series
            var series = [];
            for(var i=1; i<results.data.length; i++) {
                var name = results.data[i][0];
                if(name == "Parramatta") {
                    var data = [];
                    for(var j=1; j<results.data[i].length; j+=2) {
                        var value = results.data[i][j];
                        data.push(parseInt(value));
                    }
                    series.push({name: name, data: data});
                }
            }
            console.log(series);

            $('#building-chart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'NWS rent prices'
                },
                xAxis: {
                    categories: ['data']
                },
                yAxis: {
                    title: {
                        text: 'Price ($/w)'
                    }
                },
                series: series
            });

        }
    });

}