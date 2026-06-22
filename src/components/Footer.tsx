"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { social } from "@/lib/data";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Submit to FormSubmit (free) — no server required
      const endpoint = "https://formsubmit.co/semikaanusara3@gmail.com";
      const form = new URLSearchParams();
      form.append("name", name);
      form.append("email", email);
      form.append("message", message);
      // disable FormSubmit captcha and set a subject
      form.append("_captcha", "false");
      form.append("_subject", `Website message from ${name || "Visitor"}`);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString(),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <footer className="border-t border-[var(--glass-border)] px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex w-full flex-col gap-2">
              <span className="text-xs font-semibold uppercase text-ink-muted">
                Name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="glass w-full rounded-xl px-4 py-4 text-sm placeholder:font-medium placeholder:text-ink-muted"
              />
            </label>

            <label className="flex w-full flex-col gap-2">
              <span className="text-xs font-semibold uppercase text-ink-muted">
                Email
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="glass w-full rounded-xl px-4 py-4 text-sm placeholder:font-medium placeholder:text-ink-muted"
              />
            </label>
          </div>

          <label className="flex w-full flex-col gap-2">
            <span className="text-xs font-semibold uppercase text-ink-muted">
              Message
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              rows={6}
              className="glass w-full rounded-xl px-4 py-4 text-sm placeholder:font-medium placeholder:text-ink-muted"
            />
          </label>

          <div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="glass w-full rounded-full py-4 text-accent font-semibold tracking-wide flex items-center justify-center gap-3 disabled:opacity-60"
            >
              <Send size={18} />
              <span>
                {status === "sending" ? "SENDING..." : status === "sent" ? "SENT" : "SEND MESSAGE"}
              </span>
            </button>

            {status === "sent" && (
              <p className="mt-2 text-center text-sm text-ink-muted">Message sent — thank you!</p>
            )}
            {status === "error" && (
              <p className="mt-2 text-center text-sm text-red-500">Failed to send. Try again later.</p>
            )}
          </div>

          <p className="mt-2 text-center text-xs text-ink-muted">
            &copy; {new Date().getFullYear()} Semika Anusara. All rights
            reserved.
          </p>
        </form>
      </div>
    </footer>
  );
}
