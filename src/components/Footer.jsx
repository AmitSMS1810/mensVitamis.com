import React from 'react'
import logo from "../../src/assets/logo1.png";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { Link } from 'react-router-dom';
import lab from "../../src/assets/labTested.png";

function Footer() {
    return (
        <>
            <div className='w-full px-4 md:px-20 bg-black text-white py-10'>
                <div className='flex flex-col md:flex-row justify-between space-y-3'>
                    <div className='items-center flex flex-col '>
                       <Link to="/"> <img src={logo} alt="" className='w-36' /></Link>
                        <p className='text-xs md:text-sm'>Daily Strength from Nature’s Best.</p>
                        <img src={lab} alt="" className='w-20 h-20 rounded-full mt-2'/>
                    </div>
                    <div className='flex justify-center  gap-4 md:gap-20'>
                        <div>
                            <h1 className='text-[#b2882e] text-sm md:text-lg mb-4'>Shop by Category</h1>
                            <ul className='text-xs md:text-sm space-y-2'>
                                <li>Protein</li>
                                <li>Multivitamins</li>
                                <li>Biotin</li>
                                <li>Collagen</li>
                                <li>Hair Serum & More</li>
                                <li>Face Serums & More</li>
                                <li>Hormonal Health</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-[#b2882e] text-sm md:text-lg mb-4'>Shop by Concern</h1>
                            <ul className='text-xs md:text-sm space-y-2'>
                                <li>Weight</li>
                                <li>Fitness</li>
                                <li>Hair Health</li>
                                <li>Skin Health</li>
                                <li>Vitamin Deficiency</li>
                                <li>General Wellness</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-[#b2882e] text-sm md:text-lg mb-4'>Quick Links</h1>
                            <ul className='text-xs md:text-sm space-y-2'>
                                <Link to="/about">About us</Link>
                                <li>Track Order</li>
                                <li>Shipping & Delivery</li>
                                <Link to="/refund">Cancellations & refunds</Link>
                                <li>
                                    <Link to="/disclaimers">Disclaimers</Link>
                                </li>
                                <li>
                                    <Link to="/terms">Terms</Link>
                                </li>
                                <li>
                                    <Link to="/privacy">Privacy</Link>
                                </li>
                                <li>
                                    <Link to="/blog">Blog</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className=' sm:block flex flex-col items-center justify-center'>
                        <h1 className='text-[#b2882e]   mb-4'>Get Help</h1>
                        <ul className='list-disc space-y-2'>
                            <li>
                                <a href="tel:+13189366091" className="hover:underline">
                                    +1 318-936-6091
                                </a>
                            </li>
                                {/* Clickable Email */}
                                <li>
                                    <a href="mailto:info@mensvitaminshop.com" className="hover:underline">
                                        info@mensvitaminshop.com
                                    </a>
                                </li>

                                {/* Clickable Address */}
                                <li>
                                    <a
                                        href="https://www.google.com/maps?q=3715+XENOPHON+DR,+HOUSTON,+TX+77082-2922"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        MEN VITAMIN SHOP LLC <br />
                                        3715 XENOPHON DR <br />
                                        HOUSTON TX 77082-2922
                                    </a>
                                </li>
                        </ul>
                        <p className='text-sm text-center mt-5'>Social</p>
                        <p className='flex items-center gap-4 justify-center mt-5 cursor-pointer'>
                            <a href="https://www.facebook.com/profile.php?id=61575511965235"><FaFacebook size={24} className='text-blue-600 cursor-pointer' /></a>
                            <FaSquareInstagram size={24} className='text-red-400 cursor-pointer' />
                            <FaXTwitter size={24} className='cursor-pointer' />
                            <IoLogoLinkedin size={24} className='text-blue-400 rounded-full cursor-pointer' />
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer