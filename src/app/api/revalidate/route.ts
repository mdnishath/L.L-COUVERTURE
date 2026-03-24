import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, paths } = body;

    if (secret !== process.env.WORDPRESS_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const pathsToRevalidate = paths || [
      "/",
      "/services",
      "/realisations",
      "/a-propos",
      "/contact",
      "/devis",
    ];

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    // Also revalidate dynamic service pages
    revalidatePath("/services/[slug]", "page");

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
    });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
