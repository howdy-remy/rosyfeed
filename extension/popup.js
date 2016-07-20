//send message upon checkbox change to toggle extension on/off
var enabled = true;
$('#toggle').click(function(){

	console.log('click!');
	if(!enabled) {
		console.log('turn on');
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {command: "set_blur"});
		});
		$(this).text('on').css("background-color", "#BC3C57");
	} else {
				console.log('turn off');

  	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {command: "set_unblur"});
		});
		$(this).text('off').css("background-color", "#938E94");

  }
  enabled = !enabled;
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