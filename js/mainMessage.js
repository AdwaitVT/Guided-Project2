class elementData {

    constructor(parentElement, elements, charData) {
        this.parentElement = parentElement;
        this.element = elements;
        this.charData = charData;

        this.elementUpdate = ['Acoustic', 'Danceable', 'Energy', 'Instrumental','Lively',
            'Loud', 'Speechy', 'Tempo', 'Valence']

        this.highLow = ['Most', 'Least']

        this.chars = ['acousticness', 'danceability', 'duration_ms', 'energy', 'instrumentalness','liveness',
            'loudness', 'speechiness', 'tempo', 'valence']

        this.displayData = [];

        this.initVis();
    }


    /*
     * Initialize visualization (static content; e.g. SVG area, axes, brush component)
     */

    initVis() {
        let vis = this;

        vis.margin = {top: 50, right: 10, bottom: 10, left: 40};

        vis.blueColors = ['#02435c', '#1e91ba', '#84cae3', '#bae5f5'] //['#02435c', '#057096', '#1e91ba', '#4baacc', '#84cae3', '#bae5f5']
        vis.redColors = ['#f79999', '#f04646', '#9e0606', '#700202'] //['#f79999', '#f77474', '#f04646', '#e01212', '#9e0606', '#700202']

        // TODO: #9 - Change hardcoded width to reference the width of the parent element
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // Scales and axes
        vis.x = d3.scaleBand()
            .rangeRound([0, vis.width])
            .paddingInner(0.2)
            .domain(d3.range(0, vis.element.length));


        vis.xAxis = d3.axisBottom()
            .scale(vis.x)

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + (0) + ")");

        // add tool-tip
        vis.toolTip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .attr("id", "artistTooltip")

        // Add a legend
        // define scale
        vis.legendScale = d3.scaleBand()
            .domain(['1960', '1970', '1980', '1990', '2000', '2010'])
            .range([0, 255])

        // define axis
        vis.legendAxis = d3.axisLeft()
            .scale(vis.legendScale)
            .ticks(6)

        vis.legend = vis.svg.append("g")
            .attr('class', 'legend')
            .attr('transform', `translate(${0}, ${vis.margin.top})`)
            .call(vis.legendAxis)

        vis.legend.selectAll('.bar')
            .data(vis.charData)
            .enter()
            .append("rect")
            .attr("x", 2)
            .attr('y', (d,i)=> i*42.5)
            .attr("width", 37.5)
            .attr('height', 210/5)
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
        console.log(leastMostVal)

        vis.acousticness = {};
        vis.danceability = {};
        vis.duration = {};
        vis.energy = {};
        vis.instrument = {};
        vis.liveness = {};
        vis.loudness = {};
        vis.speech = {};
        vis.tempo = {};
        vis.valence = {};

        let tempData = vis.charData

        // ACOUSTICNESS
        let acousticSort = tempData.sort((a,b)=>d3.descending(a.acousticness,b.acousticness))

        if (leastMostVal === "most"){
            //console.log("entered here")
            acousticSort = acousticSort.slice(0,2)
        }else{
            //console.log("what about here?")
            acousticSort = acousticSort.reverse()
            acousticSort = acousticSort.slice(0,2)
        }


        console.log("acoustic sort", acousticSort)
        //console.log("post charData", vis.charData)

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
        console.log("acoutsticness: ", vis.acousticness)

        // DANCEABILITY
        let danceSort = tempData.sort((a,b)=>d3.descending(a.danceability,b.danceability))
        console.log("danceability sort", danceSort)

        if (leastMostVal === "most"){
            //console.log("entered here")
            danceSort = danceSort.slice(0,2)
        }else{
            //console.log("what about here?")
            danceSort = danceSort.reverse()
            danceSort = danceSort.slice(0,2)
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
        console.log("danceability: ", vis.danceability)

        // DURATION
        // let timeSort = vis.charData.sort((a,b)=>d3.descending(a.duration_ms,b.duration_ms))
        // console.log("duration sort", timeSort)
        //
        // timeSort.forEach(function(d, index){
        //     if (index===0){
        //         vis.duration = {
        //             decade: [d.decade],
        //             value: [d.duration_ms]
        //         }
        //     }else{
        //         vis.duration["decade"].push(d.decade)
        //         vis.duration["value"].push(d.duration_ms)
        //     }
        // })
        // console.log("duration_ms: ", vis.duration)

        // ENERGY
        let energySort = tempData.sort((a,b)=>d3.descending(a.energy,b.energy))
        console.log("energy sort", energySort)

        if (leastMostVal === "most"){
            //console.log("entered here")
            energySort = energySort.slice(0,2)
        }else{
            //console.log("what about here?")
            energySort = energySort.reverse()
            energySort = energySort.slice(0,2)
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

        console.log("energy: ", vis.energy)

        // INSTRUMENTALNESS
        let instrumentSort = tempData.sort((a,b)=>d3.descending(a.instrumentalness,b.instrumentalness))
        console.log("instrument sort", instrumentSort)

        if (leastMostVal === "most"){
            //console.log("entered here")
            instrumentSort = instrumentSort.slice(0,2)
        }else{
            //console.log("what about here?")
            instrumentSort = instrumentSort.reverse()
            instrumentSort = instrumentSort.slice(0,2)
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
        console.log("instrumentalness: ", vis.instrument)

        // LIVENESS
        let liveSort = tempData.sort((a,b)=>d3.descending(a.liveness,b.liveness))
        console.log("liveness sort", liveSort)

        if (leastMostVal === "most"){
            //console.log("entered here")
            liveSort = liveSort.slice(0,2)
        }else{
            //console.log("what about here?")
            liveSort = liveSort.reverse()
            liveSort = liveSort.slice(0,2)
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
        console.log("liveness: ", vis.liveness)

        // LOUDNESS
        let loudSort = tempData.sort((a,b)=>d3.descending(a.loudness,b.loudness))
        console.log("loudness sort", loudSort)

        if (leastMostVal === "most"){
            //console.log("entered here")
            loudSort = loudSort.slice(0,2)
        }else{
            //console.log("what about here?")
            loudSort = loudSort.reverse()
            loudSort = loudSort.slice(0,2)
        }

        loudSort.forEach(function(d, index){
            if (index===0){
                vis.loudness = {
                    decade: [d.decade],
                    color: [d.color],
                    value: [d.loudness]
                }
            }else{
                vis.loudness["decade"].push(d.decade)
                vis.loudness["color"].push(d.color)
                vis.loudness["value"].push(d.loudness)
            }
        })
        console.log("loudness: ", vis.loudness)

        // SPEECHINESS
        let speechSort = tempData.sort((a,b)=>d3.descending(a.speechiness,b.speechiness))
        console.log("speechiness sort", speechSort)

        if (leastMostVal === "most"){
            //console.log("entered here")
            speechSort = speechSort.slice(0,2)
        }else{
            //console.log("what about here?")
            speechSort = speechSort.reverse()
            speechSort = speechSort.slice(0,2)
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
        console.log("speechiness: ", vis.speech)

        // TEMPO
        let tempoSort = tempData.sort((a,b)=>d3.descending(a.tempo,b.tempo))
        console.log("tempo sort", tempoSort)

        if (leastMostVal === "most"){
            //console.log("entered here")
            tempoSort = tempoSort.slice(0,2)
        }else{
            //console.log("what about here?")
            tempoSort = tempoSort.reverse()
            tempoSort = tempoSort.slice(0,2)
        }

        tempoSort.forEach(function(d, index){
            if (index===0){
                vis.tempo = {
                    decade: [d.decade],
                    color: [d.color],
                    value: [d.tempo]
                }
            }else{
                vis.tempo["decade"].push(d.decade)
                vis.tempo["color"].push(d.color)
                vis.tempo["value"].push(d.tempo)
            }
        })
        console.log("tempo: ", vis.tempo)

        // VALENCE
        let valenceSort = tempData.sort((a,b)=>d3.descending(a.valence,b.valence))
        console.log("valence sort", valenceSort)

        if (leastMostVal === "most"){
            //console.log("entered here")
            valenceSort = valenceSort.slice(0,2)
        }else{
            //console.log("what about here?")
            valenceSort = valenceSort.reverse()
            valenceSort = valenceSort.slice(0,2)
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
        console.log("valence: ", vis.valence)


        vis.updateVis();
    }



    /*
     * The drawing function
     */

    updateVis() {
        let vis = this;
        let circleRad =  vis.width/30
        let decade_xPos = circleRad*1.75
        let circle_xPos = decade_xPos +  circleRad
        let yPos = (vis.height - vis.margin.top - vis.margin.bottom)/1.75
        let adjIdx = .6

        let xPos = (vis.margin.width - vis.margin.left - vis.margin.right) /4

        // -------------------------------------------------------------------------------------------------------------
        //                                          ACOUSTICNESS
        // -------------------------------------------------------------------------------------------------------------
        vis.acousticRow = vis.svg.selectAll(".acoustic-row")
            .data(vis.acousticness.value)

        vis.acoustic = vis.acousticRow.enter()
            .append("g")
            .attr("class", "acoustic-row")

        // add the circles
        vis.acousticElement = vis.acoustic.append("circle")
            .attr("class", "acousticChar")
            .merge(vis.acousticRow.select(".acousticChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.acousticness.color[index]})
            .attr("r", function(d){return circleRad})
            .attr("cx", circle_xPos)
            .attr("cy", function(d, index){return yPos*(index+adjIdx)})

        // add decade to the text
        vis.acousticDecade = vis.acoustic.append("text")
            .attr("class", "textDecade")
            .merge(vis.acousticRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return (vis.acousticness.decade[index])})
            .attr("fill", function(d, index){
                if (vis.acousticness.decade[index]===1960){
                    return "darkgrey"
                }
            })
            .attr("text-anchor", "middle")
            .attr("dx", circle_xPos)
            .attr("dy", function(d, index){return yPos*(index+adjIdx) + 5})

        // vis.acoustic.merge(vis.acousticRow)
        //     .style("opacity", 0.5)
        //     .transition()
        //     .duration(500)
        //     .style("opacity", 1)

        // -------------------------------------------------------------------------------------------------------------
        //                                          DANCEABILITY
        // -------------------------------------------------------------------------------------------------------------
        vis.danceRow = vis.svg.selectAll(".dance-row")
            .data(vis.danceability.value)

        vis.dance = vis.danceRow.enter()
            .append("g")
            .attr("class", "dance-row")

        // add the circles
        vis.danceElement = vis.dance.append("circle")
            .attr("class", "danceChar")
            .merge(vis.danceRow.select(".danceChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.danceability.color[index]})
            .attr("r", function(d){return circleRad})
            .attr("cx", circle_xPos*2.15)
            .attr("cy", function(d, index){return yPos*(index+adjIdx)})

        // add decade to the text
        vis.danceDecade = vis.dance.append("text")
            .attr("class", "textDecade")
            .merge(vis.danceRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return (vis.danceability.decade[index])})
            .attr("fill", function(d, index){
                if (vis.danceability.decade[index]===1960){
                    return 'darkgrey'
                }
            })
            .attr("text-anchor", "middle")
            .attr("dx", circle_xPos*2.15)
            .attr("dy", function(d, index){return yPos*(index+adjIdx) + 5})
        // -------------------------------------------------------------------------------------------------------------
        //                                          DURATION
        // -------------------------------------------------------------------------------------------------------------
        // vis.timeRow = vis.svg.selectAll(".time-row")
        //     .data(vis.duration.value)
        //     .enter()
        //     .append("g")
        //     .attr("class", "time-row")
        //
        // // add the circles
        // vis.timeElement = vis.timeRow.append("circle")
        //     .attr("class", "timeChar")
        //     .attr("fill", function(d, index){return vis.blueColors[index]})
        //     .attr("r", function(d){return d/10000})
        //     .attr("cx", "26%")
        //     .attr("cy", function(d, index){return 70*(index+2)})
        //
        // // add score to the text
        // vis.timeRow.append("text")
        //     .attr("class", "textChar")
        //     .text(function(d, index) {return vis.duration.value[index].toFixed(1)})
        //     .attr("x", "25.3%")
        //     .attr("y", function(d, index){return 70*(index+2)})
        //
        // // add decade to the text
        // vis.timeRow.append("text")
        //     .attr("class", "textDecade")
        //     .text(function(d, index) {return (vis.duration.decade[index])})
        //     .attr("x", "22%")
        //     .attr("y", function(d, index){return 70*(index+2)})
        // -------------------------------------------------------------------------------------------------------------
        //                                          ENERGY
        // -------------------------------------------------------------------------------------------------------------
        vis.energyRow = vis.svg.selectAll(".energy-row")
            .data(vis.energy.value)

        vis.energyDisp = vis.energyRow.enter()
            .append("g")
            .attr("class", "energy-row")

        // add the circles
        vis.energyElement = vis.energyDisp.append("circle")
            .attr("class", "energyChar")
            .merge(vis.energyRow.select(".energyChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.energy.color[index]})
            .attr("r", function(d){return circleRad})
            .attr("cx", circle_xPos*3.25)
            .attr("cy", function(d, index){return yPos*(index+adjIdx)})

        // add decade to the text
        vis.energyDecade = vis.energyDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.energyRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return (vis.energy.decade[index])})
            .attr("fill", function(d, index){
                if (vis.energy.decade[index]===1960){
                    return 'darkgrey'
                }
            })
            .attr("text-anchor", "middle")
            .attr("dx", circle_xPos*3.25)
            .attr("dy", function(d, index){return yPos*(index+adjIdx) + 5})
        // -------------------------------------------------------------------------------------------------------------
        //                                          INSTRUMENTALNESS
        // -------------------------------------------------------------------------------------------------------------
        vis.instrumentRow = vis.svg.selectAll(".instrument-row")
            .data(vis.instrument.value)

        vis.instrumentDisp = vis.instrumentRow.enter()
            .append("g")
            .attr("class", "instrument-row")

        // add the circles
        vis.instrumentElement = vis.instrumentDisp.append("circle")
            .attr("class", "instrumentChar")
            .merge(vis.instrumentRow.select(".instrumentChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.instrument.color[index]})
            .attr("r", function(d){return circleRad})
            .attr("cx", circle_xPos*4.4)
            .attr("cy", function(d, index){return yPos*(index+adjIdx)})

        // add decade to the text
        vis.instrumentDecade = vis.instrumentDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.instrumentRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return (vis.instrument.decade[index])})
            .attr("fill", function(d, index){
                if (vis.instrument.decade[index]===1960){
                    return "darkgrey"
                }
            })
            .attr("text-anchor", "middle")
            .attr("dx", circle_xPos*4.4)
            .attr("dy", function(d, index){return yPos*(index+adjIdx) + 5})
        // -------------------------------------------------------------------------------------------------------------
        //                                          LIVENESS
        // -------------------------------------------------------------------------------------------------------------
        vis.liveRow = vis.svg.selectAll(".liveness-row")
            .data(vis.liveness.value)

        vis.live = vis.liveRow.enter()
            .append("g")
            .attr("class", "liveness-row")

        // add the circles
        vis.liveElement = vis.live.append("circle")
            .attr("class", "liveChar")
            .merge(vis.liveRow.select(".liveChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.liveness.color[index]})
            .attr("r", function(d){return circleRad})
            .attr("cx", circle_xPos*5.5)
            .attr("cy", function(d, index){return yPos*(index+adjIdx)})

        // add decade to the text
        vis.live.append("text")
            .attr("class", "textDecade")
            .merge(vis.liveRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return (vis.liveness.decade[index])})
            .attr("fill", function(d, index){
                if (vis.liveness.decade[index]===1960){
                    return "darkgrey"
                }
            })
            .attr("text-anchor", "middle")
            .attr("dx", circle_xPos*5.5)
            .attr("dy", function(d, index){return yPos*(index+adjIdx) + 5})
        // -------------------------------------------------------------------------------------------------------------
        //                                          LOUDNESS
        // -------------------------------------------------------------------------------------------------------------
        vis.loudRow = vis.svg.selectAll(".loudness-row")
            .data(vis.loudness.value)

        vis.loud = vis.loudRow.enter()
            .append("g")
            .attr("class", "loudness-row")

        // add the circles
        vis.loudElement = vis.loud.append("circle")
            .attr("class", "loudChar")
            .merge(vis.loudRow.select(".loudChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.loudness.color[index]})
            .attr("r", function(d){return circleRad}) // Math.abs(d)*2})
            .attr("cx", circle_xPos*6.6)
            .attr("cy", function(d, index){return yPos*(index+adjIdx)})

        // add decade to the text
        vis.loud.append("text")
            .attr("class", "textDecade")
            .merge(vis.loudRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return (vis.loudness.decade[index])})
            .attr("fill", function(d, index){
                if (vis.loudness.decade[index]===1960){
                    return "darkgrey"
                }
            })
            .attr("text-anchor", "middle")
            .attr("dx", circle_xPos*6.6)
            .attr("dy", function(d, index){return yPos*(index+adjIdx) + 5})
        // -------------------------------------------------------------------------------------------------------------
        //                                          SPEECHINESS
        // -------------------------------------------------------------------------------------------------------------
        vis.speechRow = vis.svg.selectAll(".speech-row")
            .data(vis.speech.value)

        vis.speechDisp = vis.speechRow.enter()
            .append("g")
            .attr("class", "speech-row")

        // add the circles
        vis.speechElement = vis.speechDisp.append("circle")
            .attr("class", "speechChar")
            .merge(vis.speechRow.select(".speechChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.speech.color[index]})
            .attr("r", function(d){return circleRad})
            .attr("cx", circle_xPos*7.7)
            .attr("cy", function(d, index){return yPos*(index+adjIdx)})

        // add decade to the text
        vis.speechDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.speechRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return (vis.speech.decade[index])})
            .attr("fill", function(d, index){
                if (vis.speech.decade[index]===1960){
                    return "darkgrey"
                }
            })
            .attr("text-anchor", "middle")
            .attr("dx", circle_xPos*7.7)
            .attr("dy", function(d, index){return yPos*(index+adjIdx) + 5})
        // -------------------------------------------------------------------------------------------------------------
        //                                          TEMPO
        // -------------------------------------------------------------------------------------------------------------
        vis.tempoRow = vis.svg.selectAll(".tempo-row")
            .data(vis.tempo.value)

        vis.tempoDisp = vis.tempoRow.enter()
            .append("g")
            .attr("class", "tempo-row")

        // add the circles
        vis.tempoElement = vis.tempoDisp.append("circle")
            .attr("class", "tempoChar")
            .merge(vis.tempoRow.select(".tempoChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.tempo.color[index]})
            .attr("r", function(d){return circleRad}) //d/10})
            .attr("cx", circle_xPos*8.8)
            .attr("cy", function(d, index){return yPos*(index+adjIdx)})

        // add decade to the text
        vis.tempoDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.tempoRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return (vis.tempo.decade[index])})
            .attr("fill", function(d, index){
                if (vis.tempo.decade[index]===1960){
                    return "darkgrey"
                }
            })
            .attr("text-anchor", "middle")
            .attr("dx", circle_xPos*8.8)
            .attr("dy", function(d, index){return yPos*(index+adjIdx) + 5})
        // -------------------------------------------------------------------------------------------------------------
        //                                          VALENCE
        // -------------------------------------------------------------------------------------------------------------
        vis.valenceRow = vis.svg.selectAll(".valence-row")
            .data(vis.valence.value)

        vis.valenceDisp = vis.valenceRow.enter()
            .append("g")
            .attr("class", "valence-row")

        // add the circles
        vis.valenceElement = vis.valenceDisp.append("circle")
            .attr("class", "valenceChar")
            .merge(vis.valenceRow.select(".valenceChar"))
            .transition()
            .duration(1000)
            .attr("fill", function(d, index){return  vis.valence.color[index]})
            .attr("r", function(d){return circleRad})
            .attr("cx", circle_xPos*9.9)
            .attr("cy", function(d, index){return yPos*(index+adjIdx)})

        // add decade to the text
        vis.valenceDisp.append("text")
            .attr("class", "textDecade")
            .merge(vis.valenceRow.select(".textDecade"))
            .transition()
            .duration(1000)
            .text(function(d, index) {return (vis.valence.decade[index])})
            .attr("fill", function(d, index){
                if (vis.valence.decade[index]===1960){
                    return "darkgrey"
                }
            })
            .attr("text-anchor", "middle")
            .attr("dx", circle_xPos*9.9)
            .attr("dy", function(d, index){return yPos*(index+adjIdx) + 5})



        // -------------------------------------------------------------------------------------------------------------
        // update the x-axis
        let numDec = 3

        vis.axislabels = vis.svg.select(".x-axis").call(vis.xAxis)
            .selectAll("text")
            .text(function(d, index){
                return vis.elementUpdate[index];
            })
            .style("text-anchor", "start")
            .attr("dx", "2.5%")
            .attr("dy", "-2%")
            .attr("transform", function (d) {
                return "rotate(-10)"
            });

        vis.axislabels.on('mouseover', function(event, d, index){
            vis.toolTip
                .style("opacity", 1)
                .style("left", event.pageX + 20 + "px")
                .style("top", event.pageY + "px")
                .html(`
                         <div class="char-defs" style="border: thin solid black; border-radius: 5px; background: lightgrey; padding: 10px; margin-left: 10px">
                            <p style="font-size: 15px">
                                <b>Acoustic</b>: confidence the track is acoustic <br>
                                <b>Danceable</b>: how suitable a track is for dancing <br>
                                <b>Energy</b>: measure of intensity & activity (i.e. feels fast, loud, and noisy) <br>
                                <b>Instrumental</b>: track contains vocals versus no vocals <br>
                                <b>Lively</b>: presence of an audience in the recording <br>
                                <b>Loud</b>: volume in decibels  <br>
                                <b>Speechy</b>: presence of spoken words <br>
                                <b>Tempo</b>: estimated speed in beats per minute  <br>
                                <b>Valence</b>: measure of musical positiveness (i.e. happy / cheerful vs. sad / depressed)
                            </p>
                        </div>`)
            d3.select(this).attr("fill", "red")
        })

        vis.axislabels.on('mouseout', function(event, d){
            vis.toolTip
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0)
                .html(``);
            d3.select(this).attr("fill", "black")
        })



    }
}

