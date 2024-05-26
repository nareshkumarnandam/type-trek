import React, {useState, useEffect, useRef} from 'react';
import Style from './EditPost.module.css'
import  ReactQuill  from  "react-quill";
import  "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from 'react-router-dom';
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


const EditPost = ({posts, setPosts}) => {
    const [progress, setProgress] = useState(0)
    const [value, setValue] =  useState("");
    const [titleInput, setTitleInput] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const postId = useParams().id;
    const fileInputRef = useRef(null);
    const [prevFile, setPrevFile] = useState('');
    console.log(file)
    
    useEffect(() => {
        const post = posts.find((post) => post.id === parseInt(postId));
        if (post) {
          setTitleInput(post.title);
          setCategory(post.category);
          setValue(post.content);
          setPrevFile((post.file));
          if (fileInputRef.current) {
            const file = dataURItoFile(post.file);
            fileInputRef.current.files = [file];
          }
        }
      }, [postId, posts]);

    useEffect(() => {
      localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);
  
    useEffect(() => {
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
    }, []);

    const handleUpdate = () => {
        if(file === null || file === undefined || file === ''){
          handleUpdateWithoutFile();
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            const updatedPost = {
              id: parseInt(postId),
              title: titleInput,
              category,
              content: value,
              file: base64String,
              createdAt: Date.now(),
            };
    
            // Convert the Base64 encoded string to a Blob object
            const blob = dataURItoBlob(base64String);
    
            // Generate a downloadable URL for the Blob object
            const downloadUrl = URL.createObjectURL(blob);
    
            // Store the downloadable URL in the updated post object
            updatedPost.downloadUrl = downloadUrl;
    
            const updatedPosts = posts.map((post) => {
              if (post.id === parseInt(postId)) {
                return updatedPost;
              } else {
                return post;
              }
            });
    
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
    
            setPosts(updatedPosts);
    
            setToastMessage('Post updated successfully!');
          };
          reader.readAsDataURL(file);
        }
      };
    
      const handleUpdateWithoutFile = () => {
        toast.error("Please upload a file", {
            autoClose: 5000, // 5 seconds
          });
        
      };
    
      function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([int8Array], { type: mimeString });
      }
    
      function dataURItoFile(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const file = new File([int8Array], "image.png", { type: mimeString });
        return file;
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

  return (
    <div className={Style.createPostPage}>
        <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        <ToastContainer />
        <h1>Update your post</h1>
        <div className={Style.postDetails}>

        <input type='text' placeholder='Title' maxLength='20' className={Style.titleInput} onChange={(e) => setTitleInput(e.target.value)} value={titleInput} />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={Style.select}>
                <option value='uncategorized'>Uncategorized</option>
                <option value='education'>Education</option>
                <option value='business'>Business</option>
                <option value='technology'>Technology</option>
                <option value='food'>Food</option>
                <option value='sports'>Sports</option>
                <option value='fashion'>Fashion</option>
            </select>
        <div className={Style.quillDiv}>
        <ReactQuill className={Style.quill}  modules={modules} theme="snow" value={value} onChange={setValue} placeholder="Start writing your blog..." />

        </div>
        <input onChange={(e) => setFile(e.target.files[0])} className={Style.fileInput} type='file' accept='png, jpg, jpeg, mp4' />
        <button onClick={handleUpdate} className={Style.postBtn} type='submit'>
            Update
        </button>
        </div>
    </div>
  )
}

// function dataURItoBlob(dataURI) {
//     const byteString = atob(dataURI.split(",")[1]);
//     const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const uint8Array = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//       uint8Array[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([arrayBuffer], { type: mimeString });
//   }


export default EditPost