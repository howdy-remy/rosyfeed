var sentiment = require('sentiment');
var _ = require('lodash');

var retext = require('retext');
var inspect = require('unist-util-inspect');
var retextSentiment = require('retext-sentiment');


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.command && (msg.command == "update_tweet_view")) {
		tweetblur();
		$(window).on('scroll', _.debounce(function () {
			tweetblur();
		}, 100));

	} else if (msg.command && (msg.command == "reset_tweet_view")) {
		unblur();
		$(window).off('scroll');
	}
});

function tweetblur() {
	$('.tweet').each(function () {
		var tweetText = $(this).find('.tweet-text').text();
		var children = $(this).children();
		var score = sentiment(tweetText).score.toString();
		if (score < 0) {
			score = (score - 2) * -1;
			var blur = 'blur(' + score + 'px)';
			$(children).css({ 'opacity': '0.25', '-webkit-filter': blur });
			$(this).hover(function () {
				$(children).css({ 'opacity': '1', '-webkit-filter': 'blur(0)', '-webkit-transition': '-webkit-filter 1000ms linear, opacity 1000ms linear' });
			}, function () {
				$(children).css({ 'opacity': '0.25', '-webkit-filter': blur });
			});
		}
	});
}

function tweetblur() {
	$('.tweet').each(function () {
		var tweetText = $(this).find('.tweet-text').text();
		var children = $(this).children();
		var score;

		retext.use(retextSentiment).use(function(){
			return function(tree){
				if(tree.data){
					score = tree.data.polarity;
				}
			};
		}).process(tweetText);

		if (score < 0) {
			score = (score - 2) * -1;
			var blur = 'blur(' + score + 'px)';
			$(children).css({ 'opacity': '0.25', '-webkit-filter': blur });
			$(this).hover(function () {
				$(children).css({ 'opacity': '1', '-webkit-filter': 'blur(0)', '-webkit-transition': '-webkit-filter 1000ms linear, opacity 1000ms linear' });
			}, function () {
				$(children).css({ 'opacity': '0.25', '-webkit-filter': blur });
			});
		}
	});
}


function unblur() {
	$('.tweet').each(function () {
		$(this).children().removeAttr('style');
	});
}
