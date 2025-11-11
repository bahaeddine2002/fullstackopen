import { useState,useEffect } from 'react'
import axios from 'axios'


 
const DisplayInfo = ({filtred,tempInfo})=>{
  const country = filtred[0]
 
  return(
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>

      
      <h2>Languages</h2>
      <ul>
      {Object.keys(country.languages).map((key, index)=>
      
      {return(<li key={index}>{country.languages[key]}</li>)}
    )
      }
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt}/>

      <h2>Weather in {country.capital}</h2>
      {tempInfo? (
        <>
          <div>Temperature {tempInfo.main.temp} Celcus</div>
          <img src={`https://openweathermap.org/img/wn/${tempInfo.weather[0].icon}@2x.png`} alt="Weather Icon" />
          <div>Wind {tempInfo.wind.speed} m/s</div>

        </>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  )
}


const DisplayList = ({filtred, onView})=>{
  return(
    <div>
      {filtred.map((country,i)=>{
        return(

        <div key={i}>{country.name.common} 
        <button onClick={()=>onView(country)}>Show</button>
        </div>
      )
      })
      }
    </div>
  )
}

const Display = (props) => {
    
    const filtredCount = props.filtredCount
    const nbr = filtredCount.length
    const onView = props.onView
    const tempInfo = props.tempInfo
    
    
    
    
    if(nbr>=10){
      return(
        <p>Too many matches, specify anthoer filter</p>
      )
    }else if(nbr===1){
      return(
      <DisplayInfo filtred={filtredCount} tempInfo={tempInfo} />
      )

    }else{
      return(
      <DisplayList filtred={filtredCount} onView={onView}/>
      )
    }
  
}

function App() {
  const [input, setInput] = useState(null)
  const [countries,setCountries] = useState([])
  const [filtredCount,setFiltredCount] = useState([])
  const [tempInfo,setTempInfo] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY
 


  const handelChange = (event)=>{
    setInput(event.target.value)
    const filtred = countries.filter((country) =>{
      const lowerContry = country.name.common.toLowerCase()
      return lowerContry.includes(event.target.value.toLowerCase()) 
    })
    setFiltredCount(filtred)
  }

  const onView = (country)=>{
    setFiltredCount([country])
  }

  useEffect(()=>{
    
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then((response)=>{
      setCountries(response.data)
    })
  },[])

  useEffect(()=>{
    if(filtredCount.length===1){
      console.log("fetching the weater ");
      const country = filtredCount[0]

      
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${api_key}`)
    .then((response)=> {
      setTempInfo(response.data)
   })}
  },[filtredCount])


 
  return (
   <div>
    find countries<input type='search' onChange={handelChange}/>
    <Display filtredCount={filtredCount} onView={onView} tempInfo={tempInfo}/>
   </div>
  )
}

export default App
