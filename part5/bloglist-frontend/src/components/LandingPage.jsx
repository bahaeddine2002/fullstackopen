import CreationForm from "./CreationForm"
import Togglable from "./Togglable"
import Blog from "./Blog"
const LandingPage = ({onCreate,
   onLogout,
   msg,
   user,
   blogs,
   updateLikes,
   del}) => {
  return(
    <div>
      <h2>blogs</h2>
      <div>{msg}</div>
      <div>
        Welcome {user.name}
        <button onClick={onLogout}>logout</button>
      </div>
      <div>
        <Togglable buttonLable={'New Note'}>
          <h2>create new</h2>
          <CreationForm onCreate={onCreate} />
        </Togglable>
      </div>
      <br/>
      <div>
        {blogs.sort((a,b)=>b.likes - a.likes).map(blog =>{
          return(
            <Blog key={blog.id}
             blog={blog} 
             updateLikes={updateLikes} 
             user={user}
             del = {del} />
          )
        }
        )} 
      </div>
    </div>
  )
}

export default LandingPage