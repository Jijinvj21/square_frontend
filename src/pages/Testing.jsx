import React, { useState, useEffect } from 'react';
import CanvasRenderer from '../components/CanvasRenderer';

function Testing() {
  const [title, setTitle] = useState('Default Title');
  const [description, setDescription] = useState('Sample description text');
  const [imageUrl, setImageUrl] = useState('');

  // Update OG meta tags
  useEffect(() => {
    if (!imageUrl) return;

    // Update existing or create new meta tags
    const updateMetaTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    updateMetaTag('og:image', imageUrl);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('twitter:card', 'summary_large_image');
  }, [imageUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'og-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h1>OG Image Generator</h1>
      
      <div className="controls">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
          />
        </label>
        
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={240}
          />
        </label>
      </div>

      <div className="preview">
        <CanvasRenderer
          title={title} 
          description={description} 
          onImageGenerated={setImageUrl}
        />
      </div>

      {imageUrl && (
        <div className="actions">
          <button onClick={handleDownload}>Download PNG</button>
          <button onClick={() => navigator.clipboard.writeText(imageUrl)}>
            Copy Image URL
          </button>
        </div>
      )}
    </div>
  );
}

export default Testing;