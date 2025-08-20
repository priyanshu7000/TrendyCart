import { useState } from "react";
import type { FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // simple validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mt-12 px-4">
      <form onSubmit={submit} className="max-w-3xl mx-auto flex gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="flex-1 rounded-full px-4 py-2"
          placeholder="Your email"
          aria-label="Email"
        />
        <button className="bg-primary text-white rounded-full px-5 py-2">
          Subscribe
        </button>
      </form>
    </section>
  );
}
