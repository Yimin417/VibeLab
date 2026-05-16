import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectIds = searchParams.get("projectIds");

  if (!projectIds) {
    return NextResponse.json({ counts: {}, liked: {} });
  }

  const ids = projectIds.split(",").filter(Boolean);

  if (ids.length === 0) {
    return NextResponse.json({ counts: {}, liked: {} });
  }

  const fingerprint = request.headers.get("x-fingerprint") || "";

  try {
    // Batch count likes per project
    const { data: likeData, error: countError } = await getSupabase()
      .from("likes")
      .select("project_id, count", { count: "exact" })
      .in("project_id", ids);

    // Build counts from group
    const counts: Record<string, number> = {};
    if (!countError && likeData) {
      // Count occurrences per project_id
      const grouped: Record<string, number> = {};
      for (const row of likeData) {
        grouped[row.project_id] = (grouped[row.project_id] || 0) + 1;
      }
      ids.forEach((id) => {
        counts[id] = grouped[id] || 0;
      });
    } else {
      ids.forEach((id) => {
        counts[id] = 0;
      });
    }

    // Check which projects the current user liked
    const liked: Record<string, boolean> = {};
    if (fingerprint) {
      const { data: likedData } = await getSupabase()
        .from("likes")
        .select("project_id")
        .in("project_id", ids)
        .eq("fingerprint", fingerprint);

      const likedSet = new Set((likedData || []).map((r) => r.project_id));
      ids.forEach((id) => {
        liked[id] = likedSet.has(id);
      });
    }

    return NextResponse.json({ counts, liked });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch like counts" },
      { status: 500 }
    );
  }
}
