import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

function Testing() {
  const [item, setItem] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Fetch dynamic data
    fetch('https://jsonplaceholder.typicode.com/photos/1')
      .then((res) => res.json())
      .then((data) => setItem(data));

    // Fetch image as blob and convert to object URL
    const imageApi = 'https://dummyjson.com/image/400x200/282828?fontFamily=pacifico&text=I+am+a+pacifico+font';
    fetch(imageApi)
      .then((res) => res.blob())
      .then((blob) => {
        const imgUrl = URL.createObjectURL(blob); // Convert blob to object URL
        setImageUrl(imgUrl);
      });
  }, []);

  if (!item || !imageUrl) return <p>Loading...</p>;

  return (
    <>
      <Helmet>
        <title>{item.title}</title>
        <meta name="description" content={`Image from album ${item.albumId}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={`Image from album ${item.albumId}`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div>
        <h1>{item.title}</h1>
        <img src={imageUrl} alt="Generated Image" />
        <p>Album ID: {item.albumId}</p>
      </div>
    </>
  );
}

export default Testing;
