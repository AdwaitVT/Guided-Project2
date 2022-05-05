
var arr = [];
var list = [];
var initials = [50, 50, 50, 50, 50, 50, 50, 50, 50];
var colors = ['brown', 'green', 'blue', 'red', 'magenta', 'DarkSlateGray', 'LightSeaGreen', 'Tomato', 'SteelBlue'];
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
    this.d3.csv("/data/yearlynormhundred.csv").then(csv=> {

        csv.forEach(function(d){
            d.year = +d.year;
            d.acousticness = +d.acousticness;
            d.energy = +d.energy;
            d.instrumentalness = +d.instrumentalness;
            d.liveness = +d.liveness;
            d.loudness = +d.loudness;
            d.speechiness = +d.speechiness;
            d.tempo = +d.tempo;
            d.valence = +d.valence;
            d.danceability = +d.danceability;
            arr.push(d.acousticness,d.energy,d.instrumentalness,d.liveness,d.loudness,d.speechiness,d.tempo,d.valence,d.danceability);

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

    console.log('smallest ' + smallest);
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
    console.log(list1);
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

    for (let i=0; i<9; i++){

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
        .max(100)
        .step(1)
        .width(300)
        .default(initials[i])
        .displayValue(false)
        .fill(colors[i])
        .on('onchange', num => {
            initials[i] = num;
            box.attr('fill', `#${initials}`);
            // console.log("Initials...."+initials[2] + "  List Value" +list[0]);
            console.log('Hiiii' + rmse_metric(initials,list));
            d3.select('p#value-color-picker0')
                .text(`Acousticness: ${initials[0]}`)
            d3.select('p#value-color-picker1')
                .text(`Danceability: ${initials[1]}`)
            d3.select('p#value-color-picker2')
                .text(`Energy: ${initials[2]}`)
            d3.select('p#value-color-picker3')
                .text(`Instrumentalness: ${initials[3]}`)
            d3.select('p#value-color-picker4')
                .text(`Liveness: ${initials[4]}`)
            d3.select('p#value-color-picker5')
                .text(`Loudness: ${initials[5]}`)
            d3.select('p#value-color-picker6')
                .text(`Speechiness: ${initials[6]}`)
            d3.select('p#value-color-picker7')
                .text(`Tempo: ${initials[7]}`)
            d3.select('p#value-color-picker8')
                .text(`Valence: ${initials[8]}`)
            d3.select('p#value-final')
                .text(`${rmse_metric(initials,list)}`)
        });

    gRangeSlider
        .append('g')
        .attr('transform', `translate(30,${60 * i})`)
        .call(slider);
});

d3.select('p#value-color-picker0')
    .text(`Acousticness: ${initials[0]}`)
d3.select('p#value-color-picker1')
    .text(`Danceability: ${initials[1]}`)
d3.select('p#value-color-picker2')
    .text(`Energy: ${initials[2]}`)
d3.select('p#value-color-picker3')
    .text(`Instrumentalness: ${initials[3]}`)
d3.select('p#value-color-picker4')
    .text(`Liveness: ${initials[4]}`)
d3.select('p#value-color-picker5')
    .text(`Loudness: ${initials[5]}`)
d3.select('p#value-color-picker6')
    .text(`Speechiness: ${initials[6]}`)
d3.select('p#value-color-picker7')
    .text(`Tempo: ${initials[7]}`)
d3.select('p#value-color-picker8')
    .text(`Valence: ${initials[8]}`)

console.log(initials);
console.log(list);
d3.select('p#value-final')
    .text(`1963`);