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
    <footer className="bg-[#323232] text-white p-32">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:pr-10">
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to={productLink()} className="hover:text-gray-600">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to={productLink("Special Offers")}
                  className="hover:text-gray-600"
                >
                  Special Offers
                </Link>
              </li>
              <li>
                <Link
                  to={productLink("New Arrivals")}
                  className="hover:text-gray-600"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to={productLink("Laptops & Tablets")}
                  className="hover:text-gray-600"
                >
                  Laptops & Tablets
                </Link>
              </li>
              <li>
                <Link
                  to={productLink("Speakers & Headphones")}
                  className="hover:text-gray-600"
                >
                  Speakers & Headphones
                </Link>
              </li>
              <li>
                <Link
                  to={productLink("Phones & Accessories")}
                  className="hover:text-gray-600"
                >
                  Phones & Accessories
                </Link>
              </li>
              <li>
                <Link  className="hover:text-gray-600">
                  Help
                </Link>
              </li>
              <li>
                <Link  className="hover:text-gray-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Policy</h3>
            <ul className="space-y-2">
              <li>
                <Link  className="hover:text-gray-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link  className="hover:text-gray-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link  className="hover:text-gray-600">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link  className="hover:text-gray-600">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link  className="hover:text-gray-600">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link  className="hover:text-gray-600">
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Vertical line - hidden on mobile, shown on lg screens and up */}
        <div className="hidden lg:block h-64 w-px bg-gray-500 mx-10"></div>

        {/* Newsletter section */}
        <div className="flex flex-col justify-center mt-10 lg:mt-0 lg:pl-10">
          <h4 className="font-medium text-3xl ">Stay in the loop with</h4>
          <h4 className="font-medium text-3xl mb-4"> our weekly newsletter</h4>
          <div className="relative w-full lg:w-80">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 pr-10 rounded bg-[#666666] placeholder-white"
              required
            />
            <button
              onClick={() =>
                notifyRes("Email sent successfully!", "emailsentSuccess")
              }
              type="submit"
              className=" bg-[#D9D9D9] rounded-full absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none"
            >
              <FiArrowRightCircle size={24} color="black" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <p>Subscribe to Our Newsletter</p>
            <button
              onClick={() =>
                notifyRes("Subscribed successfully!", "subscribeSuccess")
              }
              type="submit"
              className="bg-[#D9D9D9] text-black py-2 px-6 rounded-full hover:bg-gray-800 transition-colors"
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