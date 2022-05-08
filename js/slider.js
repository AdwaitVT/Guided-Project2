
var arr = [];
var list = [];
var initials = [0.5, 0.5, 0.50, 0.50, 0.50, 0.50, 0.50];
var colors = ['#e41a1c','#ff7f00', '#377eb8','#4daf4a','#984ea3', '#030300','#ffd919'];
var numFormat = d3.format(".2f");
// var d = new Date();
// var ms = d.getTime();
// var res = ms.charAt(ms.length-1);
//

var gRangeSlider = d3
    .select('div#slider-color-picker')
    .append('svg')
    .attr('width', 400)
    .attr('height', 550)
    .append('g')
    .attr('transform', 'translate(30,30)');

var box = gRangeSlider
    //.append('rect')
    .append('text')
    .attr('width', 100)
    .attr('height', 100)
    .attr('transform', 'translate(400,0)')
    .attr('fill', `#${initials}`);

loadDataSlider();

/*Loading the csv file into the data*/
function loadDataSlider() {
    this.d3.csv("data/yearlynorm.csv").then(csv=> {

        csv.forEach(function(d){
            d.year = +d.year;
            d.acousticness = +d.acousticness;
            d.energy = +d.energy;
            d.instrumentalness = +d.instrumentalness;
            d.liveness = +d.liveness;
            // d.loudness = +d.loudness;
            d.speechiness = +d.speechiness;
            // d.tempo = +d.tempo;
            d.valence = +d.valence;
            d.danceability = +d.danceability;
            arr.push(d.acousticness,d.energy,d.instrumentalness,d.liveness,d.speechiness,d.valence,d.danceability);

            list.push(arr);
            arr = []

        });
        // console.log("Printing list");
        // console.log(list);
        dataBar = csv;
    });
}

function rmse_metric(inputFeature, actual) {
    var rmse = [];

    for (var i = 0; i < 57; i++) {
        // console.log('List')
        // console.log(actual[i])
        // console.log('Input Feature')
        //
        // console.log(inputFeature)
        // console.log('Input Feature')
        rmse.push(rmse_calculate(list[i], inputFeature));
    }

    var smallest = myMin(rmse);

    // console.log('smallest ' + smallest);
    return 1963 + smallest;
}
// }function mae_metric(actual, userInput) {
//     var mae = [];
//
//     for(l in list){
//         mae.push(mae_calculate(l,userInput));
//         console.log("List");
//         console.log(l);
//     }
//     var largest = myMax(mae);
//     console.log(mae);
//     return 1963 + largest;
// }

function myMin(list1) {
    var min = list1[0];
    // console.log(list1);
    var index = 0;

    for (let i=0; i<57; i++) {
        // console.log('Heyyyy....' + list1[i])
        if ( list1[i] < min) {
            min = list1[i];
            index = i;
        }
        i++;
    }
    // console.log('Hi ' + index)
    return index;
}


function rmse_calculate(dataOriginal, userInput){
    var sum_error = 0.0;

    for (let i=0; i<7; i++){

        // square=np.square(diff)
        // MSE=square.mean()
        // RMSE=np.sqrt(MSE)
        diff = dataOriginal[i] - userInput[i];
        square = Math.pow(diff, 2);
        sum_error += square;
        //sum_error += Math.abs(dataOriginal[i] - userInput[i]);
    }
    mean = sum_error/9;
    rootmean = Math.sqrt(mean);
    //return sum_error / parseFloat(dataOriginal.length);
    return rootmean;
}


initials.forEach((color, i) => {
    var slider = d3
        .sliderBottom()
        .min(0)
        .max(1)
        .step(0.01)
        .width(200)
        .default(initials[i])
        .displayValue(false)
        .fill(colors[i])
        .on('onchange', num => {
            initials[i] = num;
            box.attr('fill', `#${initials}`);
            d3.select('p#value-color-picker0')
                .text(`Acousticness: ${numFormat(Math.floor(initials[0]*100)/100)}`)
            d3.select('p#value-color-picker1')
                .text(`Danceability: ${numFormat(Math.floor(initials[1]*100)/100)}`)
            d3.select('p#value-color-picker2')
                .text(`Energy: ${numFormat(Math.floor(initials[2]*100)/100)}`)
            d3.select('p#value-color-picker3')
                .text(`Instrumentalness: ${numFormat(Math.floor(initials[3]*100)/100)}`)
            d3.select('p#value-color-picker4')
                .text(`Liveness: ${numFormat(Math.floor(initials[4]*100)/100)}`)
            // d3.select('p#value-color-picker5')
            //     .text(`Loudness: ${initials[5]}`)
            d3.select('p#value-color-picker6')
                .text(`Speechiness: ${numFormat(Math.floor(initials[5]*100)/100)}`)
            // d3.select('p#value-color-picker7')
            //     .text(`Tempo: ${initials[7]}`)
            d3.select('p#value-color-picker8')
                .text(`Valence: ${numFormat(Math.floor(initials[6]*100)/100)}`)
            d3.select('p#value-final')
                .text(`${rmse_metric(initials,list)}`)
            value = parseInt(rmse_metric(initials, list)-1963);
            console.log(value);
            d3.select('p#acousticness')
                .text(`Acousticness: ${numFormat(Math.floor((list[value][0])*100)/100)}`)
            d3.select('p#danceability')
                .text(`Danceability: ${numFormat(Math.floor((list[value][1])*100)/100)}`)
            d3.select('p#energy')
                .text(`Energy: ${numFormat(Math.floor((list[value][2])*100)/100)}`)
            d3.select('p#instrumentalness')
                .text(`Instrumentalness: ${numFormat(Math.floor((list[value][3])*100)/100)}`)
            d3.select('p#liveness')
                .text(`Liveness: ${numFormat(Math.floor((list[value][4])*100)/100)}`)
            d3.select('p#speechiness')
                .text(`Speechiness: ${numFormat(Math.floor((list[value][5])*100)/100)}`)
            d3.select('p#valence')
                .text(`Valence: ${numFormat(Math.floor((list[value][6])*100)/100)}`)
        });

    gRangeSlider
        .append('g')
        .attr('transform', `translate(30,${60 * i})`)
        .call(slider);
});

d3.select('p#value-color-picker0')
    .text(`Acousticness: ${numFormat(initials[0])}`)
d3.select('p#value-color-picker1')
    .text(`Danceability: ${numFormat(initials[1])}`)
d3.select('p#value-color-picker2')
    .text(`Energy: ${numFormat(initials[2])}`)
d3.select('p#value-color-picker3')
    .text(`Instrumentalness: ${numFormat(initials[3])}`)
d3.select('p#value-color-picker4')
    .text(`Liveness: ${numFormat(initials[4])}`)
d3.select('p#value-color-picker6')
    .text(`Speechiness: ${numFormat(initials[5])}`)
d3.select('p#value-color-picker8')
    .text(`Valence: ${numFormat(initials[6])}`)
//

d3.select('p#value-final')
    .text(`1963`);
d3.select('p#acousticness')
    .text(`Acousticness: 0.00`)
d3.select('p#danceability')
    .text(`Danceability: 0.99`)
d3.select('p#energy')
    .text(`Energy: 0.14`)
d3.select('p#instrumentalness')
    .text(`Instrumentalness: 0.01`)
d3.select('p#liveness')
    .text(`Liveness: 0.41`)
d3.select('p#speechiness')
    .text(`Speechiness: 0.00`)
d3.select('p#valence')
    .text(`Valence: 0.77`)

// console.log(initials);
// console.log(list);