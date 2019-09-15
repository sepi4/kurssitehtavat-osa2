import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

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
    return <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((lan, i) => <li key={lan.name+i}>{lan.name}</li>)}
      </ul>
      <img width={100} alt={`flag of ${country.flag}`} src={country.flag} />
    </div>
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

ReactDOM.render(<App />, document.getElementById('root'))
