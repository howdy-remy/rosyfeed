//send message upon checkbox change to toggle extension on/off
$('#toggle').change(function(){
	console.log('click!');
	if($(this).is(":checked")) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {command: "set_blur"});
		});
	}
  else {
  	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {command: "set_unblur"});
		});
  }
});

$("#polarityForm").submit(function(event){
	var data = $(this).serializeArray();
	event.preventDefault();
	
	chrome.storage.sync.get(null, function (storage){
		var word = data[0].value;
		storage[word] = data[1].value;
		
	  chrome.storage.sync.set(storage, function(){
	  	console.log('stored!');
			$(this).find("input").val("");
	  });
	});
});