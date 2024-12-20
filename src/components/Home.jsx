import { useState } from "react";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import { FaExchangeAlt, FaCopy, FaCheck, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useTranslationHistory } from "../hooks/useTranslationHistory";

// eslint-disable-next-line react/prop-types
function Home({ onBack }) {
    const { darkMode } = useTheme();
    const [text, setText] = useState(""); // Input text
    const [inputLang, setInputLang] = useState("en"); // Input language
    const [outputLang, setOutputLang] = useState("fr"); // Output language
    const [translatedText, setTranslatedText] = useState(""); // Translated text
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error message
    const [copied, setCopied] = useState(false);
    const { history, addToHistory, clearHistory } = useTranslationHistory();

    const languages = [
        { name: "Albanian", code: "sq" },
        { name: "Arabic", code: "ar" },
        { name: "Azerbaijani", code: "az" },
        { name: "Bengali", code: "bn" },
        { name: "Bosnian", code: "bs" },
        { name: "Bulgarian", code: "bg" },
        { name: "Chinese (Simplified)", code: "zh" },
        { name: "Croatian", code: "hr" },
        { name: "Czech", code: "cs" },
        { name: "Danish", code: "da" },
        { name: "Dutch", code: "nl" },
        { name: "English", code: "en" },
        { name: "Estonian", code: "et" },
        { name: "Farsi", code: "fa" },
        { name: "Finnish", code: "fi" },
        { name: "French", code: "fr" },
        { name: "Georgian", code: "ka" },
        { name: "German", code: "de" },
        { name: "Greek", code: "el" },
        { name: "Gujarati", code: "gu" },
        { name: "Hebrew", code: "he" },
        { name: "Hindi", code: "hi" },
        { name: "Hungarian", code: "hu" },
        { name: "Icelandic", code: "is" },
        { name: "Indonesian", code: "id" },
        { name: "Italian", code: "it" },
        { name: "Japanese", code: "ja" },
        { name: "Kannada", code: "kn" },
        { name: "Kazakh", code: "kk" },
        { name: "Korean", code: "ko" },
        { name: "Latvian", code: "lv" },
        { name: "Lithuanian", code: "lt" },
        { name: "Macedonian", code: "mk" },
        { name: "Malay", code: "ms" },
        { name: "Malayalam", code: "ml" },
        { name: "Marathi", code: "mr" },
        { name: "Norwegian", code: "no" },
        { name: "Pashto", code: "ps" },
        { name: "Polish", code: "pl" },
        { name: "Portuguese", code: "pt" },
        { name: "Punjabi", code: "pa" },
        { name: "Romanian", code: "ro" },
        { name: "Russian", code: "ru" },
        { name: "Serbian", code: "sr" },
        { name: "Sinhala", code: "si" },
        { name: "Slovak", code: "sk" },
        { name: "Slovenian", code: "sl" },
        { name: "Spanish", code: "es" },
        { name: "Swahili", code: "sw" },
        { name: "Swedish", code: "sv" },
        { name: "Tagalog", code: "tl" },
        { name: "Tamil", code: "ta" },
        { name: "Telugu", code: "te" },
        { name: "Thai", code: "th" },
        { name: "Turkish", code: "tr" },
        { name: "Ukrainian", code: "uk" },
        { name: "Urdu", code: "ur" },
        { name: "Uzbek", code: "uz" },
        { name: "Vietnamese", code: "vi" }
    ];

    const handleTranslate = async () => {
        if (!text.trim()) {
            setError("Please enter some text to translate.");
            return;
        }

        setLoading(true);
        setError("");
        setTranslatedText("");

        try {
            const langPair = `${inputLang}-${outputLang}`;
            const response = await axios.post("http://127.0.0.1:5000/translate", {
                text: text,
                lang_pair: langPair,
            });
            setTranslatedText(response.data.translated_text);
            
            addToHistory({
                originalText: text,
                translatedText: response.data.translated_text,
                fromLang: inputLang,
                toLang: outputLang
            });
        } catch (err) {
            console.error(err);
            setError("Failed to translate. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSwapLanguages = () => {
        const tempLang = inputLang;
        setInputLang(outputLang);
        setOutputLang(tempLang);
    };

    const loadFromHistory = (item) => {
        setText(item.originalText);
        setTranslatedText(item.translatedText);
        setInputLang(item.fromLang);
        setOutputLang(item.toLang);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTranslate();
        }
    };

    return (
        <div className={`w-full transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4">
                <div className={`max-w-4xl mx-auto transition-colors duration-300 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl rounded-2xl shadow-2xl p-8 animate-slide-up`}>
                    {/* Add Back Button */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={onBack}
                            className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                darkMode 
                                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                        >
                            <FaArrowLeft className="transform transition-transform group-hover:-translate-x-1" />
                            <span>Back</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                        {/* Input Section - Always Left */}
                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex justify-between items-center mb-3">
                                <select
                                    className={`w-40 rounded-lg p-2 transition-colors duration-300 ${
                                        darkMode 
                                            ? 'bg-gray-700 text-white border-gray-600' 
                                            : 'bg-gray-50 text-gray-900 border-gray-200'
                                    } border-2 focus:ring-2 focus:ring-blue-500`}
                                    value={inputLang}
                                    onChange={(e) => setInputLang(e.target.value)}
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <textarea
                                className={`w-full h-48 rounded-lg p-4 transition-all duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-700 text-white border-gray-600' 
                                        : 'bg-white text-gray-900 border-gray-200'
                                } border-2 focus:ring-2 focus:ring-blue-500 text-lg resize-none`}
                                placeholder="Type or paste your text here... (Press Enter to translate, Shift+Enter for new line)"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                        </div>

                        {/* Exchange Button - Center */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 lg:block hidden">
                            <button
                                onClick={handleSwapLanguages}
                                className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-700 hover:bg-gray-600' 
                                        : 'bg-white hover:bg-gray-50'
                                } hover:scale-110 hover:rotate-180`}
                            >
                                <FaExchangeAlt className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                            </button>
                        </div>

                        {/* Output Section - Always Right */}
                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex justify-between items-center mb-3">
                                <select
                                    value={outputLang}
                                    onChange={(e) => setOutputLang(e.target.value)}
                                    className={`w-40 rounded-lg p-2 transition-all duration-300 ${
                                        darkMode 
                                            ? 'bg-gray-700 text-white border-gray-600' 
                                            : 'bg-gray-50 text-gray-900 border-gray-200'
                                    } border-2 focus:ring-2 focus:ring-blue-500`}
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                                {translatedText && (
                                    <button
                                        onClick={() => handleCopy(translatedText)}
                                        className={`p-2 rounded-lg transition-colors duration-300 ${
                                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        {copied ? (
                                            <FaCheck className="text-green-500" />
                                        ) : (
                                            <FaCopy className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                                        )}
                                    </button>
                                )}
                            </div>
                            <div className={`h-48 rounded-lg p-4 transition-all duration-300 ${
                                darkMode 
                                    ? 'bg-gray-700 text-white border-gray-600' 
                                    : 'bg-white text-gray-900 border-gray-200'
                                } border-2 overflow-auto text-lg`}>
                                {translatedText || (
                                    <span className="text-gray-400">Translation will appear here...</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleTranslate}
                            disabled={loading}
                            className={`w-full p-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                                loading 
                                    ? 'bg-gray-500 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
                            } text-white shadow-lg`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                                    <span className="ml-2">Translating...</span>
                                </div>
                            ) : (
                                'Translate Now'
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 rounded-lg bg-red-500/10 text-red-500 text-sm animate-shake">
                            {error}
                        </div>
                    )}

                    {/* History Section */}
                    <div className="mt-8 border-t border-gray-700/50 pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                Recent Translations
                            </h3>
                            {history.length > 0 && (
                                <button
                                    onClick={clearHistory}
                                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors duration-300"
                                >
                                    <FaTrash className="text-sm" />
                                    <span className="text-sm">Clear History</span>
                                </button>
                            )}
                        </div>
                        
                        <div className="space-y-3">
                            {history.length === 0 ? (
                                <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    No translation history yet
                                </p>
                            ) : (
                                history.map((item, index) => (
                                    <div
                                        key={item.id}
                                        onClick={() => loadFromHistory(item)}
                                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.01] animate-fade-slide ${
                                            darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                                        }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    {item.fromLang.toUpperCase()} → {item.toLang.toUpperCase()}
                                                </span>
                                            </div>
                                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {new Date(item.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <p className={`text-sm truncate mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                            {item.originalText}
                                        </p>
                                        <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {item.translatedText}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
