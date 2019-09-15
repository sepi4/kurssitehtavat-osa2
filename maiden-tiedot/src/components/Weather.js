import React from 'react'

const kelToCel = (kel) => {
  return Math.round(( kel - 273.15 ) * 10) / 10
}

const Weather = ({city, temp, windSpeed, windDirection, icon}) => <>
  <h2>Weather in {city}</h2>
  <p>temperature: {kelToCel(temp)} C</p>
  <img alt="icon" src={icon} />
  <p>wind: speed {windSpeed} m/s</p>
  <p>direction: {windDirection} deg</p>
</>

export default Weather
