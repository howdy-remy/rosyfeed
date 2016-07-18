//send message upon checkbox change to toggle extension on/off
$('#toggle').change(function(){
	console.log('click!');
	if($(this).is(":checked")) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {command: "set_blur"}, function(response) {
		    console.log('response?',response);
		  });
		});
	}
  else {
  	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {command: "set_unblur"}, function(response) {
		    console.log('response?',response);
		  });
		});
  }

});