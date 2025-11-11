import { useState } from 'react'


const Login = (
  {onLogin,
  errorMsg,
  username,
  password,
  handelUsername,
  handelPassword}) => {
  
  return(
    <form onSubmit={(event)=>onLogin(event,username, password)}>
        <div>{errorMsg}</div>
        <div>
          username <input value={username}
          onChange={handelUsername}/>
        </div>

        <div>
          password <input type='password' 
          value={password}
          onChange={handelPassword}/>
        </div>

        <div>
          <button type='submit'>login</button>
        </div>
        
        
      </form>
  )
}


export default Login