// components/FadeIn.jsx
import React, { useEffect, useRef, useState } from 'react';

const FadeIn = ({ children }) => {
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
        img.addEventListener('error', handleImageLoad); // Handle broken images too
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
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [imagesLoaded]);

  return (
    <div className="fade-in" ref={wrapper}>
      {children}
    </div>
  );
};

export default FadeIn;