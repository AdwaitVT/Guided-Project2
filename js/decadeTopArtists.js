class ArtistData {

    constructor(parentElement, decade, artistData) {
        this.parentElement = parentElement;
        this.decade = decade;
        this.artistData = artistData;

        this.displayData = artistData.slice(0, 5);

        this.initVis();
    }


    /*
     * Initialize visualization (static content; e.g. SVG area, axes, brush component)
     */

    initVis() {
        let vis = this;

        vis.margin = {top: 50, right: 10, bottom: 20, left: 40};

        // TODO: #9 - Change hardcoded width to reference the width of the parent element
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        vis.selectedOption = "index"


        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        vis.imageArea = d3.select("#images")

        vis.x = d3.scaleBand()
            .range([0, (vis.width - vis.margin.right - vis.margin.left)]);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x)
            .tickSizeOuter(0)
            .tickSizeInner(0)

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("id", "area-axis")
            .attr("y", -10);

        this.wrangleData();
    }


    /*
     * Data wrangling
     */

    wrangleData(selectedButton) {
        let vis = this;
        let count = 0;

        selectedButton = +parseFloat(selectedButton)

        //console.log("display data", vis.artistData)
        //console.log("button val", selectedButton)

        if (isNaN(selectedButton)){
            selectedButton = 1960
        }

        for (let ii=0; ii < vis.artistData.length; ii++){
            ////console.log(vis.artistData[ii].Decade) === selectedButton
            //console.log("decade ", vis.artistData[ii].Decade)

            if (vis.artistData[ii].Decade === selectedButton){
                //console.log("here")
                //console.log(count)
                //vis.displayData.splice(count, 1, vis.artistData[ii])
                vis.displayData[count] = vis.artistData[ii]
                count = count+1;
            }


        }

        //console.log("decade data: ", vis.displayData)
        // Update the visualization
        vis.updateVis(selectedButton);
    }



    /*
     * The drawing function
     */

    updateVis(selectedButton) {
        let vis = this;
        let numDec = 3;



        //console.log(selectedButton)

        // create group elements for each of the 5 artists
        vis.dataRow = vis.svg.selectAll(".artist-row")
            .data(vis.displayData)

        vis.artist = vis.dataRow.enter()
            .append("g")
            .attr("class", "artist-row")

        vis.countInfo = vis.artist.append("text")
            .attr("class", "countInfo")
            .merge(vis.dataRow.select(".countInfo"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return "Count: " + d.Count})
            .attr("text-anchor", "start")
            .attr("y", vis.margin.top/2)
            .attr("x", function(d, index){
                if (index === 0){return '1%'
                }else if (index === 1){return '19%'
                }else if (index === 2){return '38%'
                }else if (index === 3){return '56%'
                }else{return '74%'
                }
            })
            .attr("font-family", "Ebrima")
            .attr("font-size", '12px')
            .attr("font-weight", "bold")

        vis.acousticInfo = vis.artist.append("text")
            .attr("class", "acousticInfo")
            .merge(vis.dataRow.select(".acousticInfo"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return "Acousticness: " + d.acousticness.toFixed(3)})
            .attr("text-anchor", "start")
            .attr("y", vis.margin.top/2 + 15)
            .attr("x", function(d, index){
                if (index === 0){return '1%'
                }else if (index === 1){return '19%'
                }else if (index === 2){return '38%'
                }else if (index === 3){return '56%'
                }else{return '74%'
                }
            })
            .attr("font-family", "Ebrima")
            .attr("font-size", '12px')

        vis.danceInfo = vis.artist.append("text")
            .attr("class", "danceInfo")
            .merge(vis.dataRow.select(".danceInfo"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return "Danceability: " + d.danceability.toFixed(3)})
            .attr("text-anchor", "start")
            .attr("y", vis.margin.top/2 + 30)
            .attr("x", function(d, index){
                if (index === 0){return '1%'
                }else if (index === 1){return '19%'
                }else if (index === 2){return '38%'
                }else if (index === 3){return '56%'
                }else{return '74%'
                }
            })
            .attr("font-family", "Ebrima")
            .attr("font-size", '12px')

        vis.energyInfo = vis.artist.append("text")
            .attr("class", "energyInfo")
            .merge(vis.dataRow.select(".energyInfo"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return "Energy: " + d.energy.toFixed(3)})
            .attr("text-anchor", "start")
            .attr("y", vis.margin.top/2 + 45)
            .attr("x", function(d, index){
                if (index === 0){return '1%'
                }else if (index === 1){return '19%'
                }else if (index === 2){return '38%'
                }else if (index === 3){return '56%'
                }else{return '74%'
                }
            })
            .attr("font-family", "Ebrima")
            .attr("font-size", '12px')

        vis.instrumentInfo = vis.artist.append("text")
            .attr("class", "instrumentInfo")
            .merge(vis.dataRow.select(".instrumentInfo"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return "Instrumentalness: " + d.instrumentalness.toFixed(3)})
            .attr("text-anchor", "start")
            .attr("y", vis.margin.top/2 + 60)
            .attr("x", function(d, index){
                if (index === 0){return '1%'
                }else if (index === 1){return '19%'
                }else if (index === 2){return '38%'
                }else if (index === 3){return '56%'
                }else{return '74%'
                }
            })
            .attr("font-family", "Ebrima")
            .attr("font-size", '12px')

        vis.liveInfo = vis.artist.append("text")
            .attr("class", "liveInfo")
            .merge(vis.dataRow.select(".liveInfo"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return "Liveness: " + d.liveness.toFixed(3)})
            .attr("text-anchor", "start")
            .attr("y", vis.margin.top/2 + 75)
            .attr("x", function(d, index){
                if (index === 0){return '1%'
                }else if (index === 1){return '19%'
                }else if (index === 2){return '38%'
                }else if (index === 3){return '56%'
                }else{return '74%'
                }
            })
            .attr("font-family", "Ebrima")
            .attr("font-size", '12px')

        vis.speechInfo = vis.artist.append("text")
            .attr("class", "speechInfo")
            .merge(vis.dataRow.select(".speechInfo"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return "Speechiness: " + d.speechiness.toFixed(3)})
            .attr("text-anchor", "start")
            .attr("y", vis.margin.top/2 + 90)
            .attr("x", function(d, index){
                if (index === 0){return '1%'
                }else if (index === 1){return '19%'
                }else if (index === 2){return '38%'
                }else if (index === 3){return '56%'
                }else{return '74%'
                }
            })
            .attr("font-family", "Ebrima")
            .attr("font-size", '12px')

        vis.valenceInfo = vis.artist.append("text")
            .attr("class", "valenceInfo")
            .merge(vis.dataRow.select(".valenceInfo"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return "Valence: " + d.valence.toFixed(3)})
            .attr("text-anchor", "start")
            .attr("y", vis.margin.top/2 + 105)
            .attr("x", function(d, index){
                if (index === 0){return '1%'
                }else if (index === 1){return '19%'
                }else if (index === 2){return '38%'
                }else if (index === 3){return '56%'
                }else{return '74%'
                }
            })
            .attr("font-family", "Ebrima")
            .attr("font-size", '12px')



        vis.x.domain(vis.displayData.map(d => d.Artists))

        vis.svg.select(".x-axis")
            .call(vis.xAxis)
            .attr("font-family", "Ebrima")
            .attr("font-size", '12px')
            .attr("font-weight", "bold")


        // insert images
        if (selectedButton === 1960){
            document.getElementById("img3").src="artist_imgs/herb_alpert.jpg"
            document.getElementById("img2").src="artist_imgs/bill_cosby.jpg"
            document.getElementById("img4").src="artist_imgs/andy_williams.jpg"
            document.getElementById("img1").src="artist_imgs/barbra_streisand.jpg"
            document.getElementById("img5").src="artist_imgs/nat.jpg"
        }else if(selectedButton === 1970){
            document.getElementById("img3").src="artist_imgs/chicago.jpg"
            document.getElementById("img2").src="artist_imgs/john_denver.jpg"
            document.getElementById("img4").src="artist_imgs/led_zepplin.jpg"
            document.getElementById("img1").src="artist_imgs/elton_john.jpg"
            document.getElementById("img5").src="artist_imgs/carole_king.jpg"
        }else if(selectedButton === 1980){
            document.getElementById("img3").src="artist_imgs/pink_floyd.jpg"
            document.getElementById("img2").src="artist_imgs/U2.jpg"
            document.getElementById("img4").src="artist_imgs/phil_collins.jpg"
            document.getElementById("img1").src="artist_imgs/pat_benetar.jpg"
            document.getElementById("img5").src="artist_imgs/willie.jpg"
        }else if(selectedButton === 1990){
            document.getElementById("img3").src="artist_imgs/fleetwood_mac.jpg"
            document.getElementById("img2").src="artist_imgs/bob_seger.jpg"
            document.getElementById("img4").src="artist_imgs/reba.jpg"
            document.getElementById("img1").src="artist_imgs/george_straight.jpg"
            document.getElementById("img5").src="artist_imgs/brooksdunn.jpg"
        }else if(selectedButton === 2000) {
            document.getElementById("img3").src = "artist_imgs/2pac.jpg"
            document.getElementById("img2").src = "artist_imgs/fleetwood_mac.jpg"
            document.getElementById("img4").src = "artist_imgs/bob_seger.jpg"
            document.getElementById("img1").src = "artist_imgs/red_hot.jpg"
            document.getElementById("img5").src = "artist_imgs/gunsnroses.jpg"
        }else if(selectedButton === 2010){
            document.getElementById("img3").src = "artist_imgs/fleetwood_mac.jpg"
            document.getElementById("img2").src = "artist_imgs/bob_seger.jpg"
            document.getElementById("img4").src = "artist_imgs/red_hot.jpg"
            document.getElementById("img1").src = "artist_imgs/gunsnroses.jpg"
            document.getElementById("img5").src = "artist_imgs/tom_petty.jpg"
        }else{
            //console.log("no decade selected")
        }

        vis.svg.selectAll(".x-axis").call(vis.xAxis)
            .selectAll("text")
            .attr("text-anchor", "middle")
            .attr("y", -20);


    }
}

