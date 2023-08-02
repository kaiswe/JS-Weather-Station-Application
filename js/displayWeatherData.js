'use strict'

function displayWeatherData(weatherData) {

    var firstMonth = $("#tFmonthOne").val();
    var secondMonth = $("#tFmonthTwo").val();

    const checkedVal = document.querySelector('input[type=radio]:checked');

    var fdb = document.getElementById("inputFeedback");
    var tbl = document.getElementById("weatherDataTable");
    var graph = document.getElementById("weatherGraph");
    var tableRowHead = document.getElementById("rowHeaders");


    if (tbl != null) 
    {

        $(tbl).DataTable().clear().destroy();

    };

    $(fdb).remove();
    $(graph).remove();
    $(tableRowHead).remove();

    const months = {

        January: "/01/",
        February: "/02/",
        March: "/03/",
        April: "/04/",
        May: "/05/",
        June: "/06/",
        July: "/07/",
        August: "/08/",
        September: "/09/",
        October: "/10/",
        November: "/11/",
        December: "/12/"

    };

    var keys = Object.keys(months);

    var index = keys.indexOf(firstMonth);

    var indexTwo = keys.indexOf(secondMonth);

    if (index <= indexTwo) {

        var results = Object.entries(months).slice(index, indexTwo + 1);

        var selectedMonths = [];

        $.each(results, function (index, element) {

            selectedMonths.push(element.splice(-1, 1));

        });
    } else {

        var feedback = $(document.createElement("div"));
        feedback.appendTo("#feedbackDiv");
        $(feedback).attr("id", "inputFeedback");
        var fb = "Error. The system could not locate the required weather data requested. Please select a valid month range.";
        document.getElementById("inputFeedback").innerHTML = fb;
        
    };

    var dates = [];

    for (var i = 0; i < weatherData.weather.record.length; i++) {

        for (var j = 0; j < selectedMonths.length; j++) {

            if (weatherData.weather.record[i].date.includes(selectedMonths[j])) {

                dates.push(weatherData.weather.record[i]);

            };

        };

    };

    var obj = JSON.stringify(dates);

    var jsonObj = JSON.parse(obj);

    if (checkedVal == null) {

        var feedback = $(document.createElement("div"));
        feedback.appendTo("#feedbackDiv");
        $(feedback).attr("id", "inputFeedback");
        var fb = "Error. Please select one of the three viewable data options (Table, Graph, or Both)";
        document.getElementById("inputFeedback").innerHTML = fb;

    };

    if (checkedVal.id == 'graph') {

        weatherDataGraph($("#canvasDiv"), dates, firstMonth, secondMonth);

    };

    if (checkedVal.id == 'tbl') {

        weatherDataTable($("#tableDiv"), jsonObj, months, selectedMonths);

    };

    if (checkedVal.id == 'both') {

        weatherDataGraph($("#canvasDiv"), dates, firstMonth, secondMonth);
        weatherDataTable($("#tableDiv"), jsonObj, months, selectedMonths);

    };
};