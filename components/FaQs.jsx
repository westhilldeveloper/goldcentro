"use client";

import { useState } from 'react';
import { FaMapMarkerAlt, FaIdCard, FaGem, FaChartLine, FaUserCheck, FaCreditCard, FaGift, FaQuestionCircle, FaPlay, FaCheck, FaArrowRight, FaHome, FaStore } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FaQs = () => {
  const [activeSection, setActiveSection] = useState('atHome');
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Find a Branch",
      number: "01",
      icon: <FaMapMarkerAlt className="text-3xl" />,
      color: "from-blue-500 to-blue-600",
      section: "atHome",
      content: {
        type: "video",
        videoId: "03:45",
        videoThumbnail: "/images/branch-video-thumb.jpg",
        description: "Locate your nearest branch quickly",
        features: [
          "100+ Branches",
          "Across Karnataka, Andhra Pradesh, Kerala & Telangana"
        ],
        button: {
          text: "Find Branch",
          link: "/branches"
        }
      }
    },
    {
      id: 1,
      title: "Carry ID Proof",
      number: "02",
      icon: <FaIdCard className="text-3xl" />,
      color: "from-purple-500 to-purple-600",
      section: "atHome",
      content: {
        type: "image",
        image: "/images/id-proof-illustration.jpg",
        items: [
          {
            title: "Passport",
            description: "Carry your Passport for fast-track verification",
            icon: "🛂"
          },
          {
            title: "Aadhaar Card",
            description: "Carry your Aadhaar card for easy KYC check",
            icon: "🆔"
          },
          {
            title: "Photo ID Proof",
            description: "Local Address Proof - Photo ID and Address proof is required",
            icon: "📷"
          }
        ]
      }
    },
    {
      id: 2,
      title: "Check Gold Purity",
      number: "03",
      icon: <FaGem className="text-3xl" />,
      color: "from-yellow-500 to-yellow-600",
      section: "atBranch",
      content: {
        type: "info",
        description: "Advanced XRF machine testing for accurate purity assessment",
        features: [
          "99.9% Accuracy",
          "Instant Results",
          "Transparent Process"
        ],
        image: "/images/gold-testing.jpg"
      }
    },
    {
      id: 3,
      title: "Check Gold Rate",
      number: "04",
      icon: <FaChartLine className="text-3xl" />,
      color: "from-green-500 to-green-600",
      section: "atBranch",
      content: {
        type: "live",
        description: "Live gold rates updated every minute",
        currentRate: "₹5,800/g (22K)",
        updateTime: "Updated just now",
        features: [
          "Best Price Guarantee",
          "No Hidden Charges",
          "Market Competitive Rates"
        ]
      }
    },
    {
      id: 4,
      title: "KYC Verification",
      number: "05",
      icon: <FaUserCheck className="text-3xl" />,
      color: "from-indigo-500 to-indigo-600",
      section: "atBranch",
      content: {
        type: "process",
        description: "Quick and secure verification process",
        steps: [
          "Document Submission",
          "Digital Verification",
          "Instant Approval"
        ],
        time: "5-10 minutes"
      }
    },
    {
      id: 5,
      title: "Instant Payment",
      number: "06",
      icon: <FaCreditCard className="text-3xl" />,
      color: "from-emerald-500 to-emerald-600",
      section: "atBranch",
      content: {
        type: "payment",
        description: "Get immediate payment for your gold",
        options: [
          {
            type: "Cash",
            limit: "Up to ₹10,000",
            icon: "💵"
          },
          {
            type: "Bank Transfer",
            methods: ["NEFT", "IMPS", "RTGS"],
            icon: "🏦"
          }
        ]
      }
    },
    {
      id: 6,
      title: "Earn a Bonus",
      number: "07",
      icon: <FaGift className="text-3xl" />,
      color: "from-pink-500 to-pink-600",
      section: "atBranch",
      content: {
        type: "bonus",
        description: "Special bonuses for our customers",
        bonuses: [
          "₹500 Bonus on first transaction",
          "Referral Rewards",
          "Loyalty Points"
        ]
      }
    }
  ];

  const filteredSteps = steps.filter(step => step.section === activeSection);
  const currentStep = steps[activeStep];

  const renderStepContent = () => {
    const content = currentStep.content;
    
    switch (content.type) {
      case "video":
        return (
          <div className="space-y-6">
            {/* Video Thumbnail */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <FaPlay className="text-white text-3xl ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {content.videoId}
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-3">
              {content.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Button */}
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5">
              {content.button.text}
            </button>
          </div>
        );

      case "image":
        return (
          <div className="space-y-6">
            {/* Image */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-video flex items-center justify-center">
              <div className="text-6xl">📋</div>
            </div>
            
            {/* ID Proof Items */}
            <div className="space-y-4">
              {content.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "info":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100 aspect-square flex items-center justify-center">
                <div className="text-6xl">🔬</div>
              </div>
              
              {/* Features */}
              <div className="space-y-4">
                <p className="text-gray-700">{content.description}</p>
                <div className="space-y-3">
                  {content.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "live":
        return (
          <div className="space-y-6">
            {/* Live Rate Display */}
            <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-6 text-center">
              <div className="text-sm text-green-600 font-medium mb-2">LIVE GOLD RATE</div>
              <div className="text-4xl font-bold text-gray-800 mb-2">{content.currentRate}</div>
              <div className="text-sm text-gray-500">{content.updateTime}</div>
            </div>
            
            {/* Features */}
            <div className="space-y-3">
              {content.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "process":
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{content.description}</p>
            
            {/* Process Steps */}
            <div className="space-y-4">
              {content.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{step}</div>
                    {idx < content.steps.length - 1 && (
                      <div className="h-6 w-0.5 bg-gray-200 ml-4 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaCheck className="text-green-500" />
              <span>Completed in {content.time}</span>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{content.description}</p>
            
            {/* Payment Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.options.map((option, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{option.icon}</div>
                    <div>
                      <div className="font-bold text-gray-800">{option.type}</div>
                      {option.limit && (
                        <div className="text-sm text-gray-600">{option.limit}</div>
                      )}
                    </div>
                  </div>
                  {option.methods && (
                    <div className="flex flex-wrap gap-2">
                      {option.methods.map((method, mIdx) => (
                        <span key={mIdx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {method}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "bonus":
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{content.description}</p>
            
            {/* Bonuses */}
            <div className="space-y-3">
              {content.bonuses.map((bonus, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100">
                  <FaGift className="text-pink-500 flex-shrink-0" />
                  <span className="text-gray-800">{bonus}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const faqs = [
    {
      question: "What ID Proof is Required For Selling Gold?",
      answer: "You need a valid government-issued photo ID such as Aadhaar Card, Passport, Voter ID, or Driving License along with address proof."
    },
    {
      question: "Can I sell gold for cash?",
      answer: "Yes, you can get up to ₹10,000 in cash. For amounts above ₹10,000, we provide instant bank transfer via NEFT/IMPS/RTGS."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-lg md:text-xl lg:text-6xl font-bold text-gray-800 mb-6">
          Sell Gold  with{" "}
          <span className="text-yellow-600">Seven Easy Steps</span>
        </h1>
      </div>

      {/* Toggle Section - At Home / At Branch */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => {
              setActiveSection('atHome');
              setActiveStep(0);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              activeSection === 'atHome'
                ? 'bg-white shadow-lg text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FaHome />
            <span className="font-medium">At Home</span>
          </button>
          <button
            onClick={() => {
              setActiveSection('atBranch');
              setActiveStep(2);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              activeSection === 'atBranch'
                ? 'bg-white shadow-lg text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FaStore />
            <span className="font-medium">At Our Branch</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Steps List */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-3">
            {filteredSteps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(steps.findIndex(s => s.id === step.id))}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeStep === steps.findIndex(s => s.id === step.id)
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg'
                    : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-blue-600">{step.icon}</div>
                      <h3 className="font-bold text-gray-800">{step.title}</h3>
                    </div>
                    <div className="mt-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        step.section === 'atHome' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {step.section === 'atHome' ? 'At Home' : 'At Branch'}
                      </span>
                    </div>
                  </div>
                  {activeStep === steps.findIndex(s => s.id === step.id) && (
                    <FaArrowRight className="text-blue-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Side - Step Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Step Header */}
              <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center text-white text-2xl font-bold`}>
                        {currentStep.number}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {currentStep.title}
                      </h2>
                    </div>
                    <p className="text-gray-600">Step {parseInt(currentStep.number)} of 7</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg bg-gradient-to-br ${currentStep.color} text-white font-medium`}>
                    {currentStep.section === 'atHome' ? 'At Home' : 'At Branch'}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6 md:p-8">
                {renderStepContent()}
              </div>

              {/* Navigation */}
              <div className="p-6 md:p-8 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      const prevIndex = (activeStep - 1 + steps.length) % steps.length;
                      setActiveStep(prevIndex);
                      setActiveSection(steps[prevIndex].section);
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                  >
                    Previous Step
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {steps.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx === activeStep
                            ? 'bg-blue-500'
                            : idx < activeStep
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => {
                      const nextIndex = (activeStep + 1) % steps.length;
                      setActiveStep(nextIndex);
                      setActiveSection(steps[nextIndex].section);
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  >
                    Next Step
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* FAQ Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <FaQuestionCircle className="text-2xl text-blue-500" />
                <h3 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h3>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button className="w-full text-left p-4 font-semibold text-gray-800 hover:bg-gray-50 transition-colors duration-200">
                      {faq.question}
                    </button>
                    <div className="p-4 pt-0 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaQs;