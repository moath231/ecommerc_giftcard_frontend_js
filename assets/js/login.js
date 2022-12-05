const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
  item.addEventListener('click', function() {
    switchers.forEach(item => item.parentElement.classList.remove('is-active'))
    this.parentElement.classList.add('is-active')
  })
})





var xmlhttp = new XMLHttpRequest();
var url = "https://api.coindesk.com/v1/bpi/currentprice.json";
		
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4  &&  this.status == 200) {
		var json = JSON.parse(this.responseText);
		parseJson(json);
	}		
};

xmlhttp.open("GET", url, true);
xmlhttp.send();


function parseJson(json) {
	var time = "<b>Last Updated : " + json["time"]["updated"] + "</b>";
	let usdValue = json["bpi"]["USD"]["rate"];
	var gbpValue = "1 BTC equals to &pound;" + json["bpi"]["GBP"]["rate"];
	var euroValue = "1 BTC equals to &euro;" + json["bpi"]["EUR"]["rate"];
	document.getElementById("data").innerHTML = usdValue;
}
