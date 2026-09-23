/*
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PricesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <main className="Prices-Page-PageBackground">
      {isVisible && (
        <button onClick={scrollToTop} className="ScrollToTopButton">
          ↑
        </button>
      )}

      <h2 className="Prices-Page-Header">
        Тарифы и подписки: выберите подходящую и начните работу
      </h2>
      <div className="Prices-Page-Block-1">
        <div className="Prices-Page-Block-1-Cards-Container">
          <div className="Prices-Page-Block-1-SubBlock">
            <div className="Prices-Page-Block-1-Type-Wrapper">
              <p>Стандарт</p>
            </div>
            <div className="Prices-Page-Block-1-SubHeader">
              <h2>Идеальный старт для небольших фермерских хозяйств</h2>
            </div>
            <div className="Prices-Page-Block-1-SubText">
              <p>Что входит:</p>
              <ul>
                <li>
                  <p>
                    Интерактивная карта и экспорт shapefile
                  </p>
                </li>
                <li>
                  <p>
                    Площадь обрабатываемых угодий за месяц - не более 100 га
                  </p>
                </li>
              </ul>
            </div>
            <div className="Prices-Page-Block-1-Bottom">
              <div className="Prices-Page-Block-1-Price">
                <p>1290 ₽ / 30 дней</p>
              </div>
              <Link href="/">
                <p className="Prices-Page-Block-1-Button">Начать Работу</p>
              </Link>
            </div>
          </div>

          <div className="Prices-Page-Block-1-SubBlock">
            <div className="Prices-Page-Block-1-Type-Wrapper">
              <p>Про</p>
            </div>
            <div className="Prices-Page-Block-1-SubHeader">
              <h2>Инструмент для масштабного роста и максимального точности</h2>
            </div>
            <div className="Prices-Page-Block-1-SubText">
              <p>Что входит:</p>
              <ul>
                <li>
                  <p>
                    Интерактивная карта и экспорт рекомендаций в любом формате
                  </p>
                </li>
                <li>
                  <p>Кластеризация по NDVI + 6 каналов</p>
                </li>
                <li>
                  <p>
                    Учет агрохимических свойств почв, вегетационного периода и
                    типа культуры
                  </p>
                </li>
                <li>
                  <p>
                    Площадь обрабатываемых угодий за месяц - не более 500 га
                  </p>
                </li>
              </ul>
            </div>
            <div className="Prices-Page-Block-1-Bottom">
              <div className="Prices-Page-Block-1-Price">
                <p>2990 ₽ / 30 дней</p>
              </div>
              <Link href="/">
                <p className="Prices-Page-Block-1-Button">Начать Работу</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="Prices-Page-Block-2">
        <div className="Prices-Page-Block-2-Cards-Container">
          <div className="Prices-Page-Block-2-SubBlock">
            <div className="Prices-Page-Block-2-Type-Wrapper">
              <p>Демо</p>
            </div>
            <div className="Prices-Page-Block-2-SubHeader">
              <h2>Попробуйте возможности на небольшом поле</h2>
            </div>
            <div className="Prices-Page-Block-2-SubText">
              <p>Что входит:</p>
              <ul>
                <li>
                  <p>Анализ полей площадью до 10 га</p>
                </li>
                <li>
                  <p>Демонстрационная кластеризация по NDVI</p>
                </li>
                <li>
                  <p>
                    Интерактивная карта и экспорт рекомендаций в одном формате
                  </p>
                </li>
              </ul>
            </div>
            <div className="Prices-Page-Block-1-Bottom">
              <div className="Prices-Page-Block-2-Price">
                <p>0 ₽ / 7 дней</p>
              </div>
              <Link href="/">
                <p className="Prices-Page-Block-2-Button">Начать Работу</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
*/

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PricesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tiers = [
    {
      name: "Стандарт",
      description: "Идеальный старт для небольших фермерских хозяйств",
      price: "1290 ₽ / 30 дней",
      features: [
        "Интерактивная карта и экспорт рекомендаций",
        "Площадь угодий до 100 га в месяц",
      ],
      type: "standard",
    },
    {
      name: "Про",
      description: "Инструмент для масштабного роста и максимальной точности",
      price: "2990 ₽ / 30 дней",
      features: [
        "Всё, что есть в Стандарт",
        "Площадь угодий до 500 га в месяц",
      ],
      type: "pro",
    },
    {
      name: "Демо",
      description: "Попробуйте возможности на небольшом поле",
      price: "0 ₽ / 7 дней",
      features: [
        "Анализ полей суммарной площадью до 10 га",
        "Демонстрационная кластеризация по NDVI",
        "Интерактивная карта и экспорт в одном формате",
      ],
      type: "demo",
    },
  ];

  return (
    <main className="Prices-Page-PageBackground">
      {isVisible && (
        <button onClick={scrollToTop} className="ScrollToTopButton">
          ↑
        </button>
      )}

      <h1 className="Prices-Page-Header">
        Тарифы и подписки: выберите подходящую и начните работу
      </h1>

      <div className="Prices-Page-Cards-Container">
        {tiers.map((tier, index) => (
          <div key={index} className={`Price-Card ${tier.type}`}>
            <div className="Price-Card-Badge">
              <p>{tier.name}</p>
            </div>

            <div className="Price-Card-Content">
              <h2 className="Price-Card-SubHeader">{tier.description}</h2>
              <div className="Price-Card-Features">
                <p>Что входит:</p>
                <ul>
                  {tier.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="Price-Card-Bottom">
              <div className="Price-Card-Price">
                <p>{tier.price}</p>
              </div>
              <Link href="/sign_in" className="Price-Card-Button">
                Начать Работу
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
