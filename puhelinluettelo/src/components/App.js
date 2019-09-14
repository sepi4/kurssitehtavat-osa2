import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567',
    },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
    }
    setPersons([...persons, newPerson])
    setNewName("")
    setNewNumber("")
  }

  const handleNewNameInput = event => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNewNumberInput = event => {
    const number = event.target.value
    setNewNumber(number)
  }

  const mapPersons = persons.map((p, i) => 
    <li key={p.name+i} >{p.name} {p.number}</li>
  )


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName}  
            onChange={handleNewNameInput}
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber}  
            onChange={handleNewNumberInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{mapPersons}</ul>
    </div>
  )

}

export default App
