class AlbumComparisons{

    constructor(parentElement, data, type) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];
        this.type = type;

        this.attributes = ["acousticness","danceability","energy","instrumentalness","liveness","speechiness","valence"];
        this.initialAlbum = {
            acousticness: "0.8164",
            album: "Dylan",
            album_id: "0o1uFxZ1VTviqvNaYkTJek",
            artist: "Bob Dylan",
            chart_date: "1973",
            danceability: "0.5541",
            energy: "0.2290",
            instrumentalness: "0.0010",
            liveness: "0.1516",
            release_date: "1963",
            speechiness: "0.0495",
            valence: "0.5925"
        }

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 30, bottom: 50, left: 30};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        vis.height = 300;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr('transform', `translate (0, 0)`);

        vis.legend = vis.svg.append('g')
            .attr("width", 50)
            .attr("height", 50)
            .attr("class", "legend")
            .attr('transform', `translate(0, 30)`);

        vis.legend.append("rect")
            .attr("x",125)
            .attr("y",3)
            .attr("height", 10)
            .attr("width", 10)
            .style("fill", "#377eb8");
        vis.legend.append("rect")
            .attr("x",185)
            .attr("y",3)
            .attr("height", 10)
            .attr("width", 10)
            .style("fill", "#e41a1c");



        vis.x = d3.scaleBand()
            .domain(vis.attributes)
            .range([0, vis.width])
            .padding([0.2])

        vis.xAxis =  vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", `translate(30, ${vis.height} )`)
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
            .attr("transform", "translate(30, 0)")
            .call(d3.axisLeft(vis.y));




        vis.wrangleData();
    }

    wrangleData(){
        let vis = this;

        vis.displayData = [];


        vis.selectedAlbum = (outlierAlbumInfo.selectedAlbum || vis.initialAlbum);

        vis.releaseDecade = parseInt(parseInt(vis.selectedAlbum.release_date)/10) * 10;
        vis.chartDecade = parseInt(parseInt(vis.selectedAlbum.chart_date)/10) * 10;


        let chartVal;
        vis.attributes.forEach(a => {
            chartVal = vis.data.find(row => row.chart_date == vis.chartDecade)[a];
            vis.displayData.push({
                attribute: a,
                releaseValue: (vis.data.find(row => row.chart_date == vis.releaseDecade))[a],
                chartValue: chartVal,
                albumValue: vis.selectedAlbum[a]
            });
        })



        vis.updateVis();
    }

    updateVis(){

        let vis = this;

        vis.svg.selectAll(".bars").remove();
        vis.svg.selectAll(".label").remove();

        vis.groups = vis.svg.selectAll(".bars")
            .data(vis.displayData);

        vis.groups
            .enter()
            .append("rect")
            .merge(vis.groups)
            .attr("class", "bars")
            .attr("fill", "#e41a1c")
            .attr("x", function(d) { return 30 + vis.x(d.attribute) + vis.x.bandwidth()/2; })
            .attr("y", function(d) { return vis.y(d.albumValue); })
            .attr("width", vis.x.bandwidth()/2)
            .attr("height", function(d) { return vis.height - vis.y(d.albumValue); })


        vis.groups.enter()
            .append("rect")
            .merge(vis.groups)
            .attr("class", "bars")
            .attr("fill", "#377eb8")
            .attr("x", function(d) { return vis.x(d.attribute) + 30; })
            .attr("y", function(d) {
                if(vis.type == "release"){return vis.y(d.releaseValue);}
                else{return vis.y(d.chartValue);}
            })
            .attr("width", vis.x.bandwidth()/2)
            .attr("height", function(d) {
                if(vis.type == "release"){return vis.height - vis.y(d.releaseValue);}
                else{return vis.height - vis.y(d.chartValue);}
            });

        vis.legend.append("text")
            .attr("class", "label")
            .attr("x", 200)
            .attr("y", 10)
            .text(vis.selectedAlbum.album)
            .style("font-size", "13px")
            .attr("alignment-baseline","middle")

        if(vis.type == "release"){
            vis.legend.append("text")
                .attr("class", "label")
                .attr("x", 0)
                .attr("y", -20)
                .text("Released in: " + vis.selectedAlbum.release_date)
                .attr("font-weight", "bold")
                .style("font-size", "18px")
                .attr("alignment-baseline","middle")

            vis.legend.append("text")
                .attr("class", "label")
                .attr("x", 140)
                .attr("y",10)
                .text(vis.releaseDecade + "s")
                .style("font-size", "13px")
                .attr("alignment-baseline","middle")
        }
        else{
            vis.legend.append("text")
                .attr("class", "label")
                .attr("x", 0)
                .attr("y", -20)
                .text("Charted in: " + vis.selectedAlbum.chart_date)
                .attr("font-weight", "bold")
                .style("font-size", "18px")
                .attr("alignment-baseline","middle")

            vis.legend.append("text")
                .attr("class", "label")
                .attr("x", 140)
                .attr("y", 10)
                .text(vis.chartDecade + "s")
                .style("font-size", "13px")
                .attr("alignment-baseline","middle")

        }





        vis.groups.exit().remove();


    }
}