import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/productCard/ProductCard';
import { products } from '../utils/productData';
import FiltersSidebar from '../components/filtersSidebar/FiltersSidebar';
import FadeIn from '../components/fadeIn/FadeIn';
import { createImageMap } from '../utils/loadImages';
import { FaArrowLeft } from "react-icons/fa6";

const imageModules = import.meta.glob('../assets/image/product/*.webp', { eager: true });
const imageMap = createImageMap(imageModules);

function ProductsPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const allCategories = [...new Set(
    products.flatMap(product => product.category)
  )];

  useEffect(() => {
    const categoriesFromParams = searchParams.get('categories');
    if (categoriesFromParams) {
      setSelectedCategories(categoriesFromParams.split(','));
    } else {
      setSelectedCategories([]);
    }
  }, [location.search]);

  const toggleCategory = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    
    // Update URL params
    if (newCategories.length > 0) {
      searchParams.set('categories', newCategories.join(','));
    } else {
      searchParams.delete('categories');
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredProducts = selectedCategories.length === 0
    ? products
    : products.filter(product =>
        product.category.some(cat => selectedCategories.includes(cat))
    );

  return (
    <div>
<button onClick={goBack} className="flex items-center gap-2 mt-6 ml-10
          "><FaArrowLeft/>
          Back</button>
    <div className="flex min-h-screen p-4 gap-8 font-inter">

      <FiltersSidebar
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        />
  
      <div className="flex-1">
        <h2 className="pl-5 text-lg font-semibold text-gray-900 mb-4">
          {filteredProducts.length} products
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <FadeIn key={product.id}>
              <ProductCard
                img1={imageMap[product.images[0]]}
                img2={imageMap[product.images[1]]}
                productName={product.title}
                price={product.price.toLocaleString()}
                productId={product.id}
                label={product.label}
              />
            </FadeIn>
          ))}
        </div>
      </div>
                </div>
    </div>
  );
}

export default ProductsPage;