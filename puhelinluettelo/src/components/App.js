import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const baseUrl = "http://localhost:3001/persons"

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName.length === 0 || newNumber.length === 0) {
      return
    }
    const unique = persons.find(p => p.name === newName) === undefined
    if (!unique) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { 
      name: newName,
      number: newNumber,
      id: Math.random(),
    }
    axios
      .post(baseUrl, newPerson)
      .then((responce) => {
        console.log(responce.data)
        setPersons(persons.concat(responce.data))
        setNewName("")
        setNewNumber("")
      })

  }

  const mapPersons = persons
    .filter((p) => 
      p.name.toLowerCase().includes(filter.toLowerCase()))
    .map((p, i) => 
      <li key={p.name+i} >{p.name} {p.number}</li>)

  const hook = () => {
    axios
      .get(baseUrl)
      .then((responce) => {
        // console.log(responce)
        setPersons(responce.data)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter  
        filter={filter}
        setFilter={setFilter}
      />

      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={mapPersons} />
    </div>
  )

}

export default App
