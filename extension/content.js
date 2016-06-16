/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.command && (msg.command == "update_tweet_view")) {
    $(".tweet").each(function(){
    	var id =  $(this).data("tweet-id");
    	$(this).css("opacity","0.25");
    	$(this).text(id);
    });
  }
});