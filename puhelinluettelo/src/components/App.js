import React, { useState, useEffect } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

import personsService from '../services/persons'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName.length === 0 || newNumber.length === 0) {
      return
    }
    const withSameName = persons.find(p => p.name === newName)
    if (withSameName !== undefined) {
      const result = window.confirm(`${newName} is already in phonebook. Replace old number with new one?`)
      // console.log(withSameName)
      if (result) {
        personsService
          .updateNumber(withSameName.id, {...withSameName, number: newNumber })
          .then(retNote => {
            setPersons(persons.map(p => p.id !== retNote.id ? p : retNote))
            setNewName("")
            setNewNumber("")
          })
      }
      return
    }

    const newPerson = { 
      name: newName,
      number: newNumber,
      id: Math.random(),
    }

    personsService
      .create(newPerson)
      .then(retNote => {
        // console.log(retNote)
        setPersons(persons.concat(retNote))
        setNewName("")
        setNewNumber("")
      })
  }

  const handleDeletePerson = id => {
    const name = persons.find(p => p.id === id).name
    const result = window.confirm(`Delete ${name} ?`)
    if (result) {
      personsService
        .deletePerson(id)
        .then(retNote => {
          // console.log(retNote)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }


  const mapPersons = persons
    .filter(p => {
      return p.name.toLowerCase().includes(filter.toLowerCase())
    })
    .map((p, i) => 
      <li key={p.name+i} >
        {p.name} {p.number} 
        <button onClick={() => handleDeletePerson(p.id)}>delete</button>
      </li>)



  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  },[])

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
