import React, {useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BlogsDisplay from '../../components/BlogsDisplay/BlogsDisplay'

const Home = ({posts, setPosts}) => {
  // useEffect(() => {
  //   localStorage.setItem('posts', JSON.stringify(posts));
  // }, [posts]);

  // useEffect(() => {
  //   const storedPosts = localStorage.getItem('posts');
  //   if (storedPosts) {
  //     setPosts(JSON.parse(storedPosts));
  //   }
  // }, []);
  return (
    <div>
        <BlogsDisplay posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default Home