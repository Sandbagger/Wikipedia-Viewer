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
		window.open('https://en.wikipedia.org/wiki/Special:Random');
		return 
	}

	
	requestJSONP(userInput);
	toggledisplayResults();
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
			storedValue = [];
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
			/*splayArray();*/
			displaySearchTerm();
			displayTitles();
			displaySummary();
			updateResultsUrl()
		}
	}

}());

function displayArray(){
	var stored = module.retrieve();	
	pTag = document.getElementsByTagName("p")[0];
	text = pTag.textContent = stored;
}

function displaySearchTerm(){
	var selectHeader = document.getElementsByTagName("p")[0];
	selectHeader.textContent = "You searched for... " + module.searchTerm(); 
}


function displayTitles(){
    var displayResults =  Array.prototype.slice.call(document.querySelectorAll(".result header"));
    var titles = module.searchResultTitles();
    for (var i = 0; i < displayResults.length; i++) {
        var result = displayResults[i];
        result.innerHTML = titles[i];
        console.log(displayResults[i]);
    }
}

function displaySummary(){
	    var displayResults =  Array.prototype.slice.call(document.querySelectorAll(".result summary"));
    var titles = module.searchResultdescription();
    for (var i = 0; i < displayResults.length; i++) {
        var result = displayResults[i];
        result.innerHTML = titles[i];
        console.log(displayResults[i]);
	}
}

function updateResultsUrl(){
	var displayResults =  Array.prototype.slice.call(document.querySelectorAll(".resultUrl"));
	var links = module.searchResultUrl();
	for (var i = 0; i < displayResults.length; i++) {
        var result = displayResults[i];
        result.setAttribute("href", links[i]);
        console.log(displayResults[i]);
	}
}

function toggledisplayResults(){
    	var div = document.getElementsByTagName("main")[0];
    div.style.display = "block";
}
