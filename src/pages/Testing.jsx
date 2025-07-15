import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

function Testing() {
  const [item, setItem] = useState(null);
  // Direct public URL (no blob conversion needed)
  const imageUrl = 'https://dummyjson.com/image/400x200/282828?fontFamily=pacifico&text=I+am+a+pacifico+font';

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos/1')
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  if (!item) return <p>Loading...</p>;

  return (
    <>
      <Helmet>
        <title>{item.title}</title>
        <meta name="description" content={`Image from album ${item.albumId}`} />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={`Image from album ${item.albumId}`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div>
        <h1>{item.title}</h1>
        {/* Use direct URL in img tag too */}
        <img src={imageUrl} alt="Generated Image" />
        <p>Album ID: {item.albumId}</p>
      </div>
    </>
  );
}

export default Testing;