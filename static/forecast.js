const getForecast = (city) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `http://localhost:8080/forecast/${city}`)
    xhr.onload = () => {
        let transformedData = JSON.parse(xhr.responseText)
        clearData()
        for (let i = 92; i > 0; i -= 4) {
            console.log(transformedData[i])
            addData(transformedData[i])
        }

    }
    xhr.onerror = () => {
        console.log('could not get forecast')
    }
    xhr.send()
}

const clearData = () => {
    let table = document.getElementById('forecastTable')
    let length = table.tBodies[0].rows.length

    for(let i = 1; i < length; i++) {
        document.getElementById('forecastTable').deleteRow(1)
    }
}

function addData(data) {
    let table = document.getElementById('forecastTable')
    var row = table.insertRow(1)
    var minTempCell = row.insertCell(0)
    var maxTempCell = row.insertCell(1)
    var timestampCell = row.insertCell(2)
    var placeCell = row.insertCell(3)
    minTempCell.innerHTML = data.from
    maxTempCell.innerHTML = data.to
    timestampCell.innerHTML = data.time
    placeCell.innerHTML = data.place
}

const getLastMeasurments = (place) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `http://localhost:8080/data/${place}`)
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        for (let i = 0; i < 4; i++) {
            let position = data.length - i - 1
            switch (data[position].type) {
                case 'temperature':
                    console.log(data[position].value)
                    document.getElementById('lastTemp').innerHTML = `${data[position].value} C`
                    break
                case 'precipitation':
                    console.log(data[position].value)
                    document.getElementById('lastPrecipitation').innerHTML = `${data[position].value} mm`
                    break
                case 'wind speed':
                    console.log(data[position].value)
                    document.getElementById('lastWindSpeed').innerHTML = `${data[position].value} m/s`
                    break
                case 'cloud coverage':
                    console.log(data[position].value)
                    document.getElementById('lastCloudCoverage').innerHTML = `${data[position].value} %`
                    break
            }
        }
    }
    xhr.onerror = () => {
        console.log('error loading last records')
    }
    xhr.send()
}

const getHistoricalData = (place) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `http://localhost:8080/data/${place}`)
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        let minimunTemperature = 0
        let maximumTemperature = 0
        let totalPrecipitation = 0
        let totalWindSpeed = 0
        let windSpeedRecords = 0

        for (let i = data.length - 1; i > data.length - 97; i--) {
            switch (data[i].type) {
                case 'temperature':
                    if (data[i].value <= minimunTemperature) {
                        minimunTemperature = data[i].value
                        break
                    }
                    if (data[i].value >= maximumTemperature) {
                        maximumTemperature = data[i].value
                        break
                    }
                    
                case 'precipitation':
                    totalPrecipitation += data[i].value
                    break
                case 'wind speed':
                    totalWindSpeed += data[i].value
                    windSpeedRecords++
                    break
            }
        }

        document.getElementById('minTemperature').innerHTML = `${minimunTemperature} C`
        document.getElementById('maxTemperature').innerHTML = `${maximumTemperature} C`
        document.getElementById('totalPrecipitation').innerHTML = `${totalPrecipitation.toFixed(4)} mm`
        document.getElementById('avgWind').innerHTML = `${(totalWindSpeed / windSpeedRecords).toFixed(4)} m/s`
    }
    xhr.onerror = () => {
        console.log('error getting hystorical data')
    }
    xhr.send()
}

const update = (place) => {
    getForecast(place)
    getHistoricalData(place)
    getLastMeasurments(place)
}