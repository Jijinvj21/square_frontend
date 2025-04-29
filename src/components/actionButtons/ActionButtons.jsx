import React from "react";

const ActionButtons = ({handleAddToCart}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 font-inter">
      <button
      onClick={handleAddToCart}
        className="flex-1 py-3 bg-[#323232] text-white rounded-full hover:bg-gray-800 transition-colors sm:px-8 md:px-14"
        aria-label="Add to cart"
      >
        Add to Cart
      </button>
      <button
      onClick={()=>alert("shipped")}
        className="flex-1 py-3 text-black rounded-full hover:bg-[#bfbfbf] border border-black transition-colors sm:px-8 md:px-14"
        aria-label="Buy now"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ActionButtons;