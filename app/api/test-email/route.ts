import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const to = searchParams.get("to") ?? process.env.BREVO_FROM_EMAIL!;

  try {
    const html = `
      <div style="font-family:Arial,sans-serif;padding:24px;background:#f5f3ff;border-radius:12px;max-width:480px;">
        <h2 style="color:#7c3aed;">✅ Email fonctionne !</h2>
        <p>Cet email confirme que l'API Brevo est correctement configurée.</p>
        <p style="color:#6b7280;font-size:13px;">
          From: ${process.env.BREVO_FROM_EMAIL}
        </p>
      </div>
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
          name: "Transfert Tunisie Test",
          email: process.env.BREVO_FROM_EMAIL,
        },
        to: [
          {
            email: to,
            name: "Test Recipient",
          },
        ],
        subject: "✅ Test email — Transfert Tunisie",
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Brevo API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const info = await response.json();

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès ✅ via API Brevo",
      to,
      messageId: info.messageId,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}

