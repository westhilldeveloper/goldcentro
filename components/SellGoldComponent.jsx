// components/SellGoldComponent.js
import Image from 'next/image';

export default function SellGoldComponent() {
  return (
    <div className=" bg-gradient-to-b from-primary to-amber-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            {/* Left Content Section */}
            <div className="space-y-8">
              <div className="bg-amber-50 p-8 rounded-2xl border-l-4 border-amber-500">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Looking to Sell Gold?
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  Are you looking to sell gold? Welcome to Gold Centro - the modern solution for selling your gold. We combine cutting-edge technology with fair pricing to give you the best experience from our very first day of operation.
                </p>
                <div className="inline-flex items-center bg-amber-100 text-amber-800 px-6 py-3 rounded-full font-semibold">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Best Price Guarantee
                </div>
              </div>

              
            </div>

            {/* Right Side - Customer Testimonial & CTA */}
            <div className="space-y-0">
              {/* Customer Testimonial */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-full rounded-2xl p-8 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                 <Image 
                        src="/images/customer3.jpg" 
                        alt="Satisfied Customer" 
                        layout="fill"
                        objectFit="cover"
                      />
              </div>

            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}