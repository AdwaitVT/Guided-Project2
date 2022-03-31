class LineChart{

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 10, right: 50, bottom: 10, left: 50};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.x = d3.scaleLinear().range([0, vis.width]);
        vis.y = d3.scaleLinear().range([vis.height, 0]);

        vis.xAxis =  vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(d3.axisBottom(vis.x));

        vis.yAxis = vis.svg.append("g")
            .attr("class", "y-axis axis")
            .call(d3.axisLeft(vis.y));



        vis.wrangleData()
    }

    wrangleData(){
        let vis = this;

        vis.data.forEach(album => {
            vis.displayData.push({
                year: album.chart_date.getFullYear(),
                danceability: album.danceability

            });
        });

        //only computes average for dancability
        vis.displayData = vis.displayData.reduce(function(h, obj) {
            h[obj.year] = (h[obj.year] || []).concat(obj);
            return h;
        }, {});

        vis.displayData = Object.keys(vis.displayData).map(key => {
            return {
                year: key,
                danceabilityAvg : vis.displayData[key].reduce((a, b) => a + (b.danceability || 0), 0)/vis.displayData[key].length,
            }
        });


        vis.updateVis()
    }

    updateVis(){
        let vis = this;

        vis.x.domain([d3.min(vis.displayData, function(d) {return d.year;}),
                    d3.max(vis.displayData, function(d) {return d.year;})]);

        vis.y.domain([0,
                        d3.max(vis.displayData, function(d) {return d.danceabilityAvg;})]);

        vis.svg.select(".x-axis").call(d3.axisBottom(vis.x));
        vis.svg.select(".y-axis").call(d3.axisLeft(vis.y));

        // let lineChart = vis.svg.selectAll(".line")
        //     .data(vis.displayData);
        //
        // lineChart.enter()
        //     .append('path')
        //     .attr("class", "line")
        //     .attr("stroke-width", 1.5)
        //     .attr("d", d3.line()
        //         .x(function(d) { return vis.x(d.year) })
        //         .y(function(d) { return vis.y(d.danceabilityAvg) })
        //     );
        //lineChart.exit().remove();


        vis.svg.append("path")
            .datum(vis.displayData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return vis.x(d.year) })
                .y(function(d) { return vis.y(d.danceabilityAvg) })
            )



    }

}