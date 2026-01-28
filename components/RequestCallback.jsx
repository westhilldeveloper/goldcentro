"use client";

import { useState } from "react";

export default function RequestCallback({pledge=true}) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    location: "",
    email: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    // Validate mobile number
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(form.mobile)) {
      setMessage({ 
        text: "❌ Please enter a valid 10-digit mobile number", 
        type: "error" 
      });
      setLoading(false);
      return;
    }

    // Validate consent
    if (!form.consent) {
      setMessage({ 
        text: "❌ You must agree to the terms and conditions", 
        type: "error" 
      });
      setLoading(false);
      return;
    }

    try {
      console.log("📤 Submitting form data:", form);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/callback`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("📥 API Response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage({ 
        text: "✅ Request submitted successfully! We'll contact you shortly.", 
        type: "success" 
      });
      
      // Reset form
      setForm({
        name: "",
        mobile: "",
        location: "",
        email: "",
        consent: false,
      });

    } catch (err) {
      console.error("❌ Submission error:", err);
      setMessage({ 
        text: err.message || "❌ Failed to submit. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative bg-cover bg-center py-20 px-4"
      style={{ backgroundImage:`url('${pledge ? '/images/pledged.jpg' : '/images/goldweigh.jpg'}')`  }}
    >
      <div className="absolute inset-0 bg-primary/60 opacity-1" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white">

        {/* LEFT CONTENT */}
        <div>
         {!pledge && ( <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_0_2px_4px_rgba(0,0,0,0.5)]">
            SELL GOLD & GET INSTANT PAYMENT IN 30 MINUTES!
          </h1>)}
          {pledge &&  (
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_0_2px_4px_rgba(0,0,0,0.5)]">
            Looking to Release Your Pledged Gold?
          </h1>)
          }
          {!pledge && (<p className="text-sm leading-relaxed max-w-lg">
            Turn your unused gold into immediate returns withGold Centro. We
            make the process quick, simple, and secure, so you get the highest
            value without stress or waiting. Our advanced purity testing,
            expert evaluation, and open process ensure complete transparency.
          </p>)}

          {!pledge && (<p className="mt-4 text-sm">
           Gold Centro offers a fast, transparent, and reliable way to release pledged gold with ease and confidence.
          </p>)}

           {pledge && (<p className="text-sm text-white leading-relaxed max-w-lg [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_0_2px_4px_rgba(0,0,0,0.5)]">
            AtGold Centro, we understand that releasing pledged gold can feel overwhelming. That’s why we’ve designed a simple and secure process that ensures a smooth experience from start to finish. Whether you want to release pledged gold or are searching for trusted pledged gold buyers, our experts are here to help every step of the way.
          </p>)}

          {pledge && (<p className="mt-4 text-yellow-400 text-sm [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_0_2px_4px_rgba(0,0,0,0.5)]">
            Call <strong>94778 94778</strong> and our team will guide you every
            step of the way.
          </p>)}
        </div>

        {/* RIGHT FORM */}
        <div className="bg-yellow-100 text-gray-800 rounded-xl shadow-xl p-8">
          <h3 className="text-lg font-semibold mb-6">
            Request a Call Back
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs mb-1">Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#163f6b]"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Mobile Number *</label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                required
                pattern="[6-9]\d{9}"
                maxLength="10"
                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#163f6b]"
              />
              <p className="text-xs text-gray-500 mt-1">Enter a valid Indian mobile number</p>
            </div>

            <div>
              <label className="block text-xs mb-1">Location *</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Please Select Location"
                required
                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#163f6b]"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Email (Optional)</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@email.com"
                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#163f6b]"
              />
            </div>

            <div className="text-xs">
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  required
                  className="mt-0.5"
                />
                <span>
                  I authorizeGold Centro to contact me via Call, SMS, Email, or
                  WhatsApp. This consent overrides DND/NDNC.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#163f6b] hover:bg-[#0b2f59] text-white py-3 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "SUBMIT"
              )}
            </button>

            {message.text && (
              <p className={`text-sm mt-2 text-center p-2 rounded ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.text}
              </p>
            )}
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            We respect your privacy. Your information is secure with us.
          </p>
        </div>
      </div>
    </section>
  );
}