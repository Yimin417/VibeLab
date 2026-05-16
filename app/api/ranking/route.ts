import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";

const projects: Project[] = projectsData as Project[];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "today";
  const limit = Math.min(parseInt(searchParams.get("limit") || "5"), 10);

  // Calculate date range
  const now = new Date();
  let startDate: string;

  switch (period) {
    case "today":
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).toISOString();
      break;
    case "week":
      startDate = new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000
      ).toISOString();
      break;
    case "month":
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      ).toISOString();
      break;
    default:
      startDate = new Date(0).toISOString(); // all time
  }

  try {
    // Get like counts grouped by project_id within the time period
    const { data: likeData, error } = await getSupabase()
      .from("likes")
      .select("project_id, count", { count: "exact" })
      .gte("created_at", startDate);

    if (error) throw error;

    // Group counts by project_id
    const likesById: Record<string, number> = {};
    for (const row of likeData) {
      likesById[row.project_id] = (likesById[row.project_id] || 0) + 1;
    }

    // Cross-reference with project data, sort by likes desc
    const ranking = projects
      .filter((p) => new Date(p.createdAt).toISOString() >= startDate)
      .sort((a, b) => (likesById[b.id] || 0) - (likesById[a.id] || 0))
      .slice(0, limit)
      .map((p) => ({
        id: p.id,
        title: p.title,
        author: p.author,
        likes: likesById[p.id] || 0,
      }));

    return NextResponse.json({ ranking });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch ranking" },
      { status: 500 }
    );
  }
}
