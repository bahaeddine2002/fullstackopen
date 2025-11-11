import { useState, useEffect } from 'react'

const CreationForm = ({onCreate}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNote = async(event) => {
    event.preventDefault()
    await onCreate(event, title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <form onSubmit={addNote}>
          <div>
            title: <input placeholder='title' value={title} onChange={({target})=>{setTitle(target.value)}}/>
          </div>
          <div>
            author: <input placeholder='author' value={author} onChange={({target})=>{setAuthor(target.value)}}/>
          </div>
          <div>
            url: <input placeholder='url' value={url} onChange={({target})=>{setUrl(target.value)}}/>
          </div>
          <div>
            <button type='submit'>create</button>
          </div>
        </form>
  )
}

export default CreationForm