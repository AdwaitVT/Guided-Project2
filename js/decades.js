class ArtistData {

    constructor(parentElement, decade) {
        this.parentElement = parentElement;
        this.decade = decade;

        this.displayData = [];

        this.initVis();
    }


    /*
     * Initialize visualization (static content; e.g. SVG area, axes, brush component)
     */

    initVis() {
        let vis = this;

        vis.margin = {top: 50, right: 10, bottom: 20, left: 60};

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

        vis.dispDecade = vis.svg.append("text")
            .attr("class", "textDisp")
            .text("Top 3 artists of ")
            .attr("x", 0)
            .attr("y", 0);

        vis.artist1 = vis.svg.append("text")
            .attr("class", "dispArtist")
            .text("artist 1")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")")
        vis.artist2 = vis.svg.append("text")
            .attr("class", "dispArtist")
            .text("artist 2")
            .attr("transform", "translate(" + vis.margin.left*7 + "," + vis.margin.top + ")")
        vis.artist3 = vis.svg.append("text")
            .attr("class", "dispArtist")
            .text("artist 3")
            .attr("transform", "translate(" + vis.margin.left*13 + "," + vis.margin.top + ")")


        // (Filter, aggregate, modify data)
        this.wrangleData();
    }


    /*
     * Data wrangling
     */

    wrangleData() {
        let vis = this;

        vis.displayData = vis.decade;

        console.log(vis.displayData)

        // Update the visualization
        vis.updateVis();
    }



    /*
     * The drawing function
     */

    updateVis(selectedButton) {
        let vis = this;

        if (selectedButton === undefined){
            selectedButton = "..."
        }

        console.log(selectedButton)
        // vis.decadeData = vis.svg.selectAll(".decade-year")
        //     .data(vis.decade)

        vis.dispDecade.text("Top 3 artists of " + selectedButton)
        // vis.dispDecade = vis.svg.append("text")
        //     .attr("class", "label text")
        //     .text(selectedButton)
        //     .attr("x", vis.margin.left)
        //     .attr("y", 0)
        //     .attr('text-anchor', 'end')
        //     .attr("fill", "black")
        //     //.attr("transform", "translate(" + vis.margin.left*1.8 + "," + vis.margin.top*4.55 + ")")

        // vis.svg.merge(vis.dispDecade)  // merge ENTER + UPDATE groups
        //     .style('opacity', 0.5)
        //     .transition()
        //     .duration(500)
        //     .style('opacity', 1)
        //     // .attr("transform", function (d, index) {
            //     return "translate(0," + (vis.cellHeight + vis.cellPadding) * index + ")";
            // });

        //vis.dispDecade.remove().exit()


        // vis.svg.append("text")
        //     .text(vis.decade)
        //     .attr("x", 50)
        //     .attr("y", 50)


    }
}


