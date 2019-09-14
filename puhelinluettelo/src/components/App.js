import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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

  const mapPersons = persons
    .filter((p) => 
      p.name.toLowerCase().includes(filter.toLowerCase()))
    .map((p, i) => 
      <li key={p.name+i} >{p.name} {p.number}</li>
    )


  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with <input 
        value={filter}  
        onChange={(event) => setFilter(event.target.value)}
      />
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName}  
            onChange={event => setNewName(event.target.value)}
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber}  
            onChange={event => setNewNumber(event.target.value)}
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
