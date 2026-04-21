import { useState, useEffect } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "All Your Operations.<br />One Powerful Platform!",
      subtitle: "The Ultimate ERP Software for Quarry, Crusher, RMC & Brick industries.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c83137?auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Streamline Your Business.<br />Boost Your Profits!",
      subtitle: "Manage inventory, production, sales & accounts in one place.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Built for Industry.<br />Designed for You.",
      subtitle: "Powerful tools tailored for Quarry, Crusher, RMC & Brick manufacturers.",
      image: "https://images.unsplash.com/photo-1581092160607-47e2a6b6c0f4?auto=format&fit=crop&w=2070&q=80"
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-[1300px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">

        {/* LEFT SIDE - Sliding Images */}
        <div className="lg:w-1/2 relative h-[520px] lg:h-auto overflow-hidden rounded-3xl lg:rounded-r-none">
          
          {/* Sliding Background Images */}
          {slides.map((s, index) => (
            <img
              key={index}
              src={s.image}
              alt="Industrial"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === slide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/40" />

          {/* Logo - Using your real logo */}
          <div className="absolute top-8 left-8 z-20">
            <img 
              src="/logo.png" 
              alt="Sazs Apps Logo" 
              className="h-14 w-auto object-contain drop-shadow-lg" 
            />
          </div>

          {/* Content */}
          <div className="absolute bottom-10 left-8 right-8 z-20 text-white">
            <h2 
              className="text-3xl lg:text-5xl font-bold leading-tight mb-4"
              dangerouslySetInnerHTML={{ __html: slides[slide].title }}
            />
            <p className="text-lg text-blue-100 max-w-md">
              {slides[slide].subtitle}
            </p>

            {/* Slide Indicators */}
            <div className="flex gap-3 mt-10">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    i === slide ? "w-12 bg-white" : "w-6 bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Login Form */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex items-center bg-white rounded-3xl lg:rounded-l-none">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Hello! Welcome Back</h2>
              <p className="text-gray-500 mt-2">Sign in to your Sazs Apps account</p>
            </div>

            <div className="space-y-7">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-1 transition-all"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-1 transition-all"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
              </div>

              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-2xl transition-all active:scale-[0.97] shadow-lg shadow-blue-500/30">
                Login Now
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-6">
              By logging in, you accept our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
            </p>

            <div className="text-center text-xs text-gray-400 mt-8">
              Logging in from : 223.237.181.244:59818<br />
              Latitude: 10.9271 • Longitude: 79.2653
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}