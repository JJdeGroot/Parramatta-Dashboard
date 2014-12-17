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
function parseCSV(location) {
     console.log("Parse CSV from: " + location);
    
    $.get(location, function(data) {
        console.log(data);
        
        var lines = data.split(",");
        console.log("Lines: " + lines.length);
    }, "text").fail(function() {
        alert("Failed to retrieve CSV data from " + location); 
    });
    
}