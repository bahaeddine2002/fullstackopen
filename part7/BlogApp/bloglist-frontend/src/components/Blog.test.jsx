import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"
import { expect } from "vitest"

test('only the blog title and authore displaying in begginig', () => {
  const blog = {
    title: "Debugging the Soul",
    author: "Casey Kernel",
    url: "https://debugsoul.example.com",
    user:{
      username:"adama",
      name:"baha"
    }
  }

  const user = {
    username : "bibou",
    name: "baha"
  }
  const {container} = render(<Blog blog={blog} user={user}/>)
  const div = container.querySelector('.hiddenContent')

  expect(div).toHaveStyle('display: none')

  
})

test('the deatils are showen when the button is clicked',async ()=> {
   const blog = {
    title: "Debugging the Soul",
    author: "Casey Kernel",
    url: "https://debugsoul.example.com",
    user:{
      username:"adama",
      name:"baha"
    }
  }
  const userr= {
    username : "bibou",
    name: "baha"
  }
  const {container} = render(<Blog blog={blog} user={userr}/>)
  const div = container.querySelector('.hiddenContent')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button) 
  expect(div).not.toHaveStyle('display: none')
})

test('like button is clicked twice', async() => {
   const blog = {
    title: "Debugging the Soul",
    author: "Casey Kernel",
    url: "https://debugsoul.example.com",
    likes :0,
    user:{
      username:"adama",
      name:"baha"
    }
  }
  const userr= {
    username : "bibou",
    name: "baha"
  }

  const likeBlog = vi.fn()
  const user = userEvent.setup()
  const {container} = render(<Blog blog={blog}  updateLikes={likeBlog} user={userr} />)
  
  const viewbutton = screen.getByText('view')
  await user.click(viewbutton)
  
  const likebutton = screen.getByText('like')
  await user.click(likebutton)
  await user.click(likebutton)
  expect(likeBlog.mock.calls).toHaveLength(2)


})

