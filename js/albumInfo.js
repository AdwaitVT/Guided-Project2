class AlbumInfo{

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.initVis()
    }

    initVis(){
        let vis = this;

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