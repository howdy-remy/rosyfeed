chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'loading' && tab.active) {
		chrome.tabs.sendMessage(tab.id, {
			command: "update_tweet_view"
		});
	}
});

var enabled = true;

chrome.browserAction.onClicked.addListener(function(tab){
	if(enabled) {
		chrome.browserAction.setIcon({path: 'inactive.png'});
		chrome.tabs.sendMessage(tab.id, {
			command: 'reset_tweet_view'
		});
		enabled = false;
	} else {
		chrome.browserAction.setIcon({path: 'active.png'});
		chrome.tabs.sendMessage(tab.id, {
			command: 'update_tweet_view'
		});
		enabled = true;
	}
});