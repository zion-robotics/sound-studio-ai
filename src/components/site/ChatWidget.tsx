import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { sendChat } from "@/lib/chat.functions";
import { useAuth } from "@/hooks/use-auth";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatWidget({ onRequireAuth }: { onRequireAuth: () => void }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey! I'm your SoundAI guide. Ask me anything about the tools, pricing, or how to get started." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const send = useServerFn(sendChat);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    if (!user) { onRequireAuth(); return; }
    const next: Msg[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await send({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Something went wrong. Try again." }]);
    } finally { setLoading(false); }
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[90] h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center shadow-glow pulse-glow hover:scale-110 active:scale-95 transition"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[90] w-[calc(100vw-3rem)] sm:w-96 h-[520px] glass-strong rounded-3xl shadow-card flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <div>
                <div className="text-sm font-semibold">SoundAI Assistant</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {!user && (
                <div className="text-center p-4 glass rounded-2xl text-sm">
                  <button onClick={onRequireAuth} className="text-primary-glow hover:underline">Sign in</button> to chat.
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user" ? "bg-gradient-primary text-primary-foreground" : "glass"
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass px-4 py-3 rounded-2xl flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-primary-glow"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form onSubmit={submit} className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input} onChange={(e) => setInput(e.target.value)}
                placeholder={user ? "Ask anything..." : "Sign in to chat"}
                disabled={!user || loading}
                className="flex-1 px-4 py-2.5 rounded-full glass border border-white/10 focus:border-primary/60 focus:outline-none text-sm transition"
              />
              <button
                type="submit" disabled={!input.trim() || loading || !user}
                className="h-10 w-10 rounded-full bg-gradient-primary grid place-items-center disabled:opacity-50 hover:scale-105 transition"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
