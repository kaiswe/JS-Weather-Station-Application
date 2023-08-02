'use strict'

function weatherDataTable(container, data, months, selectedMonths) {


    var array = [];
    var averageWsArray = [];
    var averageSrArray = [];
    var wsAvg = [];
    var srTotal = [];
    var totalArray = [];
    var columnHeaders = [];
    var rowHeadArray = [];

    var monthHeader;
    var windSpeedSum;
    var solarRadiSum;
    var currentTotalLength;

    var length = 0;

    const wsRow = 'Wind Speed (km/h)';
    const srRow = 'Solar Radiation (kWh/m2)';

    var monthCols = Object.entries(months);
    var keys = (Object.keys(months));

    var table = $("<table/>");

    $(table).attr('id', 'weatherDataTable');

    $(table).attr('class', 'display nowrap cell-border');

    var weatherMeasurement = $("#wM").val();

    var ws = $("#windSpeed").val();

    var sr = $("#solarRadiation").val();

    var wsAndSr = $("#windSpeedAndSolarRad").val();

    $.each(monthCols, function (index, element) {

        for (var j = 0; j < selectedMonths.length; j++) {

            if (element[1] == selectedMonths[j]) {

                monthHeader = element[0];

                for (var i = 0; i < data.length; i++) {

                    if (data[i].date.includes(element[1])) {

                        averageWsArray.push(data[i].ws);
                        averageSrArray.push(data[i].sr);
                        length++;

                    };

                };

                totalArray[0] = 0;

                var refinedSrArray = [];
            

                totalArray.push(length);

                currentTotalLength = length - totalArray[j];

                var wsArray = averageWsArray.splice(0, currentTotalLength);
                var srArray = averageSrArray.splice(0, currentTotalLength);

                var wsTotal = 0;
                var totalSr = 0;

                $.each(wsArray, function (index, element) {

                    wsTotal += ((element * 60 * 60) / 1000);

                });

                $.each(srArray, function (index, element) {

                    if (element >= 100) {

                        refinedSrArray.push(element);
                        

                    };

                });

                $.each(refinedSrArray, function (index, element) {

                    totalSr =+ element;

                });

                windSpeedSum = wsTotal / currentTotalLength;
                solarRadiSum = totalSr;

                wsAvg.push(Math.round(windSpeedSum * 10) / 10);
                srTotal.push(Math.round(solarRadiSum * 100) / 100);
                columnHeaders.push(monthHeader);

            };
        };
    });

    var columns = [];
    var wsJson = {};
    var srJson = {};

    for (var i = 0; i < keys.length; i++) {

        columns.push({

            data: keys[i],
            title: keys[i]

        });

    };

    for (var i = 0; i < columnHeaders.length; i++) {

        if (weatherMeasurement == ws) {

            wsJson[columnHeaders[i]] = wsAvg[i];

        };

        if (weatherMeasurement == sr) {

            srJson[columnHeaders[i]] = srTotal[i];

        };

        if (weatherMeasurement == wsAndSr) {

            wsJson[columnHeaders[i]] = wsAvg[i];
            srJson[columnHeaders[i]] = srTotal[i];

        };

    };

    array.push(wsJson);
    array.push(srJson);

    rowHeadArray.push(wsRow);
    rowHeadArray.push(srRow);

    $(table).DataTable({

        "ordering": false,
        "rowGroup": true,
        "paginate": false,
        "responsive": true,
        "data": array,
        "columns": columns,
        "columnDefs": [{
            "defaultContent": ' - ',
            "targets": "sorting_disabled",
            "data": array,
            "className": "dt-head-center",
            "createdCell": function (td, cellData, rowData, row, col) {
                if (row == 0) {

                    $(td).attr('id', 'ws');

                };
                if (row == 1) {

                    $(td).attr('id', 'sr');

                };
            },
            "render": function (data, type, row, meta) {
                if (meta.row == 0) {

                    if (data != undefined) {

                        return data + ' km/h';

                    } else {

                        return data = null;

                    };

                };
                if (meta.row == 1) {

                    if (data != undefined) {

                        return data + ' kWh/m2';

                    } else {

                        return data = null;
                    };
                };
            },
        }],
    });

    var newArrayObj = [];

    var key = Object.keys(rowHeadArray);

    for (var i = 0; i < rowHeadArray.length; i++) {

        newArrayObj.push(key[i]);
        newArrayObj.push(rowHeadArray[i]);

    };

    var tb = $("<table/>");
    $(tb).attr('class', 'display nowrap cell-border');
    $(tb).attr('id', 'rowHeaders');

    var rowHeaderTable = $(tb).DataTable({
        "ordering": false,
        "data": rowHeadArray,
        "columnDefs": [{
            "targets": [0],
            "data": null,
            "className": "dt-head-center",
            "searchable": false
        }],
    });

    rowHeaderTable.columns(0).header().to$().text('Months');

    var headerDiv = document.getElementById("headerDiv");
    $(headerDiv).prepend(tb);

    return container.append(table);
};
