const express = require('express')
const morgan = require('morgan')
const app = express()




app.use(express.json())

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.content(req,res)
    ].join(' ')
  }))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request,response) => {
    response.json(persons)
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server ruunig on port ${PORT}`)
})


app.get('/info',(request, response)=>{
    const date = (new Date())
    const str = `<div>Phonebook has info for ${persons.length} people</div>
                 <div>${date.toString()}</div>`
    console.log(str)
    response.send(str)
})

app.get('/api/persons/:id', (request,response)=>{
    const id = request.params.id
    const person = persons.find(n => n.id===id)
    
    if(person){
        response.json(person)
    }else{
        response.status(404).json({
            error: `person with this id ${id} not found`
        })
    }
})

app.delete('/api/persons/:id',(request, response)=>{
    const id = request.params.id
    const person = persons.find(n => n.id===id)
    if(person){
        persons = persons.filter(n => n.id!==id)
        response.status(204).end()
    }else{
        response.status(404).end()
    }
    
})

randomInt = (max) =>{
    return Math.floor(Math.random() * max)
}

app.post('/api/persons',(request,response)=>{
    const body = request.body

    if(!body.name){
        return response.status(400).json(
            {error: 'the name shoud not be empty'}
        )
    }
    if(!body.number){
        return response.status(400).json(
            {error: 'the number shoud not be empty'}
        )
    }
    const finded = persons.find(n => n.name===body.name)
    if(finded){
        return response.status(400).json(
            {error: 'name must be unique'}
        )
    }
    const person = {...body, id : randomInt(1000)}
    persons = persons.concat(person)
    response.json(person)

})