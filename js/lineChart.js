class LineChart{

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];
        this.selectedAttribute = "acousticness";

        this.initVis()
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

        vis.x = d3.scaleTime()
            .domain(d3.extent(vis.data, function(d) { return d.chart_date; }))
            .range([vis.margin.left, vis.width - vis.margin.left]);


        vis.y = d3.scaleLinear()
            .domain([0,1])
            .range([vis.height, vis.margin.bottom]);


        vis.xAxis =  vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(d3.axisBottom(vis.x));

        vis.svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", vis.width/2)
            .attr("y", vis.height + 35)
            .text("Year");

        vis.yAxis = vis.svg.append("g")
            .attr("class", "y-axis axis")
            .attr("transform", "translate(" + vis.margin.left + ", 0)")
            .call(d3.axisLeft(vis.y));

        vis.svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -(vis.height/2))
            .attr("y", vis.margin.left - 40)
            .attr("font-size", "14px")
            .attr("transform", "rotate(-90)")
            .text("Value");

        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'lineTooltip')

        vis.colors = ['#e41a1c','#ff7f00', '#377eb8','#4daf4a','#984ea3', '#030300','#ffd919']
        vis.legendSize = 10;
        vis.attributeColor = '#e41a1c';

        vis.legend = vis.svg.append("g")
            .attr('class', 'legend');


        vis.legend.selectAll(".colors")
            .data(vis.colors)
            .enter()
            .append("rect")
            .attr("class", "colors")
            .attr("x", vis.width - 30)
            .attr("y", function(d,i){ return 140 + i*(vis.legendSize+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", vis.legendSize)
            .attr("height", vis.legendSize)
            .style("fill", function(d, i){ return vis.colors[i]})



        vis.svg.append("text")
            .attr("x", vis.width/2 - 150)
            .attr("y", 30)
            .text("Change in Sounds over Time")



        vis.wrangleData()
    }

    wrangleData(){
        let vis = this;

        console.log(vis.data);

        vis.attributes = ["acousticness","danceability","energy","instrumentalness","liveness","speechiness","valence"];

        for(let i=0; i<vis.attributes.length; i++) {
            let array = [];
            vis.data.forEach(row => {
                array.push({
                    year: row.chart_date,
                    value: row[vis.attributes[i]]
                })
            });
            vis.displayData.push(array);
        }

        console.log(vis.displayData)

        vis.updateVis()
    }

    updateVis(){
        let vis = this;

        vis.x.domain(d3.extent(vis.displayData[0], function(d) { return d.year; }));

        vis.y.domain([0, d3.max(vis.displayData[2], function(d) { return d.value; })]);

        vis.svg.select(".x-axis").call(d3.axisBottom(vis.x));
        vis.svg.select(".y-axis").call(d3.axisLeft(vis.y));

        vis.legend.selectAll(".labels")
            .data(vis.displayData)
            .enter()
            .append("text")
            .attr("x", vis.width - 15)
            .attr("y", function(d,i){ return 147 + i*(vis.legendSize+5)})
            .attr("font-size", "12px")
            .text(function(d, i){
                return vis.attributes[i];
            });




        for(let i = 0; i < vis.displayData.length; i++){
            vis.svg.append("path")
                .datum(vis.displayData[i])
                .attr("fill", "none")
                .attr("stroke", vis.colors[i])
                .attr("stroke-width", "3px")
                .attr("d", d3.line()
                    .x(function(d) { return vis.x(d.year) })
                    .y(function(d) { return vis.y(d.value) })
                )
                .on('mouseover', function(event){
                    d3.select(this)
                        .attr('stroke-width', '5px')
                    vis.tooltip
                        .style("opacity", 1)
                        .style("left", event.pageX + 20 + "px")
                        .style("top", event.pageY + "px")
                        .html(`
                         <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 5px">
                             <h4 style="font-size: 14px">${vis.attributes[i]}</h4>

                         </div>`
                        );
                })
                .on("click", function(){
                    vis.selectedAttribute = vis.attributes[i];
                    vis.attributeColor = vis.colors[i];
                    histogram.wrangleData(histogram.decade);
                })
                .on('mouseout', function(){
                    d3.select(this)
                        .attr('stroke', vis.colors[i])
                        .attr('stroke-width', '3px')
                    vis.tooltip
                        .style("opacity", 0)
                        .style("left", 0)
                        .style("top", 0)
                        .html(``);
                })
        }



    }

}