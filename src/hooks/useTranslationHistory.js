import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useTranslationHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = Cookies.get('translationHistory');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Failed to parse history:', e);
            }
        }
    }, []);

    const addToHistory = (translation) => {
        const newHistory = [
            {
                ...translation,
                id: Date.now(),
                timestamp: new Date().toISOString()
            },
            ...history
        ].slice(0, 10); // Keep only last 10 translations

        setHistory(newHistory);
        Cookies.set('translationHistory', JSON.stringify(newHistory), { expires: 7 }); // Expires in 7 days
    };

    const clearHistory = () => {
        setHistory([]);
        Cookies.remove('translationHistory');
    };

    return { history, addToHistory, clearHistory };
}
