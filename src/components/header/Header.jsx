import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { SlBag } from "react-icons/sl";
import { FaCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo/logo.png";
import { useCart } from "../../context/CartContext";

function Header() {
  const { cartCount } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const productLink = (category) => ({
    pathname: "/products",
    search: category ? `?categories=${encodeURIComponent(category)}` : "",
  });

  const navigationSections = [
    {
      items: [
        { name: "All Products", category: "" },
        { name: "Special Offers", category: "Special Offers" },
        { name: "New Arrivals", category: "New Arrivals" },
        { name: "Laptops & Tablets", category: "Laptops & Tablets" },
        { name: "Speakers & Headphones", category: "Speakers & Headphones" },
        { name: "Phones & Accessories", category: "Phones & Accessories" },
        { name: "Help", link: "/help" },
        { name: "Contact", link: "/contact" },
      ],
    },
  ];

  return (
    <header className="w-full bg-[#D9D9D9] shadow-md">
      {/* Main Header */}
      <div className="flex justify-between items-center px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/home" className="w-28 h-12">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </Link>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-3">
          <button className="p-1 hover:text-gray-600">
            <FaCircleUser className="h-9 w-9" />
          </button>
          <Link to="/cart" className="p-1 hover:text-gray-600 relative group">
            <SlBag className="h-9 w-9 transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute left-1/2 top-[30px] -translate-x-1/2 -translate-y-1/2 min-w-[20px] px-1 h-5 flex items-center justify-center z-10 text-black text-xs rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu className="h-9 w-9" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-[#323232] shadow-lg transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} z-50 text-white`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="p-2 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <HiOutlineX className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="mt-4 space-y-8 px-6">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4 pb-2">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.link || productLink(item.category)}
                      className="block py-3 hover:bg-gray-100/10 rounded px-3 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
