import React, { useEffect, useRef } from 'react'

const Terms = () => {
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
            <div ref={topRef}>
                <div className="max-w-4xl mx-auto px-4 py-8 font-sans mt-28">
                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Terms and Conditions</h1>
                    </header>

                    {/* Welcome Section */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Men’s Vitamins</h2>
                        <p className="text-gray-700 mb-4">
                            Thank you for choosing Men’s Vitamins.<br />
                            These Terms and Conditions ("Terms") govern your access to and use of our website,
                            <a href="https://www.recordatoms.com" className="text-blue-600 hover:underline"> www.mensvitamins.com</a>
                            ("Site"), and your purchase and use of our products and services.
                        </p>
                        <p className="text-gray-700">
                            By accessing or using the Site, you agree to be bound by these Terms and our Privacy Policy.
                            If you do not agree to these Terms, please do not use our Site.
                        </p>
                    </section>

                    {/* Use of Our Website */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of Our Website</h2>
                        <p className="text-gray-700 mb-4">
                            You agree to use our Site for lawful purposes only.<br />
                            You must not use the Site:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                            <li>In violation of any federal, state, or local laws or regulations;.</li>
                            <li>To infringe upon the intellectual property rights of others;</li>
                            <li>To engage in any activity that could harm, disable, overburden, or impair our Site.</li>
                        </ul>
                        <p className="text-gray-700">
                            We reserve the right to restrict or terminate your access if you violate these Terms.
                        </p>
                    </section>

                    {/* Health Disclaimer */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Disclaimer</h2>
                        <p className="text-gray-700 mb-4">
                            The products offered by Men’s Vitamins are dietary supplements regulated by the FDA as food, not drugs.
                            They are not intended to diagnose, treat, cure, or prevent any disease.
                        </p>
                        <p className="text-gray-700">
                            Information provided on our Site or in any communication is for informational purposes only and is not intended as a substitute for advice from your healthcare provider.<br />
                            Always consult your physician or qualified healthcare professional before starting any new supplement, especially if you are pregnant, nursing, taking medication, or have a medical condition.
                        </p>
                    </section>

                    {/* Product Information */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Information</h2>
                        <p className="text-gray-700">
                            We strive to ensure all product descriptions, pricing, and availability are accurate.<br />
                            However, we cannot guarantee that information is error-free or complete. We reserve the right to correct errors and update product information at any time without prior notice.
                        </p>
                    </section>

                    {/* Options and Payments */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders and Payment</h2>
                        <p className="text-gray-700 mb-4">
                            By placing an order through our Site, you agree to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                            <li>Provide accurate and complete billing and shipping information;</li>
                            <li>Authorize us to charge your selected payment method for the total order amount.</li>
                        </ul>
                        <p className="text-gray-700">
                            We reserve the right to refuse or cancel orders at our discretion, including orders that may appear fraudulent or incorrect.
                        </p>
                    </section>

                    {/* Shipping and Delivery */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping and Delivery</h2>
                        <p className="text-gray-700 mb-4">
                            We ship within the United States.<br />
                            Delivery times are estimates only and are not guaranteed.
                        </p>
                        <p className="text-gray-700">
                            We are not responsible for delays caused by carriers, weather, or other factors beyond our control.
                            For more information, please see our Shipping Policy (coming soon).
                        </p>
                    </section>

                    {/* Customer satisfaction */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Returns and Refunds</h2>
                        <p className="text-gray-700">
                            Customer satisfaction is important to us.<br />
                            Please refer to our Return & Refund Policy (coming soon) for details on how to initiate a return or request a refund.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
                        <p className="text-gray-700 mb-4">
                            All content on this Site — including text, graphics, logos, images, videos, and software — is the exclusive property of Men’s Vitamins and is protected by U.S. and international copyright, trademark, and intellectual property laws.
                        </p>
                        <p className="text-gray-700">
                            Unauthorized use or reproduction is strictly prohibited.
                        </p>
                    </section>

                    {/* Trade Benefit Units */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Links</h2>
                        <p className="text-gray-700">
                            Our Site may contain links to external websites we do not operate.<br />
                            We are not responsible for the content, privacy policies, or practices of third-party sites.
                            Use third-party websites at your own risk.
                        </p>
                    </section>

                    {/* Limitations of Liability */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
                        <p className="text-gray-700">
                            To the fullest extent permitted by law, Men’s Vitamins shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of, or inability to use, the Site or our products.
                        </p>
                    </section>

                    {/* Telecommunication */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Indemnification</h2>
                        <p className="text-gray-700">
                            You agree to defend, indemnify, and hold harmless Men’s Vitamins and its affiliates, officers, directors, employees, and agents from and against all claims, damages, liabilities, and expenses arising from your use of the Site or violation of these Terms.
                        </p>
                    </section>

                    {/* Changes to These Terms */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to These Terms</h2>
                        <p className="text-gray-700">
                            We may update or modify these Terms at any time without prior notice.<br />
                            Any changes will become effective immediately upon posting.
                        </p>
                        <p className="text-gray-700">
                            Your continued use of the Site following any updates constitutes your acceptance of the revised Terms.
                        </p>
                    </section>

                    {/* Conception Level */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law</h2>
                        <p className="text-gray-700">
                            These Terms shall be governed by and construed in accordance with the laws of the State of [Insert Your State, e.g., Florida or California], USA, without regard to its conflict of law principles.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-gray-700">
                            If you have any questions about these Terms and Conditions, please contact us at:
                            <br />
                            Email:
                            <a
                                href="mailto:support@mensvitamins.com"
                                className="text-blue-600 hover:underline"
                            >
                                support@mensvitamins.com
                            </a>
                        </p>
                        <p className="text-gray-700">
                            Website:
                            <a
                                href="https://www.mensvitamins.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                www.mensvitamins.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Terms;