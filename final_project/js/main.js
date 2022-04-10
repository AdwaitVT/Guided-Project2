

let decadeArtistData;

d3.csv("data/album_data.csv").then(data => {

    let decades = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
    console.log(decades)

    decadeArtistData = new ArtistData("artist-map", decades)

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


