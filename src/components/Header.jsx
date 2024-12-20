import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun, FaGlobe } from 'react-icons/fa';

function Header() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
      darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
    } backdrop-blur-sm border-b`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <FaGlobe className={`text-2xl ${
              darkMode ? 'text-blue-400' : 'text-blue-500'
            }`} />
            <Link to="/" className={`text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
              AI Translator
            </Link>
          </div>

          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {darkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;