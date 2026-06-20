"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" }
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const current = languages.find(l => l.code === currentLang) || languages[0];

  const switchLanguage = (code: string) => {
    setIsOpen(false);
    // Remove the current lang prefix and add the new one
    const newPath = pathname.replace(`/${currentLang}`, `/${code}`);
    router.push(newPath);
  };

  return (
    <div style={{ position: "relative", zIndex: 50 }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: "var(--purple-50)", 
          border: "1px solid var(--purple-200)", 
          padding: "8px 14px", 
          borderRadius: "8px",
          color: "var(--purple-900)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "14px",
          transition: "all 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--purple-400)"}
        onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--purple-200)"}
      >
        <span>{current.flag}</span>
        <span className="sm-block">{current.code.toUpperCase()}</span>
        <span style={{ fontSize: 10, marginLeft: 4 }}>▼</span>
      </button>

      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          right: 0,
          marginTop: "8px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          overflow: "hidden",
          minWidth: "140px"
        }}>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              style={{
                width: "100%",
                padding: "10px 16px",
                border: "none",
                background: currentLang === lang.code ? "#f3f4f6" : "transparent",
                color: "#111827",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "14px",
                borderBottom: "1px solid #f3f4f6"
              }}
            >
              <span>{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
