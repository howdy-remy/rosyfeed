/* When the browser-action button is clicked... */
// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.sendMessage(tab.id, {
//       command: "change_title",
//       title: "hoge"
//     },
//     function(msg) {
//       console.log("result message:", msg);
//     });
// });

// chrome.tabs.sendMessage(tab.id, {
// 	command: "update_tweet_view",
// });

/*when the tab is updated */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete' && tab.active) {
		chrome.tabs.sendMessage(tab.id, {
			command: "update_tweet_view",
		});
	}
});
