import React from "react";

import laptop from "../../assets/image/home/lap_converted.webp";
import mobile from "../../assets/image/home/mob_converted.webp";
import sound from "../../assets/image/home/sound_converted.webp";
import FadeIn from "../fadeIn/FadeIn";

const categories = [
  { image: laptop, title: "Laptops & Tablets", alt: "Category 1" },
  { image: mobile, title: "Speakers & Headphones", alt: "Category 2" },
  { image: sound, title: "Cell Phones", alt: "Category 3" },
];

const CategorySection = () => {
  return (
    <div className="category_container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          
          <FadeIn key={index} duration={1}>

          <div className="overflow-hidden" >
            <img
              src={category.image}
              alt={category.alt}
              className="w-full h-96 object-cover"
              />
            <div className="text-black text-lg py-1 rounded">
              {category.title}
            </div>
          </div>
              </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
