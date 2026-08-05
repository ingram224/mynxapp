"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm({ source = "landing" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");

    const params = new URLSearchParams(window.location.search);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          name: data.get("name") || null,
          source,
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (json.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error ?? "Что-то пошло не так");
      }
    } catch {
      setStatus("error");
      setError("Нет соединения. Попробуйте позже.");
    }
  }

  if (status === "success") {
    return (
      <div className="glass rounded-glass px-5 py-4 text-sm text-primary">
        Готово! Мы сообщим вам о запуске первым.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="ваш@email.ru"
        suppressHydrationWarning
        className="glass w-full flex-1 px-4 py-3 text-sm text-white placeholder:text-dim focus:outline-none focus:ring-2 focus:ring-primary/60"
      />
      <button type="submit" disabled={status === "loading"} className="btn-primary whitespace-nowrap disabled:opacity-60">
        {status === "loading" ? "Отправка…" : "Получить ранний доступ"}
      </button>
      {status === "error" && <p className="text-sm text-danger sm:absolute sm:-bottom-6">{error}</p>}
    </form>
  );
}
