
export interface BookingEmailData {
  clientName: string;
  clientEmail: string;
  reference: string;
  departure: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  vehicleType: string;
  passengers: number;
  extraBaggage: boolean;
  driverLang: string;
  flightNumber?: string;
  flightOrigin?: string;
  flightTime?: string;
  totalPrice: number;
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  const vehicleLabel: Record<string, string> = {
    eco: "Éco (max 3 passagers)",
    confort: "Confort (max 7 passagers)",
    van: "Van (12+ passagers)",
  };
  const langLabel: Record<string, string> = {
    ar: "Arabe",
    fr: "Français",
    en: "Anglais",
    de: "Allemand",
    it: "Italien",
  };

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Confirmation de Réservation</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(124,58,237,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed 0%,#9f67f5 100%);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">🚗 Transfert Tunisie</h1>
              <p style="margin:8px 0 0;color:#e9d5ff;font-size:14px;">Votre réservation est confirmée</p>
            </td>
          </tr>

          <!-- Reference box -->
          <tr>
            <td style="padding:32px 40px 0;">
              <div style="background:#f5f3ff;border:2px dashed #7c3aed;border-radius:12px;padding:20px;text-align:center;">
                <p style="margin:0 0 6px;color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Référence de réservation</p>
                <p style="margin:0;color:#7c3aed;font-size:28px;font-weight:800;letter-spacing:3px;">${data.reference}</p>
                <p style="margin:8px 0 0;color:#9ca3af;font-size:12px;">Conservez cette référence pour tout contact</p>
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0;color:#111827;font-size:16px;">Bonjour <strong>${data.clientName}</strong>,</p>
              <p style="margin:12px 0 0;color:#4b5563;font-size:14px;line-height:1.6;">
                Nous avons bien reçu votre demande de transfert. Voici le récapitulatif de votre réservation :
              </p>
            </td>
          </tr>

          <!-- Trip details -->
          <tr>
            <td style="padding:20px 40px 0;">
              <h2 style="margin:0 0 16px;color:#111827;font-size:16px;font-weight:600;border-bottom:2px solid #f3f4f6;padding-bottom:8px;">📍 Détails du trajet</h2>
              <table width="100%" cellpadding="6" cellspacing="0">
                <tr><td style="color:#6b7280;font-size:13px;width:40%;">Départ</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.departure}</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">Destination</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.destination}</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">Date</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.departureDate}</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">Heure</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.departureTime}</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">Véhicule</td><td style="color:#111827;font-size:14px;font-weight:500;">${vehicleLabel[data.vehicleType] ?? data.vehicleType}</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">Passagers</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.passengers} passager(s)</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">Langue du chauffeur</td><td style="color:#111827;font-size:14px;font-weight:500;">${langLabel[data.driverLang] ?? data.driverLang}</td></tr>
                ${data.extraBaggage ? `<tr><td style="color:#6b7280;font-size:13px;">Bagages supplémentaires</td><td style="color:#111827;font-size:14px;font-weight:500;">Oui (+10€)</td></tr>` : ""}
              </table>
            </td>
          </tr>

          ${
            data.flightNumber
              ? `
          <!-- Flight info -->
          <tr>
            <td style="padding:20px 40px 0;">
              <h2 style="margin:0 0 16px;color:#111827;font-size:16px;font-weight:600;border-bottom:2px solid #f3f4f6;padding-bottom:8px;">✈️ Informations de vol</h2>
              <table width="100%" cellpadding="6" cellspacing="0">
                <tr><td style="color:#6b7280;font-size:13px;width:40%;">Numéro de vol</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.flightNumber}</td></tr>
                ${data.flightOrigin ? `<tr><td style="color:#6b7280;font-size:13px;">Aéroport d'origine</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.flightOrigin}</td></tr>` : ""}
                ${data.flightTime ? `<tr><td style="color:#6b7280;font-size:13px;">Heure d'arrivée</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.flightTime}</td></tr>` : ""}
              </table>
            </td>
          </tr>
          `
              : ""
          }

          <!-- Price -->
          <tr>
            <td style="padding:20px 40px;">
              <div style="background:linear-gradient(135deg,#7c3aed 0%,#9f67f5 100%);border-radius:12px;padding:20px;text-align:right;">
                <p style="margin:0;color:#e9d5ff;font-size:13px;">Montant total</p>
                <p style="margin:4px 0 0;color:#ffffff;font-size:32px;font-weight:800;">${data.totalPrice}€</p>
              </div>
            </td>
          </tr>

          <!-- Footer note -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;text-align:center;">
                Notre équipe vous contactera pour confirmer les détails finaux.<br/>
                Pour toute question, mentionnez votre référence <strong style="color:#7c3aed;">${data.reference}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer bar -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #f3f4f6;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} Transfert Tunisie — Tous droits réservés</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY as string,
    },
    body: JSON.stringify({
      sender: {
        name: "Transfert Tunisie",
        email: process.env.BREVO_FROM_EMAIL,
      },
      to: [
        {
          email: data.clientEmail,
          name: data.clientName,
        },
      ],
      bcc: [
        {
          email: process.env.BREVO_FROM_EMAIL,
          name: "Admin Transfert Tunisie",
        },
      ],
      subject: `✅ Réservation confirmée — Référence ${data.reference}`,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Brevo API Error: ${response.status} - ${JSON.stringify(errorData)}`);
  }
}

export interface ExcursionEmailData {
  clientName: string;
  clientEmail: string;
  reference: string;
  excursionName: string;
  date: string;
  participants: number;
  notes?: string;
  totalPrice: number;
}

export async function sendExcursionConfirmation(data: ExcursionEmailData) {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Confirmation d'Excursion</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(124,58,237,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed 0%,#9f67f5 100%);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">🗺️ Transfert Tunisie</h1>
              <p style="margin:8px 0 0;color:#e9d5ff;font-size:14px;">Votre réservation d'excursion est confirmée</p>
            </td>
          </tr>

          <!-- Reference box -->
          <tr>
            <td style="padding:32px 40px 0;">
              <div style="background:#f5f3ff;border:2px dashed #7c3aed;border-radius:12px;padding:20px;text-align:center;">
                <p style="margin:0 0 6px;color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Référence de réservation</p>
                <p style="margin:0;color:#7c3aed;font-size:28px;font-weight:800;letter-spacing:3px;">${data.reference}</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`Reservation Excursion: ${data.reference} - ${data.clientName}`)}" alt="QR Code" style="margin-top:16px; border-radius:8px;" />
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0;color:#111827;font-size:16px;">Bonjour <strong>${data.clientName}</strong>,</p>
              <p style="margin:12px 0 0;color:#4b5563;font-size:14px;line-height:1.6;">
                Nous avons bien reçu votre demande d'excursion. Voici le récapitulatif de votre réservation :
              </p>
            </td>
          </tr>

          <!-- Trip details -->
          <tr>
            <td style="padding:20px 40px 0;">
              <h2 style="margin:0 0 16px;color:#111827;font-size:16px;font-weight:600;border-bottom:2px solid #f3f4f6;padding-bottom:8px;">📍 Détails de l'excursion</h2>
              <table width="100%" cellpadding="6" cellspacing="0">
                <tr><td style="color:#6b7280;font-size:13px;width:40%;">Excursion</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.excursionName}</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">Date</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.date}</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">Passagers</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.participants} participant(s)</td></tr>
                ${data.notes ? `<tr><td style="color:#6b7280;font-size:13px;">Notes</td><td style="color:#111827;font-size:14px;font-weight:500;">${data.notes}</td></tr>` : ""}
              </table>
            </td>
          </tr>

          <!-- Price -->
          <tr>
            <td style="padding:20px 40px;">
              <div style="background:linear-gradient(135deg,#7c3aed 0%,#9f67f5 100%);border-radius:12px;padding:20px;text-align:right;">
                <p style="margin:0;color:#e9d5ff;font-size:13px;">Montant total</p>
                <p style="margin:4px 0 0;color:#ffffff;font-size:32px;font-weight:800;">${data.totalPrice}€</p>
              </div>
            </td>
          </tr>

          <!-- Footer note -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;text-align:center;">
                Notre équipe vous contactera pour confirmer les détails de prise en charge.<br/>
                Pour toute question, mentionnez votre référence <strong style="color:#7c3aed;">${data.reference}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer bar -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #f3f4f6;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} Transfert Tunisie — Tous droits réservés</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY as string,
    },
    body: JSON.stringify({
      sender: {
        name: "Transfert Tunisie",
        email: process.env.BREVO_FROM_EMAIL,
      },
      to: [
        {
          email: data.clientEmail,
          name: data.clientName,
        },
      ],
      bcc: [
        {
          email: process.env.BREVO_FROM_EMAIL,
          name: "Admin Transfert Tunisie",
        },
      ],
      subject: `✅ Excursion confirmée — Référence ${data.reference}`,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Brevo API Error: ${response.status} - ${JSON.stringify(errorData)}`);
  }
}
