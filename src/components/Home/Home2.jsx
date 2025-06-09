import React, { useState } from 'react';
import axiosInstance from '../../Auth/axiosInstance';
import image1 from '../../assets/2.png';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img1.png';
import img3 from '../../assets/img1.png';
import img4 from '../../assets/img1.png';
import image2 from '../../assets/3.png';
import image3 from '../../assets/4.png';
import image4 from '../../assets/5.png';
import image5 from '../../assets/8.png';
import image6 from '../../assets/10.png';
import { useAuth } from '../../Auth/AuthContex';
import { Dialog } from 'primereact/dialog';
import lab from '../../assets/labTested.png';
import Sidebar from '../Sidebar';

function Home2() {
  const { cart, setCart, cartId, openCartSidebar, products, userId, isSignInModalOpen, setIsSignInModalOpen, loadingProduct } = useAuth();

  // Dialog state
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);

  // Gallery + toggle state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullUseCases, setShowFullUseCases] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(10);

  const displayImages = [
    { name: 'ALL PRODUCTS', image: image1 },
    { name: 'BETTER PERFORMANCE', image: image2 },
    { name: 'BOOST IMMUNITY AND STRENGTH', image: image3 },
    { name: 'VITALITY & STAMINA BOOSTER', image: image4 },
    { name: 'BEST SELLER', image: image5 },
    { name: 'COMBO FOR ALFA MEN', image: image6 },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setShowFullDescription(false);
    setShowFullUseCases(false);
    setVisible(true);
  };

  const addToCart = async (product) => {
    if (!userId) {
      setVisible(false)
      setIsSignInModalOpen(true)
      return;
    }
    setCart(prev =>
      prev.some(item => item.products.id === product.id)
        ? prev.map(item =>
          item.products.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        : [
          ...prev,
          {
            id: null,
            products: {
              id: product.id,
              name: product.name,
              price: product.price,
              discountAmount: product.discountAmount,
            },
            quantity: 1,
            price: product.discountAmount || product.price,
          },
        ]
    );

    const payload = {
      products: { id: product.id },
      quantity: 1,
      cart: { id: cartId || 0 },
    };

    try {
      setLoadingProductId(product.id);
      await axiosInstance.post('/cart/addNewItemToCart', payload);
      setVisible(false);
      openCartSidebar();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 10);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev =>
      (prev + 1) % (selectedProduct.imageUrls?.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev =>
      (prev - 1 + (selectedProduct.imageUrls?.length || 1)) % (selectedProduct.imageUrls?.length || 1)
    );
  };

  return (
    <>
      <div className="max-w-8xl mx-auto">
        <div className="flex overflow-x-auto scrollbar-hide space-x-8 px-4 py-4 justify-center">
          {displayImages.map((item, idx) => (
            <div key={idx} className="flex-shrink-0 flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-28 w-28 lg:h-44 lg:w-44 object-contain rounded-lg"
              />
              <p className="text-sm md:text-base text-center text-gray-700">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loadingProduct ? "Loading Products..." : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.slice(0, visibleProducts).map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-3 flex flex-col justify-between hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="relative">
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-bold rounded-full px-2 py-1 z-10 shadow">
                  {(((product.price - product.discountAmount) / product.price) * 100).toFixed(0)}%
                </div>

                {/* Search Icon */}
                <div
                  onClick={() => handleProductClick(product)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 cursor-pointer z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Product Image */}
                <img
                  src={product.imageUrls?.[0] || img1}
                  alt={product.name}
                  className="w-full h-40 object-contain my-4 transition-transform duration-200 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3
                    className="text-sm font-semibold text-gray-800 hover:underline mb-1 line-clamp-2"
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-yellow-400'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="line-through text-red-500">${product.price}</span>
                    <span className="text-green-600">${product.discountAmount}</span>
                  </div>
                </div>

                {/* Verified Lab Image */}
                <div className="flex-shrink-0">
                  <img
                    src={lab}
                    alt="Lab Verified"
                    className="w-8 h-8 md:w-20 md:h-20 object-contain border border-gray-200 rounded-full shadow-sm"
                  />
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition duration-200 cursor-pointer"
              >
                {loadingProductId === product.id
                  ? <span className="loading loading-spinner loading-sm"></span>
                  : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>}

        {visibleProducts < products?.length && (
          <div className="text-center mt-10">
            <button
              onClick={loadMoreProducts}
              className="px-8 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition"
            >
              Load More
            </button>
          </div>
        )}

        {/* Product Details Dialog */}
        <Dialog
          header={selectedProduct?.name || 'Product Details'}
          visible={visible}
          onHide={() => setVisible(false)}
          style={{ width: '50vw' }}
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
          className="rounded-lg"
        >
          {selectedProduct && (
            <div className="flex flex-col md:flex-row gap-6 p-4">
              {/* Image Gallery */}
              <div className="flex-1 relative">
                <div className="mb-4 border rounded-lg overflow-hidden relative">
                  <img
                    src={selectedProduct.imageUrls?.[currentImageIndex] || img1}
                    alt={selectedProduct.name}
                    className="w-full h-150 object-contain mx-auto"
                  />

                  {/* Navigation Arrows */}
                  {selectedProduct.imageUrls?.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery - Centered */}
                {selectedProduct.imageUrls?.length > 1 && (
                  <div className="flex justify-center gap-2 py-2 overflow-x-auto">
                    {selectedProduct.imageUrls.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 border rounded-md overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-16 w-16 object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-green-600">
                    ${selectedProduct.discountAmount || selectedProduct.price}
                  </span>
                  {selectedProduct.discountAmount && (
                    <span className="text-sm line-through text-gray-500">
                      ${selectedProduct.price}
                    </span>
                  )}
                  {selectedProduct.discount && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                      {selectedProduct.discount} OFF
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedProduct.strength && (
                    <div>
                      <h4 className="font-semibold">Strength:</h4>
                      <p className="text-sm">{selectedProduct.strength}</p>
                    </div>
                  )}

                  {selectedProduct.dosageForm && (
                    <div>
                      <h4 className="font-semibold">Dosage Form:</h4>
                      <p className="text-sm">{selectedProduct.dosageForm}</p>
                    </div>
                  )}

                  {selectedProduct.brand && (
                    <div>
                      <h4 className="font-semibold">Brand:</h4>
                      <p className="text-sm">{selectedProduct.brand}</p>
                    </div>
                  )}

                  {selectedProduct.manufacturer && (
                    <div>
                      <h4 className="font-semibold">Manufacturer:</h4>
                      <p className="text-sm">{selectedProduct.manufacturer}</p>
                    </div>
                  )}

                  {selectedProduct.ageGroup && (
                    <div>
                      <h4 className="font-semibold">Age Group:</h4>
                      <p className="text-sm">{selectedProduct.ageGroup}</p>
                    </div>
                  )}

                  {selectedProduct.healthFocus && (
                    <div>
                      <h4 className="font-semibold">Health Focus:</h4>
                      <p className="text-sm">{selectedProduct.healthFocus}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold">Prescription Required:</h4>
                    <p className="text-sm">
                      {selectedProduct.prescriptionRequired ? 'Yes' : 'No'}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">Vegetarian:</h4>
                    <p className="text-sm">
                      {selectedProduct.vegetarian ? 'Yes' : 'No'}
                    </p>
                  </div>

                  {selectedProduct.expiryDate && (
                    <div>
                      <h4 className="font-semibold">Expiry Date:</h4>
                      <p className="text-sm">{selectedProduct.expiryDate}</p>
                    </div>
                  )}

                  {selectedProduct.packagingType && (
                    <div>
                      <h4 className="font-semibold">Packaging Type:</h4>
                      <p className="text-sm">{selectedProduct.packagingType}</p>
                    </div>
                  )}

                  {selectedProduct.fssaiLicenseNumber && (
                    <div className="col-span-2">
                      <h4 className="font-semibold">FSSAI License:</h4>
                      <p className="text-sm">{selectedProduct.fssaiLicenseNumber}</p>
                    </div>
                  )}
                </div>

                {selectedProduct.composition?.length > 0 && (
                  <div>
                    <h4 className="font-semibold">Composition:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {selectedProduct.composition.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProduct.ingredients?.length > 0 && (
                  <div>
                    <h4 className="font-semibold">Ingredients:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {selectedProduct.ingredients.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProduct.description && (
                  <div>
                    <h4 className="font-semibold">Description:</h4>
                    <p className="text-sm">
                      {showFullDescription
                        ? selectedProduct.description
                        : `${selectedProduct.description.slice(0, 120)}…`}
                    </p>
                    {selectedProduct.description.length > 120 && (
                      <button
                        className="text-blue-600 text-xs mt-1"
                        onClick={() => setShowFullDescription(!showFullDescription)}
                      >
                        {showFullDescription ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </div>
                )}

                {selectedProduct.directionsForUse && (
                  <div>
                    <h4 className="font-semibold">Directions for Use:</h4>
                    <p className="text-sm">
                      {showFullUseCases
                        ? selectedProduct.directionsForUse
                        : `${selectedProduct.directionsForUse.slice(0, 120)}…`}
                    </p>
                    {selectedProduct.directionsForUse.length > 120 && (
                      <button
                        className="text-blue-600 text-xs mt-1"
                        onClick={() => setShowFullUseCases(!showFullUseCases)}
                      >
                        {showFullUseCases ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </div>
                )}

                {selectedProduct.safetyInformation && (
                  <div>
                    <h4 className="font-semibold">Safety Information:</h4>
                    <p className="text-sm">{selectedProduct.safetyInformation}</p>
                  </div>
                )}

                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                >
                  {loadingProductId === selectedProduct.id
                    ? <>
                      <span className="loading loading-spinner loading-sm"></span>
                    </>
                    : 'Add to Cart'}
                </button>
              </div>
            </div>
          )}
        </Dialog>

        <Sidebar />
      </div>
    </>
  );
}

export default Home2;