class elementData {

    constructor(parentElement, elements, charData) {
        this.parentElement = parentElement;
        this.element = elements;
        this.charData = charData;

        this.elementUpdate = ['Acoutsticness', 'Danceability', 'Energy', 'Instrumentalness','Liveness',
            'Loudness', 'Speechiness', 'Tempo', 'Valence']

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

        vis.margin = {top: 50, right: 10, bottom: 20, left: 40};

        vis.blueColors = ['#02435c', '#057096', '#1e91ba', '#4baacc', '#84cae3', '#bae5f5']
        vis.redColors = ['#f79999', '#f77474', '#f04646', '#e01212', '#9e0606', '#700202']

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
            .attr("transform", "translate(0," + (vis.margin.top) + ")");

        this.wrangleData();
    }


    /*
     * Data wrangling
     */

    wrangleData() {
        let vis = this;

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

        // ACOUSTICNESS
        let acousticSort = vis.charData.sort((a,b)=>d3.descending(a.acousticness,b.acousticness))
        console.log("acoustic sort", acousticSort)

        acousticSort.forEach(function(d, index){
            if (index===0){
                vis.acousticness = {
                    decade: [d.decade],
                    value: [d.acousticness]
                }
            }else{
                vis.acousticness["decade"].push(d.decade)
                vis.acousticness["value"].push(d.acousticness)
            }
        })
        console.log("acoutsticness: ", vis.acousticness)

        // DANCEABILITY
        let danceSort = vis.charData.sort((a,b)=>d3.descending(a.danceability,b.danceability))
        console.log("danceability sort", danceSort)

        danceSort.forEach(function(d, index){
            if (index===0){
                vis.danceability = {
                    decade: [d.decade],
                    value: [d.danceability]
                }
            }else{
                vis.danceability["decade"].push(d.decade)
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
        let energySort = vis.charData.sort((a,b)=>d3.descending(a.energy,b.energy))
        console.log("energy sort", energySort)

        energySort.forEach(function(d, index){
            if (index===0){
                vis.energy = {
                    decade: [d.decade],
                    value: [d.energy]
                }
            }else{
                vis.energy["decade"].push(d.decade)
                vis.energy["value"].push(d.energy)
            }
        })
        console.log("energy: ", vis.energy)

        // ENERGY
        let instrumentSort = vis.charData.sort((a,b)=>d3.descending(a.instrumentalness,b.instrumentalness))
        console.log("instrument sort", instrumentSort)

        instrumentSort.forEach(function(d, index){
            if (index===0){
                vis.instrument = {
                    decade: [d.decade],
                    value: [d.instrumentalness]
                }
            }else{
                vis.instrument["decade"].push(d.decade)
                vis.instrument["value"].push(d.instrumentalness)
            }
        })
        console.log("instrumentalness: ", vis.instrument)

        // LIVENESS
        let liveSort = vis.charData.sort((a,b)=>d3.descending(a.liveness,b.liveness))
        console.log("liveness sort", liveSort)

        liveSort.forEach(function(d, index){
            if (index===0){
                vis.liveness = {
                    decade: [d.decade],
                    value: [d.liveness]
                }
            }else{
                vis.liveness["decade"].push(d.decade)
                vis.liveness["value"].push(d.liveness)
            }
        })
        console.log("liveness: ", vis.liveness)

        // LOUDNESS
        let loudSort = vis.charData.sort((a,b)=>d3.descending(a.loudness,b.loudness))
        console.log("loudness sort", loudSort)

        loudSort.forEach(function(d, index){
            if (index===0){
                vis.loudness = {
                    decade: [d.decade],
                    value: [d.loudness]
                }
            }else{
                vis.loudness["decade"].push(d.decade)
                vis.loudness["value"].push(d.loudness)
            }
        })
        console.log("loudness: ", vis.loudness)

        // SPEECHINESS
        let speechSort = vis.charData.sort((a,b)=>d3.descending(a.speechiness,b.speechiness))
        console.log("speechiness sort", speechSort)

        speechSort.forEach(function(d, index){
            if (index===0){
                vis.speech = {
                    decade: [d.decade],
                    value: [d.speechiness]
                }
            }else{
                vis.speech["decade"].push(d.decade)
                vis.speech["value"].push(d.speechiness)
            }
        })
        console.log("speechiness: ", vis.speech)

        // TEMPO
        let tempoSort = vis.charData.sort((a,b)=>d3.descending(a.tempo,b.tempo))
        console.log("speechiness sort", tempoSort)

        tempoSort.forEach(function(d, index){
            if (index===0){
                vis.tempo = {
                    decade: [d.decade],
                    value: [d.tempo]
                }
            }else{
                vis.tempo["decade"].push(d.decade)
                vis.tempo["value"].push(d.tempo)
            }
        })
        console.log("tempo: ", vis.tempo)

        // VALENCE
        let valenceSort = vis.charData.sort((a,b)=>d3.descending(a.valence,b.valence))
        console.log("valence sort", valenceSort)

        valenceSort.forEach(function(d, index){
            if (index===0){
                vis.valence = {
                    decade: [d.decade],
                    value: [d.valence]
                }
            }else{
                vis.valence["decade"].push(d.decade)
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
        let decade_xPos = 2.5

        // -------------------------------------------------------------------------------------------------------------
        //                                          ACOUSTICNESS
        // -------------------------------------------------------------------------------------------------------------
        vis.acousticRow = vis.svg.selectAll(".acoustic-row")
            .data(vis.acousticness.value)
            .enter()
            .append("g")
            .attr("class", "acoustic-row")

        // add the circles
        vis.acousticElement = vis.acousticRow.append("circle")
            .attr("class", "acousticChar")
            .attr("fill", function(d, index){return vis.blueColors[index]})
            .attr("r", function(d){return d*50})
            .attr("cx", "8%")
            .attr("cy", function(d, index){return 70*(index+2)})

        // add score to the text
        vis.acousticRow.append("text")
            .attr("class", "textChar")
            .text(function(d, index) {return vis.acousticness.value[index].toFixed(3)})
            .attr("x", "7.3%")
            .attr("y", function(d, index){return 70*(index+2)})

        // add decade to the text
        vis.acousticRow.append("text")
            .attr("class", "textDecade")
            .text(function(d, index) {return (vis.acousticness.decade[index])})
            .attr("x", decade_xPos + "%")
            .attr("y", function(d, index){return 70*(index+2)})
        // -------------------------------------------------------------------------------------------------------------
        //                                          DANCEABILITY
        // -------------------------------------------------------------------------------------------------------------
        vis.danceRow = vis.svg.selectAll(".dance-row")
            .data(vis.danceability.value)
            .enter()
            .append("g")
            .attr("class", "dance-row")

        // add the circles
        vis.danceElement = vis.danceRow.append("circle")
            .attr("class", "danceChar")
            .attr("fill", function(d, index){return vis.blueColors[index]})
            .attr("r", function(d){return d*50})
            .attr("cx", "19%")
            .attr("cy", function(d, index){return 70*(index+2)})

        // add score to the text
        vis.danceRow.append("text")
            .attr("class", "textChar")
            .text(function(d, index) {return vis.danceability.value[index].toFixed(3)})
            .attr("x", "18.3%")
            .attr("y", function(d, index){return 70*(index+2)})

        // add decade to the text
        vis.danceRow.append("text")
            .attr("class", "textDecade")
            .text(function(d, index) {return (vis.danceability.decade[index])})
            .attr("x", decade_xPos + 10 + "%")
            .attr("y", function(d, index){return 70*(index+2)})
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
            .enter()
            .append("g")
            .attr("class", "energy-row")

        // add the circles
        vis.energyElement = vis.energyRow.append("circle")
            .attr("class", "energyChar")
            .attr("fill", function(d, index){return vis.blueColors[index]})
            .attr("r", function(d){return d*50})
            .attr("cx", "29%")
            .attr("cy", function(d, index){return 70*(index+2)})

        // add score to the text
        vis.energyRow.append("text")
            .attr("class", "textChar")
            .text(function(d, index) {return vis.energy.value[index].toFixed(3)})
            .attr("x", "28.3%")
            .attr("y", function(d, index){return 70*(index+2)})

        // add decade to the text
        vis.energyRow.append("text")
            .attr("class", "textDecade")
            .text(function(d, index) {return (vis.energy.decade[index])})
            .attr("x", decade_xPos + 20 + "%")
            .attr("y", function(d, index){return 70*(index+2)})
        // -------------------------------------------------------------------------------------------------------------
        //                                          INSTRUMENTALNESS
        // -------------------------------------------------------------------------------------------------------------
        vis.instrumentRow = vis.svg.selectAll(".instrument-row")
            .data(vis.instrument.value)
            .enter()
            .append("g")
            .attr("class", "instrument-row")

        // add the circles
        vis.instrumentElement = vis.instrumentRow.append("circle")
            .attr("class", "instrumentChar")
            .attr("fill", function(d, index){return vis.blueColors[index]})
            .attr("r", function(d){return d*50})
            .attr("cx", "39%")
            .attr("cy", function(d, index){return 70*(index+2)})

        // add score to the text
        vis.instrumentRow.append("text")
            .attr("class", "textChar")
            .text(function(d, index) {return vis.instrument.value[index].toFixed(3)})
            .attr("x", "38.3%")
            .attr("y", function(d, index){return 70*(index+2)})

        // add decade to the text
        vis.instrumentRow.append("text")
            .attr("class", "textDecade")
            .text(function(d, index) {return (vis.instrument.decade[index])})
            .attr("x", decade_xPos + 30 + "%")
            .attr("y", function(d, index){return 70*(index+2)})
        // -------------------------------------------------------------------------------------------------------------
        //                                          LIVENESS
        // -------------------------------------------------------------------------------------------------------------
        vis.liveRow = vis.svg.selectAll(".liveness-row")
            .data(vis.liveness.value)
            .enter()
            .append("g")
            .attr("class", "liveness-row")

        // add the circles
        vis.liveElement = vis.liveRow.append("circle")
            .attr("class", "liveChar")
            .attr("fill", function(d, index){return vis.blueColors[index]})
            .attr("r", function(d){return d*50})
            .attr("cx", "49%")
            .attr("cy", function(d, index){return 70*(index+2)})

        // add score to the text
        vis.liveRow.append("text")
            .attr("class", "textChar")
            .text(function(d, index) {return vis.liveness.value[index].toFixed(3)})
            .attr("x", "48.3%")
            .attr("y", function(d, index){return 70*(index+2)})

        // add decade to the text
        vis.liveRow.append("text")
            .attr("class", "textDecade")
            .text(function(d, index) {return (vis.liveness.decade[index])})
            .attr("x", decade_xPos + 40 + "%")
            .attr("y", function(d, index){return 70*(index+2)})
        // -------------------------------------------------------------------------------------------------------------
        //                                          LOUDNESS
        // -------------------------------------------------------------------------------------------------------------
        vis.loudRow = vis.svg.selectAll(".loudness-row")
            .data(vis.loudness.value)
            .enter()
            .append("g")
            .attr("class", "loudness-row")

        // add the circles
        vis.loudElement = vis.loudRow.append("circle")
            .attr("class", "liveChar")
            .attr("fill", function(d, index){return vis.redColors[index]})
            .attr("r", function(d){return Math.abs(d)*2})
            .attr("cx", "59%")
            .attr("cy", function(d, index){return 70*(index+2)})

        // add score to the text
        vis.loudRow.append("text")
            .attr("class", "textChar")
            .text(function(d, index) {return vis.loudness.value[index].toFixed(2)})
            .attr("x", "58.3%")
            .attr("y", function(d, index){return 70*(index+2)})

        // add decade to the text
        vis.loudRow.append("text")
            .attr("class", "textDecade")
            .text(function(d, index) {return (vis.loudness.decade[index])})
            .attr("x", decade_xPos + 50 + "%")
            .attr("y", function(d, index){return 70*(index+2)})
        // -------------------------------------------------------------------------------------------------------------
        //                                          SPEECHINESS
        // -------------------------------------------------------------------------------------------------------------
        vis.speechRow = vis.svg.selectAll(".speech-row")
            .data(vis.speech.value)
            .enter()
            .append("g")
            .attr("class", "speech-row")

        // add the circles
        vis.speechElement = vis.speechRow.append("circle")
            .attr("class", "speechChar")
            .attr("fill", function(d, index){return vis.blueColors[index]})
            .attr("r", function(d){return d*50})
            .attr("cx", "69%")
            .attr("cy", function(d, index){return 70*(index+2)})

        // add score to the text
        vis.speechRow.append("text")
            .attr("class", "textChar")
            .text(function(d, index) {return vis.speech.value[index].toFixed(3)})
            .attr("x", "68.3%")
            .attr("y", function(d, index){return 70*(index+2)})

        // add decade to the text
        vis.speechRow.append("text")
            .attr("class", "textDecade")
            .text(function(d, index) {return (vis.speech.decade[index])})
            .attr("x", decade_xPos + 60 + "%")
            .attr("y", function(d, index){return 70*(index+2)})
        // -------------------------------------------------------------------------------------------------------------
        //                                          TEMPO
        // -------------------------------------------------------------------------------------------------------------
        vis.tempoRow = vis.svg.selectAll(".tempo-row")
            .data(vis.tempo.value)
            .enter()
            .append("g")
            .attr("class", "tempo-row")

        // add the circles
        vis.tempoElement = vis.tempoRow.append("circle")
            .attr("class", "tempoChar")
            .attr("fill", function(d, index){return vis.blueColors[index]})
            .attr("r", function(d){return d/10})
            .attr("cx", "79%")
            .attr("cy", function(d, index){return 70*(index+2)})

        // add score to the text
        vis.tempoRow.append("text")
            .attr("class", "textChar")
            .text(function(d, index) {return vis.tempo.value[index].toFixed(1)})
            .attr("x", "78.3%")
            .attr("y", function(d, index){return 70*(index+2)})

        // add decade to the text
        vis.tempoRow.append("text")
            .attr("class", "textDecade")
            .text(function(d, index) {return (vis.tempo.decade[index])})
            .attr("x", decade_xPos + 70 + "%")
            .attr("y", function(d, index){return 70*(index+2)})
        // -------------------------------------------------------------------------------------------------------------
        //                                          VALENCE
        // -------------------------------------------------------------------------------------------------------------
        vis.valenceRow = vis.svg.selectAll(".valence-row")
            .data(vis.valence.value)
            .enter()
            .append("g")
            .attr("class", "valence-row")

        // add the circles
        vis.tempoElement = vis.valenceRow.append("circle")
            .attr("class", "valenceChar")
            .attr("fill", function(d, index){return vis.blueColors[index]})
            .attr("r", function(d){return d*50})
            .attr("cx", "89%")
            .attr("cy", function(d, index){return 70*(index+2)})

        // add score to the text
        vis.valenceRow.append("text")
            .attr("class", "textChar")
            .text(function(d, index) {return vis.valence.value[index].toFixed(3)})
            .attr("x", "88.3%")
            .attr("y", function(d, index){return 70*(index+2)})

        // add decade to the text
        vis.valenceRow.append("text")
            .attr("class", "textDecade")
            .text(function(d, index) {return (vis.valence.decade[index])})
            .attr("fill", function(d, index){return vis.blueColors[index]})
            .attr("x", decade_xPos + 80 + "%")
            .attr("y", function(d, index){return 70*(index+2)})



        // -------------------------------------------------------------------------------------------------------------
        // update the x-axis
        vis.svg.select(".x-axis").call(vis.xAxis)
            .selectAll("text")
            .text(function(d, index){
                return vis.elementUpdate[index];
            })
            .style("text-anchor", "start")
            .attr("dx", "2em")
            .attr("dy", "0em")
            .attr("transform", function (d) {
                return "rotate(-20)"
            });



    }
}


