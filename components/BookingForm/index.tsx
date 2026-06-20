"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import PriceSummary from "@/components/PriceSummary";
import Step1Route from "./Step1_Route";
import Step2Vehicle from "./Step2_Vehicle";
import Step3Options from "./Step3_Options";
import Step4Flight from "./Step4_Flight";
import Step5Contact from "./Step5_Contact";
import type { VehicleType, DriverLang, PricingBreakdown } from "@/lib/pricing";
import { useDictionary } from "@/components/DictionaryProvider";

interface FormData {
  // Step 1
  departure: string;
  destination: string;
  // Step 2
  vehicle: VehicleType | "";
  departureDate: string;
  departureTime: string;
  passengers: number;
  // Step 3
  extraBaggage: boolean;
  driverLang: DriverLang;
  // Step 4
  hasFlightInfo: boolean;
  flightNumber: string;
  flightOrigin: string;
  flightTime: string;
  // Step 5
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}

const INITIAL_FORM: FormData = {
  departure: "",
  destination: "",
  vehicle: "",
  departureDate: "",
  departureTime: "",
  passengers: 1,
  extraBaggage: false,
  driverLang: "ar",
  hasFlightInfo: false,
  flightNumber: "",
  flightOrigin: "",
  flightTime: "",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
};

export default function BookingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const dict = useDictionary();
  const bDict = dict.booking;

  // Update a single field
  const setField = useCallback(
    (field: keyof FormData, value: string | number | boolean | DriverLang | VehicleType) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  // Fetch pricing whenever relevant fields change
  useEffect(() => {
    if (!form.departure || !form.destination || !form.vehicle) {
      setPricing(null);
      return;
    }
    const params = new URLSearchParams({
      departure: form.departure,
      destination: form.destination,
      vehicle: form.vehicle,
      baggage: String(form.extraBaggage),
      lang: form.driverLang,
    });

    setPricingLoading(true);
    fetch(`/api/pricing?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setPricing(data);
        setPricingLoading(false);
      })
      .catch(() => setPricingLoading(false));
  }, [form.departure, form.destination, form.vehicle, form.extraBaggage, form.driverLang]);

  // Validate current step
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!form.departure) errs.departure = "Veuillez sélectionner un départ";
      if (!form.destination) errs.destination = "Veuillez sélectionner une destination";
      if (form.departure && form.destination && form.departure === form.destination)
        errs.destination = "La destination doit être différente du départ";
    }
    if (step === 2) {
      if (!form.vehicle) errs.vehicle = "Veuillez choisir un véhicule";
      if (!form.departureDate) errs.departureDate = "Veuillez choisir une date";
      if (!form.departureTime) errs.departureTime = "Veuillez choisir une heure";
    }
    if (step === 5) {
      if (!form.clientName.trim()) errs.clientName = "Le nom est obligatoire";
      if (!form.clientEmail.trim()) errs.clientEmail = "L'email est obligatoire";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail))
        errs.clientEmail = "Email invalide";
      if (!form.clientPhone.trim()) errs.clientPhone = "Le téléphone est obligatoire";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = {
        departure: form.departure,
        destination: form.destination,
        departureDate: form.departureDate,
        departureTime: form.departureTime,
        passengers: form.passengers,
        vehicleType: form.vehicle,
        extraBaggage: form.extraBaggage,
        driverLang: form.driverLang,
        flightNumber: form.hasFlightInfo ? form.flightNumber : "",
        flightOrigin: form.hasFlightInfo ? form.flightOrigin : "",
        flightTime: form.hasFlightInfo ? form.flightTime : "",
        clientName: form.clientName,
        clientEmail: form.clientEmail,
        clientPhone: form.clientPhone,
      };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur inconnue");

      // Redirect to confirmation page
      router.push(
        `/booking/confirmation?ref=${data.reference}&total=${data.totalPrice}`
      );
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Une erreur est survenue. Réessayez."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-layout">
      {/* Left: form */}
      <div>
        <div className="card">
          <ProgressBar currentStep={step} />

          {step === 1 && (
            <Step1Route
              departure={form.departure}
              destination={form.destination}
              onChange={(field, val) =>
                setField(field as keyof FormData, val)
              }
              errors={errors}
            />
          )}

          {step === 2 && (
            <Step2Vehicle
              vehicle={form.vehicle}
              departureDate={form.departureDate}
              departureTime={form.departureTime}
              passengers={form.passengers}
              onChange={(field, val) =>
                setField(field as keyof FormData, val)
              }
              errors={errors}
            />
          )}

          {step === 3 && (
            <Step3Options
              extraBaggage={form.extraBaggage}
              driverLang={form.driverLang}
              onChange={(field, val) =>
                setField(field as keyof FormData, val)
              }
            />
          )}

          {step === 4 && (
            <Step4Flight
              flightNumber={form.flightNumber}
              flightOrigin={form.flightOrigin}
              flightTime={form.flightTime}
              hasFlightInfo={form.hasFlightInfo}
              onChange={(field, val) =>
                setField(field as keyof FormData, val)
              }
            />
          )}

          {step === 5 && (
            <Step5Contact
              clientName={form.clientName}
              clientEmail={form.clientEmail}
              clientPhone={form.clientPhone}
              onChange={(field, val) =>
                setField(field as keyof FormData, val as string)
              }
              errors={errors}
            />
          )}

          {submitError && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "var(--radius-sm)",
                padding: "12px 16px",
                color: "#dc2626",
                fontSize: 14,
                marginTop: 16,
              }}
            >
              ⚠️ {submitError}
            </div>
          )}

          {/* Navigation */}
          <div className="step-nav">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleBack}
              disabled={step === 1}
            >
              ← {bDict.buttons.back}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Étape {step} / 5
              </span>
            </div>

            {step < 5 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                {bDict.buttons.next} →
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="spinner" />
                    {bDict.buttons.loading}
                  </>
                ) : (
                  <>✅ {bDict.buttons.confirm}</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right: price summary */}
      <div>
        <PriceSummary
          departure={form.departure}
          destination={form.destination}
          vehicle={form.vehicle}
          pricing={pricing}
          loading={pricingLoading}
        />

        {/* Mini trip recap shown after step 1 */}
        {form.departure && form.destination && step > 1 && (
          <div className="card-sm" style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>
              {bDict.summary.title}
            </div>
            {[
              { icon: "📍", label: bDict.summary.route, value: form.departure },
              { icon: "🏁", label: "Destination", value: form.destination },
              form.vehicle ? { icon: "🚗", label: "Véhicule", value: form.vehicle === "eco" ? "Éco" : form.vehicle === "confort" ? "Confort" : "Van" } : null,
              form.departureDate ? { icon: "📅", label: "Date", value: new Date(form.departureDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) } : null,
              form.departureTime ? { icon: "🕐", label: "Heure", value: form.departureTime } : null,
            ]
              .filter(Boolean)
              .map((item) => (
                <div key={item!.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "5px 0", borderBottom: "1px solid var(--gray-100)" }}>
                  <span style={{ color: "var(--text-muted)" }}>
                    {item!.icon} {item!.label}
                  </span>
                  <span style={{ fontWeight: 600, color: "var(--text)", maxWidth: "55%", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item!.value}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
