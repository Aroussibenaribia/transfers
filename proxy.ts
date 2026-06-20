import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const locales = ["fr", "en", "it", "de"];
const defaultLocale = "fr";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;
  
  for (const lang of locales) {
    if (acceptLanguage.includes(lang)) {
      return lang;
    }
  }
  return defaultLocale;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Check if the path is missing a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const isApiRoute = pathname.startsWith("/api");
  const isStaticFile = pathname.includes(".");
  const isAdminRoute = pathname.startsWith("/admin");

  if (!pathnameHasLocale && !isApiRoute && !isStaticFile && !isAdminRoute) {
    const locale = getLocale(req);
    req.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(req.nextUrl);
  }

  // 2. Admin Protection Logic
  const token = req.cookies.get("admin_token")?.value;
  const isLoginPage = pathname === "/admin/login";
  const isApiAdminRoute = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login");
  const isProtectedAdminRoute = isAdminRoute && !isLoginPage;

  let isValid = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      isValid = true;
    } catch (err) {
      isValid = false;
    }
  }

  if ((isProtectedAdminRoute || isApiAdminRoute) && !isValid) {
    if (isApiAdminRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && isValid) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
