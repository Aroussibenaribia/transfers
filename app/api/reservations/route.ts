import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculatePrice } from "@/lib/pricing";
import { generateReference } from "@/lib/reference";
import { sendBookingConfirmation } from "@/lib/email";
import { getLocationName } from "@/lib/locations";
import type { VehicleType, DriverLang } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      departure,
      destination,
      departureDate,
      departureTime,
      passengers,
      vehicleType,
      extraBaggage,
      driverLang,
      flightNumber,
      flightOrigin,
      flightTime,
      clientName,
      clientEmail,
      clientPhone,
    } = body;

    // Validate required fields
    if (
      !departure || !destination || !departureDate || !departureTime ||
      !passengers || !vehicleType || !clientName || !clientEmail || !clientPhone
    ) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    // Calculate price
    const pricing = calculatePrice({
      departure,
      destination,
      vehicle: vehicleType as VehicleType,
      extraBaggage: Boolean(extraBaggage),
      driverLang: (driverLang ?? "ar") as DriverLang,
    });

    // Generate reference
    let reference = generateReference();

    // Make sure it's unique (retry up to 5 times)
    for (let i = 0; i < 5; i++) {
      const existing = await prisma.reservation.findUnique({ where: { reference } });
      if (!existing) break;
      reference = generateReference();
    }

    // Create reservation in DB
    const reservation = await prisma.reservation.create({
      data: {
        reference,
        departure,
        destination,
        departureDate: new Date(departureDate),
        departureTime,
        passengers: Number(passengers),
        vehicleType,
        extraBaggage: Boolean(extraBaggage),
        driverLang: driverLang ?? "ar",
        flightNumber: flightNumber || null,
        flightOrigin: flightOrigin || null,
        flightTime: flightTime || null,
        clientName,
        clientEmail,
        clientPhone,
        basePrice: pricing.basePrice,
        totalPrice: pricing.total,
        status: "confirmed",
      },
    });

    // Send confirmation email — capture any error for debugging
    let emailStatus: "sent" | "failed" = "sent";
    let emailError: string | null = null;

    try {
      await sendBookingConfirmation({
        clientName,
        clientEmail,
        reference,
        departure: getLocationName(departure),
        destination: getLocationName(destination),
        departureDate: new Date(departureDate).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        departureTime,
        vehicleType,
        passengers: Number(passengers),
        extraBaggage: Boolean(extraBaggage),
        driverLang: driverLang ?? "ar",
        flightNumber,
        flightOrigin,
        flightTime,
        totalPrice: pricing.total,
      });
      console.log(`✅ Email sent to ${clientEmail} for reservation ${reference}`);
    } catch (err: unknown) {
      const e = err as Error & { code?: string; responseCode?: number; response?: string };
      emailStatus = "failed";
      emailError = `${e.message} | code: ${e.code} | smtp: ${e.response}`;
      console.error("❌ Email send failed:", emailError);
    }

    return NextResponse.json({
      reference: reservation.reference,
      totalPrice: reservation.totalPrice,
      status: "confirmed",
      emailStatus,
      // Only expose email errors in development for debugging
      emailError: process.env.NODE_ENV === "development" ? emailError : undefined,
    });
  } catch (error) {
    console.error("Reservation error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
