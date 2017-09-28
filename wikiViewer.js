//Wait for DOM to load before adding event listener on button

document.addEventListener('DOMContentLoaded', addListenerToButton);

//callback for DOM load which adds a click event on the button
function addListenerToButton() {

var button = document.getElementsByTagName("button")[0];

button.addEventListener("click", saveText);	
console.log("addListenerToButton");
};

//callback for click event that triggers request to API
function saveText(event) {
	event.preventDefault()
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
			module.updateDisplay();
		},

		retrieve: function(){
			return storedValue;
		},
		searchTerm: function(){
			return storedValue[0][0];
		},

		searchResultTitles: function(){
			return storedValue[0][1];
		},

		searchResultdescription: function(){
			return storedValue[0][2];
		},

		searchResultUrl: function(){
			return storedValue[0][3];
		},

		updateDisplay: function(){
			displayArray();
			displaySearchTerm();
			createResults();
			
		}
	}

}());

function displayArray(){
	var stored = module.retrieve();	
	pTag = document.getElementsByTagName("p")[0];
	text = pTag.textContent = stored;
}

function displaySearchTerm(){
	var selectHeader = document.getElementsByTagName("header")[1];
	selectHeader.textContent = module.searchTerm(); 
}



function createResults(){
	var arr = module.searchResultTitles();
	arr.forEach(function(item){
		var div = document.createElement("div");
		div.setAttribute("class", "result");
		document.body.main.appendChild(div);
	})
}
		






