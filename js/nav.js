
var components;
$(document).ready(function() {
	components = { 
		"nav-overview": "#content-overview", 
		"nav-rent": "#content-rent", 
		"nav-wiki-profile": "#content-profile", 
		"nav-wiki-raw": "#content-raw", 
		"nav-placeholders": "#content-placeholders" 
	};
	_.keys(components).forEach(function(c) { $("#" + c).click(doNav); } )
});

var doNav = function(e, ui) {
	var offset = $(components[e.currentTarget.id]).position().top - 30;
	$('html, body').animate({
            scrollTop: offset + 'px'
    }, 'fast');
	console.log(offset)
};
