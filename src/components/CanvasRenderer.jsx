import React, { useRef, useEffect, useState } from "react";

const CanvasRenderer = ({ title, description }) => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions (OG standard size)
    canvas.width = 1200;
    canvas.height = 630;

    // Draw background
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.font = 'bold 72px "Arial"';
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    // Wrap text function
    const wrapText = (text, x, y, maxWidth, lineHeight) => {
      const words = text.split(" ");
      let line = "";
      let currentY = y;

      for (const word of words) {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && line !== "") {
          ctx.fillText(line, x, currentY);
          line = word + " ";
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
    };

    // Draw title and description
    wrapText(title, canvas.width / 2, 200, 1000, 80);
    ctx.font = '48px "Arial"';
    wrapText(description, canvas.width / 2, 350, 1100, 60);

    // Convert to data URL
    setImageUrl(canvas.toDataURL("image/png"));
  }, [title, description]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {imageUrl && (
        <img src={imageUrl} alt="Generated OG" style={{ maxWidth: "100%" }} />
      )}
    </div>
  );
};

export default CanvasRenderer;
