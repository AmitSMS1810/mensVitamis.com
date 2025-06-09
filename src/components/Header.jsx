import React, { useState, useEffect, useContext } from 'react';
import { FiMenu, FiShoppingCart, FiUser, FiX, FiSearch, FiUserPlus } from 'react-icons/fi';
import { BsCurrencyDollar } from "react-icons/bs";
import logo from "../../src/assets/logo1.png";
import offer from "../../src/assets/offer.png";
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContex';
import { Badge } from 'primereact/badge';
import axiosInstance from '../Auth/axiosInstance';
import SignIn from '../Auth/SignIn';
import UserProfile from './UserProfile';

const Header = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { cart, setCart, cartId, setCartId, amount, toggleCartSidebar, products, setProducts, scrollToHome2, email, addresses, setAddresses, jwtToken, logout, userId, isSignInModalOpen, setIsSignInModalOpen, refetchAddress,refetchCart,isProfileModalOpen, setIsProfileModalOpen,loadingProduct,setLoadingProduct } = useAuth();
    const location = useLocation();

    const fetchProducts = async () => {
        setLoadingProduct(true)
        const response = await axiosInstance.get(`/vitamin/getPaginatedVitaminProducts?itemPerPage=${itemPerPage}&currentPage=${currentPage}`);
        setTotalPages(response.data.totalPages);
        setProducts(response.data.productList);
        setCurrentPage(response.data.pageNumber + 1);
        setLoadingProduct(false)
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get(`/cart/getCartByUserId/${userId}`);
                setCart(response.data.dto.cartItems || []);
                setCartId(response.data.dto.id || 0); // Store cart ID
            } catch (error) {
                setCart([]); // Fallback to empty cart
                setCartId(0); // Fallback to default cart ID
                localStorage.setItem('cartId', '0');
            }
        };

        if (userId) {
            fetchCart();
        }
    }, [userId, setCart, setCartId,refetchCart]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen || isSignInModalOpen || isProfileModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen, isSignInModalOpen, isProfileModalOpen]);

    const openSignInModal = () => {
        setIsSignInModalOpen(true);
    };

    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    };

    const openProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleUserIconClick = () => {
        if (jwtToken) {
            openProfileModal();
        } else {
            openSignInModal();
        }
    };


    const fetchAddresses = async () => {
        const response = await axiosInstance.get(`/profile/getAddressByUserId/${userId}`)
        setAddresses(response.data.dtoList)
    }
    useEffect(() => {
        fetchAddresses()
    }, [userId, refetchAddress])
    return (
        <>
            <header className={`bg-gradient-to-r from-[#A9C9B1] via-[#67756b] to-[#424542] text-[#f8eedc] px-4 md:px-8 lg:px-12 py-3 flex items-center justify-between w-full shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'h-[70px]' : 'h-[70px] sm:h-[130px]'}`}>
                <div className="flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden mr-4"
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:translate-x-0">
                        <NavLink to="/">
                            <img src={logo} alt="Company Logo" className="w-36 md:w-42" />
                        </NavLink>
                    </div>
                </div>

                <nav className="hidden lg:flex items-center space-x-8">
                    <NavLink
                        to="/"
                        className="relative py-2 px-1 text-gray-300 hover:text-white transition-all duration-300 ease-in-out
                   after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
                   after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/shop"
                        className="relative py-2 px-1 text-gray-300 hover:text-white transition-all duration-300 ease-in-out
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
                  after:bg-white after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                    >
                        Shop
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className="relative py-2 px-1 text-gray-300 hover:text-white transition-all duration-300 ease-in-out
                   after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
                   after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Contact Us
                    </NavLink>

                    <NavLink
                        to="/blog"
                        className="relative py-2 px-1 text-gray-300 hover:text-white transition-all duration-300 ease-in-out
                   after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
                   after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Blogs
                    </NavLink>

                    <NavLink
                        to="/pay"
                        className="relative py-2 px-1 text-gray-300 hover:text-white transition-all duration-300 ease-in-out
                   after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
                   after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Pay
                    </NavLink>
                </nav>

                <div className="flex items-center space-x-6">
                    {email ?
                        <FiUser
                            className="hidden lg:block cursor-pointer hover:text-blue-500 transition-colors"
                            size={22}
                            onClick={handleUserIconClick}
                        />
                        :
                        <FiUserPlus
                            className="hidden lg:block cursor-pointer hover:text-white transition-colors"
                            size={22}
                            onClick={handleUserIconClick}
                        />}


                    <div className="flex items-center space-x-2">
                        <div onClick={toggleCartSidebar} className="p-overlay-badge cursor-pointer hover:text-white transition-colors z-40">
                            <FiShoppingCart size={22} />
                            <Badge value={cart.length}></Badge>
                        </div>
                        <div className="hidden sm:flex items-center ml-4">
                            <BsCurrencyDollar size={20} className="mr-1" />
                            <span className="text-white">{amount?.toFixed(2) || '0.00'}</span>
                        </div>
                    </div>
                </div>

                {location.pathname === '/' && (
                    <img
                        src={offer}
                        alt="Offer Badge"
                        className="absolute -bottom-20 right-2 md:-bottom-31 md:right-4 w-28 md:w-36 lg:w-42 z-30"
                    />
                )}
            </header>

            <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <img src={logo} alt="Company Logo" className="w-32" />
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                        <FiX size={24} className="text-gray-600" />
                    </button>
                </div>

                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <nav className="flex flex-col p-4 space-y-4">
                    <NavLink
                        to="/"
                        className="py-2 px-3 rounded hover:bg-gray-100 text-gray-800 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    <div
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            scrollToHome2();
                        }}
                        className="py-2 px-3 rounded hover:bg-gray-100 text-gray-800 font-medium cursor-pointer"
                    >
                        Shop
                    </div>
                    <NavLink
                        to="/contact"
                        className="py-2 px-3 rounded hover:bg-gray-100 text-gray-800 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact Us
                    </NavLink>
                    <NavLink
                        to="/blog"
                        className="py-2 px-3 rounded hover:bg-gray-100 text-gray-800 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Blogs
                    </NavLink>
                    <NavLink
                        to="/payment"
                        className="py-2 px-3 rounded hover:bg-gray-100 text-gray-800 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Pay
                    </NavLink>
                    <FiUser
                        className="ml-2 cursor-pointer hover:text-white transition-colors"
                        size={22}
                        onClick={handleUserIconClick}
                    />
                </nav>
            </div>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 backdrop-brightness-50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {isSignInModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50">
                    <SignIn onClose={closeSignInModal} />
                </div>
            )}

            {isProfileModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50">
                    <div className=" bg-white rounded-lg shadow-lg p-6 w-1/2 ">
                        <div className='flex justify-end'>
                            <button
                                onClick={closeProfileModal}
                                className=" text-gray-600 hover:text-gray-800"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        <UserProfile />
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;