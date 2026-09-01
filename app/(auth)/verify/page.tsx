"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/app/ui/verify.css";

export const dynamic = 'force-dynamic';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (response.ok) {
        router.push("/sign_in");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Неверный код");
      }
    } catch {
      setError("Не удалось связаться с сервером");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResendMessage("");
    try {
      const response = await fetch(`${API_URL}/users/resend_code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setResendMessage("Код отправлен повторно");
      } else {
        setResendMessage("Не удалось отправить код");
      }
    } catch {
      setResendMessage("Не удалось связаться с сервером");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="verify-container">
      <div className="verify-card">
        <h1>Подтвердите почту</h1>
        <p className="verify-hint">
          Мы отправили код на <strong>{email}</strong>. Введите его ниже.
        </p>

        <form onSubmit={handleVerify} className="verify-form">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="verify-input"
            required
          />

          {error && <p className="verify-error">{error}</p>}

          <button type="submit" className="verify-button" disabled={loading || code.length !== 6}>
            {loading ? "Проверка..." : "Подтвердить"}
          </button>
        </form>

        <button className="verify-resend" onClick={handleResend} disabled={resending}>
          {resending ? "Отправка..." : "Отправить код повторно"}
        </button>
        {resendMessage && <p className="verify-resend-message">{resendMessage}</p>}
      </div>
    </main>
  );
}