const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  
  const reducer = (sum, item ) =>{
    return sum + item.likes
  }

  const sum = blogs.reduce(reducer, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item ) => {
    return max > item.likes
    ? max
    : item.likes
  }

  const maxLikes = blogs.reduce(reducer,-1)
  return maxLikes === -1
    ? {}
    : blogs.filter((item) => item.likes === maxLikes)[0]
}


const mostBlogs = (blogs) => {
 if(blogs.length === 0){
    return {}
  }else{
    let maxAuthor = blogs[0].author
    let maxBlog = 0
    blogs.forEach((item) => {
      let author = item.author
      if(maxBlog < blogs.filter((item) => item.author === author).length ){
        maxAuthor = item.author
        maxBlog = blogs.filter((item) => item.author === author).length
      }
    })
    return {
      author : maxAuthor,
      blogs : maxBlog
    }
  }
  
}

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return {}
  }else{
    let maxAuthor = blogs[0].author
    let maxLikes = 0
    blogs.forEach((item) => {
      let author = item.author
      let likesAuthor = totalLikes(blogs.filter((item) => item.author === author))
      if( maxLikes<likesAuthor ){
        maxAuthor = item.author
        maxLikes = likesAuthor
      }
    })
    return {
      author : maxAuthor,
      likes : maxLikes
    }
  } 
}


module.exports = { 
  dummy,
  totalLikes,
  favoriteBlog ,
  mostBlogs,
  mostLikes
}