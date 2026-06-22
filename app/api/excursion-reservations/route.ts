import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendExcursionConfirmation } from "@/lib/email";

function generateReference(): string {
  return "EXC-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { excursionId, excursionName, clientName, clientEmail, clientPhone, participants, date, notes } = body;

    if (!excursionId || !clientName || !clientEmail || !clientPhone || !participants || !date) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Simple pricing: 50€ per person
    const totalPrice = participants * 50;

    let reference = generateReference();
    let existing = await prisma.excursionReservation.findUnique({ where: { reference } });
    while (existing) {
      reference = generateReference();
      existing = await prisma.excursionReservation.findUnique({ where: { reference } });
    }

    const reservation = await prisma.excursionReservation.create({
      data: {
        reference,
        excursionId,
        excursionName,
        clientName,
        clientEmail,
        clientPhone,
        participants: Number(participants),
        date: new Date(date),
        notes: notes || null,
        totalPrice,
        status: "confirmed",
      },
    });

    try {
      await sendExcursionConfirmation({
        clientName,
        clientEmail,
        reference,
        excursionName,
        date: new Date(date).toLocaleDateString("fr-FR"),
        participants: Number(participants),
        notes: notes || undefined,
        totalPrice,
      });
    } catch (emailErr) {
      console.error("Failed to send excursion confirmation email:", emailErr);
    }

    return NextResponse.json({ reference: reservation.reference, totalPrice });
  } catch (err) {
    console.error("Excursion reservation error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reservations = await prisma.excursionReservation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservations);
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
