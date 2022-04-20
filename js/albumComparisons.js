class AlbumComparisons{

    constructor(parentElement, data, type) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];
        this.type = type;

        this.attributes = ["acousticness","danceability","energy","instrumentalness","liveness","speechiness","valence"];

        //console.log(this.data);

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 50, right: 30, bottom: 50, left: 30};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        vis.height = 300;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr('transform', `translate (${vis.margin.left}, 0)`);



        vis.x = d3.scaleBand()
            .domain(vis.attributes)
            .range([0, vis.width])
            .padding([0.2])

        vis.xAxis =  vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", `translate(0, ${vis.height})`)
            .call(d3.axisBottom(vis.x));

        vis.xSubgroup = d3.scaleBand()
            .domain(['decade', 'album'])
            .range([0, x.bandwidth()])
            .padding([0.05])

        vis.colors = d3.scaleOrdinal()
            .domain(['decade', 'album'])
            .range(['#e41a1c','#377eb8'])

        vis.y = d3.scaleLinear()
            .domain([0,1])
            .range([vis.height, vis.margin.bottom]);

        vis.yAxis = vis.svg.append("g")
            .attr("class", "y-axis axis")
            .attr("transform", "translate(0, 0)")
            .call(d3.axisLeft(vis.y));




        vis.wrangleData();
    }

    wrangleData(){
        let vis = this;

        vis.displayData = [];

        vis.selectedAlbum = outlierAlbumInfo.selectedAlbum;

        vis.releaseDecade = parseInt(parseInt(vis.selectedAlbum.release_date)/10) * 10;
        vis.chartDecade = parseInt(parseInt(vis.selectedAlbum.chart_date)/10) * 10;


        let chartVal;
        vis.attributes.forEach(a => {
            chartVal = vis.data.find(row => row.chart_date == vis.chartDecade)[a];
            //console.log(chartVal);
            vis.displayData.push({
                attribute: a,
                releaseValue: (vis.data.find(row => row.chart_date == vis.releaseDecade))[a],
                chartValue: chartVal,
                albumValue: vis.selectedAlbum[a]
            });
        })

        console.log(vis.displayData);



        vis.updateVis();
    }

    updateVis(){

        let vis = this;

        vis.svg.selectAll(".bars").remove();

        vis.groups = vis.svg.selectAll(".bars")
            .data(vis.displayData);

        vis.groups
            .enter()
            .append("rect")
            .merge(vis.groups)
            .attr("class", "bars")
            .attr("fill", "#e41a1c")
            .attr("x", function(d) { return vis.x(d.attribute) + vis.x.bandwidth()/2; })
            .attr("y", function(d) { return vis.y(d.albumValue); })
            .attr("width", vis.x.bandwidth()/2)
            .attr("height", function(d) { return vis.height - vis.y(d.albumValue); })


        vis.groups.enter()
            .append("rect")
            .merge(vis.groups)
            .attr("class", "bars")
            .attr("fill", "377eb8")
            .attr("x", function(d) { return vis.x(d.attribute); })
            .attr("y", function(d) {
                if(vis.type == "release"){return vis.y(d.releaseValue);}
                else{return vis.y(d.chartValue);}
            })
            .attr("width", vis.x.bandwidth()/2)
            .attr("height", function(d) {
                if(vis.type == "release"){return vis.height - vis.y(d.releaseValue);}
                else{return vis.height - vis.y(d.chartValue);}
            });



        vis.groups.exit().remove();


    }
}