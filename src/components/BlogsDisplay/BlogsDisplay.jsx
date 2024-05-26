import React, { useEffect } from "react";
import Style from "./BlogsDisplay.module.css";
import { FaRegUser } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import data from "../../data";
import placeholderImage from '../../assets/placeholderImage.jpg'
import { useNavigate } from "react-router-dom";

const BlogsDisplay = ({posts, setPosts}) => {

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);
  // const newposts = JSON.parse(localStorage.getItem('posts'));
  // console.log(newposts);
  const navigate = useNavigate();
  
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
  

  console.log(posts);

  return (
    <div className={Style.blogDisplay}>
      {posts.length === 0 ? (
        <p className={Style.noData}>No blogs created</p>
      ) : (
        posts.map((post, index) => (
          <div onClick={() => navigate(`/postPage/${post.id}/${post.title}`)} key={index} className={Style.blogCard}>
            {post.file !== null || post.file !== undefined ? (
              <div className={Style.blogimage}>
                <img
                  src={post.downloadUrl}
                  alt={post.title}
                />
              </div>
            ) : (
              <div className={Style.blogimage}>
                <img
                  src={placeholderImage}
                  alt={post.title}
                />
              </div>
            )}
            <div className={Style.postInfo}>
              <h3>{post.title}</h3>

              <div
                className={Style.description}
                dangerouslySetInnerHTML={{ __html: post.content }}
              >
                {/* {DOMPurify.sanitize(post.content)} */}
                {/* <p>{DOMPurify.sanitize(post.content).replace(/<[^>]+>/g, '')}</p> */}
              </div>
            </div>

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
          </div>
        ))
      )}
    </div>
  );
};

export default BlogsDisplay;
