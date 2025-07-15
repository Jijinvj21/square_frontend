import React, { useState, useEffect, useRef } from 'react';

const CanvasRenderer = ({ title, description, backgroundImageUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 1200;
    canvas.height = 630;

    const draw = async () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background image if available
      if (backgroundImageUrl) {
        await new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = backgroundImageUrl;
          img.onload = () => {
            // Draw image to cover canvas (centered and cropped)
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            
            // Add dark overlay for text readability
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            resolve();
          };
          img.onerror = () => resolve();
        });
      } else {
        // Fallback background
        ctx.fillStyle = '#1a202c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw text
      ctx.font = 'bold 72px "Arial"';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Text wrapping function
      const wrapText = (text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (const word of words) {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > maxWidth && line !== '') {
            ctx.fillText(line, x, currentY);
            line = word + ' ';
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, currentY);
        return currentY;
      };

      // Draw title and description
      const titleY = wrapText(title, canvas.width / 2, 100, 1000, 80);
      ctx.font = '48px "Arial"';
      wrapText(description, canvas.width / 2, titleY + 40, 1100, 60);

      // Return data URL
      return canvas.toDataURL('image/png');
    };

    draw().then(dataUrl => {
      if (typeof window !== 'undefined') {
        // Update meta tags
        updateMetaTag('og:image', dataUrl);
        updateMetaTag('twitter:image', dataUrl);
      }
    });
  }, [title, description, backgroundImageUrl]);

  const updateMetaTag = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
};

function App() {
  const [title, setTitle] = useState('Dynamic OG Image');
  const [description, setDescription] = useState('Generated with React & Canvas');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Fetch background image from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos/1')
      .then(res => res.json())
      .then(data => setBackgroundImage(data.url))
      .catch(() => setBackgroundImage(''));
  }, []);

  return (
    <div className="container">
      <h1>Dynamic OG Image Generator</h1>
      
      <div className="controls">
        <label>
          Title:
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={100}
          />
        </label>
        
        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={200}
          />
        </label>
      </div>

      {imageUrl && (
        <div className="preview">
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Generated OG" style={{ maxWidth: '100%' }} />
          
          <div className="actions">
            <button onClick={() => {
              const link = document.createElement('a');
              link.href = imageUrl;
              link.download = 'og-image.png';
              link.click();
            }}>
              Download PNG
            </button>
          </div>
        </div>
      )}

      <CanvasRenderer 
        title={title}
        description={description}
        backgroundImageUrl={backgroundImage}
        onImageGenerated={setImageUrl}
      />
    </div>
  );
}

export default App;