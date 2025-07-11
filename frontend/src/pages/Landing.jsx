import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Palette, Users, Calendar, Star, ArrowRight, Play, Sparkles } from "lucide-react";

export default function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const features = [
    { 
      icon: Palette, 
      title: "Buy & Sell Art", 
      desc: "Browse artwork from rising and pro artists. Add to favorites or purchase instantly.",
      gradient: "from-pink-500 to-purple-600"
    },
    { 
      icon: Calendar, 
      title: "Attend Events", 
      desc: "Join exclusive exhibitions and workshops, both online and offline.",
      gradient: "from-purple-500 to-blue-600"
    },
    { 
      icon: Users, 
      title: "Artist Profiles", 
      desc: "Connect with creatives, follow their journey, and view their full gallery.",
      gradient: "from-blue-500 to-teal-600"
    }
  ];

  const artworks = [
    { color: "bg-gradient-to-br from-pink-400 to-purple-500", size: "w-32 h-32", delay: "0s" },
    { color: "bg-gradient-to-br from-blue-400 to-teal-500", size: "w-24 h-24", delay: "0.5s" },
    { color: "bg-gradient-to-br from-purple-400 to-pink-500", size: "w-40 h-28", delay: "1s" },
    { color: "bg-gradient-to-br from-teal-400 to-blue-500", size: "w-28 h-36", delay: "1.5s" },
    { color: "bg-gradient-to-br from-orange-400 to-red-500", size: "w-36 h-24", delay: "2s" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating cursor effect */}
      <div 
        className="fixed w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Navbar */}
      <nav className={`flex justify-between items-center px-6 py-6 relative z-10 backdrop-blur-sm bg-black/20 border-b border-purple-500/20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ArtiSpace
          </h1>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group">
            Login
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link to="/register" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative text-center py-20 px-6 min-h-[80vh] flex flex-col justify-center">
        {/* Floating artworks */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {artworks.map((artwork, i) => (
            <div
              key={i}
              className={`absolute ${artwork.color} ${artwork.size} rounded-2xl opacity-30 animate-float`}
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (i * 10)}%`,
                animationDelay: artwork.delay,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className={`relative z-10 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Join 50,000+ artists & collectors</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            Discover, Collect,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join ArtiSpace to explore digital galleries, attend exclusive events, and support creative talent in the most immersive art marketplace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register" className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 flex items-center space-x-2">
              <span>Join Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-6 py-20 max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Everything You Need
          </h3>
          <p className="text-gray-400 text-lg">Powerful tools for artists and collectors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                activeFeature === i ? 'ring-2 ring-purple-500/50' : ''
              } transition-all duration-1000 delay-${700 + i * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.desc}
              </p>
              
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 px-6 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50K+", label: "Active Artists" },
              { number: "2M+", label: "Artworks Sold" },
              { number: "100+", label: "Events Monthly" }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="text-center text-gray-500 py-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-400">ArtiSpace</span>
          </div>
          <p>© {new Date().getFullYear()} ArtiSpace. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}