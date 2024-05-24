import React, { useEffect } from 'react';
import Style from './BlogsDisplay.module.css';

const BlogsDisplay = ({posts, setPosts}) => {
    console.log(posts);

    useEffect(() => {
        return () => {
          // Cleanup function to release object URLs when component unmounts
          posts.forEach(post => {
            if (post.file && typeof post.file === 'object') {
              URL.revokeObjectURL(post.file.preview);
            }
          });
        };
      }, [posts]);

  return (
    <div className={Style.blogDisplay} >{
        posts.length === 0 ? (
            <p>No blogs created</p>
        ) : ( 
            posts.map((post, index) => (
                <div key={index} className={Style.blogCard}>
                  <h2>{post.title}</h2>
                  {post.file && typeof post.file === 'object' && (
              <>
                <p>File Object: {JSON.stringify(post.file)}</p> {/* Log file object */}
                {post.file.preview && (
                  <>
                    <p>Preview URL: {post.file.preview}</p> {/* Log preview URL */}
                    <img src={URL.createObjectURL(post.file)} alt={post.title} /> {/* Use object URL */}
                  </>
                )}
              </>
            )}
                  <p>Category: {post.category}</p>
                  <div dangerouslySetInnerHTML={{__html: post.content}} >
                  {/* {DOMPurify.sanitize(post.content)} */}
              {/* <p>{DOMPurify.sanitize(post.content).replace(/<[^>]+>/g, '')}</p> */}
                  </div>
                </div>
              ))
        )
    }</div>
  )
}

export default BlogsDisplay