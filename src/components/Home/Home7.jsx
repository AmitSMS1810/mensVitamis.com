import React, { useRef, useState } from 'react'
import tes1 from "../../assets/testimonial1.webp";
import tes2 from "../../assets/testimonial2.webp";
import tes3 from "../../assets/testimonial3.jpeg";
import tes4 from "../../assets/testimonial4.avif";
import tes5 from "../../assets/testimonial5.webp";

function Home7() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const carouselRef = useRef(null);


    const testimonials = [
        {
            id: 1,
            image: tes1,
            content:"“I’ve tried a lot of energy supplements, but nothing comes close to this. Within two weeks of using your Shilajit, I noticed a real boost in focus and stamina—especially during my workouts and long workdays. Plus, it feels good knowing it's 100% natural.”",
                author: "David Malan",
            rating: "⭐️⭐️⭐️⭐️⭐️"
        },
        {
            id: 2,
            image: tes3,
            content:
               "“I was skeptical at first, but this Shilajit is the real deal. No jitters, no crash—just steady energy and a clear mind all day. I even sleep better. Love the minimalist packaging and the fact it’s lab-tested.”",
            author: "Sofia Romano",
            rating: "⭐️⭐️⭐️⭐️⭐️"
        },
        {
            id: 3,
            image: tes2,
            content:
               "Honestly, this changed my daily routine. I feel more grounded, focused, and my mood is better. My wife even noticed a difference! I’ve already subscribed to monthly deliveries. Great product, great results.”",
            author: "Lucas Müller",
            rating: "⭐️⭐️⭐️⭐️⭐️"
        },
        {
            id: 4,
            image: tes4,
            content:
                "The software’s integration with online orders and home delivery has been a game-changer for us. Customers can easily upload prescriptions, and we can fulfill orders efficiently. Our revenue has grown, and customer satisfaction has never been higher!",
            author: "Alejandro Torres",
            rating: "⭐️⭐️⭐️⭐️⭐️"
        },
        {
            id: 5,
            image: tes5,
            content:
                "Managing compliance, invoicing, and GST billing was a headache before we switched to Curo24. Now, everything is automated, reducing errors and saving us hours of manual work. This software is a must-have for every pharmacy!",
                author: "Yuna Sato",
            rating: "⭐️⭐️⭐️⭐️⭐️"


        },
    ];


    const handleCardClick = (index) => {
        setCurrentIndex(index);
        const cardElement = carouselRef.current.children[index];
        cardElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    };
    return (
        <>

            <div className='py-10 overflow-hidden'> {/* ✅ Prevents y and x scroll */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-gray-900 mb-8">
                        Testimonials
                    </h1>
                    <div className='w-72 h-2 bg-amber-700 rounded-full mx-auto mb-10'></div>

                    {/* Carousel Wrapper */}
                    <div className="relative max-w-6xl mx-auto overflow-hidden"> {/* ✅ Prevents x-scroll */}
                        <div
                            ref={carouselRef}
                            className="flex gap-6 transition-transform ease-in-out duration-500"
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4 transition-all duration-300 cursor-pointer text-wrap ${index === currentIndex ? "scale-105 z-10" : "scale-95 z-0"}`}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div
                                        className={`rounded-lg shadow-md p-6 flex flex-col items-center text-center h-full transition-colors duration-300 ${index === currentIndex ? "bg-white" : "bg-gray-200 opacity-70"}`}
                                    >
                                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-gray-200">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.author}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4 flex-grow">
                                            "{testimonial.content}"
                                        </p>
                                        <div className="mt-auto">
                                            <p className="text-red-600 font-semibold text-sm">{testimonial.author}</p>
                                            <p className="text-gray-500 text-xs">{testimonial.position}</p>
                                            <p>{testimonial.rating}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleCardClick(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? "bg-[#1F6C67]" : "bg-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home7