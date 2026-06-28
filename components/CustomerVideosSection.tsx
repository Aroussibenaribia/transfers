"use client";

import { useRef, useState, useEffect } from "react";

const CUSTOMER_VIDEOS = [
  "/AQM1lgZfKBv5XJ51e740BbemRKW6nBGyYyNSA0G53ZXP4KiBCVTCcrsTiW_0-eftcpT2uEj-P7-wveFKKvmJ6g4U7sXug_925gl5jjo.mp4",
  "/AQMA9-4CcUtKgwtwnlSNb0n9PHr53hDLJhCyhazvo17Fil-eB6Xj4ZvA5g7OCjM5q1eFu0WM6NDyAip41EFAANIpVXsyteyNdx0s0g8.mp4",
  "/AQMpJsBLbL3-u7uca-6uEdqkD-9uYf3Gfn8if5vY_mHXnSVOO379dqqGlKM05E0FqJ6NEB8tfu0aDmSJPckJ5cOCVnhR4NYyeeM8P4A.mp4",
  "/AQNFhYIkS83YmM4Dqfrx0_rXrytE6qZ4IM_EW4xYN86M5KgChTs7fdbWgGCphQ2L4zoRfeX79lbKZ_4xWef2B88nH4U7kaziuTUQ9G4.mp4",
  "/AQNJAkaE78dphOgjuHrg9HK5pVmxaI1iH2oaFTQllz7G7Wa9V0vMe0tGQm_eBvFgmzQwo8If-9yux4q9nTvLLj4v_G-MDDAYv8L64Fc.mp4",
  "/AQNm2R2MB0AuhUEoqcpVyUeX3L64U6SeYLUTShLLUJlQtZ4VN5NGw4iyIxRwiy48EhkABXDeGtDSxUmvbnE1XM1NZUojQCvvx0E1qFQ.mp4",
  "/AQNruDtd75fqpyvqn4boVXIsKPakskovYGxBmmYAm-ADloZJ-hQryDcRLzn997BO0E6da1hdMHzcH4hoYbO7viZ0fjwghd3Q0LERS6A.mp4",
  "/AQNXPVVxPrc3LFZ_HSZfMiBH3DlCNLeTNisVXl1r-OJCiM-9I1WfwXKBu5z1X1P_igXjnCnRHQN27W4jCz2p9-IktSLjfMHQ2d9ghWU.mp4",
  "/AQODZm5Uvx3pnF8n7OCULfasA2ZiOh6fG0xQ1ltgh3gJ6uZIlqknH6WMjWb5CcqN40Jd5B2vBqlK5kD7ZxPJkUwFgEpL8nbOtG6zZ6k.mp4",
  "/AQOpgrEyRiPgQ8S9Fsza2MKw1-7q5sPbUx-tBNF3vrr_7l5OztYx4m_mDGWy9j9tr5xfzmLfHoiGHXg2BWesg5QqGDQb20r6Ojn4gqg.mp4",
  "/AQPISHcR5NPKphViVJYzhwR17X7JaCD80rzxZcT_twJaJ1WWIFrF-nWcqPTO0DxWQEF1Mt0-_weQSB510zhZx7RMfm3txLhmAdUkEvQ.mp4",
  "/AQPmvFRHOp0IWjp7O1C8w6Qkd5t9znXNOQtlyIPnLY6ViNGhbc83jpprBGgMkC8P-oiDJc276Vj261JEbGIdGKHhclCuGCFbF51id-E.mp4",
  "/AQPQaOIq0ap50aLrs3FtfMQ-j4R2JPp2v9dPwXY7ajmPTcvA5Mf0zun7KmIx2X6NWETHlrXnFwWD7PYnuc4fI7WLkOyki3py8oXGCGs.mp4",
  "/SaveClip.App_AQMfKA8du4rrvNieZtMg2NeAATXCh9hZcy3QqUJNcvP02GQttV1It0WT7nWMSDv_jKnsvalZC0zlbUX8_qbg3ziy5KAcQH7ZoidSIrw.mp4",
  "/SaveClip.App_AQMVgXAVfyurW_Wc9EIoqpFV6t_AFTq6s_Vbty6q_qn6hZHX8tv_4XsknSTTscv91-ExyMjKWwCttkDb3TnYZz4ilBDc4hMiza-vvFQ.mp4",
  "/SaveClip.App_AQNaD8Wc_NRLbZZsthrrvm-qK35aFcMvWO3ZSdp1_t5IjDKgEYPnh-YRLewF7YXmSJ0M2zVbGiZr7VDqRB1uHueBrdb_NUBzTlCGUJk.mp4",
  "/SaveClip.App_AQNUhGaI_U8uH6WxlbWzBAuc0ADSAT36ZmrVSB3cx9iECEyiVJdQI4TkN98Nx6FK0oYu9e6d-Gyh7IEhZKujfnYmMVwv_DnmMTz5NPM.mp4",
  "/SaveClip.App_AQNYLnvZjEPOTrXRGpKp3IHG4ZumWmE04esGQS7tnH1llD0N31pn6lTMXYe8aGBhUDQvRr5g0c8v0O7fm6hfBrwJwWX61RrnltEHcMM.mp4",
  "/SaveClip.App_AQPHxHvg0L-PKW-qinG7YLCxEgg3GEJWogL15iXD_r5FngXFDAaLy5Z4HxvKPDmKMHEJoN65PrNFLSEPnBwCtTlzIn4MEaj928YKnK4.mp4",
];

// ── Single video tile ─────────────────────────────────────────────────────────
function VideoTile({ src, index }: { src: string; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // autoplay on hover for desktop
  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (v && v.paused) {
      v.muted = true;
      setMuted(true);
      v.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (v && !v.paused) {
      v.pause();
      v.currentTime = 0;
      setPlaying(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        aspectRatio: "9/16",
        cursor: "pointer",
        background: "#0f0f14",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        flexShrink: 0,
        width: 175,
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px) scale(1.02)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(124,58,237,0.4)";
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.35)";
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: playing
          ? "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)"
          : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%)",
        transition: "background 0.3s",
        pointerEvents: "none",
      }} />

      {/* Play/pause button */}
      {!playing && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(8px)",
          border: "2px solid rgba(255,255,255,0.4)",
          borderRadius: "50%",
          width: 48, height: 48,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
          pointerEvents: "none",
        }}>▶</div>
      )}

      {/* Customer badge */}
      <div style={{
        position: "absolute", top: 10, left: 10,
        background: "rgba(124,58,237,0.85)",
        backdropFilter: "blur(6px)",
        color: "#fff", fontSize: 10, fontWeight: 700,
        padding: "3px 8px", borderRadius: "100px",
        pointerEvents: "none",
      }}>
        ⭐ Client #{index + 1}
      </div>

      {/* Mute toggle */}
      {playing && (
        <button
          onClick={toggleMute}
          style={{
            position: "absolute", bottom: 10, right: 10,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", borderRadius: "50%",
            width: 30, height: 30,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 13,
          }}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      )}
    </div>
  );
}

// ── Infinite scroll row ───────────────────────────────────────────────────────
function ScrollRow({ videos, reverse = false }: { videos: string[]; reverse?: boolean }) {
  const doubled = [...videos, ...videos]; // duplicate for seamless loop

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          width: "max-content",
          animation: `${reverse ? "scrollRight" : "scrollLeft"} ${videos.length * 5}s linear infinite`,
        }}
      >
        {doubled.map((src, i) => (
          <VideoTile key={`${src}-${i}`} src={src} index={i % videos.length} />
        ))}
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function CustomerVideosSection() {
  // Split 19 videos into 2 rows
  const row1 = CUSTOMER_VIDEOS.slice(0, 10);
  const row2 = CUSTOMER_VIDEOS.slice(10);

  return (
    <section style={{
      background: "linear-gradient(135deg, #0f0c29 0%, #1a0533 50%, #0f0c29 100%)",
      padding: "80px 0",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Background glow blobs */}
      <div style={{
        position: "absolute", top: "20%", left: "10%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "5%",
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48, padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(124,58,237,0.2)",
          border: "1px solid rgba(124,58,237,0.4)",
          color: "#c4b5fd",
          padding: "6px 18px", borderRadius: "100px",
          fontSize: 13, fontWeight: 600, marginBottom: 16,
        }}>
          🎬 Témoignages vidéo
        </div>
        <h2 style={{
          color: "#fff",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 900,
          marginBottom: 14,
          lineHeight: 1.2,
        }}>
          Ils ont voyagé avec nous 🇹🇳
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: 16,
          maxWidth: 500,
          margin: "0 auto",
          lineHeight: 1.7,
        }}>
          Découvrez les expériences authentiques de nos clients à travers la Tunisie.
          Survolez une vidéo pour la lancer, cliquez pour la mettre en pause.
        </p>
      </div>

      {/* Video rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative", zIndex: 1 }}>
        <ScrollRow videos={row1} reverse={false} />
        <ScrollRow videos={row2} reverse={true} />
      </div>

      {/* Stats bar */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 48,
        marginTop: 56, padding: "0 24px",
        flexWrap: "wrap", position: "relative", zIndex: 1,
      }}>
        {[
          { value: "500+", label: "Clients satisfaits" },
          { value: "4.9★", label: "Note moyenne" },
          { value: "3 ans", label: "D'expérience" },
          { value: "100%", label: "Avis positifs" },
        ].map(({ value, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 900,
              color: "#a78bfa",
              marginBottom: 4,
            }}>{value}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
