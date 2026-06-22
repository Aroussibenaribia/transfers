import { prisma } from "@/lib/db";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [reservations, excursionReservations] = await Promise.all([
    prisma.reservation.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.excursionReservation.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <AdminDashboardClient
      initialReservations={reservations}
      initialExcursionReservations={excursionReservations}
    />
  );
}
