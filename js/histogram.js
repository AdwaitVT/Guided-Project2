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
            .attr('transform', `translate (${vis.margin.left}, 0)`);

        // X axis: scale and draw:
        vis.x = d3.scaleLinear()
            .domain([0, 1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
            .range([vis.margin.left, vis.width]);

        vis.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(d3.axisBottom(vis.x))
            .attr("font-family", "Ebrima");

        vis.svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("font-size", "14px")
            .attr("x", vis.width/2 + vis.margin.left)
            .attr("y", vis.height + 35)
            .attr("font-family", "Ebrima")
            .text("Value");

        vis.svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -(vis.height/2))
            .attr("y", vis.margin.left - 40)
            .attr("font-size", "14px")
            .attr("transform", "rotate(-90)")
            .attr("font-family", "Ebrima")
            .text("Count");

        vis.decade = 1960;




        vis.wrangleData(vis.decade);
    }

    wrangleData(decade){
        let vis = this;

        if(introLineChart.selectedAttribute != undefined){
            vis.attribute = introLineChart.selectedAttribute;
        }
        else{
            vis.attribute = "acousticness";
        }


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
        //vis.svg.selectAll("rect").remove();

        vis.y = d3.scaleLinear()
            .range([vis.height, vis.margin.top])
            .domain([0, d3.max(vis.bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

        vis.svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${vis.margin.left},0)`)
            .call(d3.axisLeft(vis.y))
            .attr("font-family", "Ebrima");

        vis.bars = vis.svg.selectAll("rect")
            .data(vis.bins);

        vis.bars.enter()
            .append("rect")
            .merge(vis.bars)
            .transition()
            .duration(700)
            .attr("width", function(d) { return vis.x(d.x1) - vis.x(d.x0) - 1 ; })
            .attr("height", function(d) { return vis.height - vis.y(d.length); })
            .attr("y", function(d) {return vis.y(d.length)})
            .attr("x", function(d){return vis.x(d.x0)})
            .style("fill", introLineChart.attributeColor);



    }

}