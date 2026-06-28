import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendExcursionConfirmation } from "@/lib/email";
import { excursions } from "@/lib/excursions";

type Pack = "s" | "m" | "l";

function generateReference(): string {
  return "EXC-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function calculateTotalPrice(excursionId: string, pack: Pack, participants: number): number {
  const exc = excursions.find(e => e.id === excursionId);
  if (!exc) return 0;
  if (pack === "l") return exc.packs.l * participants;
  if (pack === "m") return exc.packs.m;
  return exc.packs.s;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      excursionId,
      excursionName,
      clientName,
      clientEmail,
      clientPhone,
      participants,
      date,
      notes,
      pack,
      withGuide,
    } = body;

    if (!excursionId || !clientName || !clientEmail || !clientPhone || !participants || !date || !pack) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Server-side price calculation — client cannot tamper with this
    const totalPrice = calculateTotalPrice(excursionId, pack as Pack, Number(participants));

    // Build notes with pack + guide info
    const packLabel = pack === "s" ? "Pack S (1-4 pers)" : pack === "m" ? "Pack M (4-8 pers)" : "Pack L (9-14 pers)";
    const guideNote = withGuide ? " | Guide: Oui" : " | Guide: Non";
    const enrichedNotes = `${packLabel}${guideNote}${notes ? " | " + notes : ""}`;

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
        notes: enrichedNotes,
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
        notes: enrichedNotes,
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
