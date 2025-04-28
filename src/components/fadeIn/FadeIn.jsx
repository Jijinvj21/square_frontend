// components/FadeIn.jsx
import React, { useEffect, useRef } from 'react';

const FadeIn = ({ children }) => {
  const wrapper = useRef();

  useEffect(() => {
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
  }, []);

  return (
    <div className="fade-in" ref={wrapper}>
      {children}
    </div>
  );
};

export default FadeIn;