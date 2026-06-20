import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    // Create JWT valid for 24 hours
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
