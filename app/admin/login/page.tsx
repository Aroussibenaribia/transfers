"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
      <div style={{ background: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <img src="/logo.png" alt="Logo" style={{ height: "60px", marginBottom: "24px", objectFit: "contain" }} />
        <h1 style={{ fontSize: "24px", marginBottom: "8px", color: "#111827" }}>Espace Admin</h1>
        <p style={{ color: "#6b7280", marginBottom: "32px", fontSize: "14px" }}>Veuillez entrer votre mot de passe pour continuer.</p>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "16px",
                outline: "none",
              }}
              required
            />
          </div>
          
          {error && <div style={{ color: "#ef4444", fontSize: "14px", marginBottom: "20px" }}>{error}</div>}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#7c3aed",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
