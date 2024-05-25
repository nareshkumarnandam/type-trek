import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import data from './data';
import CreatePostPage from './pages/CreatePost/CreatePostPage';
import Navbar from './components/Navbar/Navbar';
import PostPage from './pages/PostPage/PostPage';

function App() {
  const [posts, setPosts] = useState(data);
  // console.log(data);
  

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home posts={posts} setPosts={setPosts} />} />
      <Route path='/create-post' element={<CreatePostPage posts={posts} setPosts={setPosts} />} />
      <Route path='/postPage/:id/:title' element={<PostPage posts={posts} setPosts={setPosts} />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
