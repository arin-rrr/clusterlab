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
      const response = await fetch("http://127.0.0.1:8000/users/", {
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
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
                <a href="/documents/privacy-policy.pdf" target="_blank" >
                  Политикой обработки персональных данных
                </a>{" "}
                и{" "}
                <a href="/documents/oferta.pdf" target="_blank" >
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