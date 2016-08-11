//Get the JSON data from the Fixer API
$.getJSON('http://api.fixer.io/latest?base=USD', function(data) {
	//the JSON data contains 3 objects - base, date, rates
	//I use the rates variable below to store the rates array, which contains the rates
	var rates = data.rates;
	//I then iterate through the rates array, creating options elements from their key value results,
	//and append this option element to the 2 select elements in the web app i.e. current currency and new currency
	jQuery.each(rates, function(i, val) {
		//for current currency
		$('#currCurrency')
		.append($("<option></option>")
		.attr("value",val)
		.text(i));
		//for new currency
		$('#newCurrency')
		.append($("<option></option>")
		.attr("value",val)
		.text(i));
        });
	
	//next, i attach onchange event listeners on both selectors,
	//so when the selectors values change, set the value of the exchange rate element
	//to the result of the function CalcExchangeRate()
	$(document).on('change','#currCurrency',function(){
		$('#exchangeRate').val(CalcExchangeRate());
	});
	$(document).on('change','#newCurrency',function(){
		$('#exchangeRate').val(CalcExchangeRate());
	});
});

//this function calculates the exchange rate by dividing
//the new currency value by the current currency value
function CalcExchangeRate(){
	var newCurr = $('#newCurrency').val();
	var oldCurr = $('#currCurrency').val();
	var exchangeRate = newCurr / oldCurr;

	//return the exchange to 4 decimal places	
        return exchangeRate.toFixed(4);
}
