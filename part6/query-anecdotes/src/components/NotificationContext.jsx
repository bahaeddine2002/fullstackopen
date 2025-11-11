/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

 const NotificationReducer = (state, action) => {


    switch (action.type) {
      case 'CREATE':
        return `new anecdotes is created '${action.payload}' `
      case 'VOTED':
        return `anecdote '${action.payload}' voted` 
      case 'ERROR':
        return 'too short anecdotes, must have lenght 5 or more'
      default : 
        return '' 
    }

    
  }

const NotificationContext = createContext()


export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, "")

  return (
    <NotificationContext.Provider value= {{ notification, notificationDispatch}} >
      {props.children}
    </NotificationContext.Provider>
  )
}




export default NotificationContext