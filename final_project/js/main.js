

d3.csv("data/album_data.csv").then(data => {

    console.log(data)

    let margin = {top: 50, right: 10, bottom: 20, left: 60};
    let padding = document.getElementById("artists").getBoundingClientRect().width/7.5;

    // TODO: #9 - Change hardcoded width to reference the width of the parent element
    let width = document.getElementById("artists").getBoundingClientRect().width - margin.left - margin.right;
    let height = document.getElementById("artists").getBoundingClientRect().height - margin.top - margin.bottom;


    // SVG drawing area
    let svg = d3.select("#" + "artists").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let decades = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
    console.log(decades)

    svg.selectAll("line")
        .data([0,1,2,3,4])
        .enter()
        .append("line")
        .style("stroke", "grey")
        .style("stroke-width", 2)
        .attr("x1", (d, i) => (i)*padding-50 + width/6)
        .attr("y1", margin.top)
        .attr("x2", (d, i) => (i+1)*padding-50 + width/6)
        .attr("y2", margin.top)

    svg.selectAll("circle")
        .data(decades)
        .enter()
        .append("circle")
        .attr("fill", 'powderblue')
        .attr("cx", margin.left)
        .attr("cy", margin.top)
        .attr("r", 50)
        .attr("y", 0)
        .attr("cx", (d,i)=>(i+1)*padding)
        .attr("stroke", "black")

    svg.selectAll("text")
        .data(decades)
        .enter()
        .append("text")
        .attr("x",(d,i)=>(i+1)*padding)
        .attr("y", margin.top + 5)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-family", 'forte')
        .attr("font-size", 20)
        .text(d=>d)


});