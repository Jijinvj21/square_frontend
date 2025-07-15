// src/pages/TestingPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const TestingPage = () => {
  const [item, setItem] = useState(null);
  
  // Publicly accessible image URL (using a square image for better WhatsApp display)
  const imageUrl = 'https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=600&h=600&fit=crop';
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos/1')
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  if (!item) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading content...</p>
    </div>
  );

  // Get absolute URL for the current page
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="testing-page">
      <Helmet>
        <title>{item.title}</title>
        <meta name="description" content={`Image from album ${item.albumId}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={`Image from album ${item.albumId}`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={item.title} />
        <meta name="twitter:description" content={`Image from album ${item.albumId}`} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* WhatsApp-specific Tags */}
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:site_name" content="Social Share Tester" />
      </Helmet>

      <div className="content">
        <h1>{item.title}</h1>
        <div className="image-container">
          <img src={imageUrl} alt="Generated Image" className="main-image" />
        </div>
        <p className="album-id">Album ID: {item.albumId}</p>
        
        <div className="sharing-info">
          <h2>Social Media Preview Tester</h2>
          <p>Test how this page appears when shared on different platforms:</p>
          
          <div className="preview-cards">
            <div className="preview-card">
              <div className="platform-icon facebook">f</div>
              <h3>Facebook/LinkedIn</h3>
              <div className="preview">
                <div className="preview-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                <div className="preview-text">
                  <div className="preview-title">{item.title}</div>
                  <div className="preview-description">Image from album {item.albumId}</div>
                  <div className="preview-domain">social-share-tester.com</div>
                </div>
              </div>
            </div>
            
            <div className="preview-card">
              <div className="platform-icon twitter">𝕏</div>
              <h3>Twitter</h3>
              <div className="preview">
                <div className="preview-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                <div className="preview-text">
                  <div className="preview-title">{item.title}</div>
                  <div className="preview-description">Image from album {item.albumId}</div>
                  <div className="preview-domain">social-share-tester.com</div>
                </div>
              </div>
            </div>
            
            <div className="preview-card">
              <div className="platform-icon whatsapp">✓</div>
              <h3>WhatsApp</h3>
              <div className="preview">
                <div className="preview-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                <div className="preview-text">
                  <div className="preview-title">{item.title}</div>
                  <div className="preview-description">Image from album {item.albumId}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="test-links">
            <h3>Test with Validators:</h3>
            <div className="validator-links">
              <a href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(pageUrl)}`} 
                 target="_blank" 
                 rel="noreferrer"
                 className="validator-link facebook">
                Facebook Debugger
              </a>
              <a href={`https://cards-dev.twitter.com/validator?url=${encodeURIComponent(pageUrl)}`} 
                 target="_blank" 
                 rel="noreferrer"
                 className="validator-link twitter">
                Twitter Validator
              </a>
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(pageUrl)}`} 
                 target="_blank" 
                 rel="noreferrer"
                 className="validator-link whatsapp">
                WhatsApp Share Test
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingPage;