"use client";

import { useEffect, useState, useCallback } from "react";

export default function PledgedGoldReleaseCalculator() {
  const [step, setStep] = useState(1);
  const [goldData, setGoldData] = useState({
    rate: 13400,
    loading: true,
    error: false,
    timestamp: "",
    source: "loading",
    purityRates: {},
  });
  const [form, setForm] = useState({
    institution: "",
    grossWeight: "",
    karats: "24",
    loanAmount: "",
    name: "",
    mobile: "",
    email: "",
    location: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculatedValue, setCalculatedValue] = useState(null);

  /* ---------------- GOLD RATE FETCH ---------------- */
  const fetchGoldRate = useCallback(async () => {
    try {
      setGoldData(prev => ({ ...prev, loading: true, error: false }));
      
      console.log("Fetching gold rate...");
      const response = await fetch('/api/gold-rate');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Gold rate data received:", data);
      
      if (data.success) {
        const goldRate = data.rates.gold['24k'].perGram;
        setGoldData({
          rate: goldRate,
          loading: false,
          error: false,
          timestamp: data.timestamp,
          source: data.source,
          purityRates: data.rates.gold.byPurity || {},
          metadata: data,
        });
        
        // Recalculate if form has data
        if (form.grossWeight && form.karats) {
          calculateGoldValue(goldRate);
        }
      } else {
        // API returned success: false but has fallback data
        const goldRate = data.rates?.gold?.['24k']?.perGram || 13400;
        setGoldData({
          rate: goldRate,
          loading: false,
          error: true,
          timestamp: data.timestamp,
          source: data.source,
          purityRates: data.rates?.gold?.byPurity || {},
          metadata: data,
        });
      }
      
    } catch (error) {
      console.error("Failed to fetch gold rate:", error);
      setGoldData(prev => ({
        ...prev,
        loading: false,
        error: true,
        rate: 13400,
        timestamp: new Date().toISOString(),
        source: 'error',
      }));
    }
  }, [form.grossWeight, form.karats]);

  // Initial fetch
  useEffect(() => {
    fetchGoldRate();
  }, [fetchGoldRate]);

  /* ---------------- CALCULATION FUNCTIONS ---------------- */
  const calculateGoldValue = (customRate = null) => {
    const rate = customRate || goldData.rate;
    const weight = parseFloat(form.grossWeight) || 0;
    const karats = parseInt(form.karats) || 24;
    const loanAmount = parseFloat(form.loanAmount) || 0;
    
    if (weight > 0 && karats > 0) {
      // Get rate for selected karat
      const purityRate = goldData.purityRates[karats]?.rate || 
                         Math.round(rate * getPurityMultiplier(karats));
      
      const goldValue = Math.round(weight * purityRate);
      const releaseValue = Math.max(0, goldValue - loanAmount);
      const loanToValue = loanAmount > 0 ? Math.round((loanAmount / goldValue) * 100) : 0;
      
      setCalculatedValue({
        goldValue,
        releaseValue,
        loanToValue,
        purityRate,
        weight,
        karats,
        perGramRate: purityRate,
      });
    }
  };

  const getPurityMultiplier = (karats) => {
    const multipliers = {
      24: 1.000,
      22: 0.916,
      20: 0.833,
      18: 0.750,
      14: 0.585,
    };
    return multipliers[karats] || 1.000;
  };

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setForm(prev => ({
      ...prev,
      [name]: newValue,
    }));
    
    // Recalculate if weight or karats change
    if ((name === 'grossWeight' || name === 'karats') && value) {
      setTimeout(() => calculateGoldValue(), 100);
    }
  };

  const nextStep = () => {
    // Basic validation
    if (step === 1) {
      if (!form.institution || !form.grossWeight || !form.karats) {
        alert("Please fill in all gold details");
        return;
      }
    }
    if (step === 2) {
      if (!form.name || !form.mobile || !form.email) {
        alert("Please fill in your contact details");
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!form.consent) {
      alert("Please provide consent to proceed");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...form,
        goldRate: goldData.rate,
        calculatedValue,
        type: "Pledged Gold Release",
      };

      const response = await fetch('/api/pledgeCallback', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(data.message || "Thank you! We'll contact you shortly.");
        // Reset form
        setForm({
          institution: "",
          grossWeight: "",
          karats: "24",
          loanAmount: "",
          name: "",
          mobile: "",
          email: "",
          location: "",
          consent: false,
        });
        setStep(1);
        setCalculatedValue(null);
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- UI COMPONENTS ---------------- */
  const GoldRateDisplay = () => (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">Live Gold Rate</h3>
          <p className="text-sm text-gray-600">
            24K Pure • Per Gram • {goldData.source === 'metalpriceapi.com' ? 'Live Market' : 'Estimated'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {goldData.error && (
            <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full">
              Estimated Rate
            </span>
          )}
          <button
            onClick={fetchGoldRate}
            disabled={goldData.loading}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {goldData.loading ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-2"></span>
                Refreshing
              </span>
            ) : '↻ Refresh'}
          </button>
        </div>
      </div>
      
      <div className="text-center py-4">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {goldData.loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-3 border-yellow-500 border-t-transparent mr-3"></div>
              Loading...
            </div>
          ) : (
            `₹${goldData.rate.toLocaleString('en-IN')}`
          )}
        </div>
        
        <div className="text-sm text-gray-600">
          {goldData.timestamp && (
            <span>
              Updated: {new Date(goldData.timestamp).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Kolkata'
              })} IST
            </span>
          )}
        </div>
      </div>
      
      {/* Purity Rates */}
      {!goldData.loading && goldData.purityRates && (
        <div className="mt-6 pt-6 border-t border-yellow-100">
          <h4 className="font-medium text-gray-700 mb-3 text-sm">Rates by Purity</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(goldData.purityRates).map(([karat, data]) => (
              <div 
                key={karat} 
                className={`p-3 rounded-lg border ${form.karats === karat ? 'bg-yellow-500 border-yellow-500 text-white' : 'bg-white border-gray-200'}`}
              >
                <div className="text-xs text-gray-500">{karat}K Gold</div>
                <div className="font-bold">{data.formatted}</div>
                <div className="text-xs">{data.purity} pure</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Calculation Info */}
      {calculatedValue && (
        <div className="mt-6 pt-6 border-t border-yellow-100">
          <h4 className="font-medium text-gray-700 mb-3 text-sm">Your Gold Value</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500">Gold Value</div>
              <div className="font-bold text-lg text-gray-900">
                ₹{calculatedValue.goldValue?.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500">Release Value</div>
              <div className="font-bold text-lg text-green-600">
                ₹{calculatedValue.releaseValue?.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-3">
            Based on {form.grossWeight}g of {form.karats}K gold @ ₹{calculatedValue.perGramRate}/g
          </div>
        </div>
      )}
    </div>
  );

  /* ---------------- MAIN RENDER ---------------- */
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-yellow-700 mb-4">
            Pledged Gold Release Calculator
          </h1>
          <p className="text-lg text-yellow-400 max-w-3xl mx-auto">
            Calculate the exact value of your pledged gold with live market rates.
            Get expert assistance for gold release from any bank or NBFC.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - GOLD RATE */}
          <div className="lg:col-span-1">
            <GoldRateDisplay />
            
            
          </div>
          
          {/* RIGHT COLUMN - FORM */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-b from-black via-yellow-600 to-yellow-900 text-white rounded-2xl p-8 shadow-xl">
              
              {/* STEP INDICATORS */}
              <div className="flex items-center justify-between mb-8">
                {[
                  { num: 1, label: 'Gold Details' },
                  { num: 2, label: 'Contact Info' },
                  { num: 3, label: 'Submit' }
                ].map(({ num, label }) => (
                  <div key={num} className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold
                      ${step > num ? 'bg-green-500' : 
                        step === num ? 'bg-yellow-400 text-black' : 
                        'bg-white/20 text-white'}
                    `}>
                      {step > num ? "✓" : num}
                    </div>
                    <span className="text-xs mt-2 hidden sm:block">{label}</span>
                  </div>
                ))}
              </div>

              {/* STEP 1: GOLD DETAILS */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Enter Gold Details</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Financial Institution
                      </label>
                      <input
                        name="institution"
                        value={form.institution}
                        onChange={handleChange}
                        placeholder="e.g., HDFC Bank, ICICI Bank, Muthoot Finance"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Gold Weight (grams)
                        </label>
                        <input
                          name="grossWeight"
                          type="number"
                          value={form.grossWeight}
                          onChange={handleChange}
                          placeholder="e.g., 50"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Gold Purity
                        </label>
                        <select
                          name="karats"
                          value={form.karats}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-yellow-800 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                          <option value="24">24K (99.9% Pure)</option>
                          <option value="22">22K (91.6% Pure)</option>
                          <option value="18">18K (75% Pure)</option>
                          <option value="14">14K (58.5% Pure)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Loan Amount (₹)
                      </label>
                      <input
                        name="loanAmount"
                        type="number"
                        value={form.loanAmount}
                        onChange={handleChange}
                        placeholder="e.g., 200000"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    
                    <button 
                      onClick={nextStep}
                      className="w-full mt-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                    >
                      Next: Contact Information →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CONTACT INFO */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Mobile Number
                        </label>
                        <input
                          name="mobile"
                          type="tel"
                          value={form.mobile}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        City / Location
                      </label>
                      <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="e.g., Mumbai, Delhi, Bangalore"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button 
                        onClick={prevStep}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition-colors border border-white/20"
                      >
                        ← Back
                      </button>
                      <button 
                        onClick={nextStep}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-bold py-3 rounded-lg transition-colors"
                      >
                        Next: Review & Submit →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW & SUBMIT */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
                  
                  {/* Summary Card */}
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="font-bold text-yellow-400 mb-4">Request Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Institution</p>
                        <p className="font-medium">{form.institution || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Gold Weight</p>
                        <p className="font-medium">{form.grossWeight || '0'} grams</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Purity</p>
                        <p className="font-medium">{form.karats}K ({getPurityMultiplier(parseInt(form.karats)) * 100}% pure)</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Loan Amount</p>
                        <p className="font-medium">₹{(parseFloat(form.loanAmount) || 0).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    
                    {/* Value Calculation */}
                    {calculatedValue && (
                      <div className="mt-6 pt-6 border-t border-white/20">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400">Gold Value</p>
                            <p className="text-xl font-bold text-green-300">
                              ₹{calculatedValue.goldValue?.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Release Value</p>
                            <p className="text-xl font-bold text-yellow-300">
                              ₹{calculatedValue.releaseValue?.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Consent */}
                  <div className="bg-white/10 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={form.consent}
                        onChange={handleChange}
                        className="mt-1 h-5 w-5 text-yellow-500 focus:ring-yellow-400 rounded"
                        required
                      />
                      <label htmlFor="consent" className="text-sm">
                        <span className="font-medium">
                          I authorizeGold Centro and its representatives to contact me via call, SMS, email, or WhatsApp regarding gold valuation and release options. I confirm that the information provided is accurate.
                        </span>
                        <span className="text-red-300 ml-1">*</span>
                      </label>
                    </div>
                    {!form.consent && (
                      <p className="text-red-300 text-xs mt-2">Consent is required to proceed</p>
                    )}
                  </div>
                  
                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={prevStep}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-4 rounded-lg transition-colors border border-white/20"
                      disabled={isSubmitting}
                    >
                      ← Edit Details
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting || !form.consent}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Submitting...
                        </div>
                      ) : (
                        '✓ Submit Request'
                      )}
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-400 text-center pt-4">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                    Our team typically responds within 30 minutes during business hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">How It Works</h3>
              <ol className="space-y-4">
                {[
                  "Enter your gold and loan details",
                  "Get instant valuation using live rates",
                  "Provide your contact information",
                  "Submit for expert consultation",
                  "Receive custom release solution"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
    </section>
  );
}