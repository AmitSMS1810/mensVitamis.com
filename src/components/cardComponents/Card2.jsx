import React from 'react'
import caImg1 from "../../assets/cardImage1.png";
import carImg2 from "../../assets/cardImage2.png";

function Card2() {
    const features = [
        {
            title: "No Fillers. No Junk. Just Shilajit.",
            description: "No artificial colors, no preservatives, and no hidden ingredients — ever."
        },
        {
            title: "Traditional Wisdom Meets Modern Standards",
            description: "Rooted in 5,000 years of Ayurvedic practice. Refined with today's science, manufacturing, and packaging expectations."
        },
        {
            title: "Lab-Tested for Purity & Safety",
            description: "Every batch is tested for heavy metals, contaminants, and potency. You get only the cleanest, safest Shilajit."
        },
        {
            title: "Rich in Fulvic Acid & Minerals",
            description: "Packed with over 85 trace minerals and fulvic acid to supercharge your cells, increase nutrient absorption, and naturally support energy and stamina."
        },
        {
            title: "GMP-Certified & White-Labeled for Quality",
            description: "Manufactured in India in GMP-compliant facilities with transparent white-label documentation and consistent supply chain reliability."
        },
        {
            title: "GMP-Certified & White-Labeled for Quality",
            description: "Manufactured in India in GMP-compliant facilities with transparent white-label documentation and consistent supply chain reliability."
        }
    ];
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className=''>
                    <div className='flex justify-center items-center'> <img src={carImg2} alt="" /></div>
                    <h1 className='text-xl font-semibold text-center'>Gold Water</h1>
                    <p className='text-center'>Call directly or schedule a call with one of our wellness experts according to your preferred time slot</p>
                </div>
                <div>
                    <div className='flex justify-center items-center'>
                        <img src={caImg1} alt="" />
                    </div>
                    <h1 className='text-xl font-semibold text-center'>Shilajit</h1>
                    <p className='text-center'>Call directly or schedule a call with one of our wellness experts according to your preferred time slot</p>
                </div>
            </div>
            <div className='w-full bg-black h-0.5 mt-10 md:mt-30'></div>
            <div className='mt-10 md:mt-30'>
                <h1 className='text-2xl md:text-4xl font-semibold text-center'>What Makes it Special?</h1>
                <p className='text-center py-10'>Our Shilajit isn’t just another herbal supplement — it’s a premium, potent extract crafted with care and backed by tradition. Here’s what sets it apart:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center text-center">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 ">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="w-5 h-5 flex items-center justify-center bg-green-500 rounded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 text-left">{feature.title}</h2>
                        </div>
                        <p className="text-gray-600 text-left">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
            <div className='w-full bg-black h-0.5 mt-10 md:mt-30'></div>

        </div>
    )
}

export default Card2