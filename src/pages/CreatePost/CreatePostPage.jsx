import React, { useState, useEffect } from "react";
import Style from "./CreatePostPage.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { TailSpin } from 'react-loader-spinner'

// const cld = new Cloudinary({
//     cloud: {
//       cloudName: 'dbur5zq1d' // Replace with your Cloudinary cloud name
//     }
//   });

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const CreatePostPage = ({ posts, setPosts }) => {
  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState("");
  const [author, setAuthor] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [spinLoader, setSpinLoader] = useState(false);
  // console.log(file)

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
    setPosts(posts.sort((a, b) => b.createdAt - a.createdAt));
  }, [posts]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);
  // console.log(fileUrl);

  function handleUpload() {
    setSpinLoader(true);
    if (image === null || image === undefined || image === "") {
        handleUpdateWithoutFile();
      }else{
        const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "blogapp");
    data.append("cloud_name", "dbur5zq1d");
    fetch("https://api.cloudinary.com/v1_1/dbur5zq1d/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        setFileUrl(data.url);
        const newPost = {
            id: posts.length,
            title: titleInput,
            author: author,
            category,
            content: value,
            file: data.url,
            createdAt: Date.now(),
          };
    
          // Update posts array and localStorage
          const updatedPosts = [...posts, newPost].sort((a, b) => b.createdAt - a.createdAt);
          localStorage.setItem("posts", JSON.stringify(updatedPosts));
          setPosts(updatedPosts);
    
          // Clear form fields and display success message
          setTitleInput("");
          setAuthor("");
          setCategory("");
          setValue("");
          setImage("");
          setToastMessage("Post created successfully!");
          setSpinLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinLoader(false);
      });

      }
    
    // Create a new post object with the file URL
  }

  const handleUpdateWithoutFile = () => {
    toast.error("Please upload a file", {
        autoClose: 3000, // 5 seconds
      });
      setSpinLoader(false);
  };

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 10;
          } else {
            clearInterval(interval);
            navigate("/", { replace: true });
            return 100;
          }
        });
      }, 200);
    }
  }, [toastMessage]);
  // console.log(posts);

  return (
    <div className={spinLoader ? Style.createPostPagelight : Style.createPostPage}>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      <TailSpin id="spinner" className
  visible={spinLoader}
  height="80"
  width="80"
  color="#f11946"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px'
  }}
  wrapperClass=""
  />
      <h1>Create new post</h1>
      <div className={Style.postDetails}>
        <input
          type="text"
          placeholder="Title"
          
          className={Style.titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          value={titleInput}
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          className={Style.select}
        >
          <option value="uncategorized">Uncategorized</option>
          <option value="education">Education</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="food">Food</option>
          <option value="sports">Sports</option>
          <option value="fashion">Fashion</option>
        </select>
        <input
          type="text"
          placeholder="Author name"
          
          className={Style.authorname}
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <div className={Style.quillDiv}>
          <ReactQuill
            className={Style.quill}
            modules={modules}
            theme="snow"
            onChange={setValue}
            placeholder="Start writing your blog..."
          />
        </div>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          className={Style.fileInput}
          type="file"
          accept="png, jpg, jpeg"
        />
        <button
          onClick={() => handleUpload()}
          className={Style.postBtn}
          type="submit"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
