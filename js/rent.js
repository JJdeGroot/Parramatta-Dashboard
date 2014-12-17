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
     console.log("Parse CSV from: " + location);
    
    Papa.parse(location, {
        download: true,
        complete: function(results) {
            csv = results;
            console.log("Remote file parsed!", results);
        }
    });
    /*
    $.get(location, function(data) {
        csv = $.parse(data);
        console.log(csv);
        
    }, "text").fail(function() {
        alert("Failed to retrieve CSV data from " + location); 
    });
    */
}