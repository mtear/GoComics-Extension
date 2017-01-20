//Handle the page source parsing callback
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getHTMLSource") {
	var imageUrl = "error";
	
	//Find the image if it's on the page
	if(request.source.indexOf("img-fluid item-comic-image") >= 0){
		//Get into the div tag
		var imageUrl = request.source.substring(request.source.indexOf("img-fluid item-comic-image"));
		//Parse to the src property
		imageUrl = imageUrl.substring(imageUrl.indexOf("src=")+5);
		//Pull out the url
		imageUrl = imageUrl.substring(0, imageUrl.indexOf("\""));
	}
	//Handle corrupted urls
	if(imageUrl.indexOf("http") != 0){
		message.innerText = "Error finding image!";
	}else{
		//Load the image into the div
		var imageResult = document.getElementById('image');
		imageResult.src = imageUrl;
		imageResult.hidden = false;
	}
  }
});

/**
	Begin the Comic HTML parsing
*/
function onLoad() {
	//Inject HTML source script into chrome tab
	chrome.tabs.executeScript(null, {
		file: "getHTMLSource.js"
	}, function() {
		// Handle errors
		if (chrome.runtime.lastError) {
			message.innerText = 'Error loading extension!';
		}
	});
}

//Call the onLoad method when the page is loaded
window.onload = onLoad;