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

        vis.margin = {top: 20, right:50 , bottom: 30, left: 0};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr('transform', `translate (${vis.margin.left}, 0)`);

        vis.albumInfo = vis.svg.append('g')
            .attr("class", "albumInfo")
            .attr("transform", `translate(30, ${vis.margin.top})`);



        vis.selectedAlbum = vis.displayData[0];




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
            vis.albumInfo.selectAll("text").remove();
            vis.albumInfo.append("text")
                .attr("x", 50)
                .attr("y", 30)
                .text(`Acousticness: ${vis.selectedAlbum.acousticness}`)
            vis.albumInfo.append("text")
                .attr("x", 230)
                .attr("y", 30)
                .text(`Danceability: ${vis.selectedAlbum.danceability}`)
            vis.albumInfo.append("text")
                .attr("x", 400)
                .attr("y", 30)
                .text(`Instrumentalness: ${vis.selectedAlbum.instrumentalness}`)
            vis.albumInfo.append("text")
                .attr("x", 600)
                .attr("y", 30)
                .text(`Liveness: ${vis.selectedAlbum.liveness}`)
            vis.albumInfo.append("text")
                .attr("x", 740)
                .attr("y", 30)
                .text(` Speechiness: ${vis.selectedAlbum.speechiness}`);
            vis.albumInfo.append("text")
                .attr("x", 900)
                .attr("y", 30)
                .text(`Valence: ${vis.selectedAlbum.valence}`);

            releaseYear.wrangleData();
            chartYear.wrangleData();
        })
        try{

            vis.albumInfo.append("text")
                .attr("x", 50)
                .attr("y", 30)
                .text(`Acousticness: ${vis.selectedAlbum.acousticness}`)
            vis.albumInfo.append("text")
                .attr("x", 230)
                .attr("y", 30)
                .text(`Danceability: ${vis.selectedAlbum.danceability}`)
            vis.albumInfo.append("text")
                .attr("x", 400)
                .attr("y", 30)
                .text(`Instrumentalness: ${vis.selectedAlbum.instrumentalness}`)
            vis.albumInfo.append("text")
                .attr("x", 600)
                .attr("y", 30)
                .text(`Liveness: ${vis.selectedAlbum.liveness}`)
            vis.albumInfo.append("text")
                .attr("x", 740)
                .attr("y", 30)
                .text(` Speechiness: ${vis.selectedAlbum.speechiness}`);
            vis.albumInfo.append("text")
                .attr("x", 900)
                .attr("y", 30)
                .text(`Valence: ${vis.selectedAlbum.valence}`);

        }
        catch{
            vis.albumSelect.exit().remove();
            vis.albumInfo.append("text")
                .attr("x",0)
                .attr("y", 50)
                .text("There is no data for that selection. Please make another selection.");
        }



        vis.albumSelect.exit().remove();






    }


}