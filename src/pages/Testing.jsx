import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import img from "../../public/og-image.png"

function Testing() {
  const [title, setTitle] = useState('Dynamic OG Image');
  const [description, setDescription] = useState('Generated with React & Canvas');
  const [backgroundImage, setBackgroundImage] = useState('');
  // Fetch static background image
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos/1')
      .then(res => res.json())
      .then(data => setBackgroundImage(data.url))
      .catch(() => setBackgroundImage(''));
  }, []);

  return (
    <div className="container">
            <Helmet>
        <title>Jijin VJ | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Jijin VJ - Frontend Developer with a focus on React, Framer Motion, and modern web technologies."
        />
        <meta property="og:title" content="Jijin VJ | Portfolio" />
        <meta
          property="og:description"
          content="Explore the projects and experience of Jijin VJ, a passionate frontend developer skilled in building modern UI/UX with React and Framer Motion."
        />
        <meta property="og:image" content="https://jijin-vj.vercel.app/og-image.png" />
        <meta property="og:url" content="https://jijin-vj.vercel.app/" />
        <meta property="og:site_name" content="Jijin Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Optional: Twitter card support */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jijin VJ | Portfolio" />
        <meta
          name="twitter:description"
          content="Explore the portfolio of Jijin VJ, React developer focused on performance, animation, and great UI."
        />
        <meta name="twitter:image" content="https://jijin-vj.vercel.app/og-image.png" />
      </Helmet>

      <h1>Static OG Image Generator</h1>

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

      {backgroundImage && (
        <div className="preview">
          <h2>OG Image Preview:</h2>
          <img src={img} alt="OG Image" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default Testing;