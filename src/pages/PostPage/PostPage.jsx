import React, { useState, useEffect } from "react";
import Style from "./PostPage.module.css";
import { useParams } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
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
    const dateCreated = new Date(createdAt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateCreated.toLocaleDateString(undefined, options);
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
    return (
      <div className={Style.postnotfound}>
        <p >Post not found</p>
      </div>
    );
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
        <div className={Style.authorInfo}> 
          <FaRegUser /> {post.author}
        </div>
        <div className={Style.categoryandtime}>
          <p className={Style.timeCreated}>
            {getTimeElapsed(post.createdAt)} <CiCalendar />{" "}
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
