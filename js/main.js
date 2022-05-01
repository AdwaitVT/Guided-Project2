let histogram, treeMap;

let parseDate = d3.timeParse("%Y");


// load data using promises
loadData();

function loadData() {

        treeMap = new TreeMap("treemap");
        // histogram = new Histogram("histogram");

}


$(document).ready(function() {
        $("select").on('change', function() {
                $(this).find("option:selected").each(function() {
                        var display = $(this).attr("value");
                        console.log(display);
                        if (display) {
                                $(".GFG").not("." + display).hide();
                                $("." + display).show();
                        } else {
                                $(".GFG").hide();
                        }

                });
        }).change();
});
