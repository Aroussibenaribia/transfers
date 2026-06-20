import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  try {
    const { status } = await req.json();

    if (!status || !["confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }

    const updated = await prisma.reservation.update({
      where: { id: resolvedParams.id },
      data: { status },
    });

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
