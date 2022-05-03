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


        // add tool-tip
        vis.toolTip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .attr("id", "artistTooltip")

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
        // append text to dispDecade
        //vis.dispDecade.text("Top 3 artists of " + selectedButton)

        // create group elements for each of the 5 artists
        // vis.dataRow = vis.svg.selectAll(".artist-row")
        //     .data(vis.displayData)
        //
        // vis.artist = vis.dataRow.enter()
        //     .append("g")
        //     .attr("class", "artist-row")


        // vis.artistName = vis.artist.append("text")
        //     .attr("class", "artistName")
        //     .merge(vis.dataRow.select(".artistName"))
        //     .text(function(d){
        //         //console.log("here", d)
        //         return d.Artists
        //     })
        //     .attr("x", function(d, index){
        //         if (index===0){
        //             return 0
        //         }else if (index === 1){
        //             return '17.5%'
        //         }else if (index === 2){
        //             return '38.5%'
        //         }else if (index === 3){
        //             return '60%'
        //         }else if (index === 4){
        //             return '77.5%'
        //         }
        //     }) //vis.margin.left*index*6
        //     .attr("y", -30)
        //     .attr("text-anchor", "middle")
        //     .attr("font-weight", "bold")
        //     .attr("font-size", '12px')
        //     .attr("transform", "translate(" + vis.margin.left*1 + "," + 0 + ")")
        //     .classed('rotate', true)
        //     .attr('transform', (d)=>{return 'rotate(10)'})
        //     //.attr("transform", "translate(" + vis.margin.left*1 + "," + vis.margin.top*3.5 + ")");

        // vis.artist.on('mouseover', function(event, d){
        //     vis.toolTip
        //         .style("opacity", 1)
        //         .style("left",  70 + "%")
        //         .style("top", 20 + "%")
        //         .style("width", "15%")
        //         .html(`
        //                  <div style="border: thin solid black; border-radius: 5px; background: cadetblue; padding: 10px; font-size: 4px">
        //                      <h4 style="font-weight: bold; text-align: center">${d.Artists}<h4>
        //                      <p style="font-size: 13px">
        //                      Acousticness:  ${d.acousticness.toFixed(numDec)} <br>
        //                      Danceability:  ${d.danceability.toFixed(numDec)} <br>
        //                      Energy:  ${d.energy.toFixed(numDec)} <br>
        //                      Instrumentalness:  ${d.instrumentalness.toFixed(numDec)} <br>
        //                      Liveness:  ${d.liveness.toFixed(numDec)} <br>
        //                      Loudness:  ${d.loudness.toFixed(numDec)} <br>
        //                      Speechiness:  ${d.speechiness.toFixed(numDec)} <br>
        //                      Tempo:  ${d.tempo.toFixed(numDec)}
        //                      </p>
        //                  </div>`)
        //     d3.select(this).attr("fill", "red")
        // })

        vis.x.domain(vis.displayData.map(d => d.Artists))

        vis.svg.select(".x-axis")
            .transition()
            .duration(5000)
            .call(vis.xAxis)

        // vis.artist.on('mouseout', function(event, d){
        //     d3.select(this).attr("fill", "black")
        // })

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

        vis.svg.selectAll(".x-axis").transition().duration(1500).call(vis.xAxis)
            .selectAll("text")
            .attr("text-anchor", "middle")
            .attr("y", -20);


    }
}

