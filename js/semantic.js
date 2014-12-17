
var getCityData = function(city, func) {
    $.get(sparqlQuery(city), function(result) { 
        processResults(result, func); 
    }).fail(function() {
        noResults();
    });
}

var sparqlQuery = function(city) {
    var query = "http://dbpedia.org/sparql?query=PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema/>SELECT * WHERE { <http://dbpedia.org/resource/%city%> ?p ?o . }&format=json"
    query = query.replace("%city%", encodeURIComponent(encodeURIComponent(city)));
    // Needs to be doubly encoded
    return query;
}

var processResults = function(result, func) {
    var ignorePredicates = [
        "http://www.w3.org/2000/01/rdf-schema#label",
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://www.w3.org/2002/07/owl#sameAs",
        "http://purl.org/dc/terms/subject"
    ];
    var preferredLanguage = "en";
    var list = result.results.bindings;
    if (list && !_.isUndefined(list) && list.length > 0) {
        // Empty info
        $('#city-contents').empty();
        $("#map-info").empty();

        var data = {};
        _.forEach(list, function(predicate) {
            var o = predicate.o, p = predicate.p;
            var display = true;
            if (_.indexOf(ignorePredicates, p.value) > -1)
                display = false;
            if (o['xml:lang'] && o['xml:lang'] != preferredLanguage)
                display = false;
            if (display) {
                // Determine key & value
                var key = stripUrl(p.value);
                var value = o.value;
                if (o.value.indexOf('http') == 0)
                    value = '<a href="' + value + '" target="_blank">' + value + '</a>';

                // Show
                displayLine(key, value);
                data[key] = value;
            }
        });
        displayInfo(data);
    }
    else {
        noResults();
    }
}



