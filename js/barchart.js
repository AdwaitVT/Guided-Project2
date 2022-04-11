margin = {top: 50,
    right: 60,
    bottom: 60,
    left: 60};
// set the dimensions and margins of the graph
width = document.getElementById("compare-years").getBoundingClientRect().width - margin.left - margin.right;
height = document.getElementById("compare-years").getBoundingClientRect().height - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
var y = d3.scaleLinear()
    .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svgConclusion = d3.select("#compare-years")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("data/feavalues.csv").then(function(data) {

    // format the data
    data.forEach(function(d) {
        d.feavalues = +d.feavalues;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.feat; }));
    y.domain([0, d3.max(data, function(d) { return d.feavalues; })]);

    // append the rectangles for the bar chart
    svgConclusion.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.feat); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.feavalues); })
        .attr("height", function(d) { return height - y(d.feavalues); });

    // add the x Axis
    svgConclusion.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svgConclusion.append("g")
        .call(d3.axisLeft(y));

})