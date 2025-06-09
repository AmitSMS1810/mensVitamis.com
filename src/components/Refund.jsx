import React, { useEffect, useRef } from 'react';

function Refund() {
    const topRef = useRef(null);
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        <>
            <div ref={topRef} className='mt-16 md:mt-30'></div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
                <h1 className='text-2xl md:text-4xl font-semibold text-center'>Cancellations & Refunds</h1>

                <section className='mt-10'>
                    <h2 className='text-2xl md:text-4xl font-semibold mb-4'>Your Satisfaction Matters</h2>
                    <p>At Men's Vitamins, we stand behind the quality of our products. If you are not completely satisfied with your purchase, we are here to help.</p>
                </section>

                <section className='mt-8'>
                    <h2 className='text-xl md:text-2xl font-semibold'>Returns</h2>
                    <ul className="list-disc pl-6 space-y-3 mt-4">
                        <li>You may return most unopened and unused products within 30 days of purchase for a refund.</li>
                        <li>To be eligible for a return, the item must be in its original packaging and in the same condition you received it.</li>
                    </ul>
                    <p className='mt-4'>To initiate a return, please contact us at support@mensvitamins.com with your order number and reason for return. We will provide return instructions and a return authorization number.</p>

                    <h3 className='font-semibold mt-4'>Please Note:</h3>
                    <ul className="list-disc pl-6 space-y-3 mt-2">
                        <li>Customers are responsible for return shipping costs unless the return is due to our error (e.g., you received an incorrect or defective item).</li>
                        <li>Returns without prior authorization may not be accepted.</li>
                    </ul>
                </section>

                <section className='mt-8'>
                    <h2 className='text-xl md:text-2xl font-semibold'>Refunds</h2>
                    <ul className="list-disc pl-6 space-y-3 mt-4">
                        <li>Once your return is received and inspected, we will notify you of the approval or rejection of your refund.</li>
                        <li>If approved, your refund will be processed to your original method of payment within 5–7 business days.</li>
                        <li>Shipping charges are non-refundable.</li>
                    </ul>
                </section>

                <section className='mt-8'>
                    <h2 className='text-xl md:text-2xl font-semibold'>Damaged or Defective Items</h2>
                    <p className='mt-4'>If your item arrives damaged or defective, please contact us within 7 days of receiving your order. We will arrange for a replacement or refund at no additional cost to you.</p>
                </section>

                <section className='mt-8'>
                    <h2 className='text-xl md:text-2xl font-semibold'>Non-Returnable Items</h2>
                    <p className='mt-2'>Certain items are non-returnable, including:</p>
                    <ul className="list-disc pl-6 space-y-3 mt-2">
                        <li>Opened products</li>
                        <li>Used supplements</li>
                        <li>Items marked as final sale</li>
                    </ul>
                    <p className='mt-4'>Please make sure you review your purchase carefully before completing your order.</p>
                </section>

                <section className='mt-12'>
                    <h2 className='text-2xl md:text-4xl font-semibold mb-6'>Shipping Policy</h2>

                    <h3 className='text-xl md:text-2xl font-semibold mt-6'>Domestic Shipping (USA)</h3>
                    <p className='mt-2'>At Men's Vitamins, we are proud to serve customers across the United States.</p>

                    <div className='mt-4'>
                        <h4 className='font-semibold'>Processing Time</h4>
                        <p className='mt-1'>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>

                        <h4 className='font-semibold mt-4'>Shipping Methods</h4>
                        <p className='mt-1'>We offer Standard and Expedited shipping options through trusted carriers such as USPS, UPS, and FedEx.</p>

                        <h4 className='font-semibold mt-4'>Shipping Rates</h4>
                        <p className='mt-1'>Shipping charges for your order will be calculated and displayed at checkout based on your location and chosen shipping method.</p>

                        <h4 className='font-semibold mt-4'>Estimated Delivery Times</h4>
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>Standard Shipping: 3–7 business days</li>
                            <li>Expedited Shipping: 1–3 business days</li>
                        </ul>

                        <p className='mt-4 text-sm text-gray-600'>Please note: Delivery times are estimates and not guaranteed. Delays may occur due to high volume periods, weather conditions, or carrier issues.</p>

                        <h4 className='font-semibold mt-4'>Tracking Your Order</h4>
                        <p className='mt-1'>Once your order has shipped, you will receive a shipping confirmation email with a tracking number. Please allow up to 24 hours for the tracking information to become active.</p>

                        <h4 className='font-semibold mt-4'>Shipping Restrictions</h4>
                        <p className='mt-1'>We currently ship only within the continental United States, Alaska, and Hawaii. We do not ship to U.S. territories, P.O. Boxes, or APO/FPO addresses at this time.</p>
                    </div>
                </section>

                <div className='bg-gray-50 p-6 rounded-lg mt-12'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Contact Information</h2>
                    <p className='text-gray-600'>
                        If you have any questions regarding shipping, returns, or refunds, please reach out to us:
                    </p>
                    <p className='text-gray-600 mt-2'>
                        📧 Email: <a href="mailto:support@mensvitamins.com" className="text-blue-600 hover:underline">support@mensvitamins.com</a>
                    </p>
                    <p className='text-gray-600 mt-1'>
                        🌐 Website: <a href="https://www.mensvitamins.com" className="text-blue-600 hover:underline">www.mensvitamins.com</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Refund;