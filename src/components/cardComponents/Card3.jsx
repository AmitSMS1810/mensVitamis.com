import React, { useRef, useState, useEffect } from 'react'
import medi from "../../assets/medicine.jpg";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import lab from '../../assets/labTested.png';

function Card3() {
    const products = [
        { name: 'VitaShakti', price: 399, discountAmount: 320, discount: '20%', rating: 4.5, image: img1, labVerified: lab },
        { name: 'AyurMantra', price: 399, discountAmount: 320, discount: '20%', rating: 4.5, image: img2, labVerified: lab },
        { name: 'ViryaMax', price: 399, discountAmount: 320, discount: '20%', rating: 4.5, image: img3, labVerified: lab },
        { name: 'AshwaForce', price: 399, discountAmount: 320, discount: '20%', rating: 4.5, image: img4, labVerified: lab },
        { name: 'Shilajit Gold', price: 399, discountAmount: 320, discount: '20%', rating: 4.5, image: img1, labVerified: lab },
        { name: 'HerbaVive', price: 399, discountAmount: 320, discount: '20%', rating: 4.5, image: img4, labVerified: lab },
        { name: 'ManRoots', price: 399, discountAmount: 320, discount: '20%', rating: 4.5, image: img3, labVerified: lab },
        { name: 'AyurStamina', price: 399, discountAmount: 320, discount: '20%', rating: 4.5, image: img1, labVerified: lab },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [cardsToShow, setCardsToShow] = useState(4); // Default to 4 cards

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setCardsToShow(mobile ? 1 : 4);
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const goToPrev = () => {
        setCurrentIndex(prev =>
            prev === 0 ? Math.max(0, products.length - cardsToShow) : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex(prev =>
            prev >= products.length - cardsToShow ? 0 : prev + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Calculate visible products
    const visibleProducts = products.slice(currentIndex, currentIndex + cardsToShow);
    // If we're at the end and don't have enough products, wrap around
    const wrappedProducts = currentIndex + cardsToShow > products.length
        ? [...visibleProducts, ...products.slice(0, cardsToShow - visibleProducts.length)]
        : visibleProducts;

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <h1 className='text-xl md:text-4xl text-center font-semibold'>How to Use</h1>
            <div className='flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 py-10'>
                <div>
                    <img src={medi} alt="" className='w-72' />
                </div>
                <div>
                    <h1 className='text-xl md:text-2xl py-4 '>Step 1</h1>
                    <p>Take 1 capsule with milk twice a day after meals as directed by our Ayurvedic health expert.</p>
                    <h1 className='text-xl md:text-2xl py-4'>Step 2</h1>
                    <p>Consume for at least 3 months to get the desired results.</p>
                </div>
            </div>

            <h1 className='text-2xl md:text-4xl font-semibold py-10 text-center'>Related Products</h1>

            {/* Related Products Slider */}
            <div className="relative w-full overflow-hidden">
                <div className="flex justify-center">
                    <div className="relative w-full max-w-6xl">
                        {/* Left Arrow - Show only when there are more products */}
                        {products.length > cardsToShow && (
                            <button
                                onClick={goToPrev}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                            >
                                <FiChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>
                        )}

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10">
                            {wrappedProducts.map((product, index) => (
                                <div key={index} className="bg-[#f2faf4] rounded-lg p-4 shadow-sm">
                                    <div className="bg-white rounded-lg p-4 flex flex-col items-center h-full">
                                        {/* Discount Badge */}
                                        <div className="self-start bg-gray-200 text-xs font-bold rounded-full px-2 py-1 mb-2">
                                            {product.discount} OFF
                                        </div>

                                        {/* Product Image */}
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-32 h-32 object-contain my-2"
                                        />

                                        {/* Product Info */}
                                        <div className="w-full text-center mt-auto">
                                            <h3 className="text-md font-medium text-gray-800 mb-1">
                                                {product.name}
                                            </h3>

                                            {/* Rating */}
                                            <div className="flex justify-center items-center mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.314 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                                                    </svg>
                                                ))}
                                                <span className="text-xs text-gray-600 ml-1">
                                                    {product.rating}
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex justify-center gap-2 mb-3">
                                                <span className="text-sm line-through text-gray-500">${product.price}</span>
                                                <span className="text-md font-bold text-green-600">${product.discountAmount}</span>
                                            </div>

                                            {/* Lab Verified */}
                                            <img
                                                src={product.labVerified}
                                                alt="Lab Verified"
                                                className="w-12 h-12 mx-auto mb-3"
                                            />

                                            {/* Add to Cart Button */}
                                            <button className="w-full bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow - Show only when there are more products */}
                        {products.length > cardsToShow && (
                            <button
                                onClick={goToNext}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                            >
                                <FiChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Navigation Dots - Only show if mobile */}
                {isMobile && products.length > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {products.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-amber-600' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card3;