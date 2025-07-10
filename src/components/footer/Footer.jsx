import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowRightCircle } from "react-icons/fi";

function Footer() {
  const notifyRes = (message, id) => toast.success(message, { id: id });

  // Helper function to generate product links with categories
  const productLink = (category) => ({
    pathname: "/products",
    search: category ? `?categories=${encodeURIComponent(category)}` : "",
  });

  return (
    <footer className="bg-[#323232] text-white px-6 py-10 sm:px-12 sm:py-16 lg:px-32 lg:py-32">
  <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-1 md:gap-10 ">
    <div className="grid grid-cols-2 md:grid-cols-2 gap-y-10 gap-x-16 lg:pr-10 w-full lg:w-auto">
      {/* Shop section */}
      <div>
        <h3 className="font-bold text-lg mb-4">Shop</h3>
        <ul className="space-y-2">
          <li><Link to={productLink()} className="hover:text-gray-400 text-sm md:text-base">All Products</Link></li>
          <li><Link to={productLink("Special Offers")} className="hover:text-gray-400 text-sm md:text-base">Special Offers</Link></li>
          <li><Link to={productLink("New Arrivals")} className="hover:text-gray-400 text-sm md:text-base">New Arrivals</Link></li>
          <li><Link to={productLink("Laptops & Tablets")} className="hover:text-gray-400 text-sm md:text-base">Laptops & Tablets</Link></li>
          <li><Link to={productLink("Speakers & Headphones")} className="hover:text-gray-400 text-sm md:text-base">Speakers & Headphones</Link></li>
          <li><Link to={productLink("Phones & Accessories")} className="hover:text-gray-400 text-sm md:text-base">Phones & Accessories</Link></li>
          <li><Link className="hover:text-gray-400 text-sm md:text-base">Help</Link></li>
          <li><Link className="hover:text-gray-400 text-sm md:text-base">Contact</Link></li>
        </ul>
      </div>

      {/* Policy section */}
      <div>
        <h3 className="font-bold text-lg mb-4">Policy</h3>
        <ul className="space-y-2">
          <li><Link className="hover:text-gray-400 text-sm md:text-base">Terms & Conditions</Link></li>
          <li><Link className="hover:text-gray-400 text-sm md:text-base">Privacy Policy</Link></li>
          <li><Link className="hover:text-gray-400 text-sm md:text-base">Shipping Policy</Link></li>
          <li><Link className="hover:text-gray-400 text-sm md:text-base">Refund Policy</Link></li>
          <li><Link className="hover:text-gray-400 text-sm md:text-base">Cookies Policy</Link></li>
          <li><Link className="hover:text-gray-400 text-sm md:text-base">Accessibility Statement</Link></li>
        </ul>
      </div>
    </div>

    {/* Vertical line - only on large screens */}
    <div className="hidden lg:block h-64 w-px bg-gray-500"></div>

    {/* Newsletter section */}
    <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left mt-8 lg:mt-10 lg:pl-10 w-full lg:w-auto">
      <h4 className="font-medium text-2xl sm:text-3xl">Stay in the loop with</h4>
      <h4 className="font-medium text-2xl sm:text-3xl mb-4">our weekly newsletter</h4>

      <div className="relative w-full max-w-xs sm:max-w-sm lg:w-80">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 pr-10 rounded bg-[#666666] placeholder-white"
          required
        />
        <button
          onClick={() => notifyRes("Email sent successfully!", "emailsentSuccess")}
          className="bg-[#D9D9D9] rounded-full absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        >
          <FiArrowRightCircle size={24} color="black" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <p>Subscribe to Our Newsletter</p>
        <button
          onClick={() => notifyRes("Subscribed successfully!", "subscribeSuccess")}
          className="bg-[#D9D9D9] text-black py-2 px-6 rounded-full hover:bg-[#666] hover:text-white transition-colors"
        >
          Subscribe
        </button>
      </div>
    </div>
  </div>
</footer>

  );
}

export default Footer;