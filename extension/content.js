var sentiment = require('sentiment');
var _ = require('lodash');

var Retext = require('retext');
var inspect = require('unist-util-inspect');
var retextSentiment = require('retext-sentiment');

var retext = new Retext();


//CUSTOM POLARITY SETTINGS
//Setting
	//get input as message from popup
	//send to local chrome storage?

//Retrieving
	//retrieve stored options from chrome storage
	chrome.storage.sync.get(null, function (items){
		for(var key in items) items[key] = Number(items[key]);
			console.log(items);
		//apply to retext
		retext.use(retextSentiment, items);
		//send to popup.js to be displayed
	});

chrome.storage.onChanged.addListener(function(changes){
	console.log('changed!', changes);
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
  });
});

//APPLYING/REMOVING BLURS
//listen for messages to apply/remove blurring effect
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.command && (msg.command == "set_blur")) {
		blur();
		$(window).on('scroll', _.debounce(function () {
			blur();
		}, 500));

	} else if (msg.command && (msg.command == "set_unblur")) {
		unblur();
		$(window).off('scroll');
	}
});

//call blur function depending on social media site
function blur() {
	if (location.href.search(/facebook\.com/) > -1) return fbblur();
	if (location.href.search(/twitter\.com/) > -1) return tweetblur();
}

function analyzeAndCss(text, parent, children) {
	retext.use(retextSentiment).use(function () {
		return function (tree) {
			if (tree.data) {
				score = tree.data.polarity;
			}
		};
	}).process(text);

	if (score < 0) {
		score = (score - 2) * -1;
		var blur = 'blur(' + score + 'px)';
		$(children).css({ 'opacity': '0.25', '-webkit-filter': blur });
		$(parent).hover(function () {
			$(children).css({ 'opacity': '1', '-webkit-filter': 'blur(0)', '-webkit-transition': '-webkit-filter 1000ms linear, opacity 1000ms linear' });
		}, function () {
			$(children).css({ 'opacity': '0.25', '-webkit-filter': blur });
		});
	}
}

function tweetblur() {
	$('.tweet').each(function () {
		var tweetText = $(this).find('.tweet-text').text();
		var children = $(this).children();
		var score;

		analyzeAndCss(tweetText, this, children);
	});
}

function fbblur() {
	$('.UFICommentContentBlock').each(function () {
		var comment = $(this).find('.UFICommentBody').text();
		var score;

		analyzeAndCss(comment, this, this);
	});

	$('.userContentWrapper ').each(function () {
		var post = $(this).find('.userContent p');
		var postText = post.text();
		var score;

		analyzeAndCss(postText, post, post);
	});
}


function unblur() {
	$('.tweet').each(function () {
		$(this).children().removeAttr('style');
	});
	$('.UFICommentContentBlock').each(function () {
		$(this).removeAttr('style');
	});
	$('.userContentWrapper').each(function () {
		$(this).find('.userContent p').removeAttr('style');
	});

}


// new Retext().use(sentiment, {
//     'cat': -3,
//     'dog': 3
// });