import React from "react";
import { Link } from "react-router-dom";
import ProductDetails from "../components/productDetails/ProductDetails";
import { products } from "../utils/productData";
import { createImageMap } from "../utils/loadImages";
import ProductCarousel from "../components/productCarousel/ProductCarousel";
import CategorySection from "../components/categorySection/CategorySection";
import ScrollingText from "../components/scrollingText/ScrollingText";
import AboutUsSection from "../components/aboutUsSection/AboutUsSection";
import img1 from "../assets/image/home/img1_converted.webp";
import img2 from "../assets/image/home/img2_converted.webp";
import Main_Image_Small from "../assets/image/home/Main_Image_Small_converted.webp";

import bigSpeaker from "../assets/image/home/bigSpeaker_converted.webp";

import ScrollBrands from "../components/scrollBrands/scrollBrands";

const imageModules = import.meta.glob("../assets/image/product/*.webp", {
  eager: true,
});
const imageMap = createImageMap(imageModules);
function HomePage() {



  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between  mx-auto md:h-screen">
        {/* Left side - Text content */}
        <div className="w-full md:w-1/2 flex flex-col items-start p-9 md:p-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Premium Electronics <br />
            Selected By Experts
          </h1>
          <p className="text-lg mb-6">Discover Our Collection</p>
          <Link to="/products" className="block">
            <div className="text-black px-6 py-2 text-sm font-semibold rounded-full border border-black transition-colors">
              Shop All
            </div>
          </Link>
        </div>

        {/* Right side - Image */}
        <div className="w-full lg:w-1/2 h-[300px] md:h-full flex justify-center overflow-hidden">
          <img
            src={img2}
            alt="Premium Electronics"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left side - Carousels */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:justify-between gap-8 p-4">
          <div className="w-full">
            <ProductCarousel
              products={products
                .filter((product) => product.label === "NEW")
                .slice(0, 3)} // First half
              imageMap={imageMap}
              heading={true}
              headingText="New Arrivals"
              length={2}
            />
          </div>
          <div className="w-full">
            <ProductCarousel
              products={products
                .filter((product) => product.label === "NEW")
                .slice(3)} // Second half
              imageMap={imageMap}
              heading={false}
              length={2}
            />
          </div>
        </div>

        {/* Right side - Image with text and button */}
<div className="xl:mb-[90px] lg:mb-[119px] md:mb-[139px] w-full lg:w-1/2">

<div className="  h-full flex flex-col items-center justify-center p-4 bg-[#323232] relative">
          {/* Top Section: Only visible on lg and above */}
          <div className="hidden lg:block absolute top-8 left-10 right-0 text-left">
            <h2 className="text-1xl font-bold text-white mb-4">
              The Next Generation Of Sound
            </h2>
            <Link to="/products">
              <button className="bg-white text-[#323232] px-10 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors ml-12">
                Explore
              </button>
            </Link>
          </div>

          <img
            src={bigSpeaker}
            alt="Speaker"
            className="w-full h-auto max-h-[80vh] object-contain"
          />

          {/* Bottom Section: Only visible on lg and above */}
          <div className="hidden lg:block absolute bottom-8 left-10 right-0 text-left">
            <h2 className="text-1xl font-bold text-white mb-4">
              Polar Turn5 Portable speaker
            </h2>
            <Link to="/products/8">
              <button className="bg-white text-[#323232] px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors ml-12">
                Shop Now
              </button>
            </Link>
          </div>
          
        </div>
        </div>
      </div>
      {/* <AboutUsSection/> */}
      <div className="product_carousel_container px-4 md:px-10">
        <div className="flex items-center justify-between mt-4 md:mt-6 ml-4 md:ml-10">
          <h1 className="text-xl md:text-3xl font-bold">All Products</h1>
          <Link to="/products">
            <div className="bg-red px-4 py-1 md:px-5 text-sm font-semibold rounded-full border border-black me-4 md:me-10 hover:bg-gray-100 transition-colors">
              View All
            </div>
          </Link>
        </div>
        <div className="mt-4 md:mt-6 overflow-x-hidden">
          <ProductCarousel
            products={products}
            imageMap={imageMap}
            heading={false}
            length={4}
          />
        </div>
      </div>
      <CategorySection />
      <ScrollingText />
      <div className="px-4">
        <ProductDetails />
      </div>
      <div
        className="relative h-screen bg-cover bg-center mt-12"
        style={{ backgroundImage: `url(${img2})` }}
      >
        <div className="absolute inset-0 bg-black/30 p-8 text-white">
          <div className="flex flex-col h-full justify-between">
            {/* Top Left Content */}
            <div className="text-left space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                Buy One and
                <br />
                Get The Second 50% Off
              </h2>
              <p className="text-lg md:text-xl">
                On All Speakers and Headphones
              </p>

              <Link to="/products/8">
                <button className="bg-[#D9D9D9] mt-10 px-6 py-2 text-sm md:text-base font-semibold rounded-full text-black hover:bg-white transition-colors">
                  Shop Now
                </button>
              </Link>
            </div>

            {/* Bottom Left Text */}
            <p className="text- font-medium text-left">
              Polar Turns5 Portable Speaker
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative h-screen bg-cover bg-center "
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="absolute inset-0 bg-black/30 p-8 text-white">
          <div className="flex flex-col h-full justify-between">
            {/* Top Left Content */}
            <div className="text-left space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                25% Off
                <br />
                Top Rated Headphones
              </h2>
              <p className="text-lg md:text-xl ">
                Explore Limited Time Offers{" "}
              </p>

              <Link to="/products/11">
                <button className="bg-[#D9D9D9] px-6 py-2 mt-10 text-sm md:text-base font-semibold rounded-full text-black hover:bg-white transition-colors">
                  Shop Now
                </button>
              </Link>
            </div>

            {/* Bottom Left Text */}
            <p className="text-base font-medium text-left">
              VOLVE Wireless Headphones
            </p>
          </div>
        </div>
      </div>
      <ScrollBrands />
    </div>
  );
}

export default HomePage;
