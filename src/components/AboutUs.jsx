import React, { useEffect, useRef } from 'react'
import about from "../../src/assets/about.jpg";

function AboutUs() {
     const topRef = useRef(null);
        useEffect(() => {
                topRef.current?.scrollIntoView({ behavior: 'smooth' });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, []);
    const features = [
        {
            title: "✅ Our Story.",
            description: "At Mens Vitamins, we believe true strength comes from within. Inspired by generations of hardworking men who valued health, resilience, and purpose, we built our brand to honor those timeless principles — while embracing the advancements of modern science. Our journey began with a single goal: to create vitamins that support men’s unique health needs through every stage of life."
        },
        {
            title: "✅ Our Mission",
            description: "We are committed to fueling men with the essential nutrients they need to live with strength, energy, and confidence. We don't just make supplements — we build foundations for better living, stronger families, and a more resilient future."
        },
        {
            title: "✅ What Makes Us Different",
            description: "At Mens Vitamins, tradition and innovation go hand in hand. Our formulas are crafted with premium, responsibly sourced ingredients, blending ancient wellness wisdom with today’s scientific breakthroughs. Every product is thoughtfully designed to support men’s specific health goals — from physical strength to mental clarity and endurance."
        },
        {
            title: "✅ Why Men Trust Mens Vitamin",
            description: "Men from all walks of life trust Mens Vitamins because we understand their journey. From your first workout to your golden years, our vitamins are there to support your strength, stamina, and spirit every step of the way."
        },
        {
            title: "✅ Tradition Meets Innovation",
            description: "We honor the natural health remedies passed down through generations while embracing new nutritional discoveries that enhance vitality and well-being. It’s this perfect balance of respect for the past and vision for the future that defines who we are."
        },
        {
            title: "✅ Our Promise to You",
            description: "When you choose Mens Vitamins, you're choosing more than a vitamin — you're choosing a legacy of strength. We promise to always deliver clean, effective, and trustworthy products that help you meet life's demands with confidence and resilience."
        }
    ];
    return (
        <>
            <div ref={topRef} className="mt-16 md:mt-30">
                <div className="">
                    <img
                        src={about}
                        alt="About Meme Vitamins"
                        className="w-full h-[600px] object-cover rounded-lg shadow-xl"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    {/* About Content */}
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">About Us</h1>

                        <p className="text-xl text-gray-700 leading-relaxed font-semibold">
                            At Mens Vitaminshop, we believe that strength, vitality, and resilience are not just words - they are a way of life.
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Rooted in the foundation of traditional wellness wisdom and informed by modern nutrition science, we offer premium nutrition solutions exclusively for men who understand the importance of investing in a stronger future.
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            We understand that optimal health is the greatest investment. From the hardworking professional to the spiritual seeker, every man deserves access to the highest standard of wellness - the same standard our grandfathers knew.
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our mission is simple: to provide more than just essential nutrients. We help build powerful, healthy, and confident lives.
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Every product we create meets our strict standards for purity, potency, and purpose. We source only the finest ingredients, maintain an integrity-controlled foundation, and continually innovate with today's scientific breakthroughs. Because we know that while tradition shows us where we come from, innovation propels us forward.
                        </p>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="mt-20 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Us?</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Traditional Wisdom + Modern Science</h3>
                                <p className="text-gray-600">Honoring classic principles while embracing the best of modern nutritional research.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Life-Stage Specific Formulas</h3>
                                <p className="text-gray-600">Tailored solutions to meet men's needs at every stage of life.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Commitment to Longevity</h3>
                                <p className="text-gray-600">Comprehensive, authentic care designed to support lifelong wellness.</p>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-xl text-gray-700 font-medium mb-6">
                                At Meme Vitamins, we don't just sell vitamins.
                            </p>
                            <p className="text-lg text-gray-600">
                                We help build healthier minds, stronger families, and a more resilient world - one daily capsule at a time.
                            </p>
                            <p className="text-lg text-gray-600 mt-4 font-medium">
                                Join us. Strengthen your present, secure your future.
                            </p>
                        </div>
                    </div>
                    <h1 className='text-xl md:text-2xl font-bold text-center py-10'>Topic of Trust</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 h-full flex flex-col"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <h2 className="text-xl font-semibold text-gray-800">{feature.title}</h2>
                                </div>
                                <p className="text-gray-600 flex-grow">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs