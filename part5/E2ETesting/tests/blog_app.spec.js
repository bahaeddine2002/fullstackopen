const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Reset the database
    await request.post('/api/testing/reset')

    // Create user
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'secret'
      }
    })

    // Go to the frontend
    await page.goto('/')
  })

  // 5.17
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    // 5.18 success
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'secret')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    // 5.18 failure
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'secret')
    })

    // 5.19
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Playwright Blog', 'Author', 'http://test.com')
      await expect(page.getByText('Playwright Blog')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Existing Blog', 'Author', 'http://test.com')
      })

      // 5.20
      test('a blog can be liked', async ({ page }) => {
        const blog = page.getByText('Existing Blog').locator('..')
        await blog.getByRole('button', { name: 'view' }).click()
        await blog.getByRole('button', { name: 'like' }).click()
        await expect(blog.getByText('likes 1')).toBeVisible()
      })

      // 5.21
      test('a blog can be deleted by the user who created it', async ({ page }) => {
        const blog = page.getByText('Existing Blog').locator('..')
        await blog.getByRole('button', { name: 'view' }).click()

        page.on('dialog', dialog => dialog.accept())
        await blog.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Existing Blog')).not.toBeVisible()
      })
    })

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Blog 1', 'A', 'url1')
        await createBlog(page, 'Blog 2', 'B', 'url2')
        await createBlog(page, 'Blog 3', 'C', 'url3')
      })

      // 5.22
      test('only creator sees the remove button', async ({ page }) => {
        const blog = page.getByText('Blog 1').locator('..')
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()
      })

      // 5.23
      test('blogs are ordered by likes', async ({ page }) => {
        // Like Blog 2 twice
        const blog2 = page.getByText('Blog 2').locator('..')
        await blog2.getByRole('button', { name: 'view' }).click()
        await blog2.getByRole('button', { name: 'like' }).click()
        await blog2.getByRole('button', { name: 'like' }).click()

        // Like Blog 3 once
        const blog3 = page.getByText('Blog 3').locator('..')
        await blog3.getByRole('button', { name: 'view' }).click()
        await blog3.getByRole('button', { name: 'like' }).click()

        // Assert order (Blog 2 should be on top)
        const blogs = await page.locator('.blog').allTextContents()
        expect(blogs[0]).toContain('Blog 2')
        expect(blogs[1]).toContain('Blog 3')
        expect(blogs[2]).toContain('Blog 1')
      })
    })
  })
})
