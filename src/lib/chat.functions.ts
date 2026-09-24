import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const messageSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
});

const SYSTEM_PROMPT =
  "You are a friendly AI assistant for SoundAI, an audio enhancement platform. Help users understand how to use the tools, explain features (Enhance Speech, Studio, Mic Check, AI Voice Coach, Auto Translate & Dub, Podcast Analytics, Smart Clip Generator, AI Music Composer), troubleshoot issues, and answer questions about pricing (Free vs Premium $12/month). Keep answers short, clear, and helpful.";

export const sendChat = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => messageSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return { reply: "AI service is not configured yet. Please add AI_API_KEY.", error: true };
    }

    try {
      const res = await fetch(
        process.env.AI_API_URL ?? "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: process.env.AI_MODEL ?? "gpt-4o-mini",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
          }),
        },
      );
      if (res.status === 429)
        return { reply: "Rate limit reached — try again shortly.", error: true };
      if (res.status === 402) return { reply: "AI service credits are exhausted.", error: true };
      if (!res.ok) {
        console.error("AI gateway error", res.status, await res.text());
        return { reply: "Something went wrong reaching the AI service.", error: true };
      }
      const json = await res.json();
      const reply = json.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
      return { reply, error: false };
    } catch (e) {
      console.error("chat err", e);
      return { reply: "Network error reaching AI.", error: true };
    }
  });
