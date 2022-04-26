class Histogram{

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = {};

        this.initVis();
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 50, bottom: 20, left: 50};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // X axis: scale and draw:
        vis.x = d3.scaleLinear()
            .domain([0, 1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
            .range([vis.margin.left, vis.width]);
        vis.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(d3.axisBottom(vis.x));




        vis.wrangleData(1960);
    }

    wrangleData(decade){
        let vis = this;

        vis.attribute = introLineChart.selectedAttribute;

        vis.decadeData = vis.data[decade];

        vis.histogram = d3.histogram()
            .value(function(d) { return d; })   // I need to give the vector of value
            .domain(vis.x.domain())  // then the domain of the graphic
            .thresholds(vis.x.ticks(10)); // then the numbers of bins

        vis.bins = vis.histogram(vis.decadeData[vis.attribute]);





        vis.updateVis();
    }

    updateVis(){
        let vis = this;



        vis.svg.selectAll(".y-axis").remove();
        vis.svg.selectAll("rect").remove();

        vis.y = d3.scaleLinear()
            .range([vis.height, vis.margin.top])
            .domain([0, d3.max(vis.bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

        vis.svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${vis.margin.left},0)`)
            .call(d3.axisLeft(vis.y));

        vis.svg.selectAll("rect")
            .data(vis.bins)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + vis.x(d.x0) + "," + vis.y(d.length) + ")"; })
            .attr("width", function(d) { return vis.x(d.x1) - vis.x(d.x0) - 1 ; })
            .attr("height", function(d) { return vis.height - vis.y(d.length); })
            .style("fill", introLineChart.attributeColor);



    }

}