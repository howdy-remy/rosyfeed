chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'loading' && tab.active) {
		chrome.tabs.sendMessage(tab.id, {
			command: "update_tweet_view",
		});
	}
});