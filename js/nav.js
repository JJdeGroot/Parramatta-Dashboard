
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
	_.values(components).forEach(function(c) { console.log(c); $(c).hide(); } )
	$(components[e.currentTarget.id]).show();
};
