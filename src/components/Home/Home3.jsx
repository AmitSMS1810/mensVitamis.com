import React from 'react';
import Gmp from "../../assets/gmp.jpg";
import Fda from "../../assets/fda.png";
import coa from "../../assets/coa.png";
import { BiSolidVideos } from "react-icons/bi";


function Home3() {
    return (
        <>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          <h1 className='text-2xl md:text-4xl text-center font-semibold'>Why choose us!</h1>
          <div className='text-center py-4'>
            <h1 className='text-xl md:text-2xl mb-2'>Authentic Source</h1>
            <p>Sourced from the pristine Himalayas, Shilajit has been used for thousands of years to support energy, strength, and overall vitality.</p>
          </div>
          <div className='text-center'>
            <h1 className='text-xl md:text-2xl mb-2'>Natural & Pure</h1>
            <p>Our Shilajit is lab-tested for purity, free from heavy metals and additives. Only the best for your body.</p>
          </div>
          <div className='text-center py-20'>
            <h1 className='text-xl md:text-2xl mb-2'>Ancient Wisdom, Modern Wellness</h1>
            <p>Benefit from a natural, time-tested remedy that supports your energy levels, stamina, and mental clarity without any artificial stimulants</p>
          </div>
          <div className='text-center'>
            <h1 className='text-xl md:text-4xl fonte-semibold mb-5'>Certified with</h1>
            <div className=' flex justify-center gap-4 items-center'>
                <img src={Gmp} alt="" className='w-20'/>
                <img src={Fda} alt="" className='w-20'/>
                <img src={coa} alt="" className='w-20'/>
            </div>
          </div>
        </div>
        {/*<div className='w-full py-4'>
            <div className='bg-black py-4 text-white flex items-center gap-4 justify-center cursor-pointer'>
              <BiSolidVideos/> <p>Click to watch our Product video</p>
            </div>
        </div>*/}
        </>
    );
}

export default Home3; 