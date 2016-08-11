/*
 * This procedure calls the fixer API and uses the returned currencies
 * to populate the two options for currency conversion
 *
 * Created by Chinedu Umebolu on 07/08/16.
 */

//Get the JSON data from the Fixer API
var xmlhttp = new XMLHttpRequest();
var url ='http://api.fixer.io/latest?base=USD';

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var data = JSON.parse(xmlhttp.responseText);
        ProcessData(data);
    }
    else if(xmlhttp.readyState == 4 && xmlhttp.status != 200){
            alert("Error connecting to the Fixer API " + url);
        }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function ProcessData(data) {
    // JSON data contains 3 objects - base, date, rates
    // I use the rates variable below to store the rates array
    var rates = data.rates;
    // Assigned the 2 select elements and the exchange rate value to the following variables
    var currCurrency = document.getElementById("currCurrency");
    var newCurrency = document.getElementById("newCurrency");
    var exchangeRateInput = document.getElementById("exchangeRate");

    // Option variable to be initialised in the below iteration
    var option;

    // Iterate through the rates array
    for (var key in rates) {
        // Checking to see that the key can be found in the rates array
        if (rates.hasOwnProperty(key)) {
            // Create an option element
            option = document.createElement("option");
            // Assign the key name as the options text
            option.text = key;
            // Assign the key value as the options value
            option.value = rates[key];
            // Append the options element to the current currency element
            currCurrency.appendChild(option);
            // For new currency, I initialise the options variable again, repeating the above process
            option = document.createElement("option");
            option.text = key;
            option.value = rates[key];
            // Append it to the new currency element
            newCurrency.appendChild(option);
        }
    }

    // Attach onchange event listeners on both selectors,
    // so when their values change, the exchange rate input value is set
    // to the result of the function CalcExchangeRate()
    currCurrency.onchange = function(){
                            exchangeRateInput.value = CalcExchangeRate();
                        };
    newCurrency.onchange = function(){
                            exchangeRateInput.value = CalcExchangeRate();
                        };
}

/**
 * Returns new currency value by calculating the exchange rate, then dividing
 * by new currency value.
 *
 * @return      the new currency value
 */
function CalcExchangeRate(){
    var nCV = newCurrency.value;
    var oCV = currCurrency.value;
    var exchangeRate = nCV / oCV;
    
    return exchangeRate.toFixed(4);
}
