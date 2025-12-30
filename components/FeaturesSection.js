'use client'

import { FaClock, FaPercent, FaUserShield, FaMoneyBillWave } from 'react-icons/fa'

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaClock />,
      title: 'Quick Processing',
      description: 'Complete transactions within 30 minutes'
    },
    {
      icon: <FaPercent />,
      title: 'Best Rates',
      description: 'Guanteed best market prices'
    },
    {
      icon: <FaUserShield />,
      title: 'Secure',
      description: 'Bank-level security for all transactions'
    },
    {
      icon: <FaMoneyBillWave />,
      title: 'Instant Payment',
      description: 'Receive payments immediately'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <div className="text-3xl text-primary">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}