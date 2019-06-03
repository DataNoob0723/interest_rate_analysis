// store user selected model
var modelType
// function to retrieve user selected model
function inputChangeModelType(e) {
  modelType = document.getElementById("selected_model").value
}
// store user selected month
var modelMonth
// function to retrieve user selected month
function inputChangeMonth(e) {
  modelMonth = document.getElementById("selected_month").value
}
// store user selected day
var modelDay
// function to retrieve user selected day
function inputChangeDay(e) {
  modelDay = document.getElementById("selected_day").value
}
// store user selected year
var modelYear
// function to retrieve user selected year
function inputChangeYear(e) {
  modelYear = document.getElementById("selected_year").value
}


// store end variables
// Previous day's DFF
var Y_prev
// Predicted probability that the DFF of the day of interest going up
var Y_prob_a
// Predicted probability that the DFF of the day of interest keep the same
var Y_prob_b
// Predicted probability that the DFF of the day of interest going down
var Y_prob_c
// DFF of the day of interest
var Y_to_pred
// is the date
var Date1

function returnData(e){

  fetch("/predict/"+modelType+"/"+modelMonth+"/"+modelDay+"/"+modelYear, function(z){})
    .then(response => response.json())
    .then(data => {
    Y_prev = data.Y_prev;
    Y_prob_a = data.Y_prob[0];
    Y_prob_b = data.Y_prob[1];
    Y_prob_c = data.Y_prob[2];
    Y_to_pred = data.Y_to_pred;
    Date1 = data.date;
    console.log("Selected date: " + Date);
    console.log("The DFF of the selected date: " + Y_to_pred);
    console.log("The previous day's DFF Value: " + Y_prev);
    console.log("Our predicted probability the DFF will go up: " + Y_prob_a);
    console.log("Our predicted probability the DFF will stay the same: " + Y_prob_b);
    console.log("Our predicted probability the DFF will go down: " + Y_prob_c);

    // chart 1

    var Date2 = new Date(Date1);
        Date2.setDate(Date2.getDate() - 1 );
    var
        dataArray = [Y_prev],
        dataCategories = [Date2];

    // Chart 2
    var
        dataArray2 = [Y_to_pred],
        dataCategories2 = [Date1];



    function makeResponsive() {

        // svg params
        var svgHeight = 275;
        var svgWidth = 350;

        // margins
        var margin = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        };

        // chart area minus margins
        var chartHeight = svgHeight - margin.top - margin.bottom;
        var chartWidth = svgWidth - margin.left - margin.right;

        // create svg container
        var svg = d3.select("#chart").append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);

        // create svg2 container
        var svg2 = d3.select("#chart2").append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);

        // shift everything over by the margins
        var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // shift everything over by the margins
        var chartGroup2 = svg2.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // scale y to chart height
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataArray)])
            .range([chartHeight, 0]);

        // scale x to chart width
        var xScale = d3.scaleBand()
            .domain(dataCategories)
            .range([0, chartWidth])
            .padding(0.1);

        // scale y to chart height
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataArray2)])
            .range([chartHeight, 0]);

        // scale x to chart width
        var xScale = d3.scaleBand()
            .domain(dataCategories2)
            .range([0, chartWidth])
            .padding(0.1);

        // create axes
        var yAxis = d3.axisLeft(yScale);
        var xAxis = d3.axisBottom(xScale);

        // set x to the bottom of the chart
        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis);

        // set y to the y axis
        chartGroup.append("g")
            .call(yAxis);

        // set x to the bottom of the chart
        chartGroup2.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis);

        // set y to the y axis
        chartGroup2.append("g")
            .call(yAxis);


        chartGroup.selectAll("circle")
            .data(dataArray)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(dataCategories[i]))
            .attr("cy", d => yScale(d))
            .attr("r", 6)
            // .attr("height", d => chartHeight - yScale(d))
            .attr("fill", "green")
            // event listener for onclick event
            .on("click", function(d, i) {
              alert(`DFF: ${dataArray}`);
            });


        chartGroup2.selectAll("circle")
            .data(dataArray2)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(dataCategories2[i]))
            .attr("cy", d => yScale(d))
            .attr("r", 6)
            // .attr("height", d => chartHeight - yScale(d))
            .attr("fill", "green")
            // event listener for onclick event
            .on("click", function(d, i) {
              alert(`DFF: ${dataArray2}`);
            });


    }
    makeResponsive();
      })
}

(async function () {
  const data = [{
      date: '2003',
      value: 1.12,
    },
    {
      date: '2004',
      value: 1.35,
    },
    {
      date: '2005',
      value: 3.22,
    },
    {
      date: '2006',
      value: 4.96,
    },
    {
      date: '2007',
      value: 5.02,
    },
    {
      date: '2008',
      value: 1.92,
    },
    {
      date: '2009',
      value: 0.15,
    },
    {
      date: '2010',
      value: 0.17,
    },
    {
      date: '2011',
      value: 0.10,
    },
    {
      date: '2012',
      value: 0.14,
    },
    {
      date: '2013',
      value: 0.10,
    },
    {
      date: '2014',
      value: 0.09,
    },
    {
      date: '2015',
      value: 0.13,
    },
    {
      date: '2016',
      value: 0.39,
    },
    {
      date: '2017',
      value: 1.00,
    },
    {
      date: '2018',
      value: 1.83,
    },
    {
      date: '2019',
      value: 2.40,
    }
  ]
   // Define SVG area dimensions
   const
   svgWidth = 600,
   svgHeight = 400;

// Define the chart's margins as an object
const margin = {
   top: 100,
   right: 60,
   bottom: 60,
   left: 60
};

// Define dimensions of the chart area
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
const svg = d3.select("#line")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

// Append a group area, then set its margins
const chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
const parseTime = d3.timeParse("%Y");

// Load data from forcepoints.csv
// Print the forceData
// Format the date and cast the force value to a number
data.forEach(function(data) {
   data.date = parseTime(data.date);
   data.value = +data.value;
});

// Configure a time scale
// d3.extent returns the an array containing the min and max values for the property specified
const xTimeScale = d3.scaleTime()
   .domain(d3.extent(data, d => d.date))
   .range([0, chartWidth]);

// Configure a linear scale with a range between the chartHeight and 0
const yLinearScale = d3.scaleLinear()
   .domain([0, d3.max(data, d => d.value)])
   .range([chartHeight, 0]);

// Create two new functions passing the scales in as arguments
// These will be used to create the chart's axes
const bottomAxis = d3.axisBottom(xTimeScale);
const leftAxis = d3.axisLeft(yLinearScale);

// Configure a line function which will plot the x and y coordinates using our scales
const drawLine = d3.line()
   .x(data => xTimeScale(data.date))
   .y(data => yLinearScale(data.value));

// Append an SVG path and plot its points using the line function
chartGroup.append("path")
   // The drawLine function returns the instructions for creating the line for forceData
   .attr("d", drawLine(data))
   .classed("line", true);

// Append an SVG group element to the chartGroup, create the left axis inside of it
chartGroup.append("g")
   .classed("axis", true)
   .call(leftAxis);

// Append an SVG group element to the chartGroup, create the bottom axis inside of it
// Translate the bottom axis to the bottom of the page
chartGroup.append("g")
   .classed("axis", true)
   .attr("transform", `translate(0, ${chartHeight})`)
   .call(bottomAxis);
 })()
