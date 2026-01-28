"use client";
import { useState } from "react";

export default function OldGoldCalculator() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    karat: "",
    weight: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/old-gold-calculator`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("✅ Our Executive will Contact You Shortly!");
      setForm({ karat: "", weight: "", name: "", phone: "", email: "" });
      setStep(1);
    } catch (err) {
      alert("❌ Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 mt-8 p-2 items-start">
      
      {/* LEFT CONTENT */}
      <div>
        <h2 className="text-3xl text-yellow-700 font-bold mb-4">Old Gold Calculator</h2>
        <p className="text-gray-700 mb-4">
          Discover the actual value of your gold effortlessly from the comfort of your home with <span className="text-primary font-bold">Gold Centro’s </span> Old Gold Calculator. By simply providing key details such as the weight and karats of your gold, you can instantly get accurate estimates and transparent rates. Follow these steps to find the true value of your gold!
        </p>
        <ol className="list-decimal ml-5 font-bold text-yellow-500  space-y-1 my-4">
          <li >Select The Karats of Your Gold</li>
          <li>Input Your Gold Weight In Grams</li>
          <li>Click on ‘Next’</li>
          <li>Fill Out The Form & Our Team will get back to you with the value of your gold.</li>
        </ol>
        <p className="text-gray-700 mb-4">By leveraging  <span className="text-primary font-bold"> Gold Centro’s </span> Gold Calculator, you gain access to a powerful tool that simplifies the process of gold valuation. Say goodbye to uncertainty and discover the value of your gold easier than ever!</p>
      </div>

      {/* RIGHT CARD */}
      <div className="bg-gradient-to-b from-primary via-yellow-600 to-yellow-800 rounded-xl p-8 text-white">
        
        {/* STEPS */}
        <div className="flex gap-3 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
              ${step >= s ? "bg-yellow-400 text-black" : "bg-white text-black"}`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <label className="block mb-2">Select Gold Karat</label>
            <select
              name="karat"
              value={form.karat}
              onChange={handleChange}
              className="w-full p-3 rounded text-black"
            >
              <option value="" className="bg-yellow-600 text-white">Select Karat</option>
              {[...Array(11)].map((_, i) => {
                const k = 14 + i;
                return (
                  <option className="bg-yellow-600 text-white" key={k} value={k}>
                    {k} Karat
                  </option>
                );
              })}
            </select>

            <button
              onClick={() => form.karat && setStep(2)}
              className="mt-6 bg-white text-yellow-600 px-6 py-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <label className="block mb-2">Gold Weight (grams)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-full p-3 rounded text-black"
              placeholder="Enter weight"
            />

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="bg-gray-300 text-yellow-600 px-4 py-2 rounded">
                Previous
              </button>
              <button
                onClick={() => form.weight && setStep(3)}
                className="bg-white text-yellow-600 px-6 py-2 rounded"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded text-black mb-3"
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 rounded text-black mb-3"
            />
            <input
              name="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded text-black mb-4"
            />

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="bg-gray-300 text-yellow-600 px-4 py-2 rounded">
                Previous
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="bg-yellow-500 px-6 py-2 rounded"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
