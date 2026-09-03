"use client";
import { useState } from "react";
import "@/app/ui/tariffs.css";

const TARIFFS = [
  {
    id: "standard",
    name: "Стандарт",
    price: "1 500 ₽",
    period: "/ 30 дней",
    area: "до 100 га",
    features: [
      "Спутниковый анализ полей",
      "Кластеризация зон",
      "AI-рекомендации по удобрениям",
      "Карта-задание для техники",
    ],
  },
  {
    id: "pro",
    name: "Про",
    price: "4 500 ₽",
    period: "/ 30 дней",
    area: "до 500 га",
    features: [
      "Всё из тарифа «Стандарт»",
      "Больше площади для анализа",
      "Приоритетная обработка",
    ],
  },
];

export default function UpgradePage() {
  const [loadingTariff, setLoadingTariff] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleUpgrade = async (tariff: string) => {
    setError("");
    setLoadingTariff(tariff);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/payments/create?tariff=${tariff}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.confirmation_url;
      } else {
        setError("Не удалось создать платёж. Попробуйте позже.");
      }
    } catch {
      setError("Не удалось связаться с сервером.");
    } finally {
      setLoadingTariff(null);
    }
  };

  return (
    <main className="Upgrade-Page">
      <h2 className="Upgrade-Title">Обновить тариф</h2>
      <p className="Upgrade-Subtitle">
        Выберите подходящий тариф, чтобы продолжить анализировать поля
      </p>

      {error && <p className="Upgrade-Error">{error}</p>}

      <div className="Upgrade-Cards">
        {TARIFFS.map((tariff) => (
          <div key={tariff.id} className="Tariff-Card">
            <h3 className="Tariff-Name">{tariff.name}</h3>

            <div className="Tariff-Price">
              <span className="Tariff-Price-Value">{tariff.price}</span>
              <span className="Tariff-Price-Period">{tariff.period}</span>
            </div>

            <p className="Tariff-Area">{tariff.area}</p>

            <ul className="Tariff-Features">
              {tariff.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <button
              className="Tariff-Button"
              onClick={() => handleUpgrade(tariff.id)}
              disabled={loadingTariff === tariff.id}
            >
              {loadingTariff === tariff.id ? "Переход к оплате..." : "Оплатить"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}