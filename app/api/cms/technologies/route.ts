import { NextResponse } from "next/server";

const CMS_API_URL = process.env.CMS_API_URL || "http://porto-cms-api:3001";

export async function GET() {
  try {
    const res = await fetch(`${CMS_API_URL}/api/technologies`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch technologies");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
