var sentiment = require('sentiment');


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.command && (msg.command == "update_tweet_view")) {    
    $('.tweet').each(function(){
    	var text =  $(this).find('.tweet-text').text();
      var score = sentiment(text).score.toString();
      if(score < 0) {
        score *= -1;
        var blur = 'blur(' + score + 'px)';
        $(this).css("-webkit-filter", blur);
      }
    	
    });

  }
});