"use client";

import {
  FaChartLine,
  FaBalanceScale,
  FaCogs,
  FaBolt,
  FaHandshake,
  FaHistory,
  FaUsers,
  FaMapMarkedAlt,
  FaBuilding,
  FaBus,
  FaStar,
  FaGem,
  FaAward,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

export default function WhyChooseValueGold() {
  const [customerCount, setCustomerCount] = useState(0);
  const [branchCount, setBranchCount] = useState(0);
  const achievementsRef = useRef(null);
  const featuresRef = useRef(null);
  const [animatedAchievements, setAnimatedAchievements] = useState(false);
  const [animatedFeatures, setAnimatedFeatures] = useState(false);

  useEffect(() => {
    const observerAchievements = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedAchievements) {
            setAnimatedAchievements(true);
            startCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    const observerFeatures = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedFeatures) {
            setAnimatedFeatures(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (achievementsRef.current) {
      observerAchievements.observe(achievementsRef.current);
    }

    if (featuresRef.current) {
      observerFeatures.observe(featuresRef.current);
    }

    return () => {
      if (achievementsRef.current) {
        observerAchievements.unobserve(achievementsRef.current);
      }
      if (featuresRef.current) {
        observerFeatures.unobserve(featuresRef.current);
      }
    };
  }, [animatedAchievements, animatedFeatures]);

  const startCounters = () => {
    animateCounter(0, 1000, 2000, setCustomerCount);
    animateCounter(0, 35, 1500, setBranchCount);
  };

  const animateCounter = (start, end, duration, setter) => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      setter(current);
      
      if (now < endTime) {
        requestAnimationFrame(updateCounter);
      } else {
        setter(end);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  const features = [
    {
      title: "Unbeatable Returns",
      desc: "We apply innovations such as KARAT METER, XRF Technology, testing, Ultrasonic Cleaning, and Steam Cleaning to provide better value to every customer.",
      icon: <FaChartLine />,
      color: "from-primary via-yellow-400 to-yellow-700",
      animation: "float-up",
    },
    {
      title: "Better Gold Valuation",
      desc: "Gold assessment is done using the latest scientific techniques and industry best practices to ensure better returns for the customer.",
      icon: <FaBalanceScale />,
      color: "from-primary via-yellow-400 to-yellow-700",
      animation: "float-up",
    },
    {
      title: "Automated Process",
      desc: "An automated system with no human intervention ensures unmatched accuracy and precision.",
      icon: <FaCogs />,
      color: "from-primary via-yellow-400 to-yellow-700",
      animation: "rotate-in",
    },
    {
      title: "Instant Settlement",
      desc: "Our seamless process ensures you receive the amount instantly, without any waiting.",
      icon: <FaBolt />,
      color: "from-primary via-yellow-400 to-yellow-700",
      animation: "lightning",
    },
    {
      title: "Trust & Transparency",
      desc: "Complete disclosure and a step-by-step walkthrough ensure absolute clarity and confidence.",
      icon: <FaHandshake />,
      color: "from-primary via-yellow-400 to-yellow-700",
      animation: "handshake",
    },
    {
      title: "Legacy of CapsGold",
      desc: "A rich heritage of 120+ years and the expertise of CapsGold Pvt. Ltd empower us to deliver the best.",
      icon: <FaHistory />,
      color: "from-primary via-yellow-400 to-yellow-700",
      animation: "timeline",
    },
  ];

  const achievements = [
    {
      icon: <FaUsers />,
      image: "/images/customers.png",
      value: `${customerCount.toLocaleString()}+`,
      label: "Customers",
      dark: true,
      animation: "counter-grow",
    },
    {
      icon: <FaMapMarkedAlt />,
      image: "/images/location.png",
      value: "2",
      label: "States",
      dark: false,
      animation: "map-spread",
    },
    {
      icon: <FaBuilding />,
      image: "/images/branch.jpg",
      value: `${branchCount}+`,
      label: "Branches",
      dark: true,
      animation: "building-rise",
    },
    {
      icon: <FaBus />,
      image: "/images/support.jpg",
      label: "Customer Support",
      value: "24x7",
      dark: false,
      animation: "pulse-forever",
    },
  ];

  return (
    <section className="relative bg-white py-14 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-yellow-200/10 to-amber-300/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-l from-primary/10 to-yellow-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* WHY CHOOSE TITLE with animation */}
        <div className="relative">
          <SectionTitle title="WHY CHOOSE COINPLUS?" animated={animatedFeatures} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center ${animatedFeatures ? 'animate-sparkle' : 'opacity-0'}`}>
            <FaGem className="text-primary/20 text-6xl" />
          </div>
        </div>

        {/* FEATURES GRID with staggered animations */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              desc={feature.desc}
              icon={feature.icon}
              color={feature.color}
              animation={feature.animation}
              index={index}
              isVisible={animatedFeatures}
            />
          ))}
        </div>

        {/* ACHIEVEMENTS TITLE with animation */}
        <div className="mt-20" ref={achievementsRef}>
          <div className="relative">
            <SectionTitle title="OUR ACHIEVEMENTS" animated={animatedAchievements} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${animatedAchievements ? 'animate-trophy-spin' : 'opacity-0'}`}>
             
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS with unique animations */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              icon={achievement.icon}
              image={achievement.image}
              value={achievement.value}
              label={achievement.label}
              dark={achievement.dark}
              animation={achievement.animation}
              isVisible={animatedAchievements}
              index={index}
            />
          ))}
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-yellow-400/30 rounded-full ${animatedFeatures ? 'animate-float-particle' : 'hidden'}`}
              style={{
                left: `${10 + i * 8}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i % 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float-up {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes rotate-in {
          0% {
            opacity: 0;
            transform: rotate(-180deg) scale(0);
          }
          100% {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }

        @keyframes lightning {
          0% {
            opacity: 0;
            transform: scale(0) translateX(-100%);
            filter: brightness(0);
          }
          50% {
            filter: brightness(2) drop-shadow(0 0 10px #fff);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0);
            filter: brightness(1);
          }
        }

        @keyframes handshake {
          0% {
            opacity: 0;
            transform: translateX(-20px) translateY(20px);
          }
          50% {
            transform: translateX(5px) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes timeline {
          0% {
            opacity: 0;
            clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
          }
          100% {
            opacity: 1;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          }
        }

        @keyframes counter-grow {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes map-spread {
          0% {
            transform: scale(0.5);
            clip-path: circle(0% at 50% 50%);
          }
          100% {
            transform: scale(1);
            clip-path: circle(100% at 50% 50%);
          }
        }

        @keyframes building-rise {
          0% {
            transform: translateY(100%) scaleY(0);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scaleY(1);
            opacity: 1;
          }
        }

        @keyframes pulse-forever {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.1;
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2) rotate(180deg);
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
          }
        }

        @keyframes trophy-spin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(0);
          }
          70% {
            transform: translate(-50%, -50%) rotate(360deg) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) scale(1);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.5;
          }
          50% {
            transform: translateY(-100px) translateX(20px);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        /* Animation classes */
        .animate-float-up {
          animation: float-up 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-rotate-in {
          animation: rotate-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-lightning {
          animation: lightning 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-handshake {
          animation: handshake 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-timeline {
          animation: timeline 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-counter-grow {
          animation: counter-grow 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-map-spread {
          animation: map-spread 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-building-rise {
          animation: building-rise 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-pulse-forever {
          animation: pulse-forever 2s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }

        .animate-trophy-spin {
          animation: trophy-spin 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-float-particle {
          animation: float-particle 5s ease-in-out infinite;
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}

/* ---------- ENHANCED COMPONENTS ---------- */

const SectionTitle = ({ title, animated }) => (
  <div className={`flex items-center justify-center gap-4 transition-all duration-1000 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    <span className={`h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500 transition-all duration-1000 ${animated ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />
    <h2 className="text-lg md:text-xl font-bold tracking-wide text-[#0b2f59] relative">
      {title}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-primary transition-all duration-1000 ${animated ? 'w-full' : 'w-0'}`}></span>
    </h2>
    <span className={`h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500 transition-all duration-1000 ${animated ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />
  </div>
);

const FeatureCard = ({ title, desc, icon, color, animation, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        rounded-2xl p-6 relative shadow-xl border-1 border-yellow-700 group transition-all duration-500 overflow-hidden
        bg-gradient-to-r ${color}
        ${isVisible ? `animate-${animation} opacity-100` : 'opacity-0'}
        ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100'}
      `}
      style={{
        animationDelay: isVisible ? `${index * 0.3}s` : '0s',
        transitionDelay: isHovered ? '0s' : '0.4s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background pattern */}
      <div className={`absolute inset-0 bg-grid-pattern opacity-10 ${isHovered ? 'animate-shimmer' : ''}`}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-yellow-600 rounded-full ${isHovered ? 'animate-float-particle' : 'hidden'}`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-lg text-yellow-800 drop-shadow-lg">
            {title}
          </h4>
          <span className="text-white/90 text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
            {icon}
          </span>
        </div>
        
        <p className="text-yellow-900 text-sm leading-relaxed backdrop-blur-sm bg-white/10 p-3 rounded-lg">
          {desc}
        </p>

        {/* Hover indicator */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-yellow-500 transform transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
      </div>
    </div>
  );
};

const AchievementCard = ({ icon, image, value, label, dark, animation, isVisible, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        rounded-2xl p-6 text-center flex flex-col items-center justify-center relative overflow-hidden
        transition-all duration-500
        ${isVisible ? `animate-${animation} opacity-100` : 'opacity-0 scale-0'}
        ${isHovered ? 'scale-105' : 'scale-100'}
      `}
      style={{
        animationDelay: isVisible ? `${index * 0.2}s` : '0s',
        backgroundImage: image ? `url(${image})` : 'none',
        backgroundColor: !image && dark ? 'var(--primary)' : !image ? '#000' : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay with gradient */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        image 
          ? dark ? 'bg-gradient-to-t from-black/70 via-black/50 to-transparent' 
                 : 'bg-gradient-to-t from-primary/80 via-primary/60 to-transparent'
          : dark ? 'bg-gradient-to-br from-primary to-amber-600' 
                 : 'bg-gradient-to-br from-black to-gray-900'
      } ${isHovered ? 'opacity-90' : 'opacity-80'}`}></div>

      {/* Animated border */}
      <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
        isHovered 
          ? 'border-white/50 animate-shimmer' 
          : 'border-transparent'
      }`}></div>

      {/* Icon with animation */}
      {/* <div className={`relative z-10 mb-4 transition-all duration-500 ${isHovered ? 'scale-125 rotate-12' : 'scale-100'}`}>
        <div className="text-white text-4xl drop-shadow-lg">
          {icon}
        </div>
      </div> */}

      {/* Value with counter animation effect */}
      {value && (
        <h3 className="relative z-10 text-3xl font-bold text-white min-h-[44px] flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
            {value}
          </span>
          <span className="absolute -inset-1 bg-white/10 blur-xl rounded-lg"></span>
        </h3>
      )}

      {/* Label with hover effect */}
      <p className="relative z-10 text-sm font-semibold text-white mt-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
        {label}
      </p>

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/50 rounded-full animate-float-particle"
              style={{
                left: `${10 + i * 20}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s',
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};