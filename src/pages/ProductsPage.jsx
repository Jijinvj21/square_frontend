import React, { useState } from 'react';
import ProductCard from '../components/productCard/ProductCard';
import { products } from '../utils/productData';
import FiltersSidebar from '../components/filtersSidebar/FiltersSidebar';
import FadeIn from '../components/fadeIn/FadeIn';

// ... keep the image imports the same ...
// Import all images from the product directory
const imageModules = import.meta.glob('../assets/image/product/*.jpg', { eager: true });

// Create a mapping of image names to imported paths
const imageMap = Object.keys(imageModules).reduce((acc, path) => {
  const imageName = path.split('/').pop().replace('.jpg', '');
  acc[imageName] = imageModules[path].default;
  return acc;
}, {});
function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Extract unique categories
  const allCategories = [...new Set(
    products.flatMap(product => product.category)
  )];

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = selectedCategories.length === 0
    ? products
    : products.filter(product =>
        product.category.some(cat => selectedCategories.includes(cat))
    );

    return (
        <div className="flex min-h-screen p-4 gap-8 font-inter">
          <FiltersSidebar
            allCategories={allCategories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            setSelectedCategories={setSelectedCategories}
          />
    
          <div className="flex-1">
            <h2 className="pl-5 text-lg font-semibold text-gray-900 mb-4">
              {filteredProducts.length} products
            </h2>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <FadeIn key={product.id}> {/* Wrap each ProductCard with FadeIn */}
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
      );
}

export default ProductsPage;
