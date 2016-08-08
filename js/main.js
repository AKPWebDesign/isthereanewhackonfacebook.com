var languages = {en: "No."};
var s = new Storage();
var answerTemplate, buttonTemplate;

$(document).ready(function(){
	answerTemplate = Handlebars.compile($("#answer-template").html());
	buttonTemplate = Handlebars.compile($("#lang-dropdown-button-template").html());
	$.getJSON( "lang/all.json", function( data ) {
	  languages = data;
		changeLang(s.get('lang-code') || 'en_US');
		prepareLangPanel(data);
	});
});

$('.langButton, .langCloseButton').click(function(){
	$('.languages-panel').toggleClass('onscreen');
	$('.languages-panel').toggleClass('offscreen');
});

function changeLang(lang) {
	if(!languages[lang]) { console.log('Unsupported language code '+lang); lang = 'en_us'; }
	$("#answer").html(answerTemplate({answer: languages[lang].answer}));
	$("#langDropdown").html(buttonTemplate({name: languages[lang].name}));
	return lang;
}

function prepareLangPanel(data) {
	var temp = $("#lang-dropdown-list-item-template").html();
	var compiled = Handlebars.compile(temp);
	var byNames = {}, key, keys = [];

	for (key in data) {
		if (data.hasOwnProperty(key)) {
			byNames[data[key].name] = key;
		}
	}

	for (key in byNames) {
		keys.push(key);
	}

	keys.sort();

	for (var i = 0; i < keys.length; i++) {
		var d = byNames[keys[i]];
		$(".languages").append(
			compiled({lang: d, name: keys[i]})
		);
	}

	$('.languages li a').click(function() {
		var lang = $(this).data('lang');
		s.set('lang-code', changeLang(lang));
		$('.languages-panel').toggleClass('onscreen');
		$('.languages-panel').toggleClass('offscreen');
	});
}
