class AlbumInfo{

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.initialAlbum =  {
            acousticness: "0.8164",
            album: "Dylan",
            album_id: "0o1uFxZ1VTviqvNaYkTJek",
            artist: "Bob Dylan",
            chart_date: "1973",
            danceability: "0.5541",
            energy: "0.2290",
            instrumentalness: "0.0010",
            liveness: "0.1516",
            release_date: "1963",
            speechiness: "0.0495",
            valence: "0.5925"
        }



        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.attributes = ["acousticness","danceability","energy","instrumentalness","liveness","speechiness","valence"];
        vis.sortBy = "release_date";
        vis.decade = 1960;

        vis.margin = {top: 20, right:0 , bottom: 20, left: 20};
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
            outlierAlbums.wrangleData();
        });
        d3.select("#selectDecadeButton").on("change", function(){
            vis.decade = this.value;
            vis.wrangleData();
            outlierAlbums.wrangleData();
        });

        vis.displayData = [];

        vis.data.forEach(d => {
            let val = d[vis.sortBy];
            if(parseInt(parseInt(val)/10) * 10 === parseInt(vis.decade)) {
                vis.displayData.push(d);
            }
        })

        console.log(vis.displayData);

        vis.updateVis();

    }

    updateVis() {
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
            .attr("value", function (d) {
                return d.album;
            })
            .text(function (d) {
                return d.album + " - " + d.artist;
            });


        d3.select("#selectAlbumButton").on("change", function () {
            let selection = this.value;
            vis.selectedAlbum = vis.displayData.find(item => item.album === selection);
            vis.albumInfo.selectAll("text").remove();
            vis.albumInfo.append("text")
                .attr("class", "label")
                .attr("x", 0)
                .attr("y", 0)
                .attr("font-weight", "bold")
                .attr("font-size", "14px")
                .attr("alignment-baseline", "middle")
                .text(`Released in:  ${outlierAlbumInfo.selectedAlbum.release_date}`)
            vis.albumInfo.append("text")
                .attr("class", "label")
                .attr("x", 0)
                .attr("y", 15)
                .attr("font-weight", "bold")
                .attr("font-size", "14px")
                .attr("alignment-baseline", "middle")
                .text(`Charted in:   ${outlierAlbumInfo.selectedAlbum.chart_date}`)
            vis.albumInfo.append("text")
                .attr("x", vis.width / 4)
                .attr("y", 0)
                .attr("font-size", "12px")
                .text(`Acousticness: ${vis.selectedAlbum.acousticness}`)
            vis.albumInfo.append("text")
                .attr("x", vis.width / 4)
                .attr("y", 15)
                .attr("font-size", "12px")
                .text(`Danceability: ${vis.selectedAlbum.danceability}`)
            vis.albumInfo.append("text")
                .attr("x", vis.width / 4)
                .attr("y", 30)
                .attr("font-size", "12px")
                .text(`Instrumentalness: ${vis.selectedAlbum.instrumentalness}`)
            vis.albumInfo.append("text")
                .attr("x", vis.width / 2 + 10)
                .attr("y", 0)
                .attr("font-size", "12px")
                .text(`Liveness: ${vis.selectedAlbum.liveness}`)
            vis.albumInfo.append("text")
                .attr("x", vis.width / 2 + 10)
                .attr("y", 15)
                .attr("font-size", "12px")
                .text(` Speechiness: ${vis.selectedAlbum.speechiness}`);
            vis.albumInfo.append("text")
                .attr("x", vis.width / 2 + 10)
                .attr("y", 30)
                .attr("font-size", "12px")
                .text(`Valence: ${vis.selectedAlbum.valence}`);

            outlierAlbums.wrangleData();
        });

        if (vis.displayData.length == 0) {
            vis.albumSelect.exit().remove();
            vis.albumInfo.append("text")
                .attr("x", 5)
                .attr("y", 0)
                .attr("font-size", "14px")
                .text("There is no data for that selection. Please make another selection.");
        }
        else{
            vis.albumInfo.append("text")
                .attr("class", "label")
                .attr("x", 0)
                .attr("y", 0)
                .attr("font-weight", "bold")
                .attr("font-size", "14px")
                .attr("alignment-baseline", "middle")
                .text(`Released in:  ${vis.selectedAlbum.release_date}`)
            vis.albumInfo.append("text")
                .attr("class", "label")
                .attr("x", 0)
                .attr("y", 15)
                .attr("font-weight", "bold")
                .attr("font-size", "14px")
                .attr("alignment-baseline", "middle")
                .text(`Charted in:   ${vis.selectedAlbum.chart_date}`)

            vis.albumInfo.append("text")
                .attr("x", vis.width / 4)
                .attr("y", 0)
                .attr("font-size", "12px")
                .text(`Acousticness: ${vis.selectedAlbum.acousticness}`)
            vis.albumInfo.append("text")
                .attr("x", vis.width / 4)
                .attr("y", 15)
                .attr("font-size", "12px")
                .text(`Danceability: ${vis.selectedAlbum.danceability}`)
            vis.albumInfo.append("text")
                .attr("x", vis.width / 4)
                .attr("y", 30)
                .attr("font-size", "12px")
                .text(`Instrumentalness: ${vis.selectedAlbum.instrumentalness}`)
            vis.albumInfo.append("text")
                .attr("x", vis.width / 2 + 10)
                .attr("y", 0)
                .attr("font-size", "12px")
                .text(`Liveness: ${vis.selectedAlbum.liveness}`)
            vis.albumInfo.append("text")
                .attr("x", vis.width / 2 + 10)
                .attr("y", 15)
                .attr("font-size", "12px")
                .text(` Speechiness: ${vis.selectedAlbum.speechiness}`);
            vis.albumInfo.append("text")
                .attr("x", vis.width / 2 + 10)
                .attr("y", 30)
                .attr("font-size", "12px")
                .text(`Valence: ${vis.selectedAlbum.valence}`);
        }

        //     }
        // catch{
        //     if(vis.displayData.length == 0){
        //         console.log(vis.initialAlbum);
        //         vis.albumSelect.exit().remove();
        //         vis.albumInfo.append("text")
        //             .attr("x", 5)
        //             .attr("y", 0)
        //             .attr("font-size", "14px")
        //             .text("There is no data for that selection. Please make another selection.");
        //     }
        //
        // }




        vis.albumSelect.exit().remove();






    }


}