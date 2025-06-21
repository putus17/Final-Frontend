import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, LogIn } from 'lucide-react';

export default function NotFoundPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState('404');

  useEffect(() => {
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


  

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col md:flex-row items-center justify-center p-6 gap-12 overflow-hidden">
      <div
        className="fixed w-64 h-64 rounded-full bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-3xl pointer-events-none transition-all duration-300 ease-out"
        style={{ left: mousePosition.x - 128, top: mousePosition.y - 128 }}
      />

      <div className="relative text-center md:text-left">
        <h1 className="text-[14rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 select-none animate-pulse">
          {glitchText}
        </h1>
        <div className="absolute inset-0 text-[14rem] font-extrabold text-indigo-600/20 animate-ping select-none">
          404
        </div>
      </div>

      <div className="max-w-xl bg-black/70 backdrop-blur-md rounded-3xl p-8 border border-indigo-700 shadow-lg text-white flex flex-col gap-8">
        <h2 className="text-4xl font-bold tracking-tight">Oops! Page Not Found</h2>
        <p className="text-lg text-indigo-200 leading-relaxed">
          The page you're looking for has drifted into the unknown. Maybe try heading home or logging in to find your way back.
        </p>

     

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            <Home className="w-6 h-6" />
            Home
          </Link>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-indigo-500 text-indigo-300 hover:text-white hover:border-indigo-400 rounded-full font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            <LogIn className="w-6 h-6" />
            Login
          </Link>

        </div>

        <p className="text-sm text-indigo-400 italic text-center">
          💡 Sometimes getting lost leads to the best discoveries!
        </p>
      </div>
    </div>
  );
}
