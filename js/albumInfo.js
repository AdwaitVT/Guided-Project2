class AlbumInfo{

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];



        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.attributes = ["acousticness","danceability","energy","instrumentalness","liveness","speechiness","valence"];
        vis.sortBy = "release_date";
        vis.decade = 1960;

        vis.margin = {top: 10, right: 0, bottom: 10, left: 0};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = 50;//document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr('transform', `translate (${vis.margin.left}, 0)`);

        vis.albumInfo = vis.svg.append('g')
            .attr("class", "albumInfo");

        vis.releaseYear = vis.svg.append('g')
            .attr("class", "release-year");

        vis.chartYear = vis.svg.append('g')
            .attr("class", "chart-year");




        vis.wrangleData();
    }

    wrangleData(){
        let vis = this;

        d3.select("#selectSortButton").on("change", function(){
            vis.sortBy = this.value;
            vis.wrangleData();
            releaseYear.wrangleData();
            chartYear.wrangleData();
        });
        d3.select("#selectDecadeButton").on("change", function(){
            vis.decade = this.value;
            vis.wrangleData();
            releaseYear.wrangleData();
            chartYear.wrangleData();
        });

        vis.displayData = [];

        vis.data.forEach(d => {
            let val = d[vis.sortBy];
            if(parseInt(parseInt(val)/10) * 10 === parseInt(vis.decade)) {
                vis.displayData.push(d);
            }
        })

        vis.updateVis();

    }

    updateVis(){
        let vis = this;

        //initial value
        vis.selectedAlbum = vis.displayData[0];
        vis.releaseYear.selectAll("text").remove();
        vis.chartYear.selectAll("text").remove();
        vis.albumInfo.selectAll("text").remove();
        d3.select("#selectAlbumButton")
            .selectAll('option').remove();

        vis.albumSelect = d3.select("#selectAlbumButton")
            .selectAll('option')
            .data(vis.displayData)

        vis.albumSelect.enter()
            .append('option')
            .merge(vis.albumSelect)
            .attr("value", function (d) { return d.album; })
            .text(function (d) { return d.album + " - " + d.artist; });


        d3.select("#selectAlbumButton").on("change", function(){
            let selection = this.value;
            vis.selectedAlbum  = vis.displayData.find(item => item.album === selection);
            vis.releaseYear.selectAll("text").remove();
            vis.chartYear.selectAll("text").remove();
            vis.albumInfo.selectAll("text").remove();
            vis.albumInfo.append("text")
                .attr("x", 0)
                .attr("y", 30)
                .text(`Acousticness: ${vis.selectedAlbum.acousticness}\n
                        Danceability: ${vis.selectedAlbum.danceability}\n
                        Instrumentalness: ${vis.selectedAlbum.instrumentalness}\n
                        Liveness: ${vis.selectedAlbum.liveness}\n
                        Speechiness: ${vis.selectedAlbum.speechiness}\n
                        Valence: ${vis.selectedAlbum.valence}\n
                        `);
            vis.releaseYear.append("text")
                .attr("x", 0)
                .attr("y", 50)
                .text(`Released in: ${vis.selectedAlbum.release_date}`);
            vis.chartYear.append("text")
                .attr("x", vis.width/2)
                .attr("y", 50)
                .text(`Charted in: ${vis.selectedAlbum.chart_date}`);

            releaseYear.wrangleData();
            chartYear.wrangleData();
        })
        try{
            vis.releaseYear.append("text")
                .attr("x", 0)
                .attr("y", 50)
                .text(`Released in: ${vis.selectedAlbum.release_date}`);

            vis.chartYear.append("text")
                .attr("x", vis.width/2)
                .attr("y", 50)
                .text(`Charted in: ${vis.selectedAlbum.chart_date}`);

            vis.albumInfo.append("text")
                .attr("x", 0)
                .attr("y", 30)
                .text(`Acousticness: ${vis.selectedAlbum.acousticness}\n
                        Danceability: ${vis.selectedAlbum.danceability}\n
                        Instrumentalness: ${vis.selectedAlbum.instrumentalness}\n
                        Liveness: ${vis.selectedAlbum.liveness}\n
                        Speechiness: ${vis.selectedAlbum.speechiness}\n
                        Valence: ${vis.selectedAlbum.valence}\n
                        `);

        }
        catch{
            vis.releaseYear.selectAll("text").remove();
            vis.releaseYear.append("text")
                .attr("x",0)
                .attr("y", 50)
                .text("There is no data for that selection. Please make another selection.");
        }



        vis.albumSelect.exit().remove();






    }


}