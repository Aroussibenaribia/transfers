import { NextRequest, NextResponse } from "next/server";
import { calculatePrice } from "@/lib/pricing";
import type { VehicleType, DriverLang } from "@/lib/pricing";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const departure = searchParams.get("departure");
  const destination = searchParams.get("destination");
  const vehicle = searchParams.get("vehicle") as VehicleType;
  const extraBaggage = searchParams.get("baggage") === "true";
  const driverLang = (searchParams.get("lang") ?? "ar") as DriverLang;

  if (!departure || !destination || !vehicle) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const pricing = calculatePrice({
    departure,
    destination,
    vehicle,
    extraBaggage,
    driverLang,
  });

  return NextResponse.json(pricing);
}
