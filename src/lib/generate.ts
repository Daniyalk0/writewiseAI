export async function generateText({
  prompt,
  type,
  uid,
  onToken,
  originalPrompt,
  previousResponse,
  isImproving = false,
}: {
  prompt: string;
  type: string;
  uid: string;
  onToken?: (token: string) => void;
  originalPrompt?: string;
  previousResponse?: string;
  isImproving?: boolean;
}) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      type,
      uid,
      ...(isImproving && {
        isImproving: true,
        originalPrompt,
        previousResponse,
      }),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate ${type}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let result = "";

  if (!reader) throw new Error("No stream received");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    result += chunk;
    onToken?.(chunk);
  }

  // 🔁 Save full result after streaming is complete
  if (uid && result) {
    await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        result,
        uid,
        type, // actual content type like "Email", "Post"
        mode: isImproving ? "improve" : "generate", // ✅ cleaner
      }),
    });
  }

  return result;
}
