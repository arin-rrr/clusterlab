"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

export default function A_TechPage() {
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
    <main className="A-Tech-Page-PageBackground">
      {isVisible && (
        <button onClick={scrollToTop} className="ScrollToTopButton">
          ↑
        </button>
      )}
      <div className="A-Tech-Page-Block-1">
        <Image
          className="A-Tech-Page-Satellite-Picture"
          src="/a-tech/satellite.svg"
          alt="Satellite picture"
          width={700}
          height={500}
          priority
        />
        <div className="A-Tech-Page-Block-1-Text">
          <div className="A-Tech-Page-Block-1-Text-Blur">
            <h2>Технологическая основа Clusterlab</h2>

            <p>
              Наш сервис интегрирует мультиспектральные и гиперспектральные
              данные спутника "Лобачевский" и сервиса от ИКИ РАН "ВЕГА-Science"
              с алгоритмами машинного обучения для автоматизированного
              агрозонирования и оптимизации внесения минеральных удобрений.
            </p>
          </div>
        </div>
      </div>

      <div className="A-Tech-Page-Block-2">
        <h2 className="A-Tech-Page-Block-2-Header">
          Спутник "Лобачевский": платформа для агроэкологического мониторинга
        </h2>
        <div className="A-Tech-Page-Block-2-Cards-Container">
          <div className="A-Tech-Page-Block-2-Text">
            <p>
              Малый космический аппарат "Лобачевский" создан ННГУ им. Н. И.
              Лобачевский на базе спутниковой платформы "Геоскан 16U".
            </p>
            <p>
              Спутник оснащён спектральными камерами для ДЗЗ и FM-ретранслятором
              радиосигнала. Основная научная задача миссии — получение снимков с
              последующей обработкой данных.
            </p>
          </div>
          <div className="A-Tech-Page-Block-2-Image">
            <Image
              className="A-Tech-Page-Lobachev-Picture"
              src="/a-tech/lobachev_satelitte.svg"
              alt="Lobachev picture"
              width={700}
              height={800}
              priority
            />
          </div>
        </div>
      </div>

      <div className="A-Tech-Page-Block-3">
        <div className="A-Tech-Page-Block-3-Cards-Container">
          <div className="A-Tech-Page-Block-3-SubBlock">
            <div className="A-Tech-Page-Block-3-Icon-Wrapper">
              <Image
                className="A-Tech-Page-Camera-Picture"
                src="/a-tech/camera.svg"
                alt="Lobachev picture"
                width={100}
                height={100}
                priority
              />
            </div>
            <p className="A-Tech-Page-Block-3-SubHeader">Бортовая аппаратура</p>
            <p className="A-Tech-Page-Block-3-SubText">
              Содержит спекральные камеры и дополнительную аппаратуру:
              FM-ретранслятор и мемристорная плата.
            </p>
          </div>

          <div className="A-Tech-Page-Block-3-SubBlock">
            <div className="A-Tech-Page-Block-3-Icon-Wrapper">
              <Image
                className="A-Tech-Page-Arrow-Picture"
                src="/a-tech/arrow.svg"
                alt="Arrow picture"
                width={100}
                height={100}
                priority
              />
            </div>

            <p className="A-Tech-Page-Block-3-SubHeader">Решаемые задачи</p>
            <p className="A-Tech-Page-Block-3-SubText">
              Проводит агромониторинг (спутниковая съёмка и оценка параметров
              растений) и научные исследования
            </p>
          </div>

          <div className="A-Tech-Page-Block-3-SubBlock">
            <div className="A-Tech-Page-Block-3-Icon-Wrapper">
              <Image
                className="A-Tech-Page-Sputnik-Picture"
                src="/a-tech/sputnik.svg"
                alt="Sputnik picture"
                width={100}
                height={100}
                priority
              />
            </div>
            <p className="A-Tech-Page-Block-3-SubHeader">
              Спутниковая платформа
            </p>
            <p className="A-Tech-Page-Block-3-SubText">
              Платформа Геоскан 16U (10×20×34 см) - система высокороточной
              ориентации и стабилизации.
            </p>
          </div>
        </div>
      </div>

      <div className="A-Tech-Page-Block-4">
        <h2 className="A-Tech-Page-Block-4-Header">Медия и ресурсы</h2>
        <div className="A-Tech-Page-Block-4-Cards-Container">

          <div className="A-Tech-Page-Block-4-Image">
            <Image
              className="A-Tech-Page-LobachevBody-Picture"
              src="/a-tech/LobachevBody.svg"
              alt="Sputnik body picture"
              width={700}
              height={700}
              priority
            />
            <div className="A-Tech-Page-Block-4-ImgTitle">
              Спутник "Лобачевский"
            </div>
          </div>
        </div>
        <nav className="A-Tech-Page-Block-4-Links">
          <p>
            Трансляция запуска:{" "}
            <a
              href="https://www.youtube.com/watch?v=lFOWEUSP9Vo"
              target="_blank"
              rel="noopener noreferrer"
              className="A-Tech-Page-Block-4-Media"
            >
              YouTube
            </a>
            ,{" "}
            <a
              href="https://vkvideo.ru/video-30315369_456244599?sh=4"
              target="_blank"
              rel="noopener noreferrer"
              className="A-Tech-Page-Block-4-Media"
            >
              VK
            </a>
          </p>
          <p>
            <a
              href="https://spacepi.space/satellites/lobachevskij/"
              target="_blank"
              rel="noopener noreferrer"
              className="A-Tech-Page-Block-4-Media"
            >
              Статья о проекте на Space-π
            </a>
          </p>
          <p>
            <a
              href="https://www.geoscan.ru/ru/products/cubesat?utm_source=telegram&utm_medium=organic&utm_campaign=geoscan-space&utm_content=description&clckid=ba482b39"
              target="_blank"
              rel="noopener noreferrer"
              className="A-Tech-Page-Block-4-Media"
            >
              Новости на сайте GEOSCAN
            </a>
          </p>
        </nav>
      </div>

      <div className="A-Tech-Page-Block-5">
        <h2 className="A-Tech-Page-Block-5-Header">Научная часть ClusterLab</h2>

        <div className="A-Tech-Page-Block-5-Cards-Container">
          <div className="A-Tech-Page-Block-5-SubBlock">
            <div className="A-Tech-Page-Block-5-Icon-Wrapper">
              <Image
                className="A-Tech-Page-Box-Picture"
                src="/a-tech/box.svg"
                alt="Box picture"
                width={700}
                height={700}
                priority
              />
            </div>
            <div className="A-Tech-Page-Block-5-SubHeader">
              <p>Машинное обучение для сегментации полей</p>
            </div>
            <div className="A-Tech-Page-Block-5-SubText">
              <p>
                Для каждого поля после его анализа подбирается лучший алгоритм
                кластеризации на основе метрик, рассчитанных с помощью данных с
                ДЗЗ. Превращаем поле из миллиона спектральных точек в четкие
                агрозоны.
              </p>
            </div>
          </div>
          <div className="A-Tech-Page-Block-5-SubBlock">
            <div className="A-Tech-Page-Block-5-Icon-Wrapper">
              <Image
                className="A-Tech-Page-PCHuman-Picture"
                src="/a-tech/pchuman.svg"
                alt="PCHuman picture"
                width={700}
                height={700}
                priority
              />
            </div>
            <div className="A-Tech-Page-Block-5-SubHeader">
              <p>LLM-интерпретация и расчет доз</p>
            </div>
            <div className="A-Tech-Page-Block-5-SubText">
              <p>
                Используем современные большие языковые модели для формирования
                экспертных рекомендаций удобрений для каждой зоны, учитывая тип
                культуры, вегетационный период, агрохимические характеристики
                региона.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
