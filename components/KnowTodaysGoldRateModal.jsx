"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function KnowTodaysGoldRateModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    location: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!form.name || !form.mobile || !form.location) {
      setError("Name, Mobile number and Area are required.");
      return;
    }

    if (!form.consent) {
      setError("Please authorize us to contact you.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setMessage(data.message);
      setForm({
        name: "",
        email: "",
        mobile: "",
        state: "",
        location: "",
        consent: false,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  px-4">
      <div className="relative w-full max-w-md rounded-xl bg-yellow-50 shadow-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
             <div className="flex items-center">
                        <img 
                          src="/images/lg_goldcentro.png" 
                          alt="Gold Centro" 
                          className={`w-auto logo-3d  h-12`} 
                          style={{ maxWidth:'280px'  }}
                        />
                      </div>
          <h2 className="text-xs md:text-lg font-semibold text-blue-900">
            Know Today&apos;s Gold Rate
          </h2>
         
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Phone Number"
            name="mobile"
            value={form.mobile}
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <Select
            label="Select State"
            name="state"
            value={form.state}
            onChange={handleChange}
            options={[
              "Karnataka",
              "Tamil Nadu",
              "Kerala",
            ]}
          />

          <Input
            label="Let Us Know Your Area"
            name="location"
            value={form.location}
            placeholder="Let Us Know Your Area"
            onChange={handleChange}
            required
          />

          {/* Consent */}
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="mt-1"
            />
            I authorizeGold Centro and its representatives to contact me via
            Call, SMS, Email, or WhatsApp regarding their products and offers.
          </label>

          {/* Messages */}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gradient-to-br from-primary via-yellow-200 to-yellow-600 py-2 text-black font-semibold hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Reusable Inputs ---------- */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {/* {label} */}
      </label>
      <input
        {...props}
        className="w-full rounded-md border border-yellow-300 px-3 py-2 focus:border-yellow-600 focus:outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        {...props}
        className="w-full rounded-md border border-yellow-300 px-3 py-2 focus:border-yellow-600 focus:outline-none"
      >
        <option value="">Select State</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
