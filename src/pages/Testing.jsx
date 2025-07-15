import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // For proper URL handling

function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  
  // Use dynamic image based on post ID
  const generateImageUrl = (id) => 
    `https://dummyjson.com/image/400x200/282828?fontFamily=pacifico&text=Post+${id}`;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/photos/1');
        
        if (!response.ok) throw new Error('Failed to fetch post');
        
        const data = await response.json();
        setPost({
          ...data,
          // Generate SEO-optimized description
          description: `Check out this image from album ${data.albumId}. ${data.title}`
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, []);

  if (loading) return <div className="loader">Loading post...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="post-container">
      <Helmet>
        <title>{post.title} | My React App</title>
        <meta name="description" content={post.description} />
        
        {/* Open Graph/Facebook */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={generateImageUrl(post.id)} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={generateImageUrl(post.id)} />
        <meta name="twitter:site" content="@YourTwitterHandle" />
      </Helmet>

      <article>
        <h1>{post.title}</h1>
        <img 
          src={generateImageUrl(post.id)} 
          alt={`Visual for ${post.title}`} 
          className="post-image"
        />
        <div className="post-meta">
          <span>Album ID: {post.albumId}</span>
          <span>Post ID: {post.id}</span>
        </div>
        <button onClick={() => window.history.back()} className="back-button">
          &larr; Back to posts
        </button>
      </article>
    </div>
  );
}

export default PostPage;