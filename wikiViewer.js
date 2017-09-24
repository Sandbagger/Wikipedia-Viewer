//Wait for DOM to load before adding event listener on button

document.addEventListener('DOMContentLoaded', addListenerToButton);

//callback for DOM load which adds a click event on the button
function addListenerToButton() {

var button = document.getElementsByTagName("button")[0];

button.addEventListener("click", saveText);	
console.log("addListenerToButton");
};

//callback for click event that triggers request to API
function saveText() {
	var userInput = document.getElementsByTagName("input")[0].value;
	
	if (userInput === "") {
		alert("Please enter a search term")
		return 
	}
	requestJSONP(userInput);
	console.log("saveText");
};

//advoids cross browser origin error
function requestJSONP(searchTerm) {
	//dynamically create a script tag
	var scriptTag = document.createElement("script");
	//set url with user defined search parameter
	scriptTag.src = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&limit=10&namespace=0&format=json&callback=module.store";
	//append tag to head element 
	document.getElementsByTagName("head")[0].appendChild(scriptTag);
	console.log("got to JSONP");
};


//callback invoked when API sends reponse
var module = (function(){
	var storedValue = [];
console.log("got to module");
	return {
		store: function(val){
			storedValue.push(val);
			console.log("got to module.store");
			displayArray();
		},

		retrieve: function(){
			return storedValue;
		},
		searchTerm: function(){
			return storedValue[0][0];
		},

		pageTitle: function(){
			return storedValue[0][1];
		},

		pageDescription: function(){
			return storedValue[0][2];
		},

		pageUrl: function(){
			return storedValue[0][3];
		},
	}

}());

function displayArray(){
	var stored = module.retrieve();	
	pTag = document.getElementsByTagName("p")[0];
	text = pTag.textContent = stored;

}


/*


function updateDom(){
	var pageTitle = module.pageTitle()
	pageTitle.forEach(createNewDiv);
}

var createNewDiv = function(item){
	var newDiv = document.createElement("div");
	newDiv.TextContent = item;
	document.body.appendChild(newDiv);
}




var createNewDiv = function(item){
	var newDiv = document.createElement("div");
	var newHeader = document.createElement("header");
	var text = document.createTextNode(item);
	newHeader.appendChild(text);
	newDiv.appendChild(newHeader);
	document.main.appendChild(newDiv);
}






function handleResponse(response) {
		var store = [];
		store.push(response);
		}



var modularPattern = (function(response) {
	console.log(response)
}());

function handleResponse(response) {
		console.log(response);
		}
function storeResponse(arr){
	return function(){
		return arr;
	}
};


requestJSONP();




function handleResponse(response) {
		if (response !== undefined) {
			
		var storedResult = function(){
			var result = [];
			result.push(response);
		}();

		else {
			return 
		}

		var result = [];
		result.push(response);
		storeResponse(result);
};	




test = [];
function responseWrapper(response){
	if (response !== undefined) {
		var storeResult = [];
		storeResult.push(response)
		test.push(response);
	}
	return function() {
		return storeResult;
	}
}




function handleResponse(response) {
		var result = [];
		result.push(response);
		storeResponse(result);
}	
		
function storeResponse(arr){
	return function(){
		return arr;
	}
}
	


var result = handleResponse();

function makeRequestHandleRespone(url){
	var xhr = new XMLHttpRequest(); 

	xhr.open("GET", url, true);
	
	xhr.setRequestHeader( 'Api-User-Agent', 'Example/1.0' );
	
	xhr.send(null);

	xhr.onload = function() {
		if (xhr.status === 200) {
			storeResult.push(JSON.parse(xhr.response));
    	 	}
 		else {console.log("error: status is not 200")
      		}
 	}
};


var module = (function(){
	storedValue = [];

	return {
		store: function(val){
			storedValue.push(val);
		},

		retrieve: function(){
			return storedValue;
		},
	}

}());

*/

