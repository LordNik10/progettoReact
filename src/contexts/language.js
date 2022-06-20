import { createContext } from 'react';

export const LanguageContext = createContext();

export const initialLanguageState = {
    language: "it",
    messages: {
        "SEARCH_YOUR_POKEMON": {it: "Cerca il tuo Pokemon", en: "Search your Pokemon"}
    }
};