import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = ()=>{
    return axios
    .get(baseUrl)
    .then((response)=>{
        return response.data
})
}

const create = newObj =>{
    return axios
    .post(baseUrl,newObj)
    .then(reponse =>reponse.data)
}

const del = (id) =>{
    return axios
    .delete(baseUrl+`/${id}`)
}

const update = (id,newObj) =>{
    return axios
    .put(`${baseUrl}/${id}`,newObj)
    .then(reponse =>reponse.data)
}


export default {
    getAll,
    create,
    del,
    update
}