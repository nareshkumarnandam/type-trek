import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BlogsDisplay from '../../components/BlogsDisplay/BlogsDisplay'
import LoadingBar from 'react-top-loading-bar'

const Home = ({posts, setPosts}) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
              if (prevProgress < 100) {
                return prevProgress + 10;
              } else {
                clearInterval(interval);
                // navigate('/', { replace: true });
                return 100;
              }
            });
          }, 0);
    }, [])
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
        <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        <BlogsDisplay posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default Home