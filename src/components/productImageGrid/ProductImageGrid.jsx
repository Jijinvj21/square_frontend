import React from "react";
import FadeIn from "../fadeIn/FadeIn";

const ProductImageGrid = ({ images, imageMap }) => {
  console.log(images)
  return (
    <div className="lg:w-[60%] xl:w-[70%]">
<div className={`grid ${images.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 '} gap-4`}>
{images.map((image, index) => (
          <FadeIn key={index}>
            <div className="relative aspect-square bg-gray-200">
              <img
                src={imageMap[image]}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index > 0 ? "lazy" : "eager"}
              />
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGrid;