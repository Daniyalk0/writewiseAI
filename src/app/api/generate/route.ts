export const runtime = "edge";

import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, type } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-70b-instruct",
      stream: true,
      messages: [
        {
          role: "user",
          content: `Generate a professional ${type.toLowerCase()} based on:\n${prompt}`,
        },
      ],
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const token = chunk.choices?.[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(token));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Streaming error:", error);
    return NextResponse.json(
      { error: "Something went wrong while generating content." },
      { status: 500 }
    );
  }
}
