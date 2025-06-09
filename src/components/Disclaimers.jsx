import React, { useEffect, useRef } from 'react'

const Disclaimer = () => {
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
                <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800 mt-20 md:mt-32">
                    <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Medical Disclaimer</h2>
                        <p className="mb-4">
                            The content provided on Men’s Vitamins (www.mensvitamins.com) is for informational purposes only and is not intended as a substitute for advice from your physician, pharmacist, or other licensed healthcare provider.
                        </p>
                        <p className="mb-4">
                            Always consult a qualified healthcare professional before starting any new vitamin, supplement, or health-related regimen.
                        </p>
                        <p> Products and statements offered through this site have not been evaluated by the Food and Drug Administration (FDA) and are not intended to diagnose, treat, cure, or prevent any disease.</p>
                    </section>
                    <section className='mb-8'>

                        <h3 className="text-2xl font-semibold mb-3 mt-6">Individual Results May Vary</h3>
                        <p>
                            Every individual’s health, body chemistry, and lifestyle are unique. Therefore, results from using our products may vary from person to person.
                        </p>
                        <p>
                            We do not guarantee specific outcomes or results from the use of any product sold on our site.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
                        <p>
                            We make every effort to ensure that product descriptions and images are accurate.<br />
                            However, packaging, ingredients, and directions may change without notice.<br />
                            Always read labels, warnings, and directions provided with the product before use.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                        <p>
                            Men’s Vitamins, its owners, agents, and employees are not responsible for any adverse effects or consequences resulting from the use of any information, product, or suggestion provided on this website.
                        </p>
                        <p className="mt-4">
                            By purchasing from Men’s Vitamins, you acknowledge and agree that you are using the products at your own risk.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">External Links Disclaimer</h2>
                        <p>
                            Our website may contain links to external websites for informational purposes. We are not responsible for the content, accuracy, or practices of any linked site and do not endorse any product, service, or opinion contained therein.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p className="mb-2">For any questions about this disclaimer or your use of our website, please contact:</p>
                        <p className="font-medium">
                            Email:{' '}
                            <a
                                href="mailto:support@healthcare.com"
                                className="text-blue-600 hover:underline"
                                aria-label="Send email to support"
                            >
                                support@healthcare.com
                            </a>
                        </p>
                        <p className="font-medium">
                            Website:{' '}
                            <a
                                href="https://www.healthcare.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                                aria-label="Visit our website"
                            >
                                www.healthcare.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Disclaimer;