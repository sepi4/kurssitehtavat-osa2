import React from 'react'

const Country = ({country}) => <>
  <h1>{country.name}</h1>
  <p>capital: {country.capital}</p>
  <p>population: {country.population}</p>
  <h2>languages</h2>
  <ul>
    {country.languages.map((lan, i) => 
      <li key={lan.name+i}>{lan.name}</li>)
    }
  </ul>
  <img 
    width={100} 
    alt={`flag of ${country.flag}`} 
    src={country.flag} 
  />
</>

export default Country
