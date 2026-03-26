import { NextRequest, NextResponse } from "next/server";

// --- Rate Limiting (in-memory, Map-based) ---
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    entry.timestamps = entry.timestamps.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );
    if (entry.timestamps.length === 0) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { timestamps: [now] });
    return false;
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (entry.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.timestamps.push(now);
  return false;
}

// --- Allowed Origins ---
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://llcouverture.com",
  "https://www.llcouverture.com",
];

// --- Input Sanitization ---
function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

function sanitizeString(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return stripHtmlTags(input.trim()).substring(0, maxLength);
}

// --- Field Length Limits ---
const FIELD_LIMITS: Record<string, number> = {
  name: 100,
  email: 254,
  phone: 20,
  subject: 200,
  message: 5000,
  address: 200,
  service: 100,
  urgency: 100,
  formType: 100,
};

export async function POST(request: NextRequest) {
  try {
    // --- Origin Checking ---
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");

    const requestOrigin = origin || (referer ? new URL(referer).origin : null);

    if (!requestOrigin || !ALLOWED_ORIGINS.includes(requestOrigin)) {
      return NextResponse.json(
        { error: "Origine non autorisée." },
        { status: 403 }
      );
    }

    // --- Rate Limiting ---
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Trop de soumissions. Veuillez patienter 15 minutes avant de réessayer.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // --- Honeypot Validation ---
    if (body.honeypot || body.website) {
      // Return fake success to fool bots - do not process the submission
      return NextResponse.json(
        {
          success: true,
          message: "Votre demande a été envoyée avec succès.",
        },
        { status: 200 }
      );
    }

    // --- Input Sanitization ---
    const sanitizedBody: Record<string, string> = {};
    for (const [key, maxLength] of Object.entries(FIELD_LIMITS)) {
      if (body[key] !== undefined) {
        sanitizedBody[key] = sanitizeString(body[key], maxLength);
      }
    }

    const { name, email, phone, message, formType } = sanitizedBody;

    // Basic validation — all forms require name, email and phone
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires (nom, email, téléphone)." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // Message required for contact & devis forms (optional for hero quick-quote)
    if (formType !== "hero_quote" && !message) {
      return NextResponse.json(
        { error: "Veuillez remplir le champ message." },
        { status: 400 }
      );
    }

    // Forward to WordPress REST API
    const wpApiUrl =
      process.env.WORDPRESS_API_URL ||
      "https://api.llcouverture.com/wp-json/jjm/v1";

    try {
      const wpResponse = await fetch(`${wpApiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedBody),
      });

      if (!wpResponse.ok) {
        console.error(`WordPress API error: ${wpResponse.status}`);
        throw new Error("WordPress API error");
      }

      const wpData = await wpResponse.json();

      return NextResponse.json(
        {
          success: true,
          message:
            wpData.message || "Votre demande a été envoyée avec succès.",
        },
        { status: 200 }
      );
    } catch (wpError) {
      // Fallback: if WordPress is unreachable, log the submission to console
      console.warn(
        "WordPress API unreachable, logging submission locally:",
        wpError
      );
      console.log(`[${formType}] New lead received (fallback):`, {
        name,
        email,
        phone,
        message: message.substring(0, 100),
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          success: true,
          message: "Votre demande a été envoyée avec succès.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
