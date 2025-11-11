import { render, screen } from "@testing-library/react"
import CreationForm from "./CreationForm"
import userEvent from "@testing-library/user-event"
import { expect } from "vitest"

test('mocking the cration of form',async () => {
  const createBlog = vi.fn()

  render(<CreationForm onCreate={createBlog} />)
  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('title')
  await user.type(titleInput, 'Debugging the Soul' )
  const authorInput = screen.getByPlaceholderText('author')
  await user.type(authorInput, 'Casey Kernel')
  const urlInput = screen.getByPlaceholderText('url')
  await user.type(urlInput, 'https://debugsoul.example.com')
  const sumbitButton = screen.getByText('create')
  await user.click(sumbitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][1]).toBe('Debugging the Soul')
  expect(createBlog.mock.calls[0][2]).toBe('Casey Kernel')
  expect(createBlog.mock.calls[0][3]).toBe('https://debugsoul.example.com')

  

})