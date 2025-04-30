import React, { useEffect, useRef } from 'react';
import bose from "../../assets/image/home/bose.png";
import bowers from "../../assets/image/home/bowers.png";
import logitec from "../../assets/image/home/logitec.png";
import urb from "../../assets/image/home/urb.png";

function ScrollBrands({ direction = 'left', speed = 'fast' }) {
  const scrollerRef = useRef(null);
  const scrollerInnerRef = useRef(null);
  
  useEffect(() => {
    const scroller = scrollerRef.current;
    
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
    
    function addAnimation() {
      if (scroller && scrollerInnerRef.current) {
        scroller.setAttribute("data-animated", true);
        
        const scrollerInner = scrollerInnerRef.current;
        const scrollerContent = Array.from(scrollerInner.children);
        
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    }
  }, []);

  const brands = [bose, bowers, logitec, urb];

  return (
    <div 
      className="scroller" 
      ref={scrollerRef}
      data-direction={direction}
      data-speed={speed}
    >
      <div className="scroller__inner" ref={scrollerInnerRef}>
        {brands.map((brand, index) => (
          <div key={index} className="image-wrapper">
            <img src={brand} alt="brand" className="brand-image" />
          </div>
        ))}
         {brands.map((brand, index) => (
          <div key={index} className="image-wrapper">
            <img src={brand} alt="brand" className="brand-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollBrands;

// CSS Styles
const styles = `
.scroller {
  max-width: 100%;
  padding: 2rem 0;
}

.scroller__inner {
  padding-block: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.scroller[data-animated="true"] {
  overflow: hidden;
  -webkit-mask: linear-gradient(
    90deg,
    transparent,
    white 20%,
    white 80%,
    transparent
  );
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.scroller[data-animated="true"] .scroller__inner {
  width: max-content;
  flex-wrap: nowrap;
  animation: scroll var(--_animation-duration, 40s)
    var(--_animation-direction, forwards) linear infinite;
}

.scroller[data-direction="right"] {
  --_animation-direction: reverse;
}

.scroller[data-direction="left"] {
  --_animation-direction: forwards;
}

.scroller[data-speed="fast"] {
  --_animation-duration: 20s;
}

.scroller[data-speed="slow"] {
  --_animation-duration: 60s;
}

@keyframes scroll {
  to {
    transform: translate(calc(-50% - 1rem));
  }
}

.image-wrapper {
  flex-shrink: 0;
  width: 150px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  transition: all 0.3s ease;
}

.brand-image:hover {
  filter: grayscale(0);
  transform: scale(1.1);
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}