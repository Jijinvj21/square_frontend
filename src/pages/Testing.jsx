// src/pages/TestingPage.jsx
import React, { useEffect, useState } from 'react';
import OpenGraphPreview from 'opengraph-react';

const TestingPage = () => {
  const [item, setItem] = useState(null);

  const imageUrl = 'https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=600&h=600&fit=crop';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos/1')
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  if (!item) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="testing-page">
      <h1>{item.title}</h1>

      <div className="image-container">
        <img src={imageUrl} alt="Generated" className="main-image" />
      </div>

      <p>Album ID: {item.albumId}</p>

      <div className="preview-section">
        <h2>OpenGraph Preview (from opengraph-react)</h2>
        <OpenGraphPreview
          url={pageUrl}
          title={item.title}
          description={`Image from album ${item.albumId}`}
          image={imageUrl}
          siteName="Social Share Tester"
        />
      </div>
    </div>
  );
};

export default TestingPage;
