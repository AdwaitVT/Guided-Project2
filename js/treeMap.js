class TreeMap{

     constructor(parentElement) {
         this.parentElement = parentElement;
         //this.data = data;
         this.displayData = [];

         this.initVis()
     }

     initVis(){
         let vis = this;

         vis.margin = {top: 10, right: 10, bottom: 10, left: 10},
             vis.width = 445 - vis.margin.left - vis.margin.right,
             vis.height = 445 - vis.margin.top - vis.margin.bottom;

// append the svg object to the body of the page
          vis.svg = d3.select("#my_dataviz")
             .append("svg")
             .attr("width", vis.width + vis.margin.left + vis.margin.right)
             .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
             .append("g")
             .attr("transform",
                 "translate(" + vis.margin.left + "," + vis.margin.top + ")");

// Read data
         d3.csv('./data/treemap.csv', function(data) {

             // stratify the data: reformatting for d3.js
              vis.root = d3.stratify()
                 .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
                 .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
                 (data);
             vis.root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

             d3.treemap()
                 .size([vis.width, vis.height])
                 .padding(4)
                 (vis.root)

            // console.log(root.leaves())
             // use this information to add rectangles:
             vis.svg
                 .selectAll("rect")
                 .data(vis.root.leaves())
                 .enter()
                 .append("rect")
                 .attr('x', function (d) { return d.x0; })
                 .attr('y', function (d) { return d.y0; })
                 .attr('width', function (d) { return d.x1 - d.x0; })
                 .attr('height', function (d) { return d.y1 - d.y0; })
                 .style("stroke", "black")
                 .style("fill", "#69b3a2");

             // and to add the text labels
             vis.svg
                 .selectAll("text")
                 .data(vis.root.leaves())
                 .enter()
                 .append("text")
                 .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
                 .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
                 .text(function(d){ return d.data.name})
                 .attr("font-size", "15px")
                 .attr("fill", "white")
         })


         // vis.wrangleData()
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


     }

 }