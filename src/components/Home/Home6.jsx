import React from 'react'
import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.jpg";
import blog3 from "../../assets/blog3.png";
import getper from "../../assets/getStarted.png"

function Home6() {
    const blogContent = [
        {
            id: 1,
            image: blog1,
            hcnt: 'Understanding Conception: Fertility, Timing, and Patience',
            cnt: 'If you’ve ever been told that “it only takes one time” to get pregnant, there’s some truth to that—but it’s not the whole story. Even with both partners being fertile, conception is only possible during a specific window each month.',
        },
        {
            id: 2,
            image: blog2,
            hcnt: 'Understanding Conception: Fertility, Timing, and Patience',
            cnt: 'If you’ve ever been told that “it only takes one time” to get pregnant, there’s some truth to that—but it’s not the whole story. Even with both partners being fertile, conception is only possible during a specific window each month.'
        },
        {
            id: 3,
            image: blog3,
            hcnt: 'Understanding Conception: Fertility, Timing, and Patience',
            cnt: 'If you’ve ever been told that “it only takes one time” to get pregnant, there’s some truth to that—but it’s not the whole story. Even with both partners being fertile, conception is only possible during a specific window each month.'
        }
    ]
    return (
        <>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                <h1 className='text-xl md:text-4xl text-center font-semibold py-10'>Read Our Blogs</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 sm:px-6 lg:px-0'>
                    {blogContent.map((item) => (
                        <div
                            key={item.id}
                            className='w-full bg-white shadow-md hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden'
                        >
                            {/* Image container with fixed aspect ratio (16:9) */}
                            <div className='relative pt-[56.25%] w-full overflow-hidden'>
                                <img
                                    src={item.image}
                                    alt={item.hcnt}
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    loading='lazy'
                                />
                            </div>

                            {/* Content container with responsive padding */}
                            <div className='p-4 sm:p-5 space-y-3'>
                                <h2 className='text-lg md:text-xl font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer'>
                                    {item.hcnt}
                                </h2>
                                <p className='text-sm md:text-base text-gray-600 line-clamp-3'>
                                    {item.cnt}
                                </p>
                                <div className='pt-2'>
                                    <button className='text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer'>
                                        Continue reading →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Hero Section */}
                <div className="py-12 md:py-24 lg:py-32">
                    <div className="relative max-w-7xl mx-auto">
                        <img
                            src={getper}
                            alt="Decorative element"
                            className="hidden md:block w-48 lg:w-72 xl:w-96 absolute top-0 right-0 z-12"
                        />
                        <div className="bg-green-50 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative z-10 shadow-sm overflow-hidden">
                            <div className="max-w-2xl">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    Timeless Wellness, Naturally Engineered for Men
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8">
                                    Herbal Solutions for Modern Men
                                </p>
                                <button className="px-6 py-3 sm:px-8 sm:py-4 bg-black text-white text-base sm:text-lg font-medium rounded-lg hover:bg-gray-800 transition duration-300 shadow-md hover:shadow-lg">
                                    Get started
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-12 sm:h-16 md:h-20 bg-gray-200 rounded-b-3xl -mt-3 sm:-mt-4"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home6