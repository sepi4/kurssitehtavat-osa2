import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Weather from './Weather'
import Country from './Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState("")

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then((responce) => {
      setCountries(responce.data)
    })
  }
  useEffect(hook, [])


  const mapCountries = () => {
    const filteredCountries = countries.filter(c => {
      return c.name.toLowerCase().includes(search.toLowerCase())
    })
    if (filteredCountries.length === 0) {
      return
    }
    if (filteredCountries.length > 10) {
      return "Too many matches,  specify another filter"
    }
    if (filteredCountries.length > 1) {
      return filteredCountries.map((c, i) => 
        <li key={c.name+i}>
          {c.name}
          <button onClick={() => setSearch(c.name)}>show</button>
        </li>)
    }
    const country = filteredCountries[0]
    const address = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha2Code}&appid=60e3501225f6d3ee6ef22aac0280d2c9`

    if (weather.name !== country.capital) {
      axios.get(address)
        .then((responce) => {
          setWeather(responce.data)
          // console.log(responce.data)
        })
    }
    

    // console.log('render')
    return (
      <div>
        <Country country={country} />
        {weather 
            ?
              <Weather 
                city={country.capital}
                temp={weather.main.temp}
                windSpeed={weather.wind.speed}
                windDirection={weather.wind.deg}
                icon={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
            : ""
        }
      </div>
    )
  }

  return (
    <div>
      find countries
      <input 
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div>
        {mapCountries()}
      </div>
    </div>
  )
}

export default App
