// components/OgImage.jsx
import React from 'react';

const OgImage = ({ title, id }) => (
  <div style={{
    width: 1200,
    height: 630,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #434343, #000000)',
    color: 'white',
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    padding: '2rem',
    boxSizing: 'border-box'
  }}>
    <h1 style={{
      fontSize: 64,
      fontWeight: 700,
      margin: 0,
      maxWidth: '100%',
      textWrap: 'balance'
    }}>
      {title}
    </h1>
    <p style={{
      fontSize: 32,
      opacity: 0.8,
      marginTop: '1rem'
    }}>
      Post ID: #{id}
    </p>
    <div style={{
      position: 'absolute',
      bottom: '2rem',
      right: '2rem',
      fontSize: 24
    }}>
      seriouscode.io
    </div>
  </div>
);

export default OgImage;