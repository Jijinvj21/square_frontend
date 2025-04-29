// components/FadeIn.jsx
import React, { useEffect, useRef, useState } from 'react';

const FadeIn = ({ children, duration = 0.1 }) => {
  const wrapper = useRef();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const element = wrapper.current;
    const images = element.querySelectorAll('img');
    let loadedCount = 0;

    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageLoad);
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const element = wrapper.current;
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [imagesLoaded, duration]); // Add duration to dependency array

  return (
    <div
      className="fade-in"
      ref={wrapper}
      style={{
        opacity: 0,
        transition: `opacity ${duration}s ease-out`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;