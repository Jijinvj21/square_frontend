import React, { useState, useEffect } from 'react';

function AboutUsSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      content: (
        <>
          <h3 className="text-gray-600 text-lg mb-4 font-medium">What we do</h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Superior design and<br />
            craftsmanship
          </h2>
          <p className="text-gray-600 text-base md:text-lg mt-6 lg:mt-8 max-w-2xl">
            Brilliant sound and design motivate everything we do. We have a deep passion 
            for building beautifully crafted, technically sophisticated sound tools. 
            Only the finest materials supporting comfort, aesthetics and functionality.
          </p>
        </>
      ),
    },
    {
      content: (
        <>
          <h3 className="text-gray-600 text-lg mb-4 font-medium">About us</h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Designed & developed<br />
            in New York City
          </h2>
          <p className="text-gray-600 text-base md:text-lg mt-6 lg:mt-8 max-w-2xl">
            Founder Jonathan Levine was first drawn to headphones after building a 
            recording studio in his office to support his shared passion with his 
            music-mad son, Robert, an emerging DJ/music producer. Jonathan, a serial 
            consumer products entrepreneur, envisioned headphones with both premium 
            sound quality and elevated design that his son could use.
          </p>
        </>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev === 0 ? 1 : 0));
    }, 8000000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8 md:gap-16 ">
      {/* Cards Container */}
      <div className="flex items-center justify-center md:justify-start p-4 md:p-8 ">
        <div className="relative flex flex-col md:flex-row items-center md:w-full w-80">
          {/* White Card */}
          <div className="relative bg-[#F0F0F0] p-6 md:p-8  shadow-sm  md:w-96 w-full  transform md:rotate-[80deg] transition-all duration-300 hover:md:rotate-[82deg] hover:shadow-xl z-10">
            <div className="space-y-4 md:space-y-6">
              <div className="prose">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">Polar Float</h2>
                <p className="text-gray-600 md:text-lg">Wireless Speaker</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-500 text-sm">+21.33 x 480.21</p>
                <button className="mt-4 text-black font-semibold hover:underline">
                  Shop Now →
                </button>
              </div>
            </div>
          </div>

          {/* Black Card */}
          <div className="relative bg-[#323232] p-6 md:p-8  shadow-sm md:w-96 w-full transform md:-rotate-[80deg] transition-all duration-300 hover:md:-rotate-[82deg] hover:shadow-xl mt-6 md:-mt-0 md:-ml-24 z-20">
            <div className="space-y-4 md:space-y-6">
              <div className="prose">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Polar 360 Mini</h2>
                <p className="text-gray-300 md:text-lg">Portable Speaker</p>
              </div>
              <div className="border-t border-gray-600 pt-4">
                <p className="text-gray-400 text-sm">+21.33 x 480.21</p>
                <button className="mt-4 text-white font-semibold hover:underline">
                  Shop Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {/* Content Section */}
<div className="relative overflow-hidden px-4 md:px-0 w-full md:w-1/2 lg:max-w-3xl">
  <div className="w-full overflow-hidden">
    <div 
      className="flex transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${activeSlide * 100}%)` }}
    >
      {slides.map((slide, index) => (
        <div 
          key={index}
          className="min-w-full flex-shrink-0"
        >
          <div className="mx-auto px-2 sm:px-0">
            {slide.content}
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mt-6 md:mt-12">
    <button 
      onClick={() => setActiveSlide(0)}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 text-sm sm:text-base md:text-lg border-2 border-gray-800 transition-colors duration-300 ${
        activeSlide === 0 ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'
      }`}
    >
      What we do
    </button>
    <button 
      onClick={() => setActiveSlide(1)}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 text-sm sm:text-base md:text-lg border-2 border-gray-800 transition-colors duration-300 ${
        activeSlide === 1 ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'
      }`}
    >
      About us
    </button>
  </div>
</div>
    </div>
  );
}

export default AboutUsSection;