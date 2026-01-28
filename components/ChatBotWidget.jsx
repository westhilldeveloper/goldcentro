"use client";

import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaTimes, FaRedo } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init("rfhPB1Q5tV0EyrTvF");

const BOT_AVATAR = "/images/chatbot.png";
const USER_AVATAR = "/images/user.png";

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState({
    user_name: "", // Changed to match template
    user_phone: "", // Changed to match template
    user_query: ""  // Changed to match template
  });
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Welcome to Gold Centro!\n\nThe most trusted gold buying brand.\n\nWhat are you looking for?",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Trigger jumping animation periodically
  useEffect(() => {
    if (!open) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000); // Animation duration
      }, 5000); // Jump every 5 seconds

      return () => clearInterval(interval);
    }
  }, [open]);

  const sendEmailWithData = async (dataToSend) => {
    if (isSending) return;
    
    setIsSending(true);
    
    try {
      // Prepare email data matching your template variables EXACTLY
      const emailData = {
        to_email: "developers@westhillinternational.com",
        user_name: dataToSend.user_name || "Not provided",
        user_phone: dataToSend.user_phone || "Not provided",
        user_query: dataToSend.user_query || "Not provided",
        timestamp: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }),
        source: "Website Chatbot"
      };

      console.log("Sending email data:", emailData);

      // Send email using EmailJS
      const result = await emailjs.send(
        "service_5a8t63n",
        "template_9rpsluc",
        emailData
      );

      console.log("Email sent successfully:", result);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

    } catch (error) {
      console.error("Failed to send email:", error);
      // Add error message for debugging
      alert(`Failed to send email: ${error.text || error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    addMessage("user", userMessage);

    if (step === 0) {
      // Store user's initial inquiry
      const updatedData = {
        ...userData,
        user_query: userMessage
      };
      setUserData(updatedData);
      
      setTimeout(() => {
        addMessage(
          "bot",
          "Great! Share me your details to proceed to further step.\n\nWhat is your Name?"
        );
        setStep(1);
      }, 600);
    } else if (step === 1) {
      // Store user's name
      const updatedData = {
        ...userData,
        user_name: userMessage
      };
      setUserData(updatedData);
      
      setTimeout(() => {
        addMessage(
          "bot",
          "Thanks! Please share your mobile number."
        );
        setStep(2);
      }, 600);
    } else if (step === 2) {
      // Validate phone number
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(userMessage)) {
        addMessage(
          "bot",
          "Please enter a valid 10-digit mobile number."
        );
        return;
      }
      
      // Create updated user data with phone number
      const updatedData = {
        ...userData,
        user_phone: userMessage
      };
      
      // Update state
      setUserData(updatedData);
      
      setTimeout(() => {
        addMessage(
          "bot",
          `Thank you ${userData.user_name || userMessage}! Our executive will contact you at ${userMessage} shortly. We have received your details.`
        );
        setStep(3);
        
        // Send email with all chat data - use the updatedData directly
        sendEmailWithData(updatedData);
      }, 600);
    }

    setInput("");
  };

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { from, text }]);
  };

  const resetChat = () => {
    setStep(0);
    setUserData({
      user_name: "",
      user_phone: "",
      user_query: ""
    });
    setShowSuccess(false);
    setMessages([
      {
        from: "bot",
        text: "Welcome to Gold Centro!\n\nThe most trusted gold buying brand.\n\nWhat are you looking for?",
      },
    ]);
  };

  // Handle avatar click with animation
  const handleAvatarClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setOpen(true);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <>
      {/* Floating Avatar with Jumping Animation */}
      {!open && (
        <button
          onClick={handleAvatarClick}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            <img
              src="/images/chatbot.png"
              alt="Chat"
              className={`
                w-18 h-22 rounded-full 
                transition-all duration-300 ease-in-out
                ${isAnimating ? 'animate-jump' : ''}
                hover:scale-105 hover:shadow-xl
              `}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            
            {/* Speech bubble */}
            <div className="absolute -top-10 -left-26 bg-white rounded-xl shadow-lg px-3 py-2 max-w-[140px] animate-float">
              <p className="text-xs font-medium text-gray-800">Hi! Need help? 👋</p>
              <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-white rotate-45"></div>
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 h-[480px] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-up">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-semibold text-sm text-gray-800">
              Gold Centro
            </div>
            <div className="flex items-center gap-3">
              <FaRedo
                onClick={resetChat}
                className="cursor-pointer text-gray-500 hover:text-gray-700 hover:scale-110 transition-transform"
                title="Reset Chat"
              />
              <FaTimes
                onClick={() => setOpen(false)}
                className="cursor-pointer text-gray-500 hover:text-gray-700 hover:scale-110 transition-transform"
                title="Close Chat"
              />
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="px-3 py-2 bg-green-50 border-b border-green-200 animate-fade-in">
              <p className="text-xs text-green-700 font-medium flex items-center gap-2">
                <span className="text-lg">✓</span>
                Details sent successfully! We'll contact you soon.
              </p>
            </div>
          )}

          {/* Sending Indicator */}
          {isSending && (
            <div className="px-3 py-2 bg-blue-50 border-b border-blue-200">
              <p className="text-xs text-blue-700 font-medium flex items-center gap-2">
                <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-700"></span>
                Sending your details...
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 px-3 py-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                } ${i === messages.length - 1 ? 'animate-fade-in' : ''}`}
              >
                <div
                  className={`
                    max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line
                    transition-all duration-300 transform
                    ${msg.from === "user"
                      ? "bg-gray-800 text-white rounded-br-none hover:scale-[1.02]"
                      : "bg-white text-gray-800 rounded-bl-none shadow hover:scale-[1.02]"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t px-3 py-2 flex items-center gap-2">
            <input
              type={step === 2 ? "tel" : "text"}
              value={input}
              onChange={(e) => {
                // Only allow numbers for phone input
                if (step === 2) {
                  const value = e.target.value.replace(/\D/g, '');
                  setInput(value.slice(0, 10));
                } else {
                  setInput(e.target.value);
                }
              }}
              placeholder={
                step === 0 
                  ? "Type your inquiry..." 
                  : step === 1 
                    ? "Enter your name..." 
                    : "Enter your 10-digit mobile number..."
              }
              className="flex-1 text-sm outline-none px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={step === 3 || isSending}
            />
            <button
              onClick={handleSend}
              className={`
                p-2 rounded-full transition-all duration-200
                ${input.trim() && step !== 3 && !isSending
                  ? "text-gray-800 hover:bg-gray-100 hover:scale-105 hover:rotate-12"
                  : "text-gray-400"
                }
                ${input.trim() && step !== 3 && !isSending ? 'animate-pulse' : ''}
              `}
              disabled={!input.trim() || step === 3 || isSending}
              title="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
          
          {/* Debug info (remove in production) */}
          <div className="text-xs text-gray-500 px-2 py-1 border-t">
            Step: {step} | Name: {userData.user_name || "Not set"} | Phone: {userData.user_phone || "Not set"}
          </div>
        </div>
      )}

      {/* Add custom animations to global styles */}
      <style jsx global>{`
        @keyframes jump {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          30% {
            transform: translateY(-20px) scale(1.05);
          }
          50% {
            transform: translateY(-10px) scale(1.03);
          }
          70% {
            transform: translateY(-5px) scale(1.01);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-5px) translateX(5px);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-jump {
          animation: jump 1s ease-in-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}