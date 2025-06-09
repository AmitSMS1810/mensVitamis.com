import { useState } from 'react';
import { FiPlus, FiTrash2, FiUpload, FiX, FiInfo } from 'react-icons/fi';
import { FaPills, FaCapsules, FaSyringe, FaFlask } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import axiosInstance from '../Auth/axiosInstance';
import { ClipLoader } from 'react-spinners';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        strength: '',
        price: 0,
        discountAmount: 0,
        description: '',
        useCases: '',
        ageGroup: '',
        healthFocus: '',
        dosageForm: '',
        brand: '',
        packagingType: '',
        imageUrls: [],
        ingredients: [''],
        composition: [''],
        directionsForUse: '',
        safetyInformation: '',
        warnings: '',
        storageInstructions: '',
        expiryDate: '',
        manufacturer: '',
        fssaiLicenseNumber: '',
        vegetarian: false,
        prescriptionRequired: false,
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [activeSection, setActiveSection] = useState('basic');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayChange = (e, field, index) => {
        const newArray = [...product[field]];
        newArray[index] = e.target.value;
        setProduct(prev => ({
            ...prev,
            [field]: newArray
        }));
    };

    const addArrayField = (field) => {
        setProduct(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayField = (field, index) => {
        const newArray = [...product[field]];
        newArray.splice(index, 1);
        setProduct(prev => ({
            ...prev,
            [field]: newArray
        }));
    };

    const removeImage = (index, url) => {
        const newImageUrls = [...product.imageUrls];
        newImageUrls.splice(index, 1);

        const newImageFiles = [...imageFiles];
        newImageFiles.splice(index, 1);

        setProduct(prev => ({
            ...prev,
            imageUrls: newImageUrls
        }));
        setImageFiles(newImageFiles);
        deleteUploadedImage(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await axiosInstance.post("/vitamin/addNewVitaminProduct", product, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });
            
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Product added successfully',
                showConfirmButton: false,
                timer: 1500
            });
            
            // Reset form after successful submission
            setProduct({
                name: '',
                strength: '',
                price: 0,
                discountAmount: 0,
                description: '',
                useCases: '',
                ageGroup: '',
                healthFocus: '',
                dosageForm: '',
                brand: '',
                packagingType: '',
                imageUrls: [],
                ingredients: [''],
                composition: [''],
                directionsForUse: '',
                safetyInformation: '',
                warnings: '',
                storageInstructions: '',
                expiryDate: '',
                manufacturer: '',
                fssaiLicenseNumber: '',
                vegetarian: false,
                prescriptionRequired: false,
            });
            setImageFiles([]);
            setActiveSection('basic');
            setIsLoading(false);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to add product',
            });
        } finally {
            setIsLoading(false);
            setProgress(0);
        }
    };

    const getDosageFormIcon = () => {
        switch (product.dosageForm) {
            case 'Tablet': return <FaPills className="text-indigo-500" />;
            case 'Capsule': return <FaCapsules className="text-blue-500" />;
            case 'Syrup': return <FaFlask className="text-green-500" />;
            case 'Injection': return <FaSyringe className="text-red-500" />;
            default: return <FaPills className="text-gray-500" />;
        }
    };

    const sections = [
        { id: 'basic', label: 'Basic Info' },
        { id: 'images', label: 'Images' },
        { id: 'description', label: 'Description' },
        { id: 'ingredients', label: 'Ingredients' },
        { id: 'usage', label: 'Usage & Safety' },
        { id: 'additional', label: 'Additional Info' }
    ];

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file type
        if (!file.type.match('image.*')) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid File',
                text: 'Please upload an image file (JPEG, PNG, etc.)',
            });
            return;
        }
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            Swal.fire({
                icon: 'error',
                title: 'File Too Large',
                text: 'Maximum file size is 10MB',
            });
            return;
        }

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64Image = reader.result;
                const base64WithoutPrefix = base64Image.replace(
                    /^data:image\/[a-z]+;base64,/,
                    ""
                );
                try {
                    const response = await axios.post(
                        "https://image.rdvision.in/swift/uploadImage",
                        { imageData: base64WithoutPrefix },
                        { headers: { "Content-Type": "application/json" } }
                    );

                    if (response.data) {
                        setProduct((prev) => ({
                            ...prev,
                            imageUrls: [...prev.imageUrls, response.data]
                        }));
                    }
                } catch (apiError) {
                    console.error("Error uploading image:", apiError);
                    Swal.fire({
                        icon: "error",
                        title: "Upload Failed",
                        text: apiError.response?.data?.message || "Something went wrong while uploading the image!",
                    });
                }
            };

            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                Swal.fire({
                    icon: "error",
                    title: "Conversion Failed",
                    text: "Could not convert the file to bytecode.",
                });
            };
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    const deleteUploadedImage = async (url) => {
        if (url) {
            try {
                const imageId = url.split("/").pop();
                await axios.delete(
                    `https://image.rdvision.in/swift/deleteById/${imageId}`
                );
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10 mt-40 relative">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 backdrop-brightness-50 flex flex-col items-center justify-center z-50 rounded-lg">
                    <ClipLoader color="#4F46E5" size={50} />
                    <div className="mt-4 text-white font-medium">Saving product...</div>
                    {progress > 0 && (
                        <div className="w-1/2 bg-gray-200 rounded-full h-2.5 mt-4">
                            <div 
                                className="bg-indigo-600 h-2.5 rounded-full" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
                <div className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${
                    product.prescriptionRequired 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                }`}>
                    {product.prescriptionRequired ? 'Prescription Required' : 'OTC Product'}
                </div>
            </div>

            {/* Progress Navigation */}
            <div className="mb-8">
                <nav className="flex space-x-4 overflow-x-auto pb-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                                activeSection === section.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {section.label}
                        </button>
                    ))}
                </nav>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information Section */}
                {(activeSection === 'basic') && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
                                    Product Name <span className="text-red-500 ml-1">*</span>
                                    <FiInfo className="ml-2 text-gray-400 hover:text-gray-600 cursor-help" title="Enter the full product name as it should appear to customers" />
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    required
                                    placeholder="e.g., Vitamin C 500mg Tablets"
                                />
                            </div>

                            <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 flex items-center">
                                    Brand <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    value={product.brand}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    required
                                    placeholder="e.g., HealthPlus"
                                />
                            </div>

                            <div>
                                <label htmlFor="strength" className="block text-sm font-medium text-gray-700">
                                    Strength
                                </label>
                                <input
                                    type="text"
                                    id="strength"
                                    name="strength"
                                    value={product.strength}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="e.g., 500mg"
                                />
                            </div>

                            <div>
                                <label htmlFor="dosageForm" className="block text-sm font-medium text-gray-700">
                                    Dosage Form
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {getDosageFormIcon()}
                                    </div>
                                    <select
                                        id="dosageForm"
                                        name="dosageForm"
                                        value={product.dosageForm}
                                        onChange={handleChange}
                                        className="block w-full pl-10 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                                    >
                                        <option value="">Select Form</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Capsule">Capsule</option>
                                        <option value="Syrup">Syrup</option>
                                        <option value="Injection">Injection</option>
                                        <option value="Ointment">Ointment</option>
                                        <option value="Powder">Powder</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 flex items-center">
                                    Price <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">₹</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="block w-full pl-7 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">
                                    Discount Amount
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">₹</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="discountAmount"
                                        name="discountAmount"
                                        value={product.discountAmount}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="block w-full pl-7 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                disabled
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSection('images')}
                                className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Next: Images
                            </button>
                        </div>
                    </div>
                )}

                {/* Images Section */}
                {(activeSection === 'images') && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="text-sm font-medium text-blue-800 flex items-center">
                                <FiInfo className="mr-2" /> Image Guidelines
                            </h3>
                            <ul className="mt-2 text-sm text-blue-700 list-disc pl-5 space-y-1">
                                <li>Upload high-quality images (min. 800x800 pixels)</li>
                                <li>First image will be used as the main product image</li>
                                <li>Use white background for best results</li>
                                <li>Show actual product, not just packaging</li>
                            </ul>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Images <span className="text-red-500">*</span></label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
                                <div className="space-y-1 text-center">
                                    <div className="flex flex-col items-center justify-center text-sm text-gray-600">
                                        <FiUpload className="mx-auto h-8 w-8 text-indigo-500" />
                                        <div className="mt-2 flex text-sm">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                            >
                                                <span>Click to upload</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                    required={product.imageUrls.length === 0}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {product.imageUrls.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images ({product.imageUrls.length})</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {product.imageUrls.map((url, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={url}
                                                alt={`Preview ${index}`}
                                                className="h-32 w-full object-contain rounded-md border border-gray-200 bg-gray-50"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index, url)}
                                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                    title="Remove image"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                            {index === 0 && (
                                                <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                                                    Primary
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={() => setActiveSection('basic')}
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Previous: Basic Info
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSection('description')}
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                disabled={product.imageUrls.length === 0}
                            >
                                Next: Description
                            </button>
                        </div>
                    </div>
                )}

                {/* Description Section */}
                {(activeSection === 'description') && (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center">
                                Product Description <span className="text-red-500 ml-1">*</span>
                                <FiInfo className="ml-2 text-gray-400 hover:text-gray-600 cursor-help" title="Describe the product in detail. Include key features and benefits." />
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={product.description}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                required
                                placeholder="Provide a detailed description of the product..."
                            />
                        </div>

                        <div>
                            <label htmlFor="useCases" className="block text-sm font-medium text-gray-700">
                                Use Cases / Benefits
                            </label>
                            <textarea
                                id="useCases"
                                name="useCases"
                                rows={3}
                                value={product.useCases}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                placeholder="List the key benefits or conditions this product addresses..."
                            />
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={() => setActiveSection('images')}
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Previous: Images
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSection('ingredients')}
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Next: Ingredients
                            </button>
                        </div>
                    </div>
                )}

                {/* Ingredients & Composition Section */}
                {(activeSection === 'ingredients') && (
                    <div className="space-y-6">
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <h3 className="text-sm font-medium text-yellow-800 flex items-center">
                                <FiInfo className="mr-2" /> Important
                            </h3>
                            <p className="mt-2 text-sm text-yellow-700">
                                Ensure all ingredients are accurately listed as they appear on the product packaging.
                                This information is critical for customers with allergies or specific dietary requirements.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    Active Ingredients <span className="text-red-500 ml-1">*</span>
                                </label>
                                {product.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            value={ingredient}
                                            onChange={(e) => handleArrayChange(e, 'ingredients', index)}
                                            className="flex-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            required={index === 0}
                                            placeholder={`Ingredient ${index + 1}`}
                                        />
                                        {index > 0 ? (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayField('ingredients', index)}
                                                className="ml-2 p-2 text-red-500 cursor-pointer hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
                                                title="Remove ingredient"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        ) : (
                                            <div className="ml-2 w-8"></div>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayField('ingredients')}
                                    className="mt-2 inline-flex items-center cursor-pointer px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    <FiPlus className="mr-1" /> Add Ingredient
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Composition / Inactive Ingredients
                                </label>
                                {product.composition.map((item, index) => (
                                    <div key={index} className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleArrayChange(e, 'composition', index)}
                                            className="flex-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            placeholder={`Component ${index + 1}`}
                                        />
                                        {index > 0 ? (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayField('composition', index)}
                                                className="ml-2 p-2 text-red-500 cursor-pointer hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
                                                title="Remove component"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        ) : (
                                            <div className="ml-2 w-8"></div>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayField('composition')}
                                    className="mt-2 inline-flex items-center cursor-pointer px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    <FiPlus className="mr-1" /> Add Component
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={() => setActiveSection('description')}
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Previous: Description
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSection('usage')}
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Next: Usage & Safety
                            </button>
                        </div>
                    </div>
                )}

                {/* Usage & Safety Section */}
                {(activeSection === 'usage') && (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="directionsForUse" className="block text-sm font-medium text-gray-700 flex items-center">
                                Directions for Use <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                id="directionsForUse"
                                name="directionsForUse"
                                rows={3}
                                value={product.directionsForUse}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                required
                                placeholder="Provide clear instructions on how to use the product..."
                            />
                        </div>

                        <div>
                            <label htmlFor="safetyInformation" className="block text-sm font-medium text-gray-700">
                                Safety Information
                            </label>
                            <textarea
                                id="safetyInformation"
                                name="safetyInformation"
                                rows={2}
                                value={product.safetyInformation}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                placeholder="List any safety precautions or warnings..."
                            />
                        </div>

                        <div>
                            <label htmlFor="warnings" className="block text-sm font-medium text-gray-700">
                                Warnings
                            </label>
                            <textarea
                                id="warnings"
                                name="warnings"
                                rows={2}
                                value={product.warnings}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                placeholder="List any specific warnings..."
                            />
                        </div>

                        <div>
                            <label htmlFor="storageInstructions" className="block text-sm font-medium text-gray-700">
                                Storage Instructions
                            </label>
                            <textarea
                                id="storageInstructions"
                                name="storageInstructions"
                                rows={2}
                                value={product.storageInstructions}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                placeholder="Provide storage conditions if applicable..."
                            />
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={() => setActiveSection('ingredients')}
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Previous: Ingredients
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSection('additional')}
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Next: Additional Info
                            </button>
                        </div>
                    </div>
                )}

                {/* Additional Information Section */}
                {(activeSection === 'additional') && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">
                                    Age Group
                                </label>
                                <select
                                    id="ageGroup"
                                    name="ageGroup"
                                    value={product.ageGroup}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                                >
                                    <option value="">Select Age Group</option>
                                    <option value="Infants">Infants (0-2 years)</option>
                                    <option value="Children">Children (2-12 years)</option>
                                    <option value="Teens">Teens (13-19 years)</option>
                                    <option value="Adults">Adults (20-60 years)</option>
                                    <option value="Seniors">Seniors (60+ years)</option>
                                    <option value="All Ages">All Ages</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="healthFocus" className="block text-sm font-medium text-gray-700">
                                    Health Focus
                                </label>
                                <input
                                    type="text"
                                    id="healthFocus"
                                    name="healthFocus"
                                    value={product.healthFocus}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="e.g., Immunity, Digestion, Pain Relief"
                                />
                            </div>

                            <div>
                                <label htmlFor="packagingType" className="block text-sm font-medium text-gray-700">
                                    Packaging Type
                                </label>
                                <input
                                    type="text"
                                    id="packagingType"
                                    name="packagingType"
                                    value={product.packagingType}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="e.g., Bottle, Strip, Box"
                                />
                            </div>

                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={product.expiryDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">
                                    Manufacturer
                                </label>
                                <input
                                    type="text"
                                    id="manufacturer"
                                    name="manufacturer"
                                    value={product.manufacturer}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Manufacturer company name"
                                />
                            </div>

                            <div>
                                <label htmlFor="fssaiLicenseNumber" className="block text-sm font-medium text-gray-700">
                                    FSSAI License Number
                                </label>
                                <input
                                    type="text"
                                    id="fssaiLicenseNumber"
                                    name="fssaiLicenseNumber"
                                    value={product.fssaiLicenseNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="FSSAI license number if applicable"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    id="vegetarian"
                                    name="vegetarian"
                                    type="checkbox"
                                    checked={product.vegetarian}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="vegetarian" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                    Vegetarian Product
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="prescriptionRequired"
                                    name="prescriptionRequired"
                                    type="checkbox"
                                    checked={product.prescriptionRequired}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="prescriptionRequired" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                    Prescription Required
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={() => setActiveSection('usage')}
                                className="inline-flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Previous: Usage & Safety
                            </button>
                            <button
                                type="submit"
                                className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                                {isLoading ? "plaesw...":"Save Product"}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddProduct;