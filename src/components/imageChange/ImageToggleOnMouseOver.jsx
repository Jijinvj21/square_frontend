import React, { useRef } from 'react';

function ImageToggleOnMouseOver({ primaryImg, secondaryImg }) {
  const imageRef = useRef(null);

  return (
    <div className=" overflow-hidden flex items-center justify-center ">
      <img
        className="max-w-full max-h-full object-contain" // Corrected here
        onMouseOver={() => {
          imageRef.current.src = secondaryImg;
        }}
        onMouseOut={() => {
          imageRef.current.src = primaryImg;
        }}
        src={primaryImg}
        alt=""
        ref={imageRef}
      />
    </div>
  );
}

export default ImageToggleOnMouseOver;
