$(document).ready(function() {
    getCityData("Parramatta");
});

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
        $("#city-info").empty();

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
                data[key] = value;
            }
        });
        displayInfo(data);
        for (var key in data)
            addInfoRaw(key, data[key]);

    }
    else {
        noResults();
    }
}

function noResults() {
    // Do nothing for the moment;
}

var stripUrl = function(url) {
    var hash = url.lastIndexOf('#');
    var slash = url.lastIndexOf('/');
    var pos = (hash > slash ? hash : slash);
    if (pos > -1) {
        url = url.substring(pos + 1);
    }
    return url;
};

var displayLine = function(key, value) {
    //$('#city-contents').append('<tr>y   + '</td><td></td><td>'+ value + '</td></tr>');
    console.log(key, value)
};


var displayInfo = function(data) {
    var name = data["name"];
    if(name !== undefined) {
        addInfo("Name", "<h1>"+name+"</h1>");
    }

    var homepage = data["homepage"];
    if(homepage !== undefined) {
        addInfo("Website", homepage);
    }

    var nickname = data["nickname"];
    if(nickname !== undefined) {
        addInfo("Nickname", "<h4>\""+nickname+"\"</h4>");
    }

    var motto = data["motto"];
    if(motto !== undefined) {
        addInfo("Motto", "<q>"+motto+"</q>");
    }

    var point = data["point"];
    if(point !== undefined) {
        addInfo("Lat/Long", point);
    }
    
    var population = data["populationTotal"];
    if(population !== undefined) {
        addInfo("Population: ", population);
    }

    var abstract = data["abstract"];
    if(abstract !== undefined) {
        addInfo("Abstract: ", "<span style='margin-top: 20px'>"+abstract+"</span>");
    }
}

var addInfo = function(key, value) {
    $("#wiki-info-profile").append("<tr><td>" + key+"</td><td>" + value + "</td></tr>");
}

var addInfoRaw = function(key, value) {
    $("#wiki-info-raw").append("<tr><td>" + key+"</td><td>" + value + "</td></tr>");
}
