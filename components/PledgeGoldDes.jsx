// components/ReleasePledgedGold.js
import Image from 'next/image';
export default function PledgedGoldDes() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-6 px-4 sm:px-4 lg:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            {/* Left Content Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary via-yellow-200 to-yellow-400 p-8 rounded-2xl border-l-4 border-secondary shadow-lg">
                <p className="text-gray-700 text-sm mb-2">
                  Looking to <span className="font-bold text-blue-700">release pledged gold?</span> At Gold Centro, we make the process simple, transparent, and rewarding. With trust and expertise, we help you unlock the true value of your pledged gold through a quick and reliable release process.
                </p>
                
                {/* <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 text-sm rounded-full font-semibold">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Trusted 
                </div> */}
              </div>

              {/* Services Section */}
              <div className="bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-200 px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Value-Driven Services
                </h2>
                <p className="text-gray-700 mb-10 text-sm">
                  As a trusted name in gold buying, we provide a range of value-driven services designed to make your experience effortless and fair:
                </p>

                {/* Service 1: Free Purity Test */}
                <div className="mb-2 pb-2 border-b border-gray-100">
                  <div className="flex items-start mb-2">
                    <div className="bg-primary p-2 rounded-xl mr-5 flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Free Purity Test
                      </h3>
                      <p className="text-gray-700 text-sm">
                        You can benefit from our complimentary purity testing, which helps you know the exact worth of your pledged gold before release. Our process ensures complete transparency and accuracy.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service 2: Instant Transfer */}
                <div className="mb-2 pb-2 border-b border-gray-100">
                  <div className="flex items-start mb-2">
                    <div className="bg-primary p-2 rounded-xl mr-5 flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Instant Transfer
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Once your pledged gold is released, you'll receive instant payment through secure and verified banking modes. <span className="font-semibold">No waiting, no delays</span> and just a fast and smooth transaction every time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service 3: Transparent Process */}
                <div>
                  <div className="flex items-start mb-2">
                    <div className="bg-primary p-2 rounded-xl mr-5 flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Transparent Process
                      </h3>
                      <p className="text-gray-700 text-sm">
                        From evaluation to release, every step is automated and honest—no hidden deductions or misleading offers. <span className="font-semibold">What you see is what you get.</span> We value trust, clarity, and customer satisfaction above all.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - CTA & Benefits */}
            <div className="space-y-8">
              {/* Call to Action Box */}
              <div className="bg-gradient-to-br from-secondary via-yellow-900 to-gray-800 rounded-2xl p-10 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary rounded-full -translate-y-20 translate-x-20 opacity-20"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">
                    Unlock Your Gold's Value Today
                  </h3>
                  
                  <p className="text-sm mb-8 opacity-90">
                    Let Gold Centro assist you in releasing your pledged gold with confidence and turning it into instant value today.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="bg-primary p-2 rounded-full mr-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-md">No Hidden Charges</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary p-2 rounded-full mr-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-md">Secure Banking Transfer</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary p-2 rounded-full mr-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-md">Expert Valuation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process Steps */}
              <div className="relative bg-white rounded-2xl h-2/4  shadow-lg p-8 border border-gray-200">
                <Image 
                      src="/images/customer4.jpg" 
                      alt="Customer releasing pledged gold"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}