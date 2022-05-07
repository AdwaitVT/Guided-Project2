let introLineChart,
    albumInfo,
    decadeArtistData,
    outlierAlbumInfo,
    outlierAlbums,
    mainMessage,
    treeMap,
    histogram,
    sliders;

let parseDate = d3.timeParse("%Y");
let parseNum = d3.format(".4f");

let yearlyAvgs;


// load data using promises
loadData();

function loadData() {
    d3.json("data/histogram.json", (data) => {
    }).then(data => {
        histogram = new Histogram("histogram", data);
    });

    d3.csv("data/artistsByDecade_centerOrdered.csv", (row) => {
        if (row !== "columns") {
            row.Count = +parseFloat(row.Count)
            row.Decade = +parseFloat(row.Decade)
            row.acousticness = +parseFloat(row.acousticness)
            row.danceability = +parseFloat(row.danceability)
            row.duration_ms = +parseFloat(row.duration_ms)
            row.energy = +parseFloat(row.energy)
            row.instrumentalness = +parseFloat(row.instrumentalness)
            row.liveness = +parseFloat(row.liveness)
            row.loudness = +parseFloat(row.loudness)
            row.speechiness = +parseFloat(row.speechiness)
            row.tempo = +parseFloat(row.tempo)
            row.valence = +parseFloat(row.valence)
            return row

        }

    }).then(data => {

        let decades = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
        decadeArtistData = new ArtistData("artist-images", decades, data)

    });


    d3.csv("data/outliers.csv").then(csv => {

        csv.forEach(function(d){
            d.acousticness = parseNum(+d.acousticness);
            d.danceability = parseNum(+d.danceability);
            d.energy = parseNum(+d.energy);
            d.instrumentalness = parseNum(+d.instrumentalness);
            d.liveness = parseNum(+d.liveness);
            d.speechiness = parseNum(+d.speechiness);
            d.valence = parseNum(+d.valence);

        });

        outlierAlbumInfo = new AlbumInfo("albumInfo", csv);
    });

    d3.csv("data/decade_avgs.csv").then(csv=> {
        outlierAlbums = new AlbumComparisons("yearComparisons", csv);
    });

    d3.csv("data/yearly_avgs.csv").then(csv=> {

        csv.forEach(function(d){
            d.acousticness = parseNum(+d.acousticness);
            d.danceability = parseNum(+d.danceability);
            d.duration_ms = parseNum(+d.duration_ms);
            d.energy = parseNum(+d.energy);
            d.instrumentalness = parseNum(+d.instrumentalness);
            d.liveness = parseNum(+d.liveness);
            d.loudness = parseNum(+d.loudness);
            d.energy = parseNum(+d.energy);
            d.speechiness = parseNum(+d.speechiness);
            d.tempo = parseNum(+d.tempo);
            d.time_signature = parseNum(+d.time_signature);
            d.valence = parseNum(+d.valence);

            d.chart_date = parseDate(d.chart_date);

        });

        yearlyAvgs = csv;
        introLineChart = new LineChart("lineChart", csv);
        //sliders = new Sliders("sliders", csv);

    });


    d3.csv("data/avgPerDecade.csv", (row) => {

        if (row !== "columns") {
            row.decade = +parseFloat(row.decade)
            row.acousticness = +parseFloat(row.acousticness)
            row.danceability = +parseFloat(row.danceability)
            row.duration_ms = +parseFloat(row.duration_ms)
            row.energy = +parseFloat(row.energy)
            row.instrumentalness = +parseFloat(row.instrumentalness)
            row.liveness = +parseFloat(row.liveness)
            row.loudness = +parseFloat(row.loudness)
            row.speechiness = +parseFloat(row.speechiness)
            row.tempo = +parseFloat(row.tempo)
            row.valence = +parseFloat(row.valence)
            return row

        }

    }).then(data => {

        let elements = ['Acousticness', 'Danceability', 'Duration (ms)', 'Energy', 'Instrumentalness','Liveness',
            'Loudness', 'Speechiness', 'Tempo', 'Valence']

        mainMessage = new elementData("summarySlide", "decadeLegend", elements, data)

    });




}

    document.getElementById("sort-by").onchange = function() {
        mainMessage.wrangleData(this.value)
    }

    // document.getElementById("slider-range1").onchange = function(){
    //     console.log(this.value);
    // }


    document.getElementById("histogram-decade").onchange = function() {
        histogram.decade = this.value;
        histogram.wrangleData(histogram.decade)

    }

    document.getElementById("1960").onclick = function () {
        decadeArtistData.wrangleData("1960")
    }
    document.getElementById("1970").onclick = function () {
        decadeArtistData.wrangleData("1970")
    }
    document.getElementById("1980").onclick = function () {
        decadeArtistData.wrangleData("1980")
    }
    document.getElementById("1990").onclick = function () {
        decadeArtistData.wrangleData("1990")
    }
    document.getElementById("2000").onclick = function () {
        decadeArtistData.wrangleData("2000")
    }
    document.getElementById("2010").onclick = function () {
        decadeArtistData.wrangleData("2010")
    }

$(document).ready(function () {
    var fv = $("#fullview").fullView({
        //Navigation
        dots: true,
        dotsPosition: "right",
        dotsTooltips: true,

        //Scrolling
        easing: "swing",
        backToTop: true,
        autoScrolling:true,

        // Accessibility
        keyboardScrolling: true,

        // Callback
        onScrollEnd: function (currentView, preView) {
            console.log("Current", currentView);
            console.log("Previous", preView);
        }


    });
});

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






