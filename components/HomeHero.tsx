"use client";

import { useState, useEffect } from "react";

export default function HomeHero({ dict }: { dict: any }) {
  const images = [
    "/excursions/hero-1.jpg",
    "/excursions/hero-2.jpg",
    "/excursions/hero-3.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section style={{ 
      position: "relative", 
      height: "80vh", 
      minHeight: "600px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      overflow: "hidden",
      paddingTop: "76px" // Offset for navbar
    }}>
      {images.map((img, index) => (
        <div
          key={img}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            transform: index === currentIndex ? "scale(1.05)" : "scale(1)",
            transitionProperty: "opacity, transform",
            transitionDuration: "1.5s, 6s",
            zIndex: 0
          }}
        />
      ))}
      
      {/* Dark Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
        zIndex: 1
      }} />

      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "800px",
        padding: "0 24px"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff",
          padding: "8px 20px",
          borderRadius: "100px",
          fontSize: "14px",
          fontWeight: 600,
          backdropFilter: "blur(12px)",
          marginBottom: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          <span>🇹🇳</span> {dict.hero.badge}
        </div>
        
        <h1 style={{
          color: "#fff",
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: "24px",
          textShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}>
          {dict.hero.title}
        </h1>
        
        <p style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
          lineHeight: 1.6,
          maxWidth: "600px",
          margin: "0 auto",
          textShadow: "0 2px 8px rgba(0,0,0,0.2)"
        }}>
          {dict.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
