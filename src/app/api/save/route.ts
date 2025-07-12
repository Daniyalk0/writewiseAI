import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, type, uid, result } = await req.json();

  if (!uid || !result) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    await addDoc(collection(db, "generations"), {
      prompt,
      type,
      uid,
      result,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Firestore save error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

