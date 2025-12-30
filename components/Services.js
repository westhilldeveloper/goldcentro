'use client'

import { FaShoppingCart, FaDollarSign, FaUnlock, FaCertificate, FaShieldAlt, FaHeadset } from 'react-icons/fa'

export default function Services() {
  const services = [
    {
      icon: <FaShoppingCart />,
      title: 'Buy Gold',
      description: 'Purchase 24K pure gold with complete transparency and certification',
      features: ['100% Purity', 'Hallmark Certified', 'Secure Delivery']
    },
    {
      icon: <FaDollarSign />,
      title: 'Sell Gold',
      description: 'Get best prices for your gold with instant payment and valuation',
      features: ['Instant Valuation', 'Best Price', 'Immediate Payment']
    },
    {
      icon: <FaUnlock />,
      title: 'Release Gold',
      description: 'Release pledged gold with flexible repayment options',
      features: ['Easy Process', 'Flexible Terms', 'Quick Release']
    }
  ]

  const features = [
    {
      icon: <FaCertificate />,
      title: 'Certified Purity',
      description: 'All gold is BIS hallmark certified'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Storage',
      description: 'Bank-grade security for your investments'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-4">Our Services</h2>
          <p className="text-gray-600">Comprehensive gold solutions for all your needs</p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105"
            >
              <div className="text-4xl text-primary mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-secondary mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-primary text-secondary py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-secondary mb-8 text-center">
            Why Choose Gold Centro?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div className="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
                  <div className="text-2xl text-primary">{feature.icon}</div>
                </div>
                <h4 className="font-bold text-secondary mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}