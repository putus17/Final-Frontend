import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Home, Search, ArrowLeft, Zap, Star, Heart } from 'lucide-react';

export default function NotFoundPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState('404');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Use native MouseEvent type for the event parameter
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const glitchTexts = ['404', '4Ø4', '4*4', '4◊4', '404'];
    let index = 0;

    const interval = setInterval(() => {
      setGlitchText(glitchTexts[index]);
      index = (index + 1) % glitchTexts.length;
    }, 150);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setGlitchText('404');
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleSearchClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    icon: [Star, Heart, Zap][i % 3],
    delay: i * 0.5,
    duration: 3 + (i % 3),
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-[1280px] h-[720px] bg-black/80 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          {floatingElements.map((element) => {
            const Icon = element.icon;
            return (
              <div
                key={element.id}
                className="absolute animate-bounce opacity-20"
                style={{
                  left: `${20 + element.id * 15}%`,
                  top: `${10 + element.id * 12}%`,
                  animationDelay: `${element.delay}s`,
                  animationDuration: `${element.duration}s`,
                }}
              >
                <Icon className="w-8 h-8 text-purple-400" />
              </div>
            );
          })}
        </div>

        <div
          className="fixed w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />

        <div className="text-center max-w-2xl mx-auto relative z-10 text-white px-8">
          <div className="mb-8 relative">
            <h1 className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse select-none">
              {glitchText}
            </h1>
            <div className="absolute inset-0 text-[12rem] font-black text-purple-300/20 animate-ping">
              404
            </div>
          </div>

          <div className="space-y-6 backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold animate-fade-in">Oops! Page Not Found</h2>
              <p className="text-lg text-gray-300 leading-relaxed animate-fade-in">
                The page you're looking for seems to have vanished into the digital void.
                Don't worry though – even the best explorers sometimes take a wrong turn!
              </p>
            </div>

            {showAlert && (
              <Alert className="bg-purple-500/20 border-purple-400/30 animate-fade-in">
                <Search className="h-4 w-4 text-purple-400" />
                <AlertDescription className="text-purple-100">
                  Search functionality would be implemented here in a real application!
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-4 focus:ring-purple-500/50">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Go Home</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
              </button>

              <button
                onClick={handleSearchClick}
                className="group relative px-8 py-4 bg-transparent border-2 border-purple-400 text-purple-300 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 hover:scale-105 hover:border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Search Site</span>
                </div>
              </button>

              <button className="group relative px-8 py-4 bg-transparent border-2 border-gray-400 text-gray-300 font-semibold rounded-full hover:bg-gray-400 hover:text-white transition-all duration-300 hover:scale-105 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500/50">
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Go Back</span>
                </div>
              </button>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 animate-fade-in">
                💡 Pro tip: While you're here, why not enjoy this cosmic view? <br />
                <span className="text-purple-300">
                  Sometimes the best discoveries happen when you're lost!
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
