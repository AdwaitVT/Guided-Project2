// SVG Drawing Area
var margin = {top: 50,
    right: 60,
    bottom: 60,
    left: 60};
//assigning width and height
var width = document.getElementById("intro-histogram").getBoundingClientRect().width - margin.left-margin.right,
    height = document.getElementById("intro-histogram").getBoundingClientRect().height - margin.top - margin.bottom;

//svg declaration
var svg = d3.select("#histogram")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var padding = 10;

var val = d3.select("#select-histogram-box").property("value");

var flip = true;

loadData();

/*Loading the csv file into the data*/
function loadData() {
    d3.csv("data/histogram.csv").then(csv=> {

        csv.forEach(function(d){
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

function sortData(d,t){
    if (t){
        return d.sort((a,b)=> b.value - a.value);
    } else {
        return d.sort((a,b)=> a.value - b.value);
    }
}

Object.defineProperty(window, 'dataBar', {
    get: function() { return dataVal; },
    set: function(value) {
        dataVal = value;

        updateVisualization(val, flip)
    }
});

var x = d3.scaleBand()
    .rangeRound([padding, width])
    .paddingInner(0.25);

var x1 = d3.scaleBand()
    .rangeRound([padding, width])
    .paddingInner(0.25);

var y = d3.scaleLinear()
    .range([height, 0]);

var y1 = d3.scaleLinear()
    .range([height, 0]);

/* Updating the visualiztions */
function updateVisualization(value) {

    var dataFilter = dataBar.map(function(d){return {decade: d.decade, value: d[value]}});

    sortedData = sortData(dataFilter,flip);


    y.domain([0, d3.max(sortedData, d=> d.value)]);

    x.domain(sortedData.map(d => d.decade));


    /*Defining the svg and the axes to work*/

    var bar = svg.selectAll("rect")
        .data(sortedData);


    var xAxis = svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0,"+ (height) +")");

    var yAxis = svg.append("g")
        .attr("class", "yaxis");

    svg.append("text")
        .attr("class", "title")
        .attr("x", (padding))
        .attr("y", padding-(margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("opacity", "0.8")
        .text("Optional Title");

    bar.exit().remove();

    bar.enter().append("rect")
        .merge(bar)
        .transition()
        .duration(2000)
        .attr("class", "mybar")
        .attr("fill", "#c75c7a")
        .attr("stroke", "#c75c7a")
        .attr("stroke-width", "2")
        .attr("x", function (d) { return x(d.decade);} )
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return (height-y(d.value)); })
        .attr("width", x.bandwidth());


    svg.selectAll('.xaxis')
        .style("opacity",0.5)
        .transition()
        .duration(800)
        .call(d3.axisBottom(x));

    svg.selectAll('.yaxis')
        .style("opacity",0.5)
        .transition()
        .duration(800)
        .call(d3.axisLeft(y));

    svg.selectAll('.title')
        .style("opacity",0.5)
        .transition()
        .duration(600)
        .text(value)

    /*This function changes the graph when the drop down menu is changed */

    d3.select("#select-histogram-box").on("change", function(d){
        var newData = d3.select("#select-histogram-box").property("value");
        updateVisualization(newData);
    });

    d3.select("#change-sort").on("click", function() {
        flip = !flip;
        updateVisualization(value);
    });

}


