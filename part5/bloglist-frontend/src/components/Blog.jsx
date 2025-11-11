import { useState } from "react"

const Blog = ({ blog,updateLikes, user, del }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [details,SetDetails] = useState(false)
  const hiddenVsisble = {display: details ?'':'none' }
  const update = ()=>{
    updateLikes(blog)
  }

  return (
  <div style={blogStyle}>
    <div className="visibleContent">
    {blog.title} {blog.author} 
    <button onClick={()=>SetDetails(!details)}>{details ? 'hide': 'view'}</button>
    </div>
    <div style={hiddenVsisble} className="hiddenContent">
      {blog.url}<br />
      {blog.likes} <button onClick={update}>like</button> <br />
      {blog.user.name} <br />
      {blog.user.username === user.username && <button onClick={()=> del(blog)} >remove</button>}
      
    </div>
  </div> 
  ) 
}

export default Blog