class Histogram{

     constructor(parentElement) {
         this.parentElement = parentElement;
         //this.data = data;
         this.displayData = [];

         this.initVis()
     }

     initVis(){
         let vis = this;

         vis.margin = {top: 50,
             right: 60,
             bottom: 60,
             left: 60};
//assigning width and height
         vis.width = 1020 - vis.margin.left-vis.margin.right,
             vis.height = 550 - vis.margin.top - vis.margin.bottom;

// append the svg object to the body of the page
          vis.svg1 = d3.select("#bar_graph")
             .append("svg")
             .attr("width", vis.width + vis.margin.left +vis. margin.right)
             .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
             .append("g")
             .attr("transform",
                 "translate(" + vis.margin.left + "," + vis.margin.top + ")");

         // Parse the Data
         d3.csv("./data/bar.csv", function(data) {

             vis.subgroups = data.columns.slice(1)

             vis.groups = d3.map(data, function(d){return(d.group)}).keys()

             // Add X axis
             vis.x = d3.scaleBand()
                 .domain(vis.groups)
                 .range([0, vis.width])
                 .padding([0.2]);

             vis.svg1.append("g")
                 .attr("transform", "translate(0," + vis.height + ")")
                 .call(d3.axisBottom(vis.x).tickSize(0));

             // Add Y axis
             vis.y = d3.scaleLinear()
                 .domain([0, 40])
                 .range([ vis.height, 0 ]);
             vis.svg1.append("g")
                 .call(d3.axisLeft(vis.y));

             // Another scale for subgroup position?
             vis.xSubgroup = d3.scaleBand()
                 .domain(vis.subgroups)
                 .range([0, vis.x.bandwidth()])
                 .padding([0.05])

             // color palette = one color per subgroup
              vis.color = d3.scaleOrdinal()
                 .domain(vis.subgroups)
                 .range(['#e41a1c','#377eb8'])

             // Show the bars
            vis.svg1.append("g")
                 .selectAll("g")
                 // Enter in data = loop group per group
                 .data(data)
                 .enter()
                 .append("g")
                 .attr("transform", function(d) { return "translate(" + vis.x(d.group) + ",0)"; })
                 .selectAll("rect")
                 .data(function(d) { return vis.subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
                 .enter().append("rect")
                 .attr("x", function(d) { return vis.xSubgroup(d.key); })
                 .attr("y", function(d) { return vis.y(d.value); })
                 .attr("width", vis.xSubgroup.bandwidth())
                 .attr("height", function(d) { return vis.height - vis.y(d.value); })
                 .attr("fill", function(d) { return vis.color(d.key); });

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