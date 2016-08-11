/*
 * This procedure calls the fixer API and uses the returned currencies 
 * to populate the two options for currency conversion
 *
 * Created by Chinedu Umebolu on 07/08/16.
 */

// Get JSON data from the Fixer API
$.getJSON('http://api.fixer.io/latest?base=USD', function (data) {
    // JSON data contains 3 objects - base, date, rates
    // Used the rates variable below to store just rates
    var rates = data.rates;
    // Iterate through the rates array, creating options elements from their key value results,
    // Append this option element to the 2 select elements in the web app i.e. current currency and new currency
    jQuery.each(rates, function (i, val) {
        // For current currency
        $('#currCurrency')
            .append($("<option></option>")
                .attr("value", val)
                .text(i));
        // For new currency
        $('#newCurrency')
            .append($("<option></option>")
                .attr("value", val)
                .text(i));
    });

    // Attach onchange event listeners on both selectors,
    // Set the value of the exchange rate element to the result of the function CalcExchangeRate()
    $(document).on('change', '#currCurrency', function () {
        $('#exchangeRate').val(CalcExchangeRate());
    });

    $(document).on('change', '#newCurrency', function () {
        $('#exchangeRate').val(CalcExchangeRate());
    });
});

/**
 * Returns new currency value by calculating the exchange rate, then dividing
 * by new currency value.
 *
 * @return      the new currency value
 */
function CalcExchangeRate() {
    var newCurr = $('#newCurrency').val();
    var oldCurr = $('#currCurrency').val();
    var exchangeRate = newCurr / oldCurr;

    return exchangeRate.toFixed(4);
}
