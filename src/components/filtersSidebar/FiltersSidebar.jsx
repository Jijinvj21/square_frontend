import React from 'react';

const FiltersSidebar = ({ allCategories, selectedCategories, toggleCategory }) => {
  return (
    <div className="w-36 md:w-72 pl-2 pr-2 sticky top-4 font-inter">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
        <div className="space-y-3">
          {allCategories.map(category => (
            <div 
              key={category} 
              className="flex items-center p-3 rounded-lg  cursor-pointer transition-colors"
              onClick={() => toggleCategory(category)}
            >
              <span className={`${selectedCategories.includes(category) ? 'underline text-black' : 'text-gray-700'}`}>
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;