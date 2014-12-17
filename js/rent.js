var path = "data/rent/";
var url = "/api/files?q="+path;
console.log("Rent files URL: " + url);


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
    var fileName = $(this).val();
    parseCSV(fileName);
});

// Retrieves a CSV file and then parses it
var csv = null;
function parseCSV(fileName) {
    var location = path + fileName;
    console.log("Parsing CSV from: " + location);
    
    // Parse data
    Papa.parse(location, {
        download: true,
        complete: function(results) {
            csv = results;
            console.log("Remote file parsed!", results);
            
            // Determine columns
            var columns = [];
            for(var i=1; i<results.data[0].length; i+=2) {
                columns.push(results.data[0][i]);   
            }
            console.log("Columns:", columns);
            
            
            // Determine series
            var series = [];
            for(var i=1; i<results.data.length; i++) {
                var name = results.data[i][0];
                if(name == "Parramatta") {
                    var data = [];
                    for(var j=1; j<results.data[i].length; j+=2) {
                        var value = results.data[i][j];
                        if(value !== undefined && value.length > 0) {
                            data.push(parseInt(value));
                        }
                    }
                    series.push({name: name, data: data});
                }
            }
            console.log("Series:", series);

            // Generate chart
            $('#building-chart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: fileName
                },
                xAxis: {
                    categories: columns
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