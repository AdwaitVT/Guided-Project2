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
        let addSpace = 5;

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

        // ------------------------------------------------------------------------------
        //                              Scales and axes
        // ------------------------------------------------------------------------------
        vis.x = d3.scaleBand()
            .rangeRound([0, vis.width-vis.margin.left-vis.margin.right])

        vis.x.domain(vis.elementUpdate)

        vis.xAxis = d3.axisTop()
            .scale(vis.x)
            .tickSizeOuter(0)
            .tickSizeInner(0)


        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(" + 0 + "," + (vis.margin.top) + ")");

        vis.svg.select(".x-axis").call(vis.xAxis)
            .attr("font-family", "Georgia")

        // ------------------------------------------------------------------------------
        //                              vertical axes
        // ------------------------------------------------------------------------------
        vis.y1 = d3.scaleBand()
            .rangeRound([0, vis.height-vis.margin.top-vis.margin.bottom - 20])
        vis.y1.domain([' '])

        vis.y1Axis = d3.axisLeft()
            .scale(vis.y1)
            .tickSizeOuter(0)
            .tickSizeInner(0)

        vis.svg.append("g")
            .attr("class", "y1-axis axis")
            .attr("transform", "translate(" + 0 + "," + (vis.margin.top) + ")");
        vis.svg.select(".y1-axis").call(vis.y1Axis)
            .attr("font-family", "Georgia")

        //                              y2 Scales and axes
        vis.svg.append("g")
            .attr("class", "y2-axis axis")
            .attr("transform", "translate(" + (vis.x("Danceable") + addSpace) + "," + (vis.margin.top) + ")");
        vis.svg.select(".y2-axis").call(vis.y1Axis)
            .attr("font-family", "Georgia")
        //                              y3 Scales and axes
        vis.svg.append("g")
            .attr("class", "y3-axis axis")
            .attr("transform", "translate(" + (vis.x("Energy") + addSpace) + "," + (vis.margin.top) + ")");
        vis.svg.select(".y3-axis").call(vis.y1Axis)
            .attr("font-family", "Georgia")
        //                              y4 Scales and axes
        vis.svg.append("g")
            .attr("class", "y4-axis axis")
            .attr("transform", "translate(" + (vis.x("Instrumental") + addSpace + (vis.width + vis.margin.left + vis.margin.right)/40 + "," + (vis.margin.top) + ")"));
        vis.svg.select(".y4-axis").call(vis.y1Axis)
            .attr("font-family", "Georgia")
        //                              y5 Scales and axes
        vis.svg.append("g")
            .attr("class", "y5-axis axis")
            .attr("transform", "translate(" + (vis.x("Lively") + addSpace + (vis.width + vis.margin.left + vis.margin.right)/35 + "," + (vis.margin.top) + ")"));
        vis.svg.select(".y5-axis").call(vis.y1Axis)
            .attr("font-family", "Georgia")
        //                              y6 Scales and axes
        vis.svg.append("g")
            .attr("class", "y6-axis axis")
            .attr("transform", "translate(" + (vis.x("Speechy") + addSpace + (vis.width + vis.margin.left + vis.margin.right)/35 + "," + (vis.margin.top) + ")"));
        vis.svg.select(".y6-axis").call(vis.y1Axis)
            .attr("font-family", "Georgia")
        //                              y7 Scales and axes
        vis.svg.append("g")
            .attr("class", "y7-axis axis")
            .attr("transform", "translate(" + (vis.x("Valence") + addSpace) + "," + (vis.margin.top) + ")");
        vis.svg.select(".y7-axis").call(vis.y1Axis)
            .attr("font-family", "Georgia")


        // ------------------------------------------------------------------------------
        //                                  Add a legend
        // ------------------------------------------------------------------------------
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
            .attr('transform', `translate(${vis.widthLegend/2}, ${4})`)
            .call(vis.legendAxis)

        vis.svgLegend.append("text")
            .text("Decade Color Code: ")
            .attr("x", '30%')
            .attr("y", '45%')
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
            .attr('height', 15)
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
        let rectWidth =  45;
        let xPos = 6.5;
        let addSpacing = 7.5;
        let barHeight = 150;

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
            .attr("width", function(d){return d*barHeight})
            .attr("height", rectWidth)
            .attr("x", function(d){return vis.x("Acoustic")})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos})

        // add decade to the text
        vis.acousticDecade = vis.acoustic.append("text")
            .attr("class", "textDecade")
            .merge(vis.acousticRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return vis.acousticness.decade[index]})
            // .attr("fill", function(d, index){
            //     if (vis.acousticness.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("x", function(d){return vis.x("Acoustic") + d*barHeight})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos + rectWidth/2})

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
            .attr("width", function(d){return d*barHeight})
            .attr("height", rectWidth)
            .attr("x", function(d){return vis.x("Danceable") + addSpacing})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos})

        // add decade to the text
        vis.danceDecade = vis.dance.append("text")
            .attr("class", "textDecade")
            .merge(vis.danceRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return vis.danceability.decade[index]})
            // .attr("fill", function(d, index){
            //     if (vis.danceability.decade[index]===1960){
            //         return 'darkgrey'
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("x", function(d){return vis.x("Danceable") + d*barHeight + addSpacing})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos + rectWidth/2})

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
            .attr("width", function(d){return d*barHeight})
            .attr("height", rectWidth)
            .attr("x", function(d){return vis.x("Energy") + addSpacing})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos})

        // add decade to the text
        vis.energyDecade = vis.energyDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.energyRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return vis.energy.decade[index]})
            // .attr("fill", function(d, index){
            //     if (vis.energy.decade[index]===1960){
            //         return 'darkgrey'
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("x", function(d){return vis.x("Energy") + d*barHeight + addSpacing})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos + rectWidth/2})
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
            .attr("width", function(d){return d*barHeight})
            .attr("height", rectWidth)
            .attr("x", function(d){return vis.x("Instrumental") + addSpacing + (vis.width + vis.margin.left + vis.margin.right)/40})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos})

        // add decade to the text
        vis.instrumentDecade = vis.instrumentDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.instrumentRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return vis.instrument.decade[index]})
            // .attr("fill", function(d, index){
            //     if (vis.instrument.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("x", function(d){return vis.x("Instrumental") + d*barHeight + addSpacing + (vis.width + vis.margin.left + vis.margin.right)/40})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos + rectWidth/2})
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
            .attr("width", function(d){return d*barHeight})
            .attr("height", rectWidth)
            .attr("x", function(d){return vis.x("Lively") + addSpacing + (vis.width + vis.margin.left + vis.margin.right)/35})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos})

        // add decade to the texts
        vis.live.append("text")
            .attr("class", "textDecade")
            .merge(vis.liveRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return vis.liveness.decade[index]})
            // .attr("fill", function(d, index){
            //     if (vis.liveness.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("x", function(d){return vis.x("Lively") + d*barHeight + addSpacing + (vis.width + vis.margin.left + vis.margin.right)/35})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos + rectWidth/2})

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
            .attr("width", function(d){return d*barHeight})
            .attr("height", rectWidth)
            .attr("x", function(d){return vis.x("Speechy") + addSpacing + (vis.width + vis.margin.left + vis.margin.right)/35})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos})

        // add decade to the text
        vis.speechDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.speechRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return vis.speech.decade[index]})
            // .attr("fill", function(d, index){
            //     if (vis.speech.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            // .attr("text-anchor", "middle")
            .attr("x", function(d){return vis.x("Speechy") + d*barHeight + addSpacing + (vis.width + vis.margin.left + vis.margin.right)/35})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos + rectWidth/2})

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
            .attr("width", function(d){return d*barHeight})
            .attr("height", rectWidth)
            .attr("x", function(d){return vis.x("Valence") + addSpacing})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos})

        // add decade to the text
        vis.valenceDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.valenceRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return vis.valence.decade[index]})
            // .attr("fill", function(d, index){
            //     if (vis.valence.decade[index]===1960){
            //         return "darkgrey"
            //     }
            // })
            //.attr("text-anchor", "end")
            .attr("x", function(d){return vis.x("Valence") + d*barHeight + addSpacing})
            .attr("y", function(d, index){return vis.margin.top + index*vis.height/xPos + rectWidth/2})

        // -------------------------------------------------------------------------------------------------------------




    }
}

