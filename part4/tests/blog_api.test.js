const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const{test, beforeEach, after, describe} = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const user = require('../models/user')
app = require('../app')

api = supertest(app)

describe('testing blog and their operation', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.intial_blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })


  test('test the json Format and correct number of Get request', async () => {
    
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.length, helper.intial_blogs.length)
    
  })

  

  describe('testing post with token verification', () => {
    let token =''
    beforeEach(async () => {
      await User.deleteMany({})

      
      const user = await api.post('/api/users')
        .send({
          username: 'test',
          password: 'test',
          name: 'test'
        })
      
      const loginResponse = await api.post('/api/login')
        .send({
          username: 'test',
          password: 'test'
        })
      
      token = loginResponse.body.token

    })


    test('verify creating a new post', async() => {
      const blogsBeforeSave = await helper.blogsInDB()
      const blog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
      }
  
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
      
      const blogsAfterSave = await helper.blogsInDB()
      const blogTitel = blogsAfterSave.map(blog => blog.title)
  
      assert.strictEqual(blogsAfterSave.length , blogsBeforeSave.length + 1)
      assert(blogTitel.includes('First class tests'))
  
    })

    
    test('adding blog without the token return 401', async () => {
      const blogsBeforeSave = await helper.blogsInDB()
        const blog = {
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
        }
    
        await api.post('/api/blogs')
          .send(blog)
          .expect(401)
        
        const blogsAfterSave = await helper.blogsInDB()
        const blogTitel = blogsAfterSave.map(blog => blog.title)
    
        assert.strictEqual(blogsAfterSave.length , blogsBeforeSave.length)
        assert(!blogTitel.includes('First class tests'))
    })

    test('blog posts have id field instead of _id', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 5
      }
    
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      assert.ok(response.body.id)
      assert.strictEqual(response.body._id, undefined);
      
    
      const blogsInDb = await helper.blogsInDB()
      
      blogsInDb.forEach(blog => {
        assert.ok(blog.id);         
        assert.strictEqual(blog._id, undefined)
      })
    })
    
    test('adding missing likes property got likes with 0', async () => {
      const missingLikeBolg =  {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
      }
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(missingLikeBolg)
        .expect(201)
      
      const blogs = await helper.blogsInDB()
      const testBlog = blogs.filter(blog => blog.title ==='Type wars')[0] 
      assert.strictEqual(testBlog.likes , 0)
    })
  
    test('missing url blog return 400', async () => {
      const missingUrlBolg =  {
        title: "Type wars",
        author: "Robert C. Martin",
      }
  
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(missingUrlBolg)
        .expect(400)
    })
  
    test('missing titel blog return 400',async () => {
      const missingTitelBolg =  {
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
      }
  
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(missingTitelBolg)
        .expect(400)
    })
  
    test('updating a number of likes of existing blog', async () => {
      const BlogsBeforeUpdate = await helper.blogsInDB()
      const blogToUpdate = BlogsBeforeUpdate[0]
      const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send({likes : 20})
        
      
      
      assert.strictEqual(response.body.likes, 20)
  
    })
  
  })

  describe.only('deltion with token autentication', ()=> {
      let ownerToken = '';
      let otherUserToken = '';
      let blogToDelete;
    
      beforeEach(async () => {
        
        await Blog.deleteMany({});
        await User.deleteMany({});
    
       
        const owner = {
          username: 'blogowner',
          name: 'Owner',
          password: 'ownerpass'
        }
        await api.post('/api/users').send(owner)
        const ownerLogin = await api.post('/api/login').send({
          username: 'blogowner',
          password: 'ownerpass'
        })

        ownerToken = ownerLogin.body.token
 
        const newBlog = {
          title: "To be deleted",
          author: "Owner",
          url: "http://delete.example.com",
          likes: 5
        }
        
        const response = await api.post('/api/blogs')
          .set('Authorization', `Bearer ${ownerToken}`)
          .send(newBlog);
        
        blogToDelete = response.body;

        const otherUser = {
          username: 'otheruser',
          name: 'Other User',
          password: 'otherpass'
        }

        await api.post('/api/users').send(otherUser);
        const otherLogin = await api.post('/api/login').send({
          username: 'otheruser',
          password: 'otherpass'
        })

        otherUserToken = otherLogin.body.token;
      })

    test('deleting a resource that exist', async  () => {
      blogsBeforDel = await helper.blogsInDB()
     

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(204)
      
      const blogsAfterDel = await helper.blogsInDB()
      assert.strictEqual(blogsAfterDel.length + 1 , blogsBeforDel.length)
      
      const blogs_id = blogsAfterDel.map(blog => blog.id)
      assert(!blogs_id.includes(blogToDelete.id))
    } )
  
    test('deleting a resource that does not exist', async () => {
      
      const blogToDelte = {
        id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
      }
  
      const blogsBeforDel = await helper.blogsInDB()
      await api.delete(`/api/blogs/${blogToDelte.id}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(204)
      
      const blogsAfterDel = await helper.blogsInDB()
      assert.strictEqual(blogsAfterDel.length, blogsBeforDel.length)
      const blog_ids = blogsAfterDel.map(blog => blog.id)
      assert(!blog_ids.includes(blogToDelte.id))
  
    })
  })
 

  describe('test modifiction', ()=>{
    
    test('updating number of likes of non existing blog', async () => {
      const blogToUpdate = {
        id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
      } 
      
      await api.put(`/api/put/${blogToUpdate.id}`)
        .expect(404)
    })
  })

})

test.only('adding a valid person', async() => {
  const usersAtStart = await helper.usersInDB()

  const newUser = {
    username : 'badr',
    password: 'test',
    name : 'baha'
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  
  const usersAtEnd = await helper.usersInDB()
  assert.strictEqual(usersAtEnd.length , usersAtStart.length +1)
  assert(usersAtEnd.map(user => user.username).includes(newUser.username))
})

describe.only('adding invalid perosn', () => {

  beforeEach(async() => {

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('test', 10)
    const user = new User({
      username: 'test',
      password: passwordHash,
      name: 'test'
    })

    await user.save()

  })

  test('without giving the username', async () => {
    const usersAtStart = await helper.usersInDB()

    const user = {
      password:'test',
      name:'test'
    }
    const message = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()
    
    assert.strictEqual(usersAtStart, usersAtStart)
    
    assert(message.body.error.includes('username: Path `username` is required'))
    
  })

  test('username less than 3 chatrter long', async () => {
  const usersAtStart = await helper.usersInDB()

    const user = {
      username:'te',
      password:'test',
      name:'test'
    }
    const message = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()
    
    assert.strictEqual(usersAtStart, usersAtStart)
    
    assert(message.body.error.includes('shorter than the minimum allowed length (3)'))
  })

  test('without giving the password', async () => {
    const usersAtStart = await helper.usersInDB()

    const user = {
      username:'test',
      name:'test'
    }
    const message = await api
      .post('/api/users')
      .send(user)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDB()
    
    assert.strictEqual(usersAtStart, usersAtStart)
    
    assert(message.body.error.includes('password must be  given'))
  })

  test('password less than 3 chatrter long', async () => {
    const usersAtStart = await helper.usersInDB()

    const user = {
      username:'test',
      password:'te',
      name:'test'
    }
    const message = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()
    
    assert.strictEqual(usersAtStart, usersAtStart)
    
    assert(message.body.error.includes('password must be at least 3 characters long'))
  })

  test('username in not unique', async() => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username : 'test',
      password : 'test',
      name: 'test'
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()
    
    assert.strictEqual(usersAtStart, usersAtStart)
    assert(result.body.error.includes('expected `username` to be unique'))
  })


})


after(async () => {
  await mongoose.connection.close()
  console.log('closed')
})
