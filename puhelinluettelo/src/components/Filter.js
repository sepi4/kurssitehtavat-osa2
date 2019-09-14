import React from 'react'

const Filter = ({filter, setFilter}) => <>
  filter shown with 
  <input 
    value={filter}  
    onChange={(event) => setFilter(event.target.value)}
  />
</>

export default Filter
