class AlbumComparisons{

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

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

        vis.margin = {top: 70, right: 30, bottom: 20, left: 30};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

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
            .attr("x", vis.margin.left + 25)
            .attr("y", 0)
            .attr("height", 10)
            .attr("width", 10)
            .style("fill", "#7db954");


        vis.x = d3.scaleBand()
            .domain(vis.attributes)
            .range([0, vis.width])
            .padding([0.2])

        vis.xAxis =  vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", `translate(30, ${vis.height} )`)
            .call(d3.axisBottom(vis.x))
            .attr("font-family", "Ebrima")
            .attr("font-size", "14px");


        vis.xSubgroup = d3.scaleBand()
            .domain(['decade', 'album'])
            .range([0, vis.x.bandwidth()])
            .padding([0.05])

        // vis.svg.append("text")
        //     .attr("class", "x-label")
        //     .attr("text-anchor", "end")
        //     .attr("font-size", "14px")
        //     .attr("x", vis.width/2 + vis.margin.left)
        //     .attr("y", vis.height + 35)
        //     .attr("font-family", "Ebrima")
        //     .text("Attribute");

        vis.y = d3.scaleLinear()
            .domain([0,1])
            .range([vis.height, vis.margin.top]);

        vis.yAxis = vis.svg.append("g")
            .attr("class", "y-axis axis")
            .attr("transform", "translate(30, 0)")
            .call(d3.axisLeft(vis.y))
            .attr("font-family", "Ebrima")
            .attr("font-size", "14px");

        vis.svg.append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "end")
            .attr("x", -(75))
            .attr("y", 50)
            .attr("font-size", "16px")
            .attr("transform", "rotate(-90)")
            .attr("font-family", "Ebrima")
            .text("Value");




        vis.wrangleData();
    }

    wrangleData(){
        let vis = this;

        vis.displayData = [];


        if(outlierAlbumInfo === undefined){
            vis.selectedAlbum = vis.initialAlbum;
        }
        else{
            vis.selectedAlbum = outlierAlbumInfo.selectedAlbum;
        }


        //vis.selectedAlbum = (outlierAlbumInfo.selectedAlbum || vis.initialAlbum);

        vis.releaseDecade = parseInt(parseInt(Math.floor(vis.selectedAlbum.release_date))/10) * 10;
        vis.chartDecade = parseInt(parseInt(Math.floor(vis.selectedAlbum.chart_date))/10) * 10;


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

        if(outlierAlbumInfo != undefined){
            if(outlierAlbumInfo.displayData.length == 0){
                vis.displayData = [];
                vis.releaseDecade = "";
                vis.chartDecade = "";
                vis.selectedAlbum = "";
            }
        }

        vis.legend.append("rect")
            .attr("x",vis.margin.left + 25)
            .attr("y",-20)
            .attr("height", 10)
            .attr("width", 10)
            .attr("fill", function(){
                if(vis.releaseDecade == 1960){
                    return "#C29BA3"
                }
                if(vis.releaseDecade == 1970){
                    return "#E3BFB7"
                }
                if(vis.releaseDecade == 1980){
                    return "#FFE4C9"
                }
                if(vis.releaseDecade == 1990){
                    return "#B7EAF7"
                }
                if(vis.releaseDecade == 2000){
                    return "#8A9BA7"
                }
                if(vis.releaseDecade == 2010){
                    return "#445A67"
                }
            });

        vis.legend.append("rect")
            .attr("x",vis.margin.left + 25)
            .attr("y",20)
            .attr("height", 10)
            .attr("width", 10)
            .attr("fill", function(){
                if(vis.chartDecade == 1960){
                    return "#C29BA3"
                }
                if(vis.chartDecade == 1970){
                    return "#E3BFB7"
                }
                if(vis.chartDecade == 1980){
                    return "#FFE4C9"
                }
                if(vis.chartDecade == 1990){
                    return "#B7EAF7"
                }
                if(vis.chartDecade == 2000){
                    return "#8A9BA7"
                }
                if(vis.chartDecade == 2010){
                    return "#445A67"
                }
            });



        //vis.svg.selectAll(".bars").remove();
        vis.svg.selectAll(".label").remove();

        console.log(vis.displayData);

        vis.bars1 = vis.svg.selectAll(".bars1")
            .data(vis.displayData);

        vis.bars1.enter()
            .append("rect")
            .merge(vis.bars1)
            .attr("class", "bars1")
            .transition()
            .duration(700)
            .attr("fill", function(){
                if(vis.releaseDecade == 1960){
                    return "#C29BA3"
                }
                if(vis.releaseDecade == 1970){
                    return "#E3BFB7"
                }
                if(vis.releaseDecade == 1980){
                    return "#FFE4C9"
                }
                if(vis.releaseDecade == 1990){
                    return "#B7EAF7"
                }
                if(vis.releaseDecade == 2000){
                    return "#8A9BA7"
                }
                if(vis.releaseDecade == 2010){
                    return "#445A67"
                }
            })
            .attr("x", function(d) { return vis.x(d.attribute) + 30; })
            .attr("y", function(d) {
                return vis.y(d.releaseValue)
            })
            .attr("width", vis.x.bandwidth()/3)
            .attr("height", function(d) {
                return vis.height - vis.y(d.releaseValue);
            });

        vis.bars2 = vis.svg.selectAll(".bars2")
            .data(vis.displayData);


        vis.bars2
            .enter()
            .append("rect")
            .merge(vis.bars2)
            .attr("class", "bars2")
            .transition()
            .duration(700)
            .attr("fill", "#7db954") //64864a
            .attr("x", function(d) { return 30 + vis.x(d.attribute) + vis.x.bandwidth()/3; })
            .attr("y", function(d) { return vis.y(d.albumValue); })
            .attr("width", vis.x.bandwidth()/3)
            .attr("height", function(d) { return vis.height - vis.y(d.albumValue); })

        vis.bars3 = vis.svg.selectAll(".bars3")
            .data(vis.displayData);


        vis.bars3.enter()
            .append("rect")
            .merge(vis.bars3)
            .attr("class", "bars3")
            .transition()
            .duration(700)
            .attr("fill", function(){
                if(vis.chartDecade == 1960){
                    return "#C29BA3"
                }
                if(vis.chartDecade == 1970){
                    return "#E3BFB7"
                }
                if(vis.chartDecade == 1980){
                    return "#FFE4C9"
                }
                if(vis.chartDecade == 1990){
                    return "#B7EAF7"
                }
                if(vis.chartDecade == 2000){
                    return "#8A9BA7"
                }
                if(vis.chartDecade == 2010){
                    return "#445A67"
                }
            })

            .attr("x", function(d) { return vis.x(d.attribute) + 30 + 2* vis.x.bandwidth()/3; })
            .attr("y", function(d) {
                return vis.y(d.chartValue);
            })
            .attr("width", vis.x.bandwidth()/3)
            .attr("height", function(d) {
                return vis.height - vis.y(d.chartValue);
            });



        vis.legend.append("text")
            .attr("class", "label")
            .attr("x", vis.margin.left + 40)
            .attr("y", -15)
            .attr("font-family", "Ebrima")
            .text(function(){
                if(vis.releaseDecade != ""){
                    return vis.releaseDecade + "s"
                }
            })
            .style("font-size", "13px")
            .attr("alignment-baseline","middle")

        vis.legend.append("text")
            .attr("class", "label")
            .attr("x",  vis.margin.left + 40)
            .attr("y", 5)
            .attr("font-family", "Ebrima")
            .text(vis.selectedAlbum.album)
            .style("font-size", "13px")
            .attr("alignment-baseline","middle")


        vis.legend.append("text")
            .attr("class", "label")
            .attr("x", vis.margin.left + 40)
            .attr("y", 25)
            .attr("font-family", "Ebrima")
            .text(function(){
                if(vis.chartDecade != ""){
                    return vis.chartDecade + "s"
                }
            })
            .style("font-size", "13px")
            .attr("alignment-baseline","middle")



        vis.bars1.exit().remove();
        vis.bars2.exit().remove();
        vis.bars3.exit().remove();
        //vis.groups.exit().remove();


    }
}