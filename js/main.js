var languages = {en: "No."};
var s = new Storage();
var hbs, hbt;

$(document).ready(function(){
	hbs = $("#answer-template").html();
	hbt = Handlebars.compile(hbs);
	$.getJSON( "lang/all.json", function( data ) {
	  languages = data;
		changeLang(s.get('lang-code') || 'en');
	});
});

$('.languages li a').click(function() {
	var lang = $(this).data('lang');
	s.set('lang-code', changeLang(lang));
});

function changeLang(lang) {
	if(!languages[lang]) { console.log('Unsupported language code '+lang); lang = 'en'; }
	console.log('Language = ' + lang);
	var d = {answer: languages[lang]};
	console.log('Data = ', d);
	$("#answer").html(hbt(d));
	return lang;
}
