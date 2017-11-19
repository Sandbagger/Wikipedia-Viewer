
//Called oninput attribute of form
function requestJSONP(url) {
	var results = document.getElementById("results");
	while(results.hasChildNodes()){
		results.removeChild(results.lastChild);
	}

	var searchTerm = document.getElementById("search").value;

	fetch("https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=" + searchTerm + "&limit=10", {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
}).then(function(resp) {
    //Convert to JSON
    return resp.json();
}).then(function(json){
	var arrTitles = json[1];
	var arrBlurb = json[2];
	var arrUrl = json[3];
	arrTitles.forEach(function(x, index, url){
		createNewDiv(arrTitles[index], arrBlurb[index], url[index]);
		})
	})

}


var createNewDiv = function(title, blurb, url){
	var a = document.createElement("a");
	a.setAttribute("href", "https://en.wikipedia.org/wiki/" + url);
	a.setAttribute("target", "_blank");
	

	var div = document.createElement("div");
	div.setAttribute("class", "result");
	div.classList.add('show');
	
	var header = document.createElement("header");
	header.textContent = title;
	div.appendChild(header);

	var p = document.createElement('p');
	p.textContent = blurb;
	div.appendChild(p);

	a.appendChild(div);


	document.getElementById('results').appendChild(a);
	a.className = "fade-in";
}

