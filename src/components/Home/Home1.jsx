import React, { useContext, useEffect, useState } from 'react';
import RunningBoy from "../../assets/RunningBoy.png";
import SilajitBoxes from "../../assets/SilajitBoxes.png";
import himalay from "../../assets/himalay.png";
import personImage from "../../assets/person.png";
import per1 from "../../assets/person1.png";
import per2 from "../../assets/person2.png";
import per3 from "../../assets/person3.png";
import per4 from "../../assets/person4.png";
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from "react-typed";

function Home1() {
  const navigate = useNavigate();
  return (
    <>
      <div className='mt-16 md:mt-32'>
        {/* box section */}
        <div className='bg-[#DDF0E2] flex flex-col md:flex-row justify-between items-center px-4 md:px-12 lg:px-44 py-8 md:py-0 h-auto md:h-[50vh] overflow-hidden relative'>

          {/* Left Content - Text (mobile: bottom, desktop: left) */}
          <div className='w-full order-2 md:order-1 md:w-1/2 mb-8 md:mb-0 md:pr-4 lg:pr-0'>
            <div>
              <p className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl mb-3 text-gray-700 font-bold relative'>
                Hassle-Free Refund for Unsatisfied Customers
                <span onClick={() => navigate('/terms')} className='absolute top-15 md:top-20 left-38 text-xs cursor-pointer'>Terms & Conditions Apply</span>
              </p>

              <p className='text-base sm:text-lg md:text-xl  text-gray-600 mt-6'>
                Herbal solutions for modern men seeking strength, stamina, and wellness—backed by nature, trusted by tradition, made for everyday vitality.
              </p>
              <p className='mt-2 text-base sm:text-lg md:text-xl  text-gray-600'>
                Daily Strength from Nature's Best.
              </p>
              <div className="flex items-center gap-2 mt-2 h-10">
                <p className="text-gray-600 font-bold">Fuel Your Life With —</p>
                <div className="relative inline-block">
                  <ReactTyped
                    strings={["Vitality", "Confidence", "Performance", "Wellness"]}
                    typeSpeed={40}
                    backSpeed={50}
                    loop
                    showCursor={false}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-lg"
                  />
                  
                </div>
              </div>
            </div>
            <button
              onClick={() =>navigate('/shop')}
              className='bg-[rgb(229,183,74)] px-6 py-1 text-lg sm:text-xl md:text-2xl rounded-full md:rounded-3xl mt-4 md:mt-6 lg:mt-10 text-white shadow-lg cursor-pointer hover:bg-amber-500 transition-colors'>
              Shop Now
            </button>
          </div>

          {/* Right Content - Images (mobile: top) */}
          <div className="w-full order-1 md:order-2 md:w-1/2 relative flex flex-col items-center mb-6 md:mb-0 md:flex md:items-end md:justify-center md:h-auto">
            {/* Himalayan Image - full width on mobile */}
            <div className="flex justify-between w-full md:hidden relative">
              <img
                src={himalay}
                alt="Mountains"
                className="w-full scale-x-[-1] max-w-full"
              />
              <img
                src={SilajitBoxes}
                alt="Silajit Boxes"
                className="w-24 h-24 sm:w-30 sm:h-30 mt-20 absolute bottom-0 left-0"
              />
              <img
                src={RunningBoy}
                alt="RunningBoy"
                className="w-[150px] sm:w-[250px] absolute right-0 bottom-0"
              />
            </div>
            <div className="hidden md:block relative w-full h-full">
              <img
                src={himalay}
                alt="Mountains"
                className="absolute scale-x-[-1] bottom-0 -right-12 md:-right-22 lg:-right-48 w-[70%] md:w-[90%] lg:w-[90%] max-w-[300px] md:max-w-[350px] lg:max-w-[500px] z-0"
              />
              <img
                src={RunningBoy}
                alt="RunningBoy"
                className="relative z-10 -bottom-10 md:-bottom-5 lg:-bottom-10 md:-right-0 lg:-right-70 w-[60%] md:w-[65%] lg:w-[70%] max-w-[200px] md:max-w-[220px] lg:max-w-[350px]"
              />
              <img
                src={SilajitBoxes}
                alt="Silajit Boxes"
                className="absolute -bottom-10 md:bottom-2 lg:bottom-8 left-4 md:left-[5%] w-24 md:w-28 lg:w-48 z-20"
              />
            </div>
          </div>
        </div>

        {/* box section */}
        <div className="max-w-[150vh] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:mt-16">
          <h1 className='text-xl md:text-4xl font-semibold text-center mb-10 text-gray-700'>Unlock Ancient Energy with Pure Shilajit: Natural testosterone booster</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Section - Better Health */}
            <div className="md:col-span-1 bg-[linear-gradient(to_bottom,_#7A9F82,_#E0FAE6)] flex flex-col items-center justify-center gap-5 ">
              <h2 className="text-2xl md:text-3xl font-bold mt-4 text-white text-center">BETTER HEALTH</h2>
              <img
                src={personImage}
                alt="Person waving"
                className=" object-contain "
              />
            </div>

            {/* Right Sections */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {/* Regrowth Hair */}
              <div className="bg-[linear-gradient(to_right,_#026F00,_#04E902)] flex flex-col items-center justify-center relative ">
                <img
                  src={per1}
                  alt="Regrowth Hair Pills"
                  className=" w-36 h-36 object-contain"
                />
                <h3 className="text-md md:text-xl font-semibold text-white text-center absolute ">Boost Natural Energy</h3>
              </div>

              {/* Have Longer Sex */}
              <div className="bg-[linear-gradient(to_right,_#021D53,_#87A8EB)] flex flex-col items-center justify-center relative ">
                <img
                  src={per2}
                  alt="Longer Sex Pills"
                  className="w-36 h-36 object-contain mb-4"
                />
                <h3 className="text-md md:text-xl font-semibold text-white text-center absolute">Hormonal Balance</h3>
              </div>

              {/* Have Better Sex */}
              <div className="bg-[linear-gradient(to_right,_#CD940C,_#FFD779)] flex flex-col items-center justify-center relative ">
                <img
                  src={per3}
                  alt="Better Sex Pills"
                  className="w-36 h-36 object-contain mb-4"
                />
                <h3 className="text-md md:text-xl font-semibold text-white text-center absolute">Supports Performance</h3>
              </div>

              {/* Get Smooth Skin */}
              <div className="bg-[linear-gradient(to_right,_#02607C,_#48D4FF)] flex flex-col items-center justify-center relative ">
                <img
                  src={per4}
                  alt="Smooth Skin Pills"
                  className="w-36 h-36 object-contain mb-4"
                />
                <h3 className="text-md md:text-xl font-semibold text-white text-center absolute">Detox & Restore</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home1;