import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

function Footer() {
    const { darkMode } = useTheme();

    return (
        <footer className={`w-full py-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
        } backdrop-blur-sm border-t`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className={`flex items-center justify-center md:justify-start ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            Made with <FaHeart className="mx-2 text-red-500 animate-pulse" /> by
                            <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                Michael Rourke
                            </span>
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/m1ndb0x"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transform transition-all duration-300 hover:scale-110 ${
                                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <FaGithub className="text-2xl" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/michael-rourke-mtl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transform transition-all duration-300 hover:scale-110 ${
                                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <FaLinkedin className="text-2xl" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;