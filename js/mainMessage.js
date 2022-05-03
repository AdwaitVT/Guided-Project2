class elementData {

    constructor(parentElement, legendElement, elements, charData) {
        this.parentElement = parentElement;
        this.legendElement = legendElement;
        this.element = elements;
        this.charData = charData;

        this.elementUpdate = ['Acoustic', 'Danceable', 'Energy', 'Instrumental','Lively',
            'Speechy', 'Valence']

        this.highLow = ['Most', 'Least']

        this.chars = ['acousticness', 'danceability', 'duration_ms', 'energy', 'instrumentalness',
            'liveness', 'speechiness', 'valence']

        this.displayData = [];

        this.initVis();
    }


    /*
     * Initialize visualization (static content; e.g. SVG area, axes, brush component)
     */

    initVis() {
        let vis = this;

        vis.margin = {top: 10, right: 10, bottom: 20, left: 40};

        vis.blueColors = ['#02435c', '#1e91ba', '#84cae3', '#bae5f5'] //['#02435c', '#057096', '#1e91ba', '#4baacc', '#84cae3', '#bae5f5']
        vis.redColors = ['#f79999', '#f04646', '#9e0606', '#700202'] //['#f79999', '#f77474', '#f04646', '#e01212', '#9e0606', '#700202']

        // TODO: #9 - Change hardcoded width to reference the width of the parent element
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        vis.widthLegend = document.getElementById(vis.legendElement).getBoundingClientRect().width;
        vis.heightLegend = document.getElementById(vis.legendElement).getBoundingClientRect().height;

        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // Legend SVG drawing area
        vis.svgLegend = d3.select("#" + vis.legendElement).append("svg")
            .attr("width", vis.widthLegend)
            .attr("height", vis.heightLegend - vis.margin.top - vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + 0 + "," + vis.margin.top + ")");

        // Scales and axes
        vis.x = d3.scaleBand()
            .rangeRound([0, vis.height-vis.margin.bottom-vis.margin.top])

        vis.x.domain(vis.elementUpdate)


        vis.xAxis = d3.axisLeft()
            .scale(vis.x)

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(" + vis.margin.left + "," + (0) + ")");

        vis.svg.select(".x-axis").call(vis.xAxis)

        // add tool-tip
        // vis.toolTip = d3.select("body").append("div")
        //     .attr("class", "tooltip")
        //     .attr("id", "artistTooltip")

        // Add a legend
        // define scale
        vis.legendScale = d3.scaleBand()
            .domain(['1960', '1970', '1980', '1990', '2000', '2010'])
            .range([0, 255])

        // define axis
        vis.legendAxis = d3.axisTop()
            .scale(vis.legendScale)
            .tickSizeOuter(0)
            .tickSizeInner(0)

        vis.legend = vis.svgLegend.append("g")
            .attr('class', 'legend')
            .attr("y", "4%")
            .attr('transform', `translate(${vis.widthLegend/1.4}, ${10})`)
            .call(vis.legendAxis)

        vis.svgLegend.append("text")
            .text("Decade Color Code: ")
            .attr("x", '55%')
            .attr("y", '35%')
            .attr("font-family", "Georgia")
            .attr("font-size", '15px')
            .attr("font-style", 'italic')

        vis.legend.selectAll('.bar')
            .data(vis.charData)
            .enter()
            .append("rect")
            .attr("x", (d,i)=> i*42.5)
            .attr('y', 0)
            .attr("width", 210/5)
            .attr('height', 10)
            .attr("fill", d => d.color)


        this.wrangleData();
    }


    /*
     * Data wrangling
     */

    wrangleData(leastMostVal) {
        let vis = this;


        if (leastMostVal === undefined){
            leastMostVal = "most"
        }
        //console.log(leastMostVal)

        vis.acousticness = {};
        vis.danceability = {};
        vis.duration = {};
        vis.energy = {};
        vis.instrument = {};
        vis.liveness = {};
        vis.speech = {};
        vis.valence = {};

        let tempData = vis.charData

        // ACOUSTICNES
        let acousticSort = tempData.sort((a,b)=>d3.descending(a.acousticness,b.acousticness))

        if (leastMostVal === "most"){
            acousticSort = tempData.sort((a,b)=>d3.descending(a.acousticness,b.acousticness))
        }else{
            acousticSort = tempData.sort((a,b)=>d3.ascending(a.acousticness,b.acousticness))
        }

        acousticSort.forEach(function(d, index){
            if (index===0){
                vis.acousticness = {
                    decade: [d.decade],
                    color: [d.color],
                    value: [d.acousticness]
                }
            }else{
                vis.acousticness["decade"].push(d.decade)
                vis.acousticness["color"].push(d.color)
                vis.acousticness["value"].push(d.acousticness)
            }
        })

        // DANCEABILITY
        let danceSort = tempData.sort((a,b)=>d3.descending(a.danceability,b.danceability))

        if (leastMostVal === "most"){
            danceSort = tempData.sort((a,b)=>d3.descending(a.danceability,b.danceability))
        }else{
            danceSort = tempData.sort((a,b)=>d3.ascending(a.danceability,b.danceability))
        }

        danceSort.forEach(function(d, index){
            if (index===0){
                vis.danceability = {
                    decade: [d.decade],
                    color: [d.color],
                    value: [d.danceability]
                }
            }else{
                vis.danceability["decade"].push(d.decade)
                vis.danceability["color"].push(d.color)
                vis.danceability["value"].push(d.danceability)
            }
        })

        // ENERGY
        let energySort = tempData.sort((a,b)=>d3.descending(a.energy,b.energy))

        if (leastMostVal === "most"){
            energySort = tempData.sort((a,b)=>d3.descending(a.energy,b.energy))
        }else{
            energySort = tempData.sort((a,b)=>d3.ascending(a.energy,b.energy))
        }

        energySort.forEach(function(d, index){
            if (index===0){
                vis.energy = {
                    decade: [d.decade],
                    color: [d.color],
                    value: [d.energy]
                }
            }else{
                vis.energy["decade"].push(d.decade)
                vis.energy["color"].push(d.color)
                vis.energy["value"].push(d.energy)
            }
        })

        // INSTRUMENTALNESS
        let instrumentSort = tempData.sort((a,b)=>d3.descending(a.instrumentalness,b.instrumentalness))

        if (leastMostVal === "most"){
            instrumentSort = tempData.sort((a,b)=>d3.descending(a.instrumentalness,b.instrumentalness))
        }else{
            instrumentSort = tempData.sort((a,b)=>d3.ascending(a.instrumentalness,b.instrumentalness))
        }

        instrumentSort.forEach(function(d, index){
            if (index===0){
                vis.instrument = {
                    decade: [d.decade],
                    color: [d.color],
                    value: [d.instrumentalness]
                }
            }else{
                vis.instrument["decade"].push(d.decade)
                vis.instrument["color"].push(d.color)
                vis.instrument["value"].push(d.instrumentalness)
            }
        })

        // LIVENESS
        let liveSort = tempData.sort((a,b)=>d3.descending(a.liveness,b.liveness))

        if (leastMostVal === "most"){
            liveSort = tempData.sort((a,b)=>d3.descending(a.liveness,b.liveness))
        }else{
            liveSort = tempData.sort((a,b)=>d3.ascending(a.liveness,b.liveness))
        }

        liveSort.forEach(function(d, index){
            if (index===0){
                vis.liveness = {
                    decade: [d.decade],
                    color: [d.color],
                    value: [d.liveness]
                }
            }else{
                vis.liveness["decade"].push(d.decade)
                vis.liveness["color"].push(d.color)
                vis.liveness["value"].push(d.liveness)
            }
        })

        // SPEECHINESS
        let speechSort = tempData.sort((a,b)=>d3.descending(a.speechiness,b.speechiness))

        if (leastMostVal === "most"){
            speechSort = tempData.sort((a,b)=>d3.descending(a.speechiness,b.speechiness))
        }else{
            speechSort = tempData.sort((a,b)=>d3.ascending(a.speechiness,b.speechiness))
        }

        speechSort.forEach(function(d, index){
            if (index===0){
                vis.speech = {
                    decade: [d.decade],
                    color: [d.color],
                    value: [d.speechiness]
                }
            }else{
                vis.speech["decade"].push(d.decade)
                vis.speech["color"].push(d.color)
                vis.speech["value"].push(d.speechiness)
            }
        })

        // VALENCE
        let valenceSort = tempData.sort((a,b)=>d3.descending(a.valence,b.valence))

        if (leastMostVal === "most"){
            valenceSort = tempData.sort((a,b)=>d3.descending(a.valence,b.valence))
        }else{
            valenceSort = tempData.sort((a,b)=>d3.ascending(a.valence,b.valence))
        }

        valenceSort.forEach(function(d, index){
            if (index===0){
                vis.valence = {
                    decade: [d.decade],
                    color: [d.color],
                    value: [d.valence]
                }
            }else{
                vis.valence["decade"].push(d.decade)
                vis.valence["color"].push(d.color)
                vis.valence["value"].push(d.valence)
            }
        })


        vis.updateVis();
    }



    /*
     * The drawing function
     */

    updateVis() {
        let vis = this;
        let rectWidth =  45
        let xPos = 6.5

        // -------------------------------------------------------------------------------------------------------------
        //                                          ACOUSTICNESS
        // -------------------------------------------------------------------------------------------------------------
        vis.acousticRow = vis.svg.selectAll(".acoustic-row")
            .data(vis.acousticness.value)

        vis.acoustic = vis.acousticRow.enter()
            .append("g")
            .attr("class", "acoustic-row")

        // add the circles
        vis.acousticElement = vis.acoustic.append("rect")
            .attr("class", "acousticChar")
            .merge(vis.acousticRow.select(".acousticChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.acousticness.color[index]})
            .attr("width", function(d){return d*200})
            .attr("height", rectWidth)
            .attr("y", function(d){return vis.x("Acoustic") + vis.margin.top})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos})

        // add decade to the text
        vis.acousticDecade = vis.acoustic.append("text")
            .attr("class", "textDecade")
            .merge(vis.acousticRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return d.toFixed(3)})
            // .attr("fill", function(d, index){
            //     if (vis.acousticness.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("y", function(d){return vis.x("Acoustic") + vis.margin.top + 30})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos + d*200})

        // -------------------------------------------------------------------------------------------------------------
        //                                          DANCEABILITY
        // -------------------------------------------------------------------------------------------------------------
        vis.danceRow = vis.svg.selectAll(".dance-row")
            .data(vis.danceability.value)

        vis.dance = vis.danceRow.enter()
            .append("g")
            .attr("class", "dance-row")

        // add the circles
        vis.danceElement = vis.dance.append("rect")
            .attr("class", "danceChar")
            .merge(vis.danceRow.select(".danceChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.danceability.color[index]})
            .attr("width", function(d){return d*200})
            .attr("height", rectWidth)
            .attr("y", function(d){return vis.x("Danceable") + vis.margin.top})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos})

        // add decade to the text
        vis.danceDecade = vis.dance.append("text")
            .attr("class", "textDecade")
            .merge(vis.danceRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return d.toFixed(3)})
            // .attr("fill", function(d, index){
            //     if (vis.danceability.decade[index]===1960){
            //         return 'darkgrey'
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("y", function(d){return vis.x("Danceable") + vis.margin.top + 30})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos + d*200})

        // -------------------------------------------------------------------------------------------------------------
        //                                          ENERGY
        // -------------------------------------------------------------------------------------------------------------
        vis.energyRow = vis.svg.selectAll(".energy-row")
            .data(vis.energy.value)

        vis.energyDisp = vis.energyRow.enter()
            .append("g")
            .attr("class", "energy-row")

        // add the circles
        vis.energyElement = vis.energyDisp.append("rect")
            .attr("class", "energyChar")
            .merge(vis.energyRow.select(".energyChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.energy.color[index]})
            .attr("width", function(d){return d*200})
            .attr("height", rectWidth)
            .attr("y", function(d){return vis.x("Energy") + vis.margin.top})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos})

        // add decade to the text
        vis.energyDecade = vis.energyDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.energyRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return d.toFixed(3)})
            // .attr("fill", function(d, index){
            //     if (vis.energy.decade[index]===1960){
            //         return 'darkgrey'
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("y", function(d){return vis.x("Energy") + vis.margin.top + 30})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos + d*200})
        // -------------------------------------------------------------------------------------------------------------
        //                                          INSTRUMENTALNESS
        // -------------------------------------------------------------------------------------------------------------
        vis.instrumentRow = vis.svg.selectAll(".instrument-row")
            .data(vis.instrument.value)

        vis.instrumentDisp = vis.instrumentRow.enter()
            .append("g")
            .attr("class", "instrument-row")

        // add the circles
        vis.instrumentElement = vis.instrumentDisp.append("rect")
            .attr("class", "instrumentChar")
            .merge(vis.instrumentRow.select(".instrumentChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.instrument.color[index]})
            .attr("width", function(d){return d*200})
            .attr("height", rectWidth)
            .attr("y", function(d){return vis.x("Instrumental") + vis.margin.top})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos})

        // add decade to the text
        vis.instrumentDecade = vis.instrumentDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.instrumentRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return d.toFixed(3)})
            // .attr("fill", function(d, index){
            //     if (vis.instrument.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("y", function(d){return vis.x("Instrumental") + vis.margin.top + 30})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos + d*200})
        // -------------------------------------------------------------------------------------------------------------
        //                                          LIVENESS
        // -------------------------------------------------------------------------------------------------------------
        vis.liveRow = vis.svg.selectAll(".liveness-row")
            .data(vis.liveness.value)

        vis.live = vis.liveRow.enter()
            .append("g")
            .attr("class", "liveness-row")

        // add the circles
        vis.liveElement = vis.live.append("rect")
            .attr("class", "liveChar")
            .merge(vis.liveRow.select(".liveChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.liveness.color[index]})
            .attr("width", function(d){return d*200})
            .attr("height", rectWidth)
            .attr("y", function(d){return vis.x("Lively") + vis.margin.top})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos})

        // add decade to the texts
        vis.live.append("text")
            .attr("class", "textDecade")
            .merge(vis.liveRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d) {return d.toFixed(3)})
            // .attr("fill", function(d, index){
            //     if (vis.liveness.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("y", function(d){return vis.x("Lively") + vis.margin.top + 30})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos + d*200})

        // -------------------------------------------------------------------------------------------------------------
        //                                          SPEECHINESS
        // -------------------------------------------------------------------------------------------------------------
        vis.speechRow = vis.svg.selectAll(".speech-row")
            .data(vis.speech.value)

        vis.speechDisp = vis.speechRow.enter()
            .append("g")
            .attr("class", "speech-row")

        // add the circles
        vis.speechElement = vis.speechDisp.append("rect")
            .attr("class", "speechChar")
            .merge(vis.speechRow.select(".speechChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.speech.color[index]})
            .attr("width", function(d){return d*200})
            .attr("height", rectWidth)
            .attr("y", function(d){return vis.x("Speechy") + vis.margin.top})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos})

        // add decade to the text
        vis.speechDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.speechRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return d.toFixed(3)})
            // .attr("fill", function(d, index){
            //     if (vis.speech.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("y", function(d){return vis.x("Speechy") + vis.margin.top + 30})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos + d*200})

        // -------------------------------------------------------------------------------------------------------------
        //                                          VALENCE
        // -------------------------------------------------------------------------------------------------------------
        vis.valenceRow = vis.svg.selectAll(".valence-row")
            .data(vis.valence.value)

        vis.valenceDisp = vis.valenceRow.enter()
            .append("g")
            .attr("class", "valence-row")

        // add the circles
        vis.valenceElement = vis.valenceDisp.append("rect")
            .attr("class", "valenceChar")
            .merge(vis.valenceRow.select(".valenceChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.valence.color[index]})
            .attr("width", function(d){return d*200})
            .attr("height", rectWidth)
            .attr("y", function(d){return vis.x("Valence") + vis.margin.top})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos})

        // add decade to the text
        vis.valenceDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.valenceRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d) {return d.toFixed(3)})
            // .attr("fill", function(d, index){
            //     if (vis.valence.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            //.attr("text-anchor", "end")
            .attr("y", function(d){return vis.x("Valence") + vis.margin.top + 30})
            .attr("x", function(d, index){return vis.margin.left + index*vis.width/xPos + d*200})



        // -------------------------------------------------------------------------------------------------------------
        // update the x-axis
        let numDec = 3

        // vis.axislabels = vis.svg.select(".x-axis").call(vis.xAxis)
        //     .selectAll("text")
        //     .text(function(d, index){
        //         return vis.elementUpdate[index];
        //     })
        //     .style("text-anchor", "start")
        //     .attr("dx", "2.5%")
        //     .attr("dy", "-2%")
        //     .attr("transform", function (d) {
        //         return "rotate(-10)"
        //     });

        // vis.axislabels.on('mouseover', function(event, d, index){
        //     vis.toolTip
        //         .style("opacity", 1)
        //         .style("left", event.pageX + 20 + "px")
        //         .style("top", event.pageY + "px")
        //         .html(`
        //                  <div class="char-defs" style="border: thin solid black; border-radius: 5px; background: lightgrey; padding: 10px; margin-left: 10px">
        //                     <p style="font-size: 15px">
        //                         <b>Acoustic</b>: confidence the track is acoustic <br>
        //                         <b>Danceable</b>: how suitable a track is for dancing <br>
        //                         <b>Energy</b>: measure of intensity & activity (i.e. feels fast, loud, and noisy) <br>
        //                         <b>Instrumental</b>: track contains vocals versus no vocals <br>
        //                         <b>Lively</b>: presence of an audience in the recording <br>
        //                         <b>Loud</b>: volume in decibels  <br>
        //                         <b>Speechy</b>: presence of spoken words <br>
        //                         <b>Tempo</b>: estimated speed in beats per minute  <br>
        //                         <b>Valence</b>: measure of musical positiveness (i.e. happy / cheerful vs. sad / depressed)
        //                     </p>
        //                 </div>`)
        //     d3.select(this).attr("fill", "red")
        // })
        //
        // vis.axislabels.on('mouseout', function(event, d){
        //     vis.toolTip
        //         .style("opacity", 0)
        //         .style("left", 0)
        //         .style("top", 0)
        //         .html(``);
        //     d3.select(this).attr("fill", "black")
        // })



    }
}

