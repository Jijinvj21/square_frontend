import React, { useState, useEffect, useRef } from "react";
import FadeIn from "../fadeIn/FadeIn";
import ProductCard from "../productCard/ProductCard";

const ProductCarousel = ({ products, imageMap,heading,length=4, headingText="Frequently Bought Together" }) => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [shuffleKey, setShuffleKey] = useState(0);
  const shuffleIntervalRef = useRef(null);

  const shuffleProducts = () => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, length); 
  };

  useEffect(() => {
    setRandomProducts(shuffleProducts());

    // Set up shuffle interval
    shuffleIntervalRef.current = setInterval(() => {
      setRandomProducts(shuffleProducts());
      setShuffleKey(prev => prev + 1);
    }, 10000); 

    return () => {
      clearInterval(shuffleIntervalRef.current);
    };
  }, []);

  return (
    <div className="mt-6 md:mt-12 px-4 md:px-0">
      {heading&&<h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{headingText}</h2>}
      <FadeIn key={shuffleKey} duration={1}>
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-2`}>
      {randomProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard
                img1={imageMap[product.images[0]]}
                img2={imageMap[product.images[1]]}
                productName={product.title}
                price={product.price.toLocaleString()}
                productId={product.id}
                label={product.label}
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};

export default ProductCarousel;