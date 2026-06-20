"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type Reservation = {
  id: string;
  reference: string;
  clientName: string;
  clientPhone: string;
  departure: string;
  destination: string;
  departureDate: Date;
  departureTime: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
};

export default function AdminDashboardClient({ initialReservations }: { initialReservations: Reservation[] }) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const itemsPerPage = 10;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setReservations(prev =>
          prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
        );
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };

  const totalRevenue = reservations
    .filter(r => r.status !== "cancelled")
    .reduce((sum, r) => sum + r.totalPrice, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <span style={{ background: "#dcfce7", color: "#166534", padding: "4px 8px", borderRadius: "99px", fontSize: "12px", fontWeight: 600 }}>Confirmé</span>;
      case "cancelled":
        return <span style={{ background: "#fee2e2", color: "#991b1b", padding: "4px 8px", borderRadius: "99px", fontSize: "12px", fontWeight: 600 }}>Annulé</span>;
      case "completed":
        return <span style={{ background: "#e0e7ff", color: "#3730a3", padding: "4px 8px", borderRadius: "99px", fontSize: "12px", fontWeight: 600 }}>Terminé</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const filteredReservations = useMemo(() => {
    if (!searchQuery.trim()) return reservations;
    const lowerQuery = searchQuery.toLowerCase();
    return reservations.filter(r => 
      r.reference.toLowerCase().includes(lowerQuery) ||
      r.clientName.toLowerCase().includes(lowerQuery) ||
      r.clientPhone.toLowerCase().includes(lowerQuery) ||
      r.departure.toLowerCase().includes(lowerQuery) ||
      r.destination.toLowerCase().includes(lowerQuery)
    );
  }, [reservations, searchQuery]);

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  
  // Ensure we don't stay on an empty page after filtering
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  const paginatedReservations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredReservations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredReservations, currentPage]);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Navbar */}
      <header style={{ background: "#fff", padding: "16px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/logo.png" alt="Logo" style={{ height: "40px" }} />
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: 0 }}>Espace Admin</h1>
        </div>
        <button
          onClick={handleLogout}
          style={{ background: "#f3f4f6", color: "#4b5563", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: 500 }}
        >
          Déconnexion
        </button>
      </header>

      <main style={{ padding: "32px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "32px" }}>
          <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 8px 0" }}>Total Réservations</h3>
            <p style={{ color: "#111827", fontSize: "32px", fontWeight: 700, margin: 0 }}>{reservations.length}</p>
          </div>
          <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 8px 0" }}>Revenus Estimés</h3>
            <p style={{ color: "#7c3aed", fontSize: "32px", fontWeight: 700, margin: 0 }}>{totalRevenue}€</p>
          </div>
        </div>

        {/* Toolbar: Search */}
        <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input 
            type="text" 
            placeholder="Rechercher par nom, réf, tél, trajet..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on new search
            }}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              width: "100%",
              maxWidth: "400px",
              fontSize: "14px",
              outline: "none"
            }}
          />
          <div style={{ color: "#6b7280", fontSize: "14px" }}>
            {filteredReservations.length} résultat(s)
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <tr>
                  <th style={{ padding: "16px", color: "#4b5563", fontWeight: 600 }}>Réf. & Date</th>
                  <th style={{ padding: "16px", color: "#4b5563", fontWeight: 600 }}>Client</th>
                  <th style={{ padding: "16px", color: "#4b5563", fontWeight: 600 }}>Trajet</th>
                  <th style={{ padding: "16px", color: "#4b5563", fontWeight: 600 }}>Prix</th>
                  <th style={{ padding: "16px", color: "#4b5563", fontWeight: 600 }}>Statut</th>
                  <th style={{ padding: "16px", color: "#4b5563", fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedReservations.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "32px", textAlign: "center", color: "#6b7280" }}>
                      Aucune réservation trouvée
                    </td>
                  </tr>
                ) : (
                  paginatedReservations.map(r => (
                    <tr key={r.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "16px" }}>
                        <div style={{ fontWeight: 600, color: "#111827", marginBottom: "4px" }}>{r.reference}</div>
                        <div style={{ color: "#6b7280", fontSize: "12px" }}>
                          {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                        </div>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <div style={{ fontWeight: 500, color: "#111827" }}>{r.clientName}</div>
                        <div style={{ color: "#6b7280", fontSize: "13px" }}>{r.clientPhone}</div>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <div style={{ color: "#111827", marginBottom: "4px" }}>
                          <strong>De:</strong> {r.departure}
                        </div>
                        <div style={{ color: "#111827", marginBottom: "4px" }}>
                          <strong>À:</strong> {r.destination}
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "12px" }}>
                          Le {new Date(r.departureDate).toLocaleDateString("fr-FR")} à {r.departureTime}
                        </div>
                      </td>
                      <td style={{ padding: "16px", fontWeight: 600, color: "#7c3aed" }}>
                        {r.totalPrice}€
                      </td>
                      <td style={{ padding: "16px" }}>
                        {getStatusBadge(r.status)}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <select
                          value={r.status}
                          onChange={(e) => updateStatus(r.id, e.target.value)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            background: "#fff",
                            fontSize: "13px",
                            cursor: "pointer"
                          }}
                        >
                          <option value="confirmed">Confirmé</option>
                          <option value="completed">Terminé</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ padding: "16px", background: "#f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e5e7eb" }}>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  background: currentPage === 1 ? "#f3f4f6" : "#fff",
                  color: currentPage === 1 ? "#9ca3af" : "#374151",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  fontSize: "14px"
                }}
              >
                Précédent
              </button>
              <div style={{ fontSize: "14px", color: "#4b5563" }}>
                Page {currentPage} sur {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  background: currentPage === totalPages ? "#f3f4f6" : "#fff",
                  color: currentPage === totalPages ? "#9ca3af" : "#374151",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  fontSize: "14px"
                }}
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
