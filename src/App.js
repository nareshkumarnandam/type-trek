import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import data from './data';
import CreatePostPage from './pages/CreatePost/CreatePostPage';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [posts, setPosts] = useState(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    return storedPosts || data;
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home posts={posts} setPosts={setPosts} />} />
      <Route path='/create-post' element={<CreatePostPage posts={posts} setPosts={setPosts} />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
