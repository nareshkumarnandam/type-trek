import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BlogsDisplay from '../../components/BlogsDisplay/BlogsDisplay'

const Home = ({posts, setPosts}) => {
  return (
    <div>
        <BlogsDisplay posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default Home