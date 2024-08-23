

function fiveDayDate(date) {
    let returnValue = [];

    for (let i = 0; i < 5; i++){
        if (i != 0) {
            date.setDate(date.getDate() + 1);
        }
    
       returnValue.push(date.toDateString());
    }
    return returnValue;
   
    }


function setFiveDay() {

    let fiveDays = fiveDayDate(new Date());

    document.querySelector('#col1').innerHTML = fiveDays[0];
    document.querySelector('#col2').innerHTML = fiveDays[1];
    document.querySelector('#col3').innerHTML = fiveDays[2];
    document.querySelector('#col4').innerHTML = fiveDays[3];
    document.querySelector('#col5').innerHTML = fiveDays[4];
}

setFiveDay()



function loadData(response) {
    
    


    let weatherObj = response;
    
    for (let i = 0, j=0; i < 5; i++) {

        let hourData = weatherObj.timelines.hourly[i]
        var fiveHour = document.querySelectorAll('.flex-container .item-4 .item-' + (i+1) +' .grid-item');
        fiveHour[0].innerHTML = new Date(hourData.time).getHours()
        fiveHour[1].innerHTML = hourData.values.temperature + '  \u00B0C'; 
        fiveHour[2].innerHTML = hourData.values.windSpeed + 'km/hr';
        fiveHour[3].innerHTML = hourData.values.humidity;

        let dailyData = weatherObj.timelines.daily[i]
        var fiveDay = document.querySelectorAll('.flex-container .item-3 .grid-container .grid-item:not(.item-img)');

        fiveDay[j].innerHTML = new Date(dailyData.time).toDateString()
        fiveDay[j++].innerHTML = dailyData.values.temperatureAvg
        j++;
    }

    let leftgrid = document.querySelectorAll('.flex-container .item-2 .item-1 .grid-item');
    let minuteData = weatherObj.timelines.minutely
    leftgrid[0].innerHTML =  minuteData[0].values.temperature + "  \u00B0C"
    leftgrid[1].innerHTML =  new Date(weatherObj.timelines.daily[0].values.sunriseTime).toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
    }) + " sunrise"
    leftgrid[2].innerHTML = new Date(weatherObj.timelines.daily[0].values.sunsetTime).toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
    }) + " sunset"
    
    let leftgrid2 = document.querySelectorAll('.flex-container .item-2 .item-2 .grid-item');
    leftgrid2[0].innerHTML = minuteData[0].values.humidity + " <br/> humidity"
    leftgrid2[1].innerHTML = minuteData[0].values.windSpeed + " km/hr<br/> windSpeed"



    document.querySelector("#time").innerHTML = new Date(minuteData[0].time).toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    document.querySelector("#dayDate").innerHTML =  new Date(minuteData[0].time).toDateString();

    

}

function callWeatherApi(city) {

    document.querySelector("#city").innerHTML = city
    const options = {method: 'GET'};

 
    fetch('https://api.tomorrow.io/v4/weather/forecast?location=' + city + '&apikey=Ejjyr7PM8frvXy2JnnsYmlaRaIJ4KTba', options)
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("weater", response);
            loadData(response)
        }
    
    )
    .catch (err => console.error(err));
    
    
    
       
}



callWeatherApi('new york');




    
document.querySelector('#btnsubmit').addEventListener('click', function(event) {
    city = document.querySelector('#selectcity');
    callWeatherApi(city.value);
});    
 