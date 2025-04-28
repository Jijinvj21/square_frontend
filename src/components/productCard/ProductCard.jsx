import React from 'react';
import { Link } from 'react-router-dom';  // ✅ Import Link
import ImageToggleOnMouseOver from '../imageChange/ImageToggleOnMouseOver';

const ProductCard = ({ img1, img2, productName, price, productId }) => {
  return (
    <Link to={`/products/${productId}`} className="w-full max-w-xs overflow-hidden transition-transform duration-300 cursor-pointer">
      <div className="w-full">
        <ImageToggleOnMouseOver
          primaryImg={img1}
          secondaryImg={img2}
          alt={productName}
        />
        <div className="text-black font-inter font-normal mt-3">
          <h3 className="text-lg font-semibold sm:text-lg md:text-xl">{productName}</h3>
          <p className="text-sm sm:text-base md:text-lg drop-shadow-md">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
