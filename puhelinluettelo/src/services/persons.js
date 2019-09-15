import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const create = newObject => 
  axios
    .post(baseUrl, newObject)
    .then(responce => responce.data)

const deletePerson = id => 
  axios
    .delete(baseUrl + '/' + id)
    .then(responce => responce.data)



const getAll = () => 
  axios
    .get(baseUrl)
    .then(responce => responce.data)


export default { create, getAll, deletePerson }
