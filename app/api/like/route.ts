import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const fingerprint = request.headers.get("x-fingerprint");
  if (!fingerprint) {
    return NextResponse.json({ error: "Missing fingerprint" }, { status: 400 });
  }

  let projectId: string;
  try {
    const body = await request.json();
    projectId = body.projectId;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!projectId) {
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
  }

  try {
    // Check if already liked
    const { data: existing } = await getSupabase()
      .from("likes")
      .select("id")
      .eq("project_id", projectId)
      .eq("fingerprint", fingerprint)
      .maybeSingle();

    if (existing) {
      // Unlike
      await getSupabase()
        .from("likes")
        .delete()
        .eq("project_id", projectId)
        .eq("fingerprint", fingerprint);

      const { count } = await getSupabase()
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("project_id", projectId);

      return NextResponse.json({ liked: false, count: count || 0 });
    } else {
      // Like
      await getSupabase().from("likes").insert({
        project_id: projectId,
        fingerprint,
      });

      const { count } = await getSupabase()
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("project_id", projectId);

      return NextResponse.json({ liked: true, count: count || 0 });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to process like" },
      { status: 500 }
    );
  }
}
