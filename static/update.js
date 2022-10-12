const weatherFactory = (type, value, time, place, unit) => {
    const getType = () => type
    const setType = (_type) => {
        type = _type
    }
    const getValue = () => value
    const setValue = (_value) => {
        value = _value
    }
    const getTime = () => time
    const setTime = (_time) => {
        time = _time
    }
    const getPlace = () => place
    const setPlace = (_place) => {
        place = _place
    }
    const getUnit = () => unit
    const setUnit = (_unit) => {
        unit = _unit
    }
    return {
        getType,
        setType,
        getValue,
        setValue,
        getTime,
        setTime,
        getPlace,
        setPlace,
        getUnit,
        setUnit
    }
}

const precipitationFactory = (type, value, time, place, unit, precipitation_type) => {
    const weather = weatherFactory(type, value, time, place, unit)
    const getPrecipitationType = () => precipitation_type
    const setPrecipitationType = (_type) => {
        precipitation_type = _type
    }
    return {
        ...weather,
        getPrecipitationType,
        setPrecipitationType
    }
}

const windSpeedFactory = (type, value, time, place, unit, direction) => {
    const weather = weatherFactory(type, value, time, place, unit)
    const getDirection = () => direction
    const setDirection = (_direction) => {
        direction = _direction
    }
    return {
        ...weather,
        getDirection,
        setDirection
    }
}

const updateDataXHL = () => {
    let type = document.getElementById('input[name="type"]')
    switch (type) {
        case 'temperature':
            const obj = weatherFactory(
                'temperature', document.getElementById('value'),
                document.getElementById('timeValue'),
                document.getElementById('input[name="place"]').value, "C")

            const json = JSON.parse(obj)
            const jsonString = JSON.stringify(json)

            const xhr = new XMLHttpRequest()
            xhr.open('POST', `http://localhost:8080/data`)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.onload = () => {
                console.log(xhr.responseText)
            }
            xhr.onerror = () => {
                console.log('Error')
            }
            xhr.send(jsonString)
            break
        case 'precipitation':
            const precipitationObj = precipitationFactory(
                'precipitation', document.getElementById('value'),
                document.getElementById('timeValue'),
                document.getElementById('input[name="place"]').value,
                document.getElementById('precipitationValue'), "mm")

            const json1 = JSON.parse(precipitationObj)
            const jsonString1 = JSON.stringify(json1)

            const precXhr = new XMLHttpRequest()
            precXhr.open('POST', `http://localhost:8080/data`)
            precXhr.setRequestHeader('Content-Type', 'application/json')
            precXhr.onload = () => {
                console.log(precXhr.responseText)
            }
            precXhr.onerror = () => {
                console.log('Error')
            }
            precXhr.send(jsonString1)
            break
        case 'windSpeed':
            const windObj = windSpeedFactory(
                'wind speed', document.getElementById('value'),
                document.getElementById('timeValue'),
                document.getElementById('input[name="place"]').value,
                document.getElementById('directionValue'), "m/s")

            const json2 = JSON.parse(windObj)
            const jsonString2 = JSON.stringify(json2)

            const windXhr = new XMLHttpRequest()
            windXhr.open('POST', `http://localhost:8080/data`)
            windXhr.setRequestHeader('Content-Type', 'application/json')
            windXhr.onload = () => {
                console.log(windXhr.responseText)
            }
            windXhr.onerror = () => {
                console.log('Error')
            }
            windXhr.send(jsonString2)
            break
    }
}

const updateDataFetch = () => {
    console.log("fetch update");

    const obj = weatherFactory(
        'temperature', 
        document.getElementById('value'),
        document.getElementById('timeValue'),
        document.getElementById('input[name="place"]').value, 
        "C")

    const json = JSON.parse(obj)
    const jsonString = JSON.stringify(json)


  
    fetch("http://localhost:8080/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonString,
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .catch((e) => console.log(e));
  };

