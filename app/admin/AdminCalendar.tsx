"use client";

import { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "fr": fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Reservation = {
  id: string;
  reference: string;
  clientName: string;
  clientPhone: string;
  departure: string;
  destination: string;
  departureDate: Date | string;
  departureTime: string;
  totalPrice: number;
  status: string;
  createdAt: Date | string;
};

interface AdminCalendarProps {
  reservations: Reservation[];
}

export default function AdminCalendar({ reservations }: AdminCalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const events = useMemo(() => {
    return reservations.map(r => {
      // Parse the start time
      const date = new Date(r.departureDate);
      const [hours, minutes] = r.departureTime.split(":").map(Number);
      
      const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours || 0, minutes || 0);
      
      // Estimate end time (2 hours later)
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

      return {
        id: r.id,
        title: `${r.departureTime} - ${r.clientName}`,
        start,
        end,
        resource: r,
      };
    });
  }, [reservations]);

  const eventPropGetter = (event: any) => {
    const status = event.resource.status;
    let backgroundColor = "#3b82f6"; // Blue default
    
    if (status === "confirmed") backgroundColor = "#10b981"; // Green
    else if (status === "completed") backgroundColor = "#6366f1"; // Indigo
    else if (status === "cancelled") backgroundColor = "#ef4444"; // Red

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.9,
        color: "white",
        border: "none",
        display: "block",
        fontSize: "12px",
        fontWeight: 600,
      }
    };
  };

  return (
    <div style={{ height: "700px", background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", position: "relative" }}>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        culture="fr"
        eventPropGetter={eventPropGetter}
        onSelectEvent={(event) => setSelectedEvent(event.resource)}
        messages={{
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          agenda: "Planning"
        }}
      />

      {/* Popup Modal for Event Details */}
      {selectedEvent && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          borderRadius: "12px"
        }}>
          <div style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "12px",
            width: "400px",
            maxWidth: "90%",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", color: "#111827" }}>Détails de Réservation</h3>
              <button 
                onClick={() => setSelectedEvent(null)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#6b7280" }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ marginBottom: "16px" }}>
              <span style={{ display: "inline-block", background: "#f3e8ff", color: "#7c3aed", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: 700, marginBottom: "8px" }}>
                Réf: {selectedEvent.reference}
              </span>
              <div style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
                <strong>Client:</strong> {selectedEvent.clientName}
              </div>
              <div style={{ fontSize: "14px", color: "#374151", marginBottom: "12px" }}>
                <strong>Tél:</strong> <a href={`tel:${selectedEvent.clientPhone}`} style={{ color: "#2563eb" }}>{selectedEvent.clientPhone}</a>
              </div>
              
              <div style={{ background: "#f9fafb", padding: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "14px", color: "#111827", marginBottom: "8px" }}>
                  <strong>Trajet:</strong> {selectedEvent.departure} ➔ {selectedEvent.destination}
                </div>
                <div style={{ fontSize: "14px", color: "#111827", marginBottom: "8px" }}>
                  <strong>Date:</strong> {new Date(selectedEvent.departureDate).toLocaleDateString("fr-FR")} à {selectedEvent.departureTime}
                </div>
                <div style={{ fontSize: "14px", color: "#111827" }}>
                  <strong>Prix:</strong> <span style={{ color: "#7c3aed", fontWeight: 700 }}>{selectedEvent.totalPrice}€</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedEvent(null)}
              style={{ width: "100%", padding: "10px", background: "#f3f4f6", color: "#374151", border: "1px solid #d1d5db", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
