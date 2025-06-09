import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContex';
import { FaCartPlus } from 'react-icons/fa';
import axiosInstance from '../Auth/axiosInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { address, div } from 'framer-motion/client';

function Pay() {
    const { cart, addresses, amount, products, userId, cartId, setRefetchCart, setIsProfileModalOpen } = useAuth();
    const [useDifferentBilling, setUseDifferentBilling] = useState(false);
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [selectedShippingAddressId, setSelectedShippingAddressId] = useState(null);
    const [includeShipping, setIncludeShipping] = useState(false);
    const [loading,setLoading] = useState(false);
    const [createOrderDto, setCreateOrderDto] = useState({
        addressId: 0,
        cartId: cartId || 0,
        billingAddressDifferent: false,
        billingAddress: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            addressType: "BILLING",
        },
        deliveryAddress: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            addressType: "HOME",
        },
        paymentMethod: "CARD",
    });
    const navigate = useNavigate()
    useEffect(() => {
        if (addresses.length > 0 && !selectedShippingAddressId) {
            setSelectedShippingAddressId(addresses[0].id);
            updateDeliveryAddress(addresses[0]);
        }
    }, [addresses]);

    useEffect(() => {
        // Update billing address when useDifferentBilling changes
        if (!useDifferentBilling && selectedShippingAddressId) {
            const selectedAddress = addresses.find(addr => addr.id === selectedShippingAddressId);
            if (selectedAddress) {
                setCreateOrderDto(prev => ({
                    ...prev,
                    billingAddressDifferent: false,
                }));
            }
        } else {
            setCreateOrderDto(prev => ({
                ...prev,
                billingAddressDifferent: true
            }));
        }
    }, [useDifferentBilling, selectedShippingAddressId]);

    const updateDeliveryAddress = (address) => {
        setCreateOrderDto(prev => ({
            ...prev,
            addressId: address.id,
            deliveryAddress: {
                street: address.street,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                country: address.country,
                addressType: "HOME"
            },
        }));
    };

    const handleShippingAddressChange = (e) => {
        const addressId = parseInt(e.target.value);
        setSelectedShippingAddressId(addressId);
        const selectedAddress = addresses.find(addr => addr.id === addressId);
        if (selectedAddress) {
            updateDeliveryAddress(selectedAddress);
        }
    };

    const handleBillingAddressChange = (e) => {
        const { name, value } = e.target;
        setCreateOrderDto(prev => ({
            ...prev,
            billingAddress: {
                ...prev.billingAddress,
                [name]: value
            }
        }));
    };

    const handlePaymentMethodChange = (method) => {
        setCreateOrderDto(prev => ({
            ...prev,
            paymentMethod: method
        }));
    };

    const addToCart = async (product) => {
        if (!userId) {
            setIsSignInModalOpen(true);
            return;
        }
        const payload = {
            products: { id: product.id },
            quantity: 1,
            cart: { id: cartId || 0 },
        };

        try {
            setLoadingProductId(product.id);
            await axiosInstance.post('/cart/addNewItemToCart', payload);
            setRefetchCart((prev) => prev + 1);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        } finally {
            setLoadingProductId(null);
        }
    };

    const completeOrder = async () => {
        if (addresses.length === 0) {
            await Swal.fire({
                icon: 'warning',  // Corrected spelling from 'worning'
                title: 'Address Required',
                text: 'Add your shipping address to continue',
                confirmButtonText: 'Add Address',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsProfileModalOpen(true); // Open address modal
                }
            });
            return;
        }
        setLoading(true)
        try {
            const orderData = {
                ...createOrderDto,
                cartId: cartId,
                billingAddressDifferent: useDifferentBilling
            };

            const resp = await axiosInstance.post("/vitamin-order/placeOrder", orderData);
            // Handle success (redirect to confirmation, clear cart, etc.)
            Swal.fire({ icon: 'success', title: 'Order Placed', text: "Your order has been placed " });
            setRefetchCart((prev) => prev + 1)
            setIsProfileModalOpen(true)
            navigate("/")
        } catch (error) {
        } finally{
            setLoading(false);
        }
    };
    if (cart.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
                <div className='max-w-md mx-auto'>
                    <div className=''>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className='h-20 w-20 mx-auto text-gray-400'
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-800 mb-4'>Your cart is empty</h1>
                    <p className='text-gray-600 mb-6'>Looks like you haven't added any items to your cart yet</p>
                    <button onClick={() => navigate('/shop')} className='bg-black hover:bg-gray-800 transition-colors text-white px-8 py-3 rounded-md font-medium cursor-pointer'>
                        Continue Shopping
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className="mt-20 md:mt-32 min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section */}
                    <div className="lg:w-2/3 bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-6">Checkout</h2>
                        <div className="space-y-6">
                            {/* Contact */}
                            {/* <div>
                                <h3 className="text-sm font-medium text-gray-600">Contact</h3>
                                <input
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                                />
                            </div> */}

                            {/* Shipping Info */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-600">Shipping Address</h3>
                                {addresses.length === 0 ? (
                                    <div className='py-2'>
                                        <button onClick={() =>setIsProfileModalOpen(true)} className='bg-green-500 text-white px-4 py-1 rounded-md cursor-pointer'>Add Address</button>
                                    </div>
                                ) : (
                                    <select
                                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                                        value={selectedShippingAddressId || ""}
                                        onChange={handleShippingAddressChange}
                                    >
                                        {addresses.map((address) => (
                                            <option key={address.id} value={address.id}>
                                                {address.street}, {address.city}, {address.state}, {address.country} - {address.postalCode}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                <div className="flex items-start gap-3 mt-1">
                                    <input
                                        type="checkbox"
                                        id="shippingMethod"
                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                                        checked={includeShipping}
                                        onChange={(e) => setIncludeShipping(e.target.checked)}
                                    />
                                    <label htmlFor="shippingMethod" className="text-sm text-gray-500">
                                        SHIPPING METHOD:
                                        <span className="text-gray-700 font-medium"> $5.00</span> - Approximately 3-5 Day Delivery
                                    </label>
                                </div>
                            </div>

                            {/* Payment Method */}
                            {/* <div>
                                <h3 className="text-sm font-medium text-gray-600">Payment Method</h3>
                                <p className="text-xs text-gray-400">All transactions are secure and encrypted.</p>
                                <div className="mt-2 border p-4 rounded-md bg-gray-50">
                                    <div className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            name="payment"
                                            className="mr-2 accent-blue-500"
                                            checked={createOrderDto.paymentMethod === "CARD"}
                                            onChange={() => handlePaymentMethodChange("CARD")}
                                        />
                                        <span>Credit card</span>
                                    </div>
                                    {createOrderDto.paymentMethod === "CARD" && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                            <input type="text" placeholder="Card number" className="p-2 border border-gray-300 rounded-md" />
                                            <input type="text" placeholder="Name on card" className="p-2 border border-gray-300 rounded-md" />
                                            <input type="text" placeholder="MM/YY" className="p-2 border border-gray-300 rounded-md" />
                                            <input type="text" placeholder="CVV" className="p-2 border border-gray-300 rounded-md" />
                                        </div>
                                    )}
                                    <div className="flex items-center mt-4">
                                        <input
                                            type="radio"
                                            name="payment"
                                            className="mr-2 accent-blue-500"
                                            checked={createOrderDto.paymentMethod === "COD"}
                                            onChange={() => handlePaymentMethodChange("COD")}
                                        />
                                        <span>Cash on Delivery</span>
                                    </div>
                                </div>
                            </div> */}

                            {/* Billing Address */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-600">Billing Address</h3>
                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="billing"
                                        className="mr-2 accent-blue-500"
                                        checked={!useDifferentBilling}
                                        onChange={() => setUseDifferentBilling(false)}
                                    />
                                    <span>Same as shipping address</span>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="radio"
                                        name="billing"
                                        className="mr-2 accent-blue-500"
                                        checked={useDifferentBilling}
                                        onChange={() => setUseDifferentBilling(true)}
                                    />
                                    <span>Use a different billing address</span>
                                </div>
                                {useDifferentBilling && (
                                    <div className="space-y-3 bg-gray-50 p-4 rounded-md border">
                                        <input
                                            type="text"
                                            name="street"
                                            placeholder="Street Address"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={createOrderDto.billingAddress.street}
                                            onChange={handleBillingAddressChange}
                                        />
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={createOrderDto.billingAddress.city}
                                            onChange={handleBillingAddressChange}
                                        />
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={createOrderDto.billingAddress.state}
                                            onChange={handleBillingAddressChange}
                                        />
                                        <input
                                            type="text"
                                            name="country"
                                            placeholder="Country"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={createOrderDto.billingAddress.country}
                                            onChange={handleBillingAddressChange}
                                        />
                                        <input
                                            type="text"
                                            name="postalCode"
                                            placeholder="Postal Code"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={createOrderDto.billingAddress.postalCode}
                                            onChange={handleBillingAddressChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end items-center">
                            <button
                                onClick={completeOrder}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
                            >
                                {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Complete Order'}
                                
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Order Summary */}
                    <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Summary</h3>
                        <div className="max-h-[55vh] overflow-y-auto space-y-4">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                                    <div className="flex items-center">
                                        <div className="w-16 h-16 bg-white rounded-md mr-4 flex justify-center items-center border">
                                            <img src={item.products.imageUrls?.[0]} alt={item.products.name} className="h-full object-contain" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.products.name}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-gray-700">$ {item.price}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>${amount}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Shipping</span>
                                <span>${includeShipping ? '5.00' : '0.00'}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-gray-800 text-base">
                                <span>Total</span>
                                <span>${(Number(amount) + (includeShipping ? 5 : 0)).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-12">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">You Might Also Like</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {products.slice(0, 4).map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
                                <div className="w-full h-40 bg-gray-200 rounded-md mb-2 overflow-hidden">
                                    <img src={product.imageUrls?.[0]} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="font-medium text-gray-700 truncate">{product.name}</p>
                                <p className="text-sm text-red-500 line-through">${product.price}</p>
                                <p className="text-sm text-gray-500">${product.discountAmount}</p>

                                <div className="flex items-center mt-1 justify-between">
                                    <div className='flex items-center'>
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.5 3 2-6L2 7l6-1L10 1l2 5 6 1-4.5 5 2 6z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={loadingProductId === product.id}
                                        className={`mt-2 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 ${loadingProductId === product.id ? 'bg-gray-200' : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        {loadingProductId === product.id ? (
                                            <>
                                                <span className="loading loading-spinner loading-xs"></span>
                                                Adding...
                                            </>
                                        ) : (
                                            <FaCartPlus size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Pay;