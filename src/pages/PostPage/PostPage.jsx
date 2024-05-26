import React, { useState, useEffect } from "react";
import Style from "./PostPage.module.css";
import { useParams } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import placeholderImage from "../../assets/placeholderImage.jpg";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast";

const PostPage = ({ posts, setPosts }) => {
  const { id, title } = useParams();
  const [progress, setProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  const navigatehome = useNavigate();
  const post = posts.find((post) => post.id === parseInt(id));

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

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

  const handleDelete = () => {
    const updatedPosts = posts.filter((post) => post.id !== parseInt(id));
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setToastMessage("Post deleted successfully!");
  };

  useEffect(() => {
    if (toastMessage) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 10;
          } else {
            clearInterval(interval);
            navigatehome("/");
            return 100;
          }
        });
      }, 100);
    }
  }, [toastMessage]);

  if (!post) {
    return <p className={Style.postDisplay}>Post not found</p>;
  }

  return (
    <div className={Style.postDisplay}>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Toaster />
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
          <button
            onClick={() => navigate(`/editpost/${post.id}/${post.title}`)}
          >
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {post.file !== null || post.file !== undefined ? (
        <div className={Style.thumbnail}>
          <img src={post.file} alt={post.title} />
        </div>
      ) : (
        <div className={Style.thumbnail}>
          <img src={placeholderImage} alt={post.title} />
        </div>
      )}

      <div
        className={Style.description}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostPage;
