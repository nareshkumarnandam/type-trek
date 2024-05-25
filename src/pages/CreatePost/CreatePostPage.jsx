import React, {useState, useEffect} from 'react';
import Style from './CreatePostPage.module.css'
import  ReactQuill  from  "react-quill";
import  "react-quill/dist/quill.snow.css";
import data from '../../data';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'

const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        ["link", "image", "video"],
        ["clean"],
    ],
};


const CreatePostPage = ({posts, setPosts}) => {
    const [progress, setProgress] = useState(0)
    const [value, setValue] =  useState("");
    const [titleInput, setTitleInput] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');
    console.log(file)
    // console.log(category);
    // console.log(titleInput);
    // console.log(value);
    // console.log(posts);

    useEffect(() => {
      localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);
  
    useEffect(() => {
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
    }, []);

    

    function handleUpload(){
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const newPost = {
          id: posts.length,
          title: titleInput,
          category,
          content: value,
          file: base64String,
          createdAt: Date.now(),
        };
        setPosts([...posts, newPost]);
        localStorage.setItem('posts', JSON.stringify(posts));
        // reset the state values
        setTitleInput('');
        setCategory('');
        setValue('');
        setFile('');
        setToastMessage('Post created successfully!');
      };
      reader.readAsDataURL(file);
    }

    useEffect(() => {
        if (toastMessage) {
            toast.success(toastMessage);
            const interval = setInterval(() => {
              setProgress(prevProgress => {
                if (prevProgress < 100) {
                  return prevProgress + 10;
                } else {
                  clearInterval(interval);
                  navigate('/', { replace: true });
                  return 100;
                }
              });
            }, 200);
          }
      }, [toastMessage]);
    console.log(posts);

  return (
    <div className={Style.createPostPage}>
        <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        <ToastContainer />
        <h1>Create new post</h1>
        <div className={Style.postDetails}>

        <input type='text' placeholder='Title' maxLength='20' className={Style.titleInput} onChange={(e) => setTitleInput(e.target.value)} value={titleInput} />
            <select onChange={(e) => setCategory(e.target.value)} className={Style.select}>
                <option value='uncategorized'>Uncategorized</option>
                <option value='education'>Education</option>
                <option value='business'>Business</option>
                <option value='technology'>Technology</option>
                <option value='food'>Food</option>
                <option value='sports'>Sports</option>
                <option value='fashion'>Fashion</option>
            </select>
        <div className={Style.quillDiv}>
        <ReactQuill className={Style.quill}  modules={modules} theme="snow"  onChange={setValue} placeholder="Start writing your blog..." />

        </div>
        <input onChange={(e) => setFile(e.target.files[0])} className={Style.fileInput} type='file' accept='png, jpg, jpeg, mp4' />
        <button onClick={() => handleUpload()} className={Style.postBtn} type='submit'>
            Post
        </button>
        </div>
    </div>
  )
}

export default CreatePostPage