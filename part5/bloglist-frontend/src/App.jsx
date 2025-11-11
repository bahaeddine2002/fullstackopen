import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import LandingPage from './components/LandingPage'
import Togglable from './components/Togglable' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [errormsg, setErrorMsg] = useState('')
  const [upadate, setUpdated] = useState(false)
  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs( blogs )
    }
    )  
  },[])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('LoggedUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)

    }
  },[])

    const handelLogin = async (event, username, password) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username:username,
        password:password
      })
      window.localStorage.setItem(
        'LoggedUser',JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)

    }catch(excption){
      setErrorMsg('wrong username or password')
      setTimeout(() => {
        setErrorMsg('')
    },5000)
    }
  }


  const handelLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('LoggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handelCreation = async (event, title, author, url) => {
    try{
    console.log(user.token)
    const BlogCreated = await blogService.create(
      {
        title:title,
        author:author,
        url:url
      }
    )
    const newBlogs = blogs.concat(BlogCreated) 
    setBlogs(newBlogs)

    
    setMsg(`a new blog ${BlogCreated.title} By ${BlogCreated.author}`)
    setTimeout(() => {
      setMsg('')
    },5000)

    }catch(e){
      console.log(e)
    }
  }

  const updateLike = async (oldObj) => {
    oldObj.likes = oldObj.likes+1
    const newObj = await blogService.update(oldObj,oldObj.id)
    setBlogs(blogs.filter(blog => blog.id !== oldObj.id ).concat(newObj))
    setUpdated(!upadate)
  }

  const delBlog = async (blog)=> {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (confirm) {
      try {
        await blogService.del(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (e) {
        console.error('Failed to delete blog:', e)
      }
    }
  }



  if (user === null) {
    return(
      <div>
        <h2>LOGIN</h2>
          <Login onLogin={handelLogin} errorMsg={errormsg}
            username={username} password={password}
            handelUsername={({target}) => {setUsername(target.value)}}
            handelPassword={({target}) => {setPassword(target.value)}}/>
        
      </div>
        )
      
  }

  return (  
    <div>
      <LandingPage
        onCreate={handelCreation}
        onLogout={handelLogout} 
        msg={msg}
        user={user}
        blogs = {blogs}
        updateLikes = {updateLike}
        del = {delBlog} />
    </div>
  )
}

export default App