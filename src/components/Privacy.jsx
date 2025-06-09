import React, { useEffect, useRef } from 'react'

function Privacy() {
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
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-8'>Privacy Policy</h1>

                {/* Introduction */}
                <div className='mb-10'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Introduction</h2>
                    <p className='text-gray-600 leading-relaxed'>
                        At Men's Vitamins, your privacy is of utmost importance to us. We are dedicated to protecting the information you share with us and ensuring that your experience on our website is secure, transparent, and respectful of your trust.
                        By visiting or using www.mensvitamins.com, you agree to the terms outlined in this Privacy Policy.
                    </p>
                </div>

                {/* Information We Collect */}
                <div className='mb-10'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Information We Collect</h2>
                    <p className='text-gray-600 mb-4'>
                        We may collect and store the following types of information:
                    </p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li className="text-gray-700">
                            <span className="font-medium">Personal Information:</span> Your name, email address, phone number, billing and shipping addresses, and payment information when you make a purchase or contact us.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-medium">Non-Personal Information:</span> IP address, browser type, device information, pages visited, and browsing behavior, typically collected through cookies and tracking technologies.
                        </li>
                    </ul>
                </div>

                {/* How We Use Your Information */}
                <div className='mb-10'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>How We Use Your Information</h2>
                    <p className='text-gray-600 mb-4'>We use your information to:</p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li className="text-gray-700">Process your orders and deliver your products efficiently.</li>
                        <li className="text-gray-700">Communicate with you about orders, support inquiries, or promotions (if you opt-in).</li>
                        <li className="text-gray-700">Personalize your shopping experience and recommend products tailored to your needs.</li>
                        <li className="text-gray-700">Improve our website, services, and product offerings.</li>
                        <li className="text-gray-700">Ensure website security and prevent fraud or unauthorized activities.</li>
                    </ul>
                </div>

                {/* Sharing Your Information */}
                <div className='mb-10'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Sharing Your Information</h2>
                    <p className='text-gray-600 mb-4'>
                        We do not sell, rent, or trade your personal information to third parties.
                        However, we may share your information with trusted partners who perform services on our behalf, such as:
                    </p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li className="text-gray-700">Payment processors</li>
                        <li className="text-gray-700">Delivery partners</li>
                        <li className="text-gray-700">Email marketing service providers</li>
                    </ul>
                </div>

                {/* Data Security */}
                <div className='mb-10 bg-gray-50 p-6 rounded-lg'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Data Security</h2>
                    <p className='text-gray-600 mb-4'>
                        Mens Vitamins uses industry-leading security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <p className='text-gray-600'>
                        While no system is completely secure, we take every reasonable precaution to safeguard your data.
                    </p>
                </div>

                {/* Cookies and Tracking Technologies */}
                <div className='mb-10'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Cookies and Tracking Technologies</h2>
                    <p className='text-gray-600 mb-4'>
                        Our website uses cookies and similar tools to enhance your browsing experience.
                        Cookies help us:
                    </p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li className="text-gray-700">Analyze website traffic and performance.</li>
                        <li className="text-gray-700">Personalize content and marketing offers.</li>
                        <li className="text-gray-700">Remember your preferences for future visits.</li>
                    </ul>
                    <p className='text-gray-600 mt-4'>
                        You can choose to disable cookies through your browser settings at any time, but some features of the site may not function optimally without them.
                    </p>
                </div>

                {/* Your Rights */}
                <div className='mb-10 bg-gray-50 p-6 rounded-lg'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Your Rights</h2>
                    <p className='text-gray-600 mb-4'>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li className="text-gray-700">Request access to the personal information we hold about you.</li>
                        <li className="text-gray-700">Request corrections or updates to your information.</li>
                        <li className="text-gray-700">Opt-out of marketing communications at any time.</li>
                        <li className="text-gray-700">Request the deletion of your personal information (subject to legal obligations).</li>
                    </ul>
                    <p className='text-gray-600 mt-4'>
                        To exercise these rights, please contact us at <a href="mailto:support@mensvitamins.com" className="text-blue-600 hover:underline">support@mensvitamins.com</a>
                    </p>
                </div>

                {/* Children's Privacy */}
                <div className='mb-10'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Children's Privacy</h2>
                    <p className='text-gray-600'>
                        Our products and services are intended for adults. We do not knowingly collect or solicit personal information from anyone under the age of 18. If we discover that a minor has submitted personal data, we will promptly delete that information.
                    </p>
                </div>

                {/* Updates to This Policy */}
                <div className='mb-10'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Updates to This Policy</h2>
                    <p className='text-gray-600'>
                        We reserve the right to update or modify this Privacy Policy at any time. Changes will be posted on the page, and the updated policy will be effective immediately upon posting.
                        We encourage you to review our Privacy Policy periodically to stay informed about how we are protecting your data.
                    </p>
                </div>

                {/* Contact Us */}
                <div className='bg-gray-50 p-6 rounded-lg'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>Contact Us</h2>
                    <p className='text-gray-600'>
                        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact:
                    </p>
                    <p className='text-gray-600 mt-2'>
                        📧 Email: <a href="mailto:support@mensvitamins.com" className="text-blue-600 hover:underline">support@mensvitamins.com</a>
                    </p>
                    <p>
                        🌐 Website: <a href="www.mensvitamins.com" className="text-blue-600 hover:underline"> www.mensvitamins.com</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Privacy;