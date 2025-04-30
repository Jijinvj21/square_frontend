import React, { useRef, useEffect, useState } from "react";

const ScrollingText = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      // Calculate the width of the content
      const contentWidth = contentRef.current.scrollWidth / 2; // Divide by 2 because we duplicated the content

      // Set up the animation
      animationRef.current = contentRef.current.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(-${contentWidth}px)` },
        ],
        {
          duration: 20000,
          iterations: Infinity,
        }
      );
      animationRef.current.playbackRate = 1;
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.playbackRate = isHovered ? 0.5 : 1;
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: "100vw",
        height: "30vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        ref={contentRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "absolute",
          whiteSpace: "nowrap",
          fontSize: "80px",
          fontWeight: "bold",
          WebkitTextStroke: "2px #000",
          color: "transparent",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          left: 0,
          top: "20%",
          transform: "translateY(-50%)",
        }}
      >
        {/* Duplicated content for seamless scroll */}
        We believe in the power of sound. We believe in the power of sound.
      </div>
    </div>
  );
};

export default ScrollingText;
