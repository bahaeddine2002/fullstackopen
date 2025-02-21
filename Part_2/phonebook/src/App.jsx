import axios from 'axios'
import { useState, useEffect } from 'react'
import phoneServices from './services/phonbook'

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

const RenderPersons = ({persons,filtredPer,show, onDelete})=>{
  return(
    <>
      {show
      ? persons.map((person) => <SinglePer key={person.id} person={person} onDelete={onDelete} /> )
      : filtredPer.map((person) => <SinglePer key={person.id} person={person} onDelete={onDelete}/>)
      }
    </>
  )

}

const SinglePer = ({person, onDelete}) =>{
  return(
    <div>{person.name} {person.number} 
      <button onClick={()=>onDelete(person)}>delete</button>
    </div>


  )
}
              
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNbr, setNewNbr] = useState('')
  const [serPer, setSerPer] = useState('')
  const [filtredPer,setfiltredPer] = useState([])
  const [showAll,setShowAll] = useState(true)

  useEffect(()=>{

    phoneServices
    .getAll()
    .then(Per=>{
      setPersons(Per)
    })}
  ,[])

  const changeName = (event)=>{

    setNewName(event.target.value) 
  }


  const submitPerson = (event)=>{
    const intialvalue = 0
    event.preventDefault()
    const filtredPer = persons.filter(person => person===newName)
    
    
    if(filterPer.length !== 0){
    //alert(`${newName} is already to phonebook`)
      if(window.confirm(`${newName} is already to phonebook, replace the old number witha new one`)){
        const per = persons.find(n => n.name === newName)
        const changedNbr = { ...per,number: newNbr}
        
        phoneServices
        .update(changedNbr.id, changedNbr)
        .then(pers => {
          setPersons(persons.map(per => per.name === newName ? pers : per))
        })
      }

    }else{
      const newPer = {name : newName,
        number : newNbr,
        id : String(persons.length + 1)
      }

    phoneServices
    .create(newPer)
    .then(newObj=>{
      setPersons(persons.concat(newObj))
      setNewName('')
      setNewNbr('')
    })
      
    }

  }

  const onDelete = (person)=>{
    if(window.confirm(`do you want to delete ${person.name}`)){
      phoneServices
      .del(person.id)
      .then(resposne=>{
        console.log(resposne)
        setPersons(persons.filter(item=>item.id !== person.id))
      })
      
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
      newNbr={newNbr}  />
      
      <h2>Numbers</h2>
      <RenderPersons  persons={persons} filtredPer={filtredPer} show={showAll} onDelete={onDelete} />
      
    </div>
  )
}
export default App
