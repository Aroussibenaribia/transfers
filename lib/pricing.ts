import { getDistance } from "./locations";

export type VehicleType = "eco" | "confort" | "van";
export type DriverLang = "ar" | "fr" | "en" | "de" | "it";

export interface PricingInput {
  departure: string;
  destination: string;
  vehicle: VehicleType;
  extraBaggage: boolean;
  driverLang: DriverLang;
}

export interface PricingBreakdown {
  distanceKm: number;
  basePrice: number;
  vehicleSurcharge: number;
  baggageSurcharge: number;
  langSurcharge: number;
  total: number;
  currency: "EUR";
}

// Base rate per km for Éco vehicle
const BASE_RATE_PER_KM = 0.45; // €/km

// Vehicle multipliers
const VEHICLE_MULTIPLIER: Record<VehicleType, number> = {
  eco: 1.0,
  confort: 1.4,
  van: 1.85,
};

// Minimum fares by vehicle
const MIN_FARE: Record<VehicleType, number> = {
  eco: 25,
  confort: 35,
  van: 55,
};

// Driver language surcharges
const LANG_SURCHARGE: Record<DriverLang, number> = {
  ar: 0,
  fr: 0,
  en: 0,
  de: 0,
  it: 0,
};

export function calculatePrice(input: PricingInput): PricingBreakdown {
  const distanceKm = getDistance(input.departure, input.destination);
  const rawBase = distanceKm * BASE_RATE_PER_KM;
  const vehicleMultiplier = VEHICLE_MULTIPLIER[input.vehicle];
  const vehicleSurcharge = rawBase * (vehicleMultiplier - 1);
  const basePrice = Math.max(rawBase, MIN_FARE[input.vehicle]);

  const baggageSurcharge = input.extraBaggage ? 10 : 0;
  const langSurcharge = LANG_SURCHARGE[input.driverLang];

  const total = Math.ceil(
    basePrice * vehicleMultiplier + baggageSurcharge + langSurcharge
  );

  return {
    distanceKm,
    basePrice: Math.ceil(rawBase),
    vehicleSurcharge: Math.ceil(vehicleSurcharge),
    baggageSurcharge,
    langSurcharge,
    total: Math.max(total, MIN_FARE[input.vehicle]),
    currency: "EUR",
  };
}

export const VEHICLE_LABELS: Record<VehicleType, string> = {
  eco: "Éco (MG 5) — Jusqu'à 3 passagers",
  confort: "Confort (Peugeot Traveller) — Jusqu'à 7 passagers",
  van: "Van (Ford Transit) — 8 à 12+ passagers",
};

export const VEHICLE_DESCRIPTIONS: Record<VehicleType, string> = {
  eco: "Berline confortable pour petits groupes",
  confort: "Véhicule spacieux avec plus de confort",
  van: "Minibus idéal pour grands groupes",
};

export const LANG_LABELS: Record<DriverLang, string> = {
  ar: "Arabe",
  fr: "Français",
  en: "Anglais",
  de: "Allemand",
  it: "Italien",
};
