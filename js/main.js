let introLineChart, albumInfo;

let parseDate = d3.timeParse("%Y");



// load data using promises
loadData();

function loadData() {
    // d3.csv("data/album_data.csv").then(csv=> {
    //
    //     csv.forEach(function(d){
    //         d.acousticness = +d.acousticness;
    //         d.danceability = +d.danceability;
    //         d.duration_ms = +d.duration_ms;
    //         d.energy = +d.energy;
    //         d.instrumentalness = +d.instrumentalness;
    //         d.liveness = +d.liveness;
    //         d.loudness = +d.loudness;
    //         d.energy = +d.energy;
    //         d.mode = +d.mode;
    //         d.rank = +d.rank;
    //         d.speechiness = +d.speechiness;
    //         d.tempo = +d.tempo;
    //         d.time_signature = +d.time_signature;
    //         d.valence = +d.valence;
    //         d.key = +d.key;
    //
    //         d.chart_date = parseDate(d.chart_date);
    //         d.release_date = parseDate(d.release_date);
    //
    //     });

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
}
