import React,{ useEffect } from 'react';
import Style from './PostPage.module.css';
import { useParams } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import placeholderImage from '../../assets/placeholderImage.jpg'

const PostPage = ({posts, setPosts}) => {
    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        }
      }, []);
      
    const { id, title } = useParams();
    const post = posts.find((post) => post.id === parseInt(id));
    const getTimeElapsed = (createdAt) => {
        const now = new Date().getTime(); // current timestamp in milliseconds
        const timeElapsed = now - createdAt;
    
        if (timeElapsed < 60000) {
          return `${Math.floor(timeElapsed / 1000)} sec ago`;
        } else if (timeElapsed < 3600000) {
          return `${Math.floor(timeElapsed / 60000)} min ago`;
        } else if (timeElapsed < 86400000) {
          return `${Math.floor(timeElapsed / 3600000)} hr ago`;
        } else if (timeElapsed < 2592000000) {
          return `${Math.floor(timeElapsed / 86400000)} d ago`;
        } else if (timeElapsed < 31104000000) {
          return `${Math.floor(timeElapsed / 2592000000)} m ago`;
        } else {
          return `${Math.floor(timeElapsed / 31104000000)} y ago`;
        }
      };

      const getFileFromLocalStorage = (postId) => {
        const storedFiles = localStorage.getItem('files');
        if (storedFiles) {
          const files = JSON.parse(storedFiles);
          const file = files.find((file) => file.postId === postId);
          return file;
        }
        return null;
      };
      
  
    if (!post) {
      return <p className={Style.postDisplay}>Post not found</p>;
    }
  
    return (
      <div className={Style.postDisplay}>
        <h1>{post.title}</h1>
        <div className={Style.extraInfo}>
              <div>
                <FaRegUser /> Owner
              </div>
              <div className={Style.categoryandtime}>
                <p className={Style.timeCreated}>
                  {getTimeElapsed(post.createdAt)} <CiClock1 />{" "}
                </p>
                <p className={Style.category}>{post.category}</p>
              </div>
            </div>
            {post.file !== null || post.file !== undefined ? (
              <div className={Style.thumbnail}>
                <img
                  src={getFileFromLocalStorage(post.id) ? URL.createObjectURL(getFileFromLocalStorage(post.id).file) : placeholderImage}
                  alt={post.title}
                />
              </div>
            ) : (
              <div className={Style.thumbnail}>
                <img
                  src={placeholderImage}
                  alt={post.title}
                />
              </div>
            )}
       
        <div className={Style.description} dangerouslySetInnerHTML={{ __html: post.content }} />
        
      </div>
    );
}

export default PostPage