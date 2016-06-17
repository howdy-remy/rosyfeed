/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.command && (msg.command == "update_tweet_view")) {
  	var tweets = $(".tweet");
  	var tweet = 'this is a super awesome tweet';
  	var rankedTweet = $.ajax({
  		type: 'GET',
  		url: 'https://192.168.1.110:3000/',
  		crossDomain: true
  	})
  	.done(function(){
  		console.dir(rankedTweet);
    
   	  $('.dashboard-left').append("<p>" + rankedTweet + "</p>")
  		
  	});

    
    $('.tweet').each(function(){
    	var id =  $(this).data("tweet-id");
    	$(this).css("opacity","0.25");
    	$(this).text(id);
    });
  }
});

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});