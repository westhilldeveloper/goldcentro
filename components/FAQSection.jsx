"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What services does Gold Centro offer?",
    answer:
      "Gold Centro offers transparent gold selling, pledged gold release, purity testing, instant settlement, and professional gold valuation services.",
  },
  {
    question: "What is the best way to sell gold?",
    answer:
      "The best way to sell gold is to choose a transparent and reputable gold buyer who follows a clear process and offers competitive rates based on current market value.",
  },
  {
    question: "Why should Gold Centro be your choice to sell gold?",
    answer:
      "Gold Centro ensures fair valuation, complete transparency, advanced testing methods, and instant settlement.",
  },
  {
    question: "Where can I sell gold near me?",
    answer:
      "You can sell gold at any Gold Centro branch near you or through our mobile branch services.",
  },
  {
    question: "Where to sell gold?",
    answer:
      "Sell gold at trusted Gold Centro outlets that follow industry best practices.",
  },
  {
    question: "How soon can pledged gold be released?",
    answer:
      "Pledged gold can usually be released on the same day after verification and settlement.",
  },
  {
    question: "What are the branch timings?",
    answer:
      "Most Gold Centro branches operate from 10:00 AM to 7:00 PM.",
  },
  {
    question: "Which is the best Gold buying Store?",
    answer:
      "Gold Centro is among the most trusted gold buying stores due to its transparency and customer-first approach.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [animatedItems, setAnimatedItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate FAQ items sequentially
            faqs.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedItems(prev => [...prev, index]);
              }, index * 150); // 150ms delay between each
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section ref={sectionRef} className="bg-white mt-65 md:mt-0 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* TITLE with animation */}
        <div className="flex bg-gradient-to-t from-primary via-yellow-200 to-yellow-600 shadow-lg rounded-md items-center justify-center py-4 gap-4 mb-8 overflow-hidden">
          <span className="h-[1px] w-16 bg-black transition-all duration-1000 delay-300" />
          <h2 className="text-lg md:text-xl font-bold text-[#0b2f59] transition-all duration-1000">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <span className="h-[1px] w-16 bg-black transition-all duration-1000 delay-300" />
        </div>

        {/* FAQ BOX */}
        <div className="border border-primary rounded-md overflow-hidden">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`
                bg-gradient-to-br from-yellow-100 via-white to-yellow-100 
                border-b border-primary shadow-lg last:border-b-0
                transition-all duration-500
                ${animatedItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
                }
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`
                  w-full flex items-center justify-between px-6 py-4 
                  text-left text-sm md:text-base font-semibold 
                  text-[#0b2f59] transition-all duration-300
                  hover:bg-gradient-to-r hover:from-yellow-50 hover:via-white hover:to-yellow-50
                  ${activeIndex === index ? 'bg-gradient-to-r from-yellow-100 to-amber-50' : ''}
                `}
              >
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-primary to-yellow-600 text-white text-sm font-bold rounded-full">
                    {index + 1}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <span className={`
                  transition-all duration-300
                  ${activeIndex === index 
                    ? 'text-primary transform rotate-180' 
                    : 'text-gray-400'
                  }
                `}>
                  <FaChevronDown />
                </span>
              </button>

              {/* ANSWER */}
              <div
                className={`
                  overflow-hidden transition-all duration-500
                  ${activeIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                  }
                `}
              >
                <div className={`
                  px-6 pb-4 pt-2 text-sm text-gray-700
                  transition-all duration-300
                  ${activeIndex === index
                    ? 'translate-y-0'
                    : '-translate-y-2'
                  }
                `}>
                  <div className="flex items-start gap-3">
                    <div className="w-1 bg-gradient-to-b from-primary to-yellow-400 rounded-full mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseBorder {
          0%, 100% {
            border-color: #fbbf24;
          }
          50% {
            border-color: #f59e0b;
          }
        }

        @keyframes highlightQuestion {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }

        /* Question number animation */
        .question-number {
          position: relative;
          overflow: hidden;
        }

        .question-number::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .question-number:hover::before {
          left: 100%;
        }

        /* Answer reveal animation */
        .answer-content {
          position: relative;
        }

        .answer-content::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(to bottom, transparent, #fbbf24, transparent);
          animation: answerLine 0.8s ease;
        }

        @keyframes answerLine {
          0% {
            height: 0;
          }
          100% {
            height: 100%;
          }
        }

        /* Title animation */
        .title-animate span:first-child {
          animation: slideInFromLeft 0.8s ease forwards;
        }

        .title-animate h2 {
          animation: fadeInUp 0.8s ease 0.2s forwards;
          opacity: 0;
        }

        .title-animate span:last-child {
          animation: slideInFromRight 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
}