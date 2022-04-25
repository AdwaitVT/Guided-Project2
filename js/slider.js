

var random = d3.randomInt(1963, 2019);

var initials = [50, 50, 50, 50];
var colors = ['brown', 'green', 'blue', 'red'];

var gRangeSlider = d3
    .select('div#slider-color-picker')
    .append('svg')
    .attr('width', 600)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(30,30)');

var box = gRangeSlider
    //.append('rect')
    .append('text')
    .attr('width', 100)
    .attr('height', 100)
    .attr('transform', 'translate(400,0)')
    .attr('fill', `#${initials}`);

// loadDataSlider();

/*Loading the csv file into the data*/
function loadDataSlider() {
    this.d3.csv("data/yearlynormhundred.csv").then(csv=> {

        csv.forEach(function(d){
            d.year = +d.year;
            d.acousticness = +d.acousticness;
            d.energy = +d.energy;
            d.instrumentalness = +d.instrumentalness;
            d.liveness = +d.liveness;
            d.loudness = +d.loudness;
            d.speechiness = +d.speechiness;
            d.tempo = +d.tempo;
            d.valence = +d.valence;
            d.danceability = +d.danceability;

        });

        dataBar = csv;
    });
}




initials.forEach((color, i) => {
    var slider = d3
        .sliderBottom()
        .min(0)
        .max(100)
        .step(1)
        .width(300)
        .default(initials[i])
        .displayValue(false)
        .fill(colors[i])
        .on('onchange', num => {
            initials[i] = num;
            box.attr('fill', `#${initials}`);
            d3.select('p#value-color-picker')
                .text(`Acousticness: ${initials[0]} Danceability: ${initials[1]} Speechiness: ${initials[2]} Valence: ${initials[3]}`);
            d3.select('p#value-final')
                .text(`The year that closely matches with your preference is: ${random()}`)
                //.text(`${d.tempo[1]}`)
            //I have put random number for the time being, it will be updated.
        });

    gRangeSlider
        .append('g')
        .attr('transform', `translate(30,${60 * i})`)
        .call(slider);
});

d3.select('p#value-color-picker')
    .text(`Acousticness: ${initials[0]} Danceability: ${initials[1]} Speechiness: ${initials[2]} Valence: ${initials[3]}`);
d3.select('p#value-final')
    .text(`The year that closely matches with your preference is: 1974`); //For Initialize