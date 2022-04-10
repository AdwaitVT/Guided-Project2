let introLineChart,
    albumInfo,
    decadeArtistData;

let parseDate = d3.timeParse("%Y");



// load data using promises
loadData();

function loadData() {
    d3.csv("data/album_data.csv").then(csv=> {
        let decades = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
        console.log(decades)

        decadeArtistData = new ArtistData("top-artists", decades)

    });
    d3.csv("data/yearly_avgs.csv").then(csv=> {

        csv.forEach(function(d){
            d.acousticness = +d.acousticness;
            d.danceability = +d.danceability;
            d.duration_ms = +d.duration_ms;
            d.energy = +d.energy;
            d.instrumentalness = +d.instrumentalness;
            d.liveness = +d.liveness;
            d.loudness = +d.loudness;
            d.energy = +d.energy;
            d.speechiness = +d.speechiness;
            d.tempo = +d.tempo;
            d.time_signature = +d.time_signature;
            d.valence = +d.valence;

            d.chart_date = parseDate(d.chart_date);

        });

        introLineChart = new LineChart("intro-lineChart", csv);
        albumInfo = new AlbumInfo("album-comparison", csv);

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



