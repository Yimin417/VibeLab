import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { Comment } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
  }

  try {
    const { data, error } = await getSupabase()
      .from("comments")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const comments: Comment[] = (data || []).map((row) => ({
      id: row.id,
      author: row.author,
      content: row.content,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const fingerprint = request.headers.get("x-fingerprint");
  if (!fingerprint) {
    return NextResponse.json({ error: "Missing fingerprint" }, { status: 400 });
  }

  let projectId: string;
  let author: string;
  let content: string;

  try {
    const body = await request.json();
    projectId = body.projectId;
    author = body.author?.trim();
    content = body.content?.trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!projectId || !author || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (author.length > 30) {
    return NextResponse.json(
      { error: "Name must be 30 characters or less" },
      { status: 400 }
    );
  }

  if (content.length > 500) {
    return NextResponse.json(
      { error: "Comment must be 500 characters or less" },
      { status: 400 }
    );
  }

  try {
    const commentId = `${fingerprint}_${Date.now()}`;
    const now = new Date().toISOString();

    const { error } = await getSupabase().from("comments").insert({
      id: commentId,
      project_id: projectId,
      author,
      content,
      created_at: now,
    });

    if (error) throw error;

    const comment: Comment = {
      id: commentId,
      author,
      content,
      createdAt: now,
    };

    return NextResponse.json({ comment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
