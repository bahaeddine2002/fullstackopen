import { useState } from 'react'


const Display = ({text}) => {
  return (
    <h1>
      {text}
    </h1>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}


const Statistics = (props) => {
  let average = (props.good - props.bad)/(props.good + props.neutral + props.bad)
  if (props.good + props.neutral + props.bad != 0){
    return (
      <table>
        <tbody>
            <tr><StatisticLine text="good" value={props.good}/></tr>
            <tr><StatisticLine text="neutral" value={props.neutral}/></tr>
            <tr><StatisticLine text="bad" value={props.bad}/></tr>
            <tr><StatisticLine text="all" value={props.good + props.neutral + props.bad}/></tr>
            <tr><StatisticLine text="average" value={average}/></tr>
            <tr><StatisticLine text="positive" value={props.good/(props.good + props.neutral + props.bad) * 100} percent="%"/></tr>
        </tbody>
      </table>
    )
  }

    return(
      <h3>No feedback given</h3>
    )
}

const StatisticLine = (props) => {
  return (
    <td>
      {props.text} {props.value} {props.percent}
    </td>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = (good) =>{
    setGood(good)
    
  } 

  const incrementNeutral = (neutral) =>{
    setNeutral(neutral)
   
  }

  const incrementBad = (bad) =>{
    setBad(bad)
    
  }

  let average = (good - bad)/(good + neutral + bad)

  return (
    <div>
      <Display text="Give feedback"/>
      <Button text="good" onClick={()=>incrementGood(good + 1)}/>
      <Button text="neutral" onClick={()=>incrementNeutral(neutral + 1)}/>
      <Button text="bad" onClick={()=>incrementBad(bad + 1)}/>
      <Display text="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App