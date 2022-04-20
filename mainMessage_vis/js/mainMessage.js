

let decadeArtistData;

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

    let elements = ['Acoutsticness', 'Danceability', 'Duration (ms)', 'Energy', 'Instrumentalness','Liveness',
                    'Loudness', 'Speechiness', 'Tempo', 'Valence']

    console.log('data', data)

    decadeArtistData = new elementData("element-map", elements, data)

});

document.getElementById("sort-by").onchange = function() {

    decadeArtistData.wrangleData(this.value)

}




