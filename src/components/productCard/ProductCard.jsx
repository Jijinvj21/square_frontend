import React from 'react';
import { Link } from 'react-router-dom';
import ImageToggleOnMouseOver from '../imageChange/ImageToggleOnMouseOver';

const ProductCard = ({ img1, img2, productName, price, productId, label }) => {
  return (
    <Link to={`/products/${productId}`} className="w-full max-w-xs overflow-hidden transition-transform duration-300 cursor-pointer">
      <div className="w-full">
        
        <div className="image-container aspect-square relative"> {/* Added relative positioning */}
          {/* Label conditionally rendered */}
         
          
          <ImageToggleOnMouseOver
            primaryImg={img1}
            secondaryImg={img2}
            alt={productName}
          />
           {label && (
            <div className="absolute top-2 left-2 bg-red px-5 py-1 text-sm font-semibold rounded-full border-[1px] border-black">
              {label}
            </div>
          )}
        </div>
        <div className="text-black font-inter font-normal mt-3">
<h3 className="text-lg font-semibold line-clamp-2">{productName}</h3>
          <p className="md:text-lg drop-shadow-md">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;