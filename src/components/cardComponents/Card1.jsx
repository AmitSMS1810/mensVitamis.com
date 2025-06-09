import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import bl1 from "../../assets/blog1.png"; 
import bl2 from "../../assets/blog2.jpg";
import { useAuth } from '../../Auth/AuthContex';

function Card1() {
    const { products } = useAuth();
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Set default product when products load
    useEffect(() => {
        if (products && products.length > 0) {
            setCurrentImageIndex(0);
        }
    }, [products, currentProductIndex]);

    // Handle case when products are loading or empty
    if (!products || products.length === 0) {
        return <div className="mt-16 md:mt-30 text-center">Loading products...</div>;
    }

    const currentProduct = products[currentProductIndex] || {};

    // Format price for display
    const formatPrice = (price) => {
        return price ? `$${price.toFixed(2)}` : "N/A";
    };

    // Safety check for images array
    const productImages = currentProduct.imageUrls || [];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
        );
    };

    const selectImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="mt-16 md:mt-30">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 py-10 md:py-20">
                {/* Left Side - Product Image */}
                <div className="relative border rounded-xl p-4 flex flex-col items-center">
                    <div className="relative w-full flex justify-center">
                        <img
                            src={productImages[currentImageIndex] || "https://via.placeholder.com/256"}
                            alt={currentProduct.name || "Product image"}
                            className="w-64 h-64 object-contain"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/256";
                            }}
                        />
                        {currentProduct.discountAmount && (
                            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {`-${Math.round((currentProduct.discountAmount / currentProduct.price) * 100)}%`}
                            </span>
                        )}
                    </div>

                    {/* Navigation Arrows - Only show if multiple images */}
                    {productImages.length > 1 && (
                        <>
                            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                                <button onClick={prevImage} className="bg-white p-2 rounded-full shadow">
                                    <FiChevronLeft className="text-black" />
                                </button>
                            </div>
                            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                                <button onClick={nextImage} className="bg-white p-2 rounded-full shadow">
                                    <FiChevronRight className="text-black" />
                                </button>
                            </div>
                        </>
                    )}

                    {/* Thumbnails - Only show if multiple images */}
                    {productImages.length > 1 && (
                        <div className="flex space-x-2 mt-6">
                            {productImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="thumbnail"
                                    className={`w-16 h-16 object-contain border-2 rounded-lg cursor-pointer ${
                                        index === currentImageIndex ? 'border-amber-600' : 'border-gray-300'
                                    }`}
                                    onClick={() => selectImage(index)}
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/64";
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side - Product Details */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {currentProduct.name || "Product Name"}
                    </h1>
                    
                    {/* Brand */}
                    {currentProduct.brand && (
                        <p className="text-gray-600 text-sm mb-2">Brand: {currentProduct.brand}</p>
                    )}

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4">
                        {currentProduct.price && (
                            <span className="text-gray-500 line-through">
                                {formatPrice(currentProduct.price)}
                            </span>
                        )}
                        <span className="text-xl font-bold text-amber-600">
                            {formatPrice(currentProduct.discountAmount || currentProduct.price)}
                        </span>
                    </div>

                    {/* Product Details */}
                    <div className="mb-4">
                        {currentProduct.strength && (
                            <p className="text-gray-700"><strong>Strength:</strong> {currentProduct.strength}</p>
                        )}
                        {currentProduct.packagingType && (
                            <p className="text-gray-700"><strong>Packaging:</strong> {currentProduct.packagingType}</p>
                        )}
                        {currentProduct.dosageForm && (
                            <p className="text-gray-700"><strong>Form:</strong> {currentProduct.dosageForm}</p>
                        )}
                        {currentProduct.vegetarian !== undefined && (
                            <p className="text-gray-700">
                                <strong>Suitable for Vegetarians:</strong> {currentProduct.vegetarian ? "Yes" : "No"}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    {currentProduct.description && (
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 mb-1">Description:</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {currentProduct.description}
                            </p>
                        </div>
                    )}

                    {/* Health Benefits */}
                    {currentProduct.healthFocus && (
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 mb-1">Health Benefits:</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {currentProduct.healthFocus}
                            </p>
                        </div>
                    )}

                    {/* Use Cases */}
                    {currentProduct.useCases && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-800 mb-1">Use Cases:</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {currentProduct.useCases}
                            </p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col space-y-3">
                        <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-md transition">
                            Add to cart
                        </button>
                        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-md transition">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gray-100 py-16 px-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                    Product Benefits
                </h1>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[bl1, bl2, bl1].map((img, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col">
                            <div className="w-full h-48 overflow-hidden rounded-t-2xl">
                                <img 
                                    src={img} 
                                    alt={`Benefit ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/300";
                                    }}
                                />
                            </div>
                            <div className="p-6 flex-1 flex items-center justify-center">
                                <p className="text-gray-700 text-center text-sm font-medium">
                                    {index === 0 && "Supports energy and vitality"}
                                    {index === 1 && "Enhances immune function"}
                                    {index === 2 && "Promotes heart health"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-center py-5'>
                    <button className='bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md transition'>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card1;