

let decadeArtistData;

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
    console.log('data', data)

    decadeArtistData = new ArtistData("artist-map", decades, data)

});

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


