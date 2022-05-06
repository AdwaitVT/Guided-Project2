class Sliders{

    constructor(parentElement, data){
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.formatTime = d3.timeFormat("%Y");

        this.initVis();

        //https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518


    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 50, bottom: 20, left: 0};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.attribute1 =  "acousticness";
        vis.attribute2 = "acousticness";
        vis.attribute3 = "acousticness";


        vis.gRange1 = d3.select('#slider-range1')
            .append('svg')
            .attr('width', 350)
            .attr('height', 75)
            .append('g')
            .attr('transform', 'translate(30,40)');

        vis.sliderRange1 = d3.sliderBottom()
            .min(0.0)
            .max(1.0)
            .width(300)
            .tickFormat(d3.format('.2'))
            .ticks(10)
            .default([0.0, 1.0])
            .fill('#2196f3')

        vis.attribute1Values = [0,1];



        vis.gRange2 = d3.select('#slider-range2')
            .append('svg')
            .attr('width', 350)
            .attr('height', 75)
            .append('g')
            .attr('transform', 'translate(30,40)');

        vis.sliderRange2 = d3.sliderBottom()
            .min(0.0)
            .max(1.0)
            .width(300)
            .tickFormat(d3.format('.2'))
            .ticks(10)
            .default([0.0, 1.0])
            .fill('#2196f3')

        vis.attribute2Values = [0,1];


        vis.sliderRange3 = d3.sliderBottom()
            .min(0.0)
            .max(1.0)
            .width(300)
            .tickFormat(d3.format('.2'))
            .ticks(10)
            .default([0.0, 1.0])
            .fill('#2196f3')


        vis.gRange3 = d3.select('#slider-range3')
            .append('svg')
            .attr('width', 350)
            .attr('height', 75)
            .append('g')
            .attr('transform', 'translate(30,40)');

        vis.attribute3Values = [0,1];

        vis.columns=['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col10']
        vis.years = [
            {'col1': "", 'col2': "", 'col3': "", 'col4': 1963, 'col5': 1964, 'col6': 1965, 'col7': 1966, 'col8': 1967, 'col9': 1968, 'col10': 1969},
            {'col1': 1970, 'col2': 1971, 'col3': 1972, 'col4': 1973, 'col5': 1974, 'col6': 1975, 'col7': 1976, 'col8': 1977, 'col9': 1978, 'col10': 1979},
            {'col1': 1980, 'col2': 1981, 'col3': 1982, 'col4': 1983, 'col5': 1984, 'col6': 1985, 'col7': 1986, 'col8': 1987, 'col9': 1988, 'col10': 1989},
            {'col1': 1990, 'col2': 1991, 'col3': 1992, 'col4': 1993, 'col5': 1994, 'col6': 1995, 'col7': 1996, 'col8': 1997, 'col9': 1998, 'col10': 1999},
            {'col1': 2000, 'col2': 2001, 'col3': 2002, 'col4': 2003, 'col5': 2004, 'col6': 2005, 'col7': 2006, 'col8': 2007, 'col9': 2008, 'col10': 2009},
            {'col1': 2010, 'col2': 2010, 'col3': 2012, 'col4': 2013, 'col5': 2014, 'col6': 2015, 'col7': 2016, 'col8': 2017, 'col9': 2018, 'col10': 2019}

        ]



        vis.table = d3.select('#year-table').append('table');
        vis.thead = vis.table.append('thead');
        vis.tbody = vis.table.append('tbody');

        vis.rows = vis.tbody.selectAll('tr')
            .data(vis.years)
            .enter()
            .append('tr');

        vis.cells = vis.rows.selectAll('td')
            .data(function (row) {
                return vis.columns.map(function (column) {
                    return {column: column, value: row[column]};
                });
            })
            .enter()
            .append('td')
            .attr("id", function(d) {return d.value})
            .text(function (d) { return d.value})


        this.wrangleData();


    }

    wrangleData(){
        let vis = this;

        vis.displayData = [];

        vis.sliderRange1.on('onchange', function(val) {
                vis.attribute1Values = val;
                d3.select('p#value-range1').text(val.map(d3.format('.2')).join('-'));
                vis.wrangleData();
            });

        vis.gRange1.call(vis.sliderRange1);


        vis.sliderRange2.on('onchange', function(val) {
            vis.attribute2Values = val;
            d3.select('p#value-range2').text(val.map(d3.format('.2')).join('-'));
            vis.wrangleData();
        });

        vis.gRange2.call(vis.sliderRange2);

        vis.sliderRange3.on('onchange', function(val) {
            vis.attribute3Values = val;
            d3.select('p#value-range3').text(val.map(d3.format('.2')).join('-'));
            vis.wrangleData();
        });

        vis.gRange3.call(vis.sliderRange3);

        d3.select("#selectSlider1").on('change', function(){
            vis.attribute1 = this.value;
            console.log(vis.attribute1);
            vis.wrangleData()
        });
        d3.select("#selectSlider2").on('change', function(){
            vis.attribute2 = this.value;
            console.log(vis.attribute2);
            vis.wrangleData()
        });
        d3.select("#selectSlider3").on('change', function(){
            vis.attribute3 = this.value;
            console.log(vis.attribute3);
            vis.wrangleData()
        });




        vis.data.forEach(row => {
            if(row[vis.attribute1] >= vis.attribute1Values[0] && row[vis.attribute1] <= vis.attribute1Values[1]){
                if(row[vis.attribute2] >= vis.attribute2Values[0] && row[vis.attribute2] <= vis.attribute2Values[1]){
                    if(row[vis.attribute3] >= vis.attribute3Values[0] && row[vis.attribute3] <= vis.attribute3Values[1]){
                        vis.displayData.push(vis.formatTime(row.chart_date));
                    }
                }
            }
        });



        this.updateVis();


    }

    updateVis(){
        let vis = this;

        vis.svg.selectAll(".year").remove();
        d3.selectAll("td").each(function() {
            d3.select(this).style("color", "lightgrey");
        });

        d3.select('p#value-range1')
            .text(vis.sliderRange1
                .value()
                .map(d3.format('.2'))
                .join(' - ')
            );


        d3.select('p#value-range2')
            .text(vis.sliderRange2
                .value()
                .map(d3.format('.2'))
                .join(' - ')
            );


        d3.select('p#value-range3')
            .text(vis.sliderRange3
                .value()
                .map(d3.format('.2'))
                .join(' - ')
            );

        d3.selectAll("td").each(function() {
            vis.displayData.forEach(y => {
                if(d3.select(this).text() == y){
                    //console.log(this.text());
                    d3.select(this).style("color", "black");
                }
            })
        })



        vis.svg.exit().remove();


    }


}
