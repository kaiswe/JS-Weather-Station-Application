'use strict'

function weatherDataGraph(container, dates, firstMonth, secondMonth) {


    var weatherMeasurement = $("#wM").val();

    var ws = $("#windSpeed").val();

    var sr = $("#solarRadiation").val();

    var wsAndSr = $("#windSpeedAndSolarRad").val();

    var xValues = [];
    var yValues = [];
    var yValuesTwo = [];

    for (var i = 0; i < dates.length; i++) {

        if (weatherMeasurement == sr) {

            xValues.push(dates[i].date);
            yValues.push(dates[i].sr);


        } else if (weatherMeasurement == ws) {

            xValues.push(dates[i].date);
            yValues.push(dates[i].ws);

        } else if (weatherMeasurement == wsAndSr) {

            xValues.push(dates[i].date);
            yValues.push(dates[i].ws);
            yValuesTwo.push(dates[i].sr);

        };

    };
    var ctx = $(document.createElement("canvas"));

    ctx.appendTo("#canvasDiv");

    $(ctx).attr("id", "weatherGraph");

    if (weatherMeasurement == ws) {

        new Chart(ctx, {

            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    label: weatherMeasurement,
                    borderColor: "blue",
                    data: yValues,
                    fill: false,
                    pointRadius: 1,
                    borderWidth: 1
                }]
            },
            options: {
                parsing: false,
                normalized: true,
                scales: {
                    xAxes: [{
                        display: true,

                        scaleLabel: {

                            display: true,
                            labelString: firstMonth + " - " + secondMonth

                        }

                    }],
                    yAxes: [{

                        display: true,

                        scaleLabel: {

                            display: true,
                            labelString: weatherMeasurement + "(m/s)"

                        },
                    }],
                },
            },
        });
    };
    if (weatherMeasurement == sr) {

        new Chart(ctx, {

            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    label: weatherMeasurement,
                    borderColor: "red",
                    data: yValues,
                    fill: false,
                    pointRadius: 1,
                    borderWidth: 1
                }]
            },
            options: {
                parsing: false,
                normalized: true,
                animation: false,
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: firstMonth + " - " + secondMonth
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: weatherMeasurement + ' (W/m2)'
                        },
                    }],
                },
            },
        });
    };
    if (weatherMeasurement == wsAndSr) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    label: ws,
                    borderColor: "blue",
                    data: yValues,
                    fill: false
                }, {
                    label: sr,
                    borderColor: "red",
                    data: yValuesTwo,
                    fill: false
                }]
            },
            options: {
                parsing: false,
                normalized: true,
                animation: false,
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: firstMonth + " - " + secondMonth
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: weatherMeasurement,
                        },
                    }],
                },
            },
        });

    } else {

        var feedback = $(document.createElement("div"));
        feedback.appendTo("#feedbackDiv");
        $(feedback).attr("id", "inputFeedback");
        var fb = "Error. The system could not locate the required weather data requested. Please select a valid month range.";
        document.getElementById("inputFeedback").innerHTML = fb;

    }

    return container.append(ctx);
};