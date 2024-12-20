import { useState } from 'react';
import { FaExchangeAlt, FaLanguage, FaMoon, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Home from '../components/Home';

function LandingPage() {
    const { darkMode } = useTheme();
    const [showTranslator, setShowTranslator] = useState(false);

    const features = [
        {
            icon: <FaLanguage className="text-4xl text-blue-500" />,
            title: 'Dynamic translation between supported languages.',
            description: 'Utilizing a cutting-edge pre-trained artificial intelligence model for accurate and natural translations.'
        },
        {
            icon: <FaExchangeAlt className="text-4xl text-purple-500" />,
            title: 'Intuitive interface with real-time text swapping',
            description: 'Support for a wide range of languages, enabling global communication.'
        },
        {
            icon: <FaMoon className="text-4xl text-pink-500" />,
            title: 'Light and dark mode for personalized usability',
            description: 'Your data is encrypted and handled with the utmost security and privacy.'
        }
    ];

    return (
        <div className={`min-h-screen flex items-center transition-all duration-700 ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            <div className={`w-full transition-all duration-500 ${
                showTranslator ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 pt-16">
                        <h1 className="text-6xl font-bold mb-6 animate-fade-in">
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                                AI Translation App
                            </span>
                        </h1>
                        <div className="max-w-3xl mx-auto">
                            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'} animate-slide-up text-center`}>
                                Your one-stop solution for seamless multilingual communication! Translate text effortlessly between over 50 supported languages using state-of-the-art AI models. 
                                Whether you're learning a new language, communicating globally, or exploring cultural content, AI Translator makes it simple, fast, and accurate.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowTranslator(true)}
                            className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in"
                        >
                            <span>Start Translating</span>
                            <FaArrowRight className="transition-transform duration-300 transform group-hover:translate-x-2" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 animate-slide-up ${
                                    darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                                } backdrop-blur-xl shadow-lg`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="flex flex-col items-center text-center">
                                    {feature.icon}
                                    <h3 className={`text-xl font-semibold mt-4 mb-2 ${
                                        darkMode ? 'text-white' : 'text-gray-800'
                                    }`}>
                                        {feature.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`transition-all duration-500 absolute inset-0 ${
                showTranslator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
            }`}>
                <div className="h-full flex items-center">
                    <Home onBack={() => setShowTranslator(false)} />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
