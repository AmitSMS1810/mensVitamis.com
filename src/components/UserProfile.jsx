import React, { useEffect, useState } from 'react';
import {
    FiUser, FiMapPin, FiShoppingBag, FiHeart,
    FiSettings, FiCreditCard, FiLogOut, FiEdit,
    FiTrash2, FiPlus, FiChevronRight, FiCheck,
    FiXOctagon
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axiosInstance from '../Auth/axiosInstance';
import { useAuth } from '../Auth/AuthContex';
import Swal from 'sweetalert2';

function UserProfile() {
    const [activeTab, setActiveTab] = useState(0);
    const { email,
        firstName,
        lastName,
        userId,
        phoneNumber,
        profilePic, logout,
        addresses, setAddresses, setRefetchAddress } = useAuth()
    const [editMode, setEditMode] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [isUpdatePassword, setIsUpdatePassword] = useState(false)
    const [updatePassowrd, setUpdatePassword] = useState({
        currentPassword: '',
        newPassword: "",
        confirmPassword: ""
    })

    const [selectedOrder, setSelectedOrder] = useState()

    const [loadingPassworUpdate, setLoadingPasswordUpdate] = useState(false)

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatePassword((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const [newAddress, setNewAddress] = useState({
        statusId: 1,
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
        isDefault: false
    });

    // Sample user data
    const [user, setUser] = useState({
        name: firstName + " " + lastName,
        email: email,
        phone: phoneNumber,
        joinedDate: 'January 15, 2022',
        avatar: profilePic || 'https://randomuser.me/api/portraits/men/32.jpg'
    });

    // Sample orders
    const [orders, setOrders] = useState([]);

    // Sample wishlist items
    const wishlist = [];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setEditMode(false);
        // API call to save user data
    };

    const handleAddAddress = () => {
        if (newAddress.isDefault) {
            setAddresses(prev =>
                prev.map(addr => ({ ...addr, isDefault: false }))
            );
        }
        setAddresses(prev => [...prev, { ...newAddress, id: Date.now() }]);
        setNewAddress({
            statusId: 'Home',
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'United States',
        });
        setShowAddressForm(false);
    };

    const setDefaultAddress = (id) => {
        setAddresses(prev =>
            prev.map(addr => ({
                ...addr,
                isDefault: addr.id === id
            }))
        );
    };

    const deleteAddress = async (id) => {

        const respose = await axiosInstance.delete(`/address/deleteAddressById/${id}`)
        Swal.fire({ icon: 'success', title: 'Address Deleted', text: respose.data.message || 'Something went wrong' });
        setRefetchAddress((prev) => prev + 1)
        setAddresses(prev => prev.filter(addr => addr.id !== id));
    };

    const tabVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10 }
    };

    const addNewAddress = async () => {
        if (!newAddress.id) {
            const response = await axiosInstance.post(`/profile/addNewAddress/${userId}`, newAddress)
            setRefetchAddress((prev) => prev + 1)
            Swal.fire({ icon: 'success', title: 'Address Added', text: response.data.message || 'Something went wrong' });
            setShowAddressForm(false)
        }
    }


    const fetchOrdersByUser = async () => {
        const response = await axiosInstance.get(`/vitamin-order/getOrderByUserId/${userId}`)
        setOrders(response.data.dtoList)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' }); // May
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        return `${day}-${month}-${year}, ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    };

    const updatePassword = async (e) => {
        setLoadingPasswordUpdate(true)
        e.preventDefault()
        try {
            const response = await axiosInstance.put("/profile/updatePassword", {
                email: email,
                currentPassword: updatePassowrd.currentPassword,
                newPassword: updatePassowrd.newPassword
            })
            Swal.fire({ icon: 'success', title: 'Password Added', text: response.data.message || 'Something went wrong' });
            localStorage.setItem("jwtToken", response.data.token)
            setLoadingPasswordUpdate(false)
            setIsUpdatePassword(false)
        } catch (e) {
            Swal.fire({ icon: 'error', title: 'failed', text: e.response.data.message || 'Something went wrong' });
            setLoadingPasswordUpdate(false)
        }

    }

    return (
        <div className=" bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col lg:flex-row gap-8"
                >
                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-72">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="relative mb-4">
                                    <img
                                        src={user.avatar}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                    />
                                    {editMode && (
                                        <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition">
                                            <FiEdit size={16} />
                                        </button>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                                <p className="text-sm text-gray-500">Member since {user.joinedDate}</p>
                            </div>

                            <nav>
                                <ul className="space-y-1">
                                    {[
                                        { icon: <FiUser size={18} />, label: 'Profile', tab: 0 },
                                        { icon: <FiMapPin size={18} />, label: 'Addresses', tab: 1 },
                                        { icon: <FiShoppingBag size={18} />, label: 'Orders', tab: 2 },
                                        // { icon: <FiHeart size={18} />, label: 'Wishlist', tab: 3 },
                                        // { icon: <FiCreditCard size={18} />, label: 'Payments', tab: 4 },
                                        { icon: <FiSettings size={18} />, label: 'Settings', tab: 5 }
                                    ].map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => {
                                                    setActiveTab(item.tab)
                                                    if (item.tab == 2) {
                                                        fetchOrdersByUser()
                                                    }
                                                }}
                                                className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === item.tab
                                                    ? 'bg-blue-50 text-blue-600 font-medium'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className="mr-3">{item.icon}</span>
                                                <span>{item.label}</span>
                                                <span className="ml-auto">
                                                    <FiChevronRight size={16} />
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button onClick={logout} className="flex items-center w-full p-3 rounded-lg text-red-500 hover:bg-red-50 transition">
                                            <span className="mr-3"><FiLogOut size={18} /></span>
                                            <span >Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-white rounded-xl shadow-sm overflow-hidden"
                            >
                                {/* Profile Tab */}
                                {activeTab === 0 && (
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                                            {editMode ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditMode(false)}
                                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSave}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                                                    >
                                                        <FiCheck size={18} />
                                                        Save Changes
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setEditMode(true)}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                                                >
                                                    <FiEdit size={18} />
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={user.name}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                    />
                                                ) : (
                                                    <p className="p-3 bg-gray-50 rounded-lg">{user.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                {editMode ? (
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={user.email}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                    />
                                                ) : (
                                                    <p className="p-3 bg-gray-50 rounded-lg">{user.email}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                {editMode ? (
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={user.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                    />
                                                ) : (
                                                    <p className="p-3 bg-gray-50 rounded-lg">{user.phone}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                                                <p className="p-3 bg-gray-50 rounded-lg">{user.joinedDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Addresses Tab */}
                                {activeTab === 1 && (
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-2xl font-bold text-gray-800">My Addresses</h2>
                                            <button
                                                onClick={() => setShowAddressForm(true)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                                            >
                                                <FiPlus size={18} />
                                                Add New Address
                                            </button>
                                        </div>

                                        {showAddressForm && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mb-6 p-6 bg-gray-50 rounded-xl"
                                            >
                                                <h3 className="text-lg font-medium mb-4">Add New Address</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                                                        <select
                                                            name="statusId"
                                                            value={newAddress.statusId}
                                                            onChange={handleAddressInputChange}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                        >
                                                            <option value="1">Home</option>
                                                            <option value="2">Work</option>
                                                            <option value="3">Other</option>
                                                        </select>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                                        <input
                                                            type="text"
                                                            name="street"
                                                            value={newAddress.street}
                                                            onChange={handleAddressInputChange}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                            placeholder="123 Main St"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={newAddress.city}
                                                            onChange={handleAddressInputChange}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                            placeholder="New York"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            value={newAddress.state}
                                                            onChange={handleAddressInputChange}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                            placeholder="NY"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                                                        <input
                                                            type="text"
                                                            name="postalCode"
                                                            value={newAddress.postalCode}
                                                            onChange={handleAddressInputChange}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                            placeholder="10001"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                                        <input
                                                            name="country"
                                                            value={newAddress.country}
                                                            onChange={handleAddressInputChange}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                        />
                                                        {/* <option value="United States">United States</option>
                                                            <option value="Canada">Canada</option>
                                                            <option value="United Kingdom">United Kingdom</option>
                                                        </select> */}
                                                    </div>
                                                    {/* <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id="defaultAddress"
                                                            name="isDefault"
                                                            checked={newAddress.isDefault}
                                                            onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        />
                                                        <label htmlFor="defaultAddress" className="ml-2 text-sm text-gray-700">
                                                            Set as default address
                                                        </label>
                                                    </div> */}
                                                </div>
                                                <div className="flex justify-end gap-3 mt-6">
                                                    <button
                                                        onClick={() => setShowAddressForm(false)}
                                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={addNewAddress}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                                                    >
                                                        <FiCheck size={18} />
                                                        Save Address
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {addresses.map(address => (
                                                <motion.div
                                                    key={address.id}
                                                    whileHover={{ y: -2 }}
                                                    className={`border rounded-xl p-5 transition-all ${address.isDefault
                                                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                                                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${address.isDefault
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {address.addressType}
                                                            </span>
                                                            {address.isDefault && (
                                                                <span className="inline-block ml-2 px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                                    Default
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                className="text-gray-500 hover:text-blue-600 transition p-1"
                                                                onClick={() => {
                                                                    setNewAddress(address);
                                                                    setShowAddressForm(true);
                                                                }}
                                                            >
                                                                <FiEdit size={16} />
                                                            </button>
                                                            {!address.isDefault && (
                                                                <button
                                                                    className="text-gray-500 hover:text-red-600 transition p-1"
                                                                    onClick={() => deleteAddress(address.id)}
                                                                >
                                                                    <FiTrash2 size={16} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {/* <p className="font-medium text-gray-800">{user.name}</p> */}
                                                        <p className="text-gray-600">{address.street}</p>
                                                        <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                                                        <p className="text-gray-600">{address.country}, {address.postalCode}</p>
                                                    </div>
                                                    {!address.isDefault && (
                                                        <button
                                                            onClick={() => setDefaultAddress(address.id)}
                                                            className="mt-4 text-sm text-blue-600 hover:text-blue-800 transition font-medium"
                                                        >
                                                            Set as default
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Orders Tab */}
                                {activeTab === 2 && (
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>

                                        <div className="space-y-4 max-h-[65vh] overflow-y-auto">
                                            {orders && orders.slice().reverse().map(order => (
                                                <motion.div
                                                    key={order.id}
                                                    whileHover={{ scale: 1.005 }}
                                                    className="border rounded-xl overflow-hidden"
                                                >
                                                    <div className={`p-4 ${order.status === 'Delivered' ? 'bg-green-50' :
                                                        order.status === 'Shipped' ? 'bg-blue-50' :
                                                            'bg-gray-50'
                                                        }`}>
                                                        <div className="flex flex-wrap justify-between items-center gap-3">
                                                            <div>
                                                                <p className="font-medium text-gray-800">Order Id:-  {order.orderNumber}</p>
                                                                <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-gray-100 text-gray-800'
                                                                    }`}>
                                                                    {order.status}
                                                                </span>
                                                                {/* <p className="font-medium">${order.payment.amount}</p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 border-t">
                                                        <h4 className="font-medium mb-2">Items ({order.orderItems.length})</h4>
                                                        <ul className="space-y-2">
                                                            {order.orderItems.map((item, idx) => (
                                                                <li key={idx} className="flex justify-between">
                                                                    <span className="text-gray-600">{item.productName} × {item.quantity}</span>
                                                                    <span className="font-medium">${item.price.toFixed(2)}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="p-4 bg-gray-50 border-t flex justify-end">
                                                        <div className="px-4 py-2 border border-green-300 rounded-lg bg-green-50 transition mr-3">
                                                            Total Amount :- ${order.payment.amount && order.payment.amount.toFixed(2)}
                                                        </div>
                                                        <button onClick={() => setSelectedOrder(order)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition mr-3">
                                                            View Details
                                                        </button>
                                                        {order.status !== 'Cancelled' && order.tracking && (
                                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                                                Track Order
                                                            </button>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Wishlist Tab */}
                                {activeTab === 3 && (
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>

                                        {wishlist.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {wishlist.map(item => (
                                                    <motion.div
                                                        key={item.id}
                                                        whileHover={{ y: -5 }}
                                                        className="border rounded-xl overflow-hidden hover:shadow-md transition"
                                                    >
                                                        <div className="p-4">
                                                            <div className="flex justify-center mb-4">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="h-40 object-contain"
                                                                />
                                                            </div>
                                                            <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                                                            <p className="text-lg font-bold text-gray-900 mb-3">${item.price.toFixed(2)}</p>
                                                            <div className="flex justify-between items-center">
                                                                <span className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'
                                                                    }`}>
                                                                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                                                                </span>
                                                                <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                                                                    Add to Cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <FiHeart size={32} className="text-gray-400" />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-700 mb-1">Your wishlist is empty</h3>
                                                <p className="text-gray-500 mb-6">Save items you love for easy access later</p>
                                                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                                    Start Shopping
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Payment Methods Tab */}
                                {activeTab === 4 && (
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                                                <FiPlus size={18} />
                                                Add Payment Method
                                            </button>
                                        </div>

                                        <div className="border rounded-xl p-5 max-w-lg">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-8 bg-gradient-to-r from-blue-800 to-blue-600 rounded mr-4 flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">VISA</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">VISA ending in 4242</p>
                                                        <p className="text-sm text-gray-500">Expires 04/2025</p>
                                                    </div>
                                                </div>
                                                <button className="text-red-500 hover:text-red-700 transition p-1">
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center pt-4 border-t">
                                                <button className="text-blue-600 hover:text-blue-800 transition font-medium">
                                                    Set as default
                                                </button>
                                                <button className="text-blue-600 hover:text-blue-800 transition font-medium">
                                                    Edit details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Settings Tab */}
                                {activeTab === 5 && (
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>

                                        <div className="space-y-8">
                                            {/* <div className="border-b pb-6">
                                                <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h3>
                                                <div className="space-y-3">
                                                    <label className="flex items-center justify-between cursor-pointer">
                                                        <div>
                                                            <span className="block text-gray-700">Email notifications</span>
                                                            <span className="block text-sm text-gray-500">Order updates, promotions, and more</span>
                                                        </div>
                                                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                            <input
                                                                type="checkbox"
                                                                id="email-notifications"
                                                                className="sr-only"
                                                                defaultChecked
                                                            />
                                                            <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                                                        </div>
                                                    </label>
                                                    <label className="flex items-center justify-between cursor-pointer">
                                                        <div>
                                                            <span className="block text-gray-700">SMS notifications</span>
                                                            <span className="block text-sm text-gray-500">Order and delivery updates</span>
                                                        </div>
                                                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                            <input
                                                                type="checkbox"
                                                                id="sms-notifications"
                                                                className="sr-only"
                                                                defaultChecked
                                                            />
                                                            <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                                                        </div>
                                                    </label>
                                                    <label className="flex items-center justify-between cursor-pointer">
                                                        <div>
                                                            <span className="block text-gray-700">Promotional offers</span>
                                                            <span className="block text-sm text-gray-500">Discounts and special offers</span>
                                                        </div>
                                                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                            <input
                                                                type="checkbox"
                                                                id="promo-notifications"
                                                                className="sr-only"
                                                            />
                                                            <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div> */}

                                            <div className="border-b pb-6">
                                                <h3 className="text-lg font-medium text-gray-800 mb-4">Password</h3>
                                                <button onClick={() => setIsUpdatePassword(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                                    Change Password
                                                </button>
                                            </div>

                                            {/* <div>
                                                <h3 className="text-lg font-medium text-gray-800 mb-4">Delete Account</h3>
                                                <p className="text-gray-600 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                                    Delete Account
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                )}


                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
            {isUpdatePassword && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50 ">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Change Password</h3>
                            <button
                                onClick={() => setIsUpdatePassword(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label="Close"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="space-y-4" onSubmit={updatePassword}>
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password
                                </label>
                                <input
                                    type="text"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={updatePassowrd.currentPassword}
                                    onChange={handleUpdateChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter current password"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={updatePassowrd.newPassword}
                                    onChange={handleUpdateChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter new password"
                                    required
                                    minLength={8}
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Password must be at least 8 characters long
                                </p>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={updatePassowrd.confirmPassword}
                                    onChange={handleUpdateChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsUpdatePassword(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                {loadingPassworUpdate ? <button
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    please wait...
                                </button> : <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Update Password
                                </button>}
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {selectedOrder && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.orderNumber}</h3>
                                <div className="flex items-center mt-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedOrder.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            selectedOrder.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {selectedOrder.status}
                                    </span>
                                    <span className="ml-3 text-sm text-gray-500">
                                        Ordered on {new Date(selectedOrder.orderDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                aria-label="Close"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-gray-800">Delivery Address</h4>
                                <div className="text-gray-600 space-y-1">
                                    <p>{selectedOrder.deliveryAddress.street}</p>
                                    <p>{selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state}</p>
                                    <p>{selectedOrder.deliveryAddress.postalCode}</p>
                                    <p>{selectedOrder.deliveryAddress.country}</p>
                                    <p className="mt-2 text-sm capitalize">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                            {selectedOrder.deliveryAddress.addressType.toLowerCase()}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-gray-800">Payment Information</h4>
                                <div className="text-gray-600 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Amount:</span>
                                        <span className="font-medium">${selectedOrder.payment.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Method:</span>
                                        <span className="capitalize">{selectedOrder.payment.paymentMethod.toLowerCase()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Status:</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${selectedOrder.payment.paymentStatus === 'HOLD' ? 'bg-purple-100 text-purple-800' :
                                                selectedOrder.payment.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {selectedOrder.payment.paymentStatus}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Date:</span>
                                        <span>{new Date(selectedOrder.payment.paymentDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="font-semibold text-lg mb-4 text-gray-800">Order Items</h4>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedOrder.orderItems.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {item.product.imageUrls?.length > 0 && (
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-md object-cover" src={item.product.imageUrls[0]} alt={item.productName} />
                                                            </div>
                                                        )}
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                                                            <div className="text-sm text-gray-500">{item.product.strength}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ${item.price.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">Total</td>
                                            <td className="px-6 py-3 text-sm font-bold text-gray-900">
                                                ${selectedOrder.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-lg mb-3 text-gray-800">Product Details</h4>
                            {selectedOrder.orderItems.map((item, index) => (
                                <div key={index} className="mb-4 last:mb-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className="font-medium text-gray-900">{item.productName}</h5>
                                            <p className="text-sm text-gray-600">{item.product.strength} • {item.product.brand}</p>
                                        </div>
                                        <span className="text-sm font-medium">Qty: {item.quantity}</span>
                                    </div>
                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p><span className="font-medium">Use Cases:</span> {item.product.useCases}</p>
                                            <p><span className="font-medium">Age Group:</span> {item.product.ageGroup}</p>
                                            <p><span className="font-medium">Dosage Form:</span> {item.product.dosageForm}</p>
                                        </div>
                                        <div>
                                            <p><span className="font-medium">Prescription:</span> {item.product.prescriptionRequired ? 'Required' : 'Not Required'}</p>
                                            <p><span className="font-medium">Expiry:</span> {new Date(item.product.expiryDate).toLocaleDateString()}</p>
                                            <p><span className="font-medium">Vegetarian:</span> {item.product.vegetarian ? 'Yes' : 'No'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;