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
            
            // Determine categories
            var categories = _.chain(results.data).map(function(row) { return row[0]; } ).rest(1).value();
            console.log("Categories:", categories);
            
            // Determine series
         
            
            $('#building-chart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'JJ\'s Herblore Statistics'
                },
                xAxis: {
                    categories: ['runtime', 'xp', 'mixed', 'cleaned', 'decanted', 'grinded']
                },
                yAxis: {
                    title: {
                        text: 'Amount'
                    }
                },
                series: [{
                    name: 'All Users',
                    data: [21387693, 315849198, 7299551, 1587477, 464878, 917936]                    }]
            });

        }
    });

}