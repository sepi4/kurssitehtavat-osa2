import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName.length === 0) {
      return
    }
    setPersons([...persons, { name: newName }])
    setNewName("")
  }

  const handleNewNameInput = event => {
    const name = event.target.value
    setNewName(name)
  }

  const mapPersons = persons.map((p, i) => 
    <li key={p.name+i} >{p.name}</li>
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{mapPersons}</ul>
    </div>
  )

}

export default App
