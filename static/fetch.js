const fetchData = (city) => {
    getForecast(city);
    getMeasurements(city);
    getHistorical(city)
}


//CODE RELATED TO FORECASTING
const getForecast = (city) => {
    fetch(`http://localhost:8080/forecast/${city}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => (response.ok ? response : Promise.reject(response)))
          .then((res) => res.json())
          .then((data) => {
            renameTable(city);
            clearData();
            for(let i = 93; i > 0; i-=4) {
                //console.log(data[i])
                addData(data[i]);
            }
          })
          .catch((error) => {
            console.log("error");
          });
}



const renameTable = (city) => {
    var text = document.getElementById("CityName");
    text.innerText = city;
}

const clearData = () => {
    var table = document.getElementById("WeatherTable");
    let len = table.tBodies[0].rows.length

    if(len> 0){
        for(let i = 1; i < len; i++){
            table.deleteRow(1);
        }
    }   
}

const addData = (data) => {
    var table = document.getElementById("WeatherTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = data.from;
    cell2.innerHTML = data.to;
    cell3.innerHTML = data.time;
    cell4.innerHTML = data.place;
  }

  const getLatestMeasurement = (data) => {
    var txt = document.getElementById("LatestMeasurement");
    txt.innerText = 'From: ' + data[1].from + '\nTo: ' + data[1].to 
  }



//CODE RELATED TO GETTING MEASUREMENTS
const getMeasurements = (city) => {
    fetch(`http://localhost:8080/data/${city}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => (response.ok ? response : Promise.reject(response)))
          .then((res) => res.json())
          .then((data) => {
            for(let i = 0; i < 4; i++) {
                //console.log(data[i])

                let position = data.length - i -1;
            
                switch(data[position].type){
                    case 'temperature': 
                        //console.log(data[i])
                        document.getElementById("LatestTemperature").innerText = `${data[position].value} C`;
                        break;
                    case 'precipitation':
                        //console.log(data[i])
                        document.getElementById("LatestPrecipitation").innerText = `${data[position].value} mm`;
                        break;
                    case 'wind speed':
                        //console.log(data[i])
                        document.getElementById("LatestWindSpeed").innerText = `${data[position].value} m/s`;
                        break;
                    case 'cloud coverage':
                        //console.log(data[i])
                        document.getElementById("LatestCloudCoverage").innerText = `${data[position].value} %`;
                        break;
                }
            }
            
          })
          .catch((error) => {
            console.log("error");
          });
}



//CODE RELATED TO GETTING HISTORICAL DATA
const getHistorical = (city) => {
    fetch(`http://localhost:8080/data/${city}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => (response.ok ? response : Promise.reject(response)))
          .then((res) => res.json())
          .then((data) => {

            let min = 0, max = 0, totalPrecipitation = 0, totalWind = 0, countWindspeed = 0;

            for(let i = data.length-1; i > data.length - 97; i--) {


                let position = data.length - i -1;
            
                switch(data[position].type){
                    case 'temperature': 
                        console.log(data[i])
                        if(data[i].value <= min){
                            min = data[i].value;
                        }
                        if(data[i].value >= max){
                            max = data[i].value;
                        }
                        break;
                    case 'precipitation':
                        totalPrecipitation += data[i].value;
                        break;
                    case 'wind speed':
                        console.log(data[i])
                        totalWind += data[i].value;
                        countWindspeed++;
                        break;
                }
            }
            document.getElementById("MinTemperature").innerText = `${min} C`;
            document.getElementById("MaxTemperature").innerText = `${max} C`;
            document.getElementById("TotalPrecipitation").innerText = `${totalPrecipitation.toFixed(4)} m/s`;
            document.getElementById("AverageWindSpeed").innerText = `${(totalWind/countWindspeed).toFixed(4)} %`;
          })
          .catch((error) => {
            console.log("error");
          });
}














