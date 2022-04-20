let introLineChart,
    albumInfo,
    decadeArtistData,
    outlierAlbumInfo,
    releaseYear,
    chartYear;

let parseDate = d3.timeParse("%Y");
let parseNum = d3.format(".4f");

let yearlyAvgs;



// load data using promises
loadData();

function loadData() {
    d3.csv("data/album_data.csv").then(csv=> {
        let decades = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
        console.log(decades)

        decadeArtistData = new ArtistData("top-artists", decades)

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

        outlierAlbumInfo = new AlbumInfo("selectButtons", csv);
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
        console.log(yearlyAvgs[0]);

        introLineChart = new LineChart("intro-lineChart", csv);

        // releaseYear = new AlbumComparisons("releaseYearBars", csv);
        // chartYear = new AlbumComparisons("chartYearBars", csv);


    });

    d3.csv("data/decade_avgs.csv").then(csv=> {
        releaseYear = new AlbumComparisons("releaseYearBars", csv, "release");
        chartYear = new AlbumComparisons("chartYearBars", csv, "chart");
    });


    document.getElementById("1960").onclick = function () {
        decadeArtistData.updateVis("1960")
    }
    document.getElementById("1970").onclick = function () {
        decadeArtistData.updateVis("1970")
    }
    document.getElementById("1980").onclick = function () {
        decadeArtistData.updateVis("1980")
    }
    document.getElementById("1990").onclick = function () {
        decadeArtistData.updateVis("1990")
    }
    document.getElementById("2000").onclick = function () {
        decadeArtistData.updateVis("2000")
    }
    document.getElementById("2010").onclick = function () {
        decadeArtistData.updateVis("2010")
    }











}



