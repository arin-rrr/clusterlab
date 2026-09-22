"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Sign_Up() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("Необходимо согласиться с условиями обработки данных");
      return;
    }

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${API_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          full_name: companyName,
          password: password,
        }),
      });

      if (response.ok) {
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Ошибка при регистрации");
      }
    } catch (err) {
      setError("Не удалось связаться с сервером. Проверь, запущен ли FastAPI.");
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Image
            className="auth-logo"
            src="/header/Logo-Transparent.svg"
            alt="ClusterLab Logo"
            width={60}
            height={60}
          />
          <h1>ClusterLab</h1>
          <p>Создайте аккаунт для управления полями</p>
        </div>

        <form onSubmit={handleSignUp} className="auth-form">
          <div className="input-group">
            <label>Имя или название компании</label>
            <input
              type="text"
              placeholder="Иван Иванов / ООО Агросоюз"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Почта</label>
            <input
              type="email"
              placeholder="agronom@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Пароль</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? (
                  // Глаз перечёркнутый
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  // Обычный глаз
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="consent-group">
            <label className="consent-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                Я согласен(на) с{" "}
                <a href="/documents/privacy-policy.pdf" target="_blank">
                  Политикой обработки персональных данных
                </a>{" "}
                и{" "}
                <a href="/documents/oferta.pdf" target="_blank">
                  Договором публичной оферты
                </a>
              </span>
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="auth-button" disabled={!agreed}>
            Создать аккаунт
          </button>
        </form>

        <div className="auth-footer">
          <span>Уже есть аккаунт? </span>
          <Link href="/sign_in">Войти</Link>
        </div>
      </div>
    </main>
  );
}