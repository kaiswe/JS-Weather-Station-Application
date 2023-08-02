'use strict'

$(document).ready(function () {

    $('#weatherForm').on("submit", function (e) {

        var year = $("#tFyear").val();

        var fdb = document.getElementById("inputFeedback");

        $(fdb).remove();

        if (year < 2010) {

            $.ajax({

                type: "GET",
                url: "/xmlHandler",
                data: year

            })
                .done(function (weatherData) {

                    displayWeatherData(weatherData);

                    var feedback = $(document.createElement("div"));
                    feedback.appendTo("#feedbackDiv");
                    $(feedback).attr("id", "inputFeedback");
                    var fb = "Search Success! Here are your results";
                    document.getElementById("inputFeedback").innerHTML = fb;

                });
            e.preventDefault();
        };
    });
});
