'use client'

import { FaCheckCircle, FaHandHoldingUsd, FaBalanceScale, FaFlask, FaFire, FaUniversity, FaCalculator, FaMoneyBillWave, FaShieldAlt, FaGem, FaClock, FaEye } from 'react-icons/fa'
import { GiGoldBar } from 'react-icons/gi'
import ReleasePledgeGold from '@/components/ReleasePledgedGold'
import ReleasePledgedGold from '@/components/ReleasePledgedGold'
import HowItWorks from '@/components/HowItWorks'

export default function ValueGold() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-xl md:text-xl font-bold text-amber-900 mb-3 tracking-tight">
            GOLD CENTRO - BEST GOLD BUYERS
          </h1>
          <div className="h-1 w-28 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6 rounded-full"></div>
          
          <div className="max-w-5xl mx-auto">
            <p className="text-md md:text-md text-gray-700 leading-relaxed">
              Selling gold becomes simple, seamless, and completely reliable with Gold Centro. 
              Our streamlined method begins with a detailed assessment of the quality of your gold. 
              We then clean, melt, and weigh it, ensuring you receive the maximum value possible. 
              Our advanced technology includes <span className="font-semibold text-amber-700">Ultrasonic Cleaning</span> and <span className="font-semibold text-amber-700">Steam Cleaning</span> which ensures accuracy, transparency, and clarity at every step. 
              The best part? Every stage of the process is done <span className="font-bold text-amber-800">right in front of you</span>.
            </p>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mb-12">
          {/* Main Process Cards */}
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 mb-12">
            <div className='flex-1'>
              <h2 className="text-xl md:text-xl font-bold text-amber-900 text-left mb-2">
                HOW IT WORKS:
              </h2>
              <p className="text-md text-gray-800 text-left mb-6">
                Convert your gold in these simple steps:
              </p>
              <div className="h-full">
                <HowItWorks/>
              </div>
            </div>

            <div className='flex-1'>
              <ReleasePledgedGold/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}