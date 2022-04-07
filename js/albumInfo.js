class AlbumInfo{

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 40, bottom: 20, left: 40};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.albumName = vis.svg.append('g')
            .attr("class", "album-name");

        vis.albumName.append('rect')
            .attr("x", 0)
            .attr("y", 10)
            .attr("width", vis.width - vis.margin.right)
            .attr("height", 70)
            .attr("fill", "white")
            .attr("stroke", "black")

        //placeholder
        vis.albumName.append("text")
            .attr("x", 5)
            .attr("y", 45)
            .text("album name and info");

        vis.releaseYear = vis.svg.append('g')
            .attr("class", "release-year");

        vis.releaseYear.append('rect')
            .attr("x", 0)
            .attr("y", 70)
            .attr("width", (vis.width - vis.margin.right)/2)
            .attr("height", vis.height - 100)
            .attr("fill", "white")
            .attr("stroke", "black");

        //placeholder
        vis.releaseYear.append("text")
            .attr("x", 5)
            .attr("y", 150)
            .text("vis about album release year");


        vis.chartYear = vis.svg.append('g')
            .attr("class", "chart-year");

        vis.chartYear.append('rect')
            .attr("x", (vis.width - vis.margin.right)/2)
            .attr("y", 70)
            .attr("width", (vis.width - vis.margin.right)/2)
            .attr("height", vis.height - 100)
            .attr("fill", "white")
            .attr("stroke", "black");

        //placeholder
        vis.chartYear.append("text")
            .attr("x", 525)
            .attr("y", 150)
            .text("vis about album chart year");



        vis.wrangleData();
    }

    wrangleData(){
        let vis = this;


        this.updateVis();

    }

    updateVis(){
        let vis = this;


    }
}