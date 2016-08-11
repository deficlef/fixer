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
    /*the JSON data contains 3 objects - base, date, rates
    I use the rates variable below to store the rates array*/
    var rates = data.rates;
    /*next,I assign the 2 select elements and the exchange rate value
    to the following variables*/
    var currCurrency = document.getElementById("currCurrency");
    var newCurrency = document.getElementById("newCurrency");
    var exchangeRateInput = document.getElementById("exchangeRate");

    //option variable to be initialised in the below iteration
    var option;

    //I then iterate through the rates array
    for (var key in rates) {
        //checking to see that the key can be found in the rates array
        if (rates.hasOwnProperty(key)) {
            //create an option element
            option = document.createElement("option");
            //assign the key name as the options text
            option.text = key;
            //assign the key value as the options value
            option.value = rates[key];
            //then append the options element to the current currency element
            currCurrency.appendChild(option);
            //for new currency, I initialise the options variable again, repeating the above process
            option = document.createElement("option");
            option.text = key;
            option.value = rates[key];
            //then append it to the new currency element
            newCurrency.appendChild(option);
        }
    }

    /*next, i attach onchange event listeners on both selectors,
    so when their values change, the exchange rate input value is set
    to the result of the function CalcExchangeRate()*/
    currCurrency.onchange = function(){
                            exchangeRateInput.value = CalcExchangeRate();
                        };
    newCurrency.onchange = function(){
                            exchangeRateInput.value = CalcExchangeRate();
                        };
}

/*this function calculates and returns the exchange rate by:
    dividing the new currency value by the current currency value*/
function CalcExchangeRate(){
    var nCV = newCurrency.value;
    var oCV = currCurrency.value;
    var exchangeRate = nCV / oCV;
    
    //return the exchange to 4 decimal places
    return exchangeRate.toFixed(4);
}
