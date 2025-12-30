"use client";

import { useState } from 'react';
import { FaUser, FaWeight, FaPhone, FaEnvelope, FaCheck, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

const GoldInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    mobile: '',
    email: '',
    consent: true,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Enter Name');
      return false;
    }
    
    if (!formData.quantity || isNaN(formData.quantity) || parseFloat(formData.quantity) <= 0) {
      toast.error('Please enter a valid quantity in grams');
      return false;
    }
    
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (!formData.consent) {
      toast.error('Please consent to receive updates');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message || 'Inquiry submitted successfully!');
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          quantity: '',
          mobile: '',
          email: '',
          consent: false,
        });
      } else {
        toast.error(data.error || 'Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+919590704444";
    const message = `Hello, I'm interested in selling gold.\nName: ${formData.name || 'Not provided'}\nQuantity: ${formData.quantity || 'Not provided'} grams`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-green-600 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Inquiry Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your inquiry. Our team will contact you shortly.
          </p>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Need immediate assistance?</strong><br />
                Call us at +91 95907 04444
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setIsSubmitted(false)}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-full flex items-center justify-between  gap-4 mx-auto bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-xl overflow-hidden  border border-yellow-100">
      {/* Header */}
      <div className="bg-gradient-to-r   text-white p-6 text-center">
        <h1 className="text-2xl md:text-3xl text-yellow-400 font-bold mb-2">Looking for Gold Buyers in Kerala?</h1>
        <p className="text-gray-500 text-sm md:text-base">Get the best value for your gold. 100% transparent pricing.</p>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className=" w-1/4 md:p-8">
        {/* Full Name */}
        <div className="mb-4">
         
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
             className="w-full mb-0 pl-10 pr-3  border-0 border-b-2 border-b-gray-300 focus:outline-none focus:ring-0 focus:border-b-yellow-500"
              required
            />
          </div>
        </div>
        
        {/* Quantity */}
        <div className="mb-2">
         
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              
            </div>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Gold quantity (gm)"
              min="0"
              step="0.1"
              className="w-full pl-10 pr-3  border-0 border-b-2 border-b-gray-300 focus:outline-none focus:ring-0 focus:border-b-yellow-500"
              required
            />
          </div>
        
        </div>
        
        {/* Mobile Number */}
        <div className="mb-4">
         
          <div className="relative">
            
            <div className="flex">
              <div className="flex items-center justify-center px-3 py-2 border border-0 border-b-2 border-gray-300 rounded-l-lg bg-gray-50">
                <span className="text-gray-700 font-medium">+91</span>
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
                className="w-full pl-2 pr-3  border-0 border-b-2 border-b-gray-300 focus:outline-none focus:ring-0 focus:border-b-yellow-500"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Email (Optional) */}
        <div className="mb-2">
         
          <div className="relative">
           
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full pl-10 pr-3  border-0 border-b-2 border-b-gray-300 focus:outline-none focus:ring-0 focus:border-b-yellow-500"
            />
          </div>
        </div>
        
        
       
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 mt-4 text-white font-bold py-2 px-4 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 mb-6 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Inquiry'
          )}
        </button>
        
        {/* Divider */}
        
        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 font-medium">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
       
       
        
        {/* Call Option */}
        <div className="text-center mt-2 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-2">Prefer to call?</p>
          <a 
            href="tel:+919590704444"
            className="inline-flex items-center text-yellow-700 font-bold text-lg hover:text-yellow-800 transition-colors"
          >
            <FaPhone className="mr-2" />
            +91 95907 04444
          </a>
        </div>
      </form>
      
      <div>
        <img  src="/images/enquiryImg.png" 
    alt="Gold Inquiry" 
    className="w-full h-auto"/>
      </div>
     
    </div>
  );
};

export default GoldInquiryForm;