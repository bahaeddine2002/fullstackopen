import { useState } from 'react'

const Filter = ({onChange})=>{
  return(

  <div>filter shown with<input type='search' onChange={onChange}/></div>
  )

}

const PersonForm= ({OnSubmit,OnChangeName,OnChangeNbr,newName,newNbr})=>{
  return(
      <form onSubmit={OnSubmit}>
        <div>
          name: <input value={newName} onChange={OnChangeName}/>
        </div>
        <div>
          number: <input value={newNbr} onChange={OnChangeNbr} />
        </div>
        
        <div>
          <button type="submit" >add</button>
        </div>
      
        </form>
  )
}

const RenderPersons = ({persons,filtredPer,show})=>{
  return(
    <>
      {show
      ? persons.map((person) => <SinglePer key={person.id} person={person} /> )
      : filtredPer.map((person) => <SinglePer key={person.id} person={person} />)
      }
    </>
  )

}

const SinglePer = ({person}) => <div>{person.name} {person.number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNbr, setNewNbr] = useState('')
  const [serPer, setSerPer] = useState('')
  const [filtredPer,setfiltredPer] = useState([])
  const [showAll,setShowAll] = useState(true)

  const changeName = (event)=>{

    setNewName(event.target.value) 
  }


  const submitPerson = (event)=>{
    const intialvalue = 0
    event.preventDefault()
    let nbr = persons.reduce(
      (redu,person)=>{
        if(newName === person.name){
          redu+=1
        }
        return redu
      },intialvalue,
    )
    
    if(nbr === 0){
    const newPer = {name : newName,
      number : newNbr,
      id : String(persons.length + 1)
    }
    setPersons(persons.concat(newPer))
    setNewName('')
    setNewNbr('')
    }else{
      alert(`${newName} is already to phonebook`)
    }


  }

  const changeNbr = (event)=>{
    setNewNbr(event.target.value)
    
  }

  const filterPer = (event) =>{
    setSerPer(event.target.value)
    if( event.target.value.length === 0){
      setShowAll(true)
    }else{
      setShowAll(false)
    }
    const lowerName = event.target.value.toLowerCase()
    const res = persons.filter((person)=>{
      return person.name.toLowerCase().includes(lowerName)
    })
  
    setfiltredPer(res)
  }

  

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterPer}/>  
      
      <h2>add a new</h2>
      <PersonForm OnSubmit={submitPerson} 
      OnChangeName={changeName} OnChangeNbr={changeNbr} newName={newName}
      newNbr={newNbr} />
      
      <h2>Numbers</h2>
      <RenderPersons  persons={persons} filtredPer={filtredPer} show={showAll} />
      
    </div>
  )
}
export default App
