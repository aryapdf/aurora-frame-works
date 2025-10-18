import React, { createContext, useContext, useEffect, useState } from "react";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
import logoLight from "@/assets/personal-logo.png";
import logoDark from "@/assets/personal-logo-full.png";

// ============================================
// TYPES
// ============================================

type Language = "en" | "id";
type Theme = "light" | "dark";

interface GlobalContextType {
    // Language
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => any;

    // Theme
    theme: Theme;
    toggleTheme: () => void;

    // Header/Navbar
    isHeaderVisible: boolean;
    showHeader: () => void;
    hideHeader: () => void;
    toggleHeader: () => void;

    // Theme
    logo: any;
    setLogo: (logo: string) => void;
}

// ============================================
// CONTEXT
// ============================================

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// ============================================
// TRANSLATIONS
// ============================================

const translations: Record<Language, Record<string, any>> = {
    en,
    id,
};

// ============================================
// PROVIDER
// ============================================

interface GlobalProviderProps {
    children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    // 📌 Language State ========== >
    const [language, setLanguageState] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem("language") as Language;
        return savedLanguage || "en";
    });

    useEffect(() => {
        document.documentElement.lang = language;
        localStorage.setItem("language", language);
    }, [language]);

    const setLanguage = (lang: Language) => setLanguageState(lang);

    const t = (key: string): any => {
        return translations[language][key] || key;
    };

    // 📌 Theme State ========== >
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            return savedTheme;
        }

        if (typeof window !== "undefined" && window.matchMedia) {
            return window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        }

        return "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // 📌 Header State ========== >
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);

    const showHeader = () => setIsHeaderVisible(true);
    const hideHeader = () => setIsHeaderVisible(false);
    const toggleHeader = () => setIsHeaderVisible((prev) => !prev);

    // 📌 Header State ========== >
    const [logo, setLogo] = useState<string>(logoDark);

    useEffect(() => {
        if (theme === "dark") {
            setLogo(logoDark);
        } else if (theme === "light") {
            setLogo(logoLight);
        }
    }, [theme]);


    // ============================================
    // COMBINE VALUES
    // ============================================

    const value: GlobalContextType = {
        // Language
        language,
        setLanguage,
        t,

        // Theme
        theme,
        toggleTheme,

        // Header
        isHeaderVisible,
        showHeader,
        hideHeader,
        toggleHeader,

        // Logo
        logo,
        setLogo
    };

    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    );
};

// ============================================
// HOOKS
// ============================================

// Main hook - access all states
export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
};

// Specific hooks for better performance
export const useLanguage = () => {
    const { language, setLanguage, t } = useGlobal();
    return { language, setLanguage, t };
};

export const useTheme = () => {
    const { theme, toggleTheme } = useGlobal();
    return { theme, toggleTheme };
};

export const useHeader = () => {
    const { isHeaderVisible, showHeader, hideHeader, toggleHeader } = useGlobal();
    return { isHeaderVisible, showHeader, hideHeader, toggleHeader };
};

export const useLogo = () => {
    const { logo, setLogo } = useGlobal();
    return { logo, setLogo };
};