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



function returnData(e){

  fetch("/predict/"+modelType+"/"+modelMonth+"/"+modelDay+"/"+modelYear, function(z){})
    .then(response => response.json())
    .then(data => { 
    console.log(data)
  

      })
}
    
  
