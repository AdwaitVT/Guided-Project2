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

        vis.margin = {top: 20, right: 50, bottom: 20, left: 50};
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
            .attr('width', 500)
            .attr('height', 100)
            .append('g')
            .attr('transform', 'translate(30,30)');

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
            .attr('width', 500)
            .attr('height', 100)
            .append('g')
            .attr('transform', 'translate(30,30)');

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
            .attr('width', 500)
            .attr('height', 100)
            .append('g')
            .attr('transform', 'translate(30,30)');

        vis.attribute3Values = [0,1];

        vis.columns = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s']
        vis.years = [
            {'1960s': "", '1970s': 1970, '1980s': 1980, '1990s': 1990, '2000s': 2000, '2010s': 2010},
            {'1960s': "", '1970s': 1971, '1980s': 1981, '1990s': 1991, '2000s': 2001, '2010s': 2011},
            {'1960s': "", '1970s': 1972, '1980s': 1982, '1990s': 1992, '2000s': 2002, '2010s': 2012},
            {'1960s': 1963, '1970s': 1973, '1980s': 1983, '1990s': 1993, '2000s': 2003, '2010s': 2013},
            {'1960s': 1964, '1970s': 1974, '1980s': 1984, '1990s': 1994, '2000s': 2004, '2010s': 2014},
            {'1960s': 1965, '1970s': 1975, '1980s': 1985, '1990s': 1995, '2000s': 2005, '2010s': 2015},
            {'1960s': 1966, '1970s': 1976, '1980s': 1986, '1990s': 1996, '2000s': 2006, '2010s': 2016},
            {'1960s': 1967, '1970s': 1977, '1980s': 1987, '1990s': 1997, '2000s': 2007, '2010s': 2017},
            {'1960s': 1968, '1970s': 1978, '1980s': 1988, '1990s': 1998, '2000s': 2008, '2010s': 2018},
            {'1960s': 1969, '1970s': 1979, '1980s': 1989, '1990s': 1999, '2000s': 2009, '2010s': 2019}

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



        console.log(vis.displayData);


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
                .join('-')
            );


        d3.select('p#value-range2')
            .text(vis.sliderRange2
                .value()
                .map(d3.format('.2'))
                .join('-')
            );


        d3.select('p#value-range3')
            .text(vis.sliderRange3
                .value()
                .map(d3.format('.2'))
                .join('-')
            );


        vis.svg.append("text")
            .attr("class", "year")
            .attr("x", vis.width/2)
            .attr("y", vis.height/2)
            .attr("font-size", "14px")
            .text(`The year that matches the given values is: ${vis.displayData[0]}`);

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