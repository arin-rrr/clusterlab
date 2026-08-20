"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
export default function HomePage() {
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
    <main className="App-Page-PageBackground">
      {isVisible && (
        <button onClick={scrollToTop} className="ScrollToTopButton">
          ↑
        </button>
      )}
      <div className="App-Page-Block-1">
        <Image
          className="App-Page-NASA-Picture"
          src="/app-page/NASA_pic.svg"
          alt="NASA picture from space"
          width={500}
          height={500}
          priority
        />
        <div className="App-Page-Block-1-Text">
          <div className="App-Page-Block-1-Text-Blur">
            <h2>Оптимизация Внесения Удобрений На Основе Спутниковых Данных</h2>

            <p>
              Сократите расходы на удобрения до 30% с помощью гиперспектральных данных.
            </p>

            <div className="App-Page-Block-1-Buttons-All">
              <Link href="/sign_in">
                <p className="App-Page-Block-1-Button-1">Начать работу</p>
              </Link>
              <Link href="#App-Page-Block-2-Header">
                <p className="App-Page-Block-1-Button-2">Узнать больше</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="App-Page-Block-2">
        <h2 className="App-Page-Block-2-Header" id="App-Page-Block-2-Header">
          Почему традиционное внесение удобрений неэффективно?
        </h2>
        <div className="App-Page-Block-2-Cards-Container">
          <div className="App-Page-Block-2-SubBlock">
            <div className="App-Page-Block-2-Icon-Wrapper">
              <Image
                className="App-Page-Pig-Picture"
                src="/app-page/Pig.svg"
                alt="Pig picture"
                width={100}
                height={100}
                priority
              />
            </div>

            <p className="App-Page-Block-2-SubHeader">Перерасход ресурсов</p>
            <p className="App-Page-Block-2-SubText">
              Усреднённые нормы приводят к переизбытку удобрений на одних
              участках и нехватке на других
            </p>
          </div>

          <div className="App-Page-Block-2-SubBlock">
            <div className="App-Page-Block-2-Icon-Wrapper">
              <Image
                className="App-Page-Arrow-Picture"
                src="/app-page/Arrow.svg"
                alt="Arrow picture"
                width={100}
                height={100}
                priority
              />
            </div>

            <p className="App-Page-Block-2-SubHeader">Снижение урожайности</p>
            <p className="App-Page-Block-2-SubText">
              Неравномерное удобрение растений снижает общую продуктивность поля
            </p>
          </div>

          <div className="App-Page-Block-2-SubBlock">
            <div className="App-Page-Block-2-Icon-Wrapper">
              <Image
                className="App-Page-Planet-Picture"
                src="/app-page/Planet.svg"
                alt="Planet picture"
                width={100}
                height={100}
                priority
              />
            </div>
            <p className="App-Page-Block-2-SubHeader">Экологический вред</p>
            <p className="App-Page-Block-2-SubText">
              Избыток удобрений загрязняет близлежащие почву и водоемы
            </p>
          </div>
        </div>
      </div>

      <div className="App-Page-Block-3">
        <h2 className="App-Page-Block-3-Header">
          <b>ClusterLab</b> автоматически разделит поле на зоны и рассчитает
          оптимальные дозы удобрений
        </h2>

        <div className="App-Page-Block-3-Cards-Container">
          <div className="App-Page-Block-3-SubBlock">
            <div>
              <a>
                Мы используем <b>спутниковые снимки</b> и{" "}
                <b>агрохимические данные</b> для точного агрозондирования.
              </a>
            </div>
            <div>
              <a>Вы получаете интерактивную карту с рекомендациями по каждой зоне и <u>shapefile</u> для интеграции с техникой точного земледелия.</a>
            </div>
          </div>
          <div className="App-Page-Block-3-SubImage">
            <iframe
              src="/app-page/map.html"
              width="100%"
              height="500px"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>

      <div className="App-Page-Block-4">
        <div className="App-Page-Block-4-Header">
          <h2>Как это работает?</h2>
        </div>
        <div className="App-Page-Block-4-Cards-Container">
          <div className="App-Page-Block-4-SubBlock">
            <div className="App-Page-Block-4-List">
              <p>1</p>
            </div>
            <div className="App-Page-Block-4-SubText">
              <h2>Сбор данных</h2>
              <p>
                Получаем мульти- и гиперспектральные данные и агрохимическиие данные почв.
              </p>
            </div>
          </div>

          <div className="App-Page-Block-4-SubBlock">
            <div className="App-Page-Block-4-List">
              <p>2</p>
            </div>
            <div className="App-Page-Block-4-SubText">
              <h2>Кластерный анализ</h2>
              <p>
                Алгоримы машинного обучения автоматически выделяют зоны с
                разными потребностями в удобрениях.
              </p>
            </div>
          </div>

          <div className="App-Page-Block-4-SubBlock">
            <div className="App-Page-Block-4-List">
              <p>3</p>
            </div>
            <div className="App-Page-Block-4-SubText">
              <h2>Расчёт доз</h2>
              <p>
                Рассчитываем оптимальные дозы удобрений для каждой зоны на
                основе результатов кластеризации и с помощью LLM-систем.
              </p>
            </div>
          </div>

          <div className="App-Page-Block-4-SubBlock">
            <div className="App-Page-Block-4-List">
              <p>4</p>
            </div>
            <div className="App-Page-Block-4-SubText">
              <h2>Карта агрозонирования</h2>
              <p>
                Вы получаете цифровую карту с рекомендациями, совместимую с
                системами точного земледелия.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="App-Page-Block-5">
        <h2 className="App-Page-Block-5-Header">Наши преимущества</h2>

        <div className="App-Page-Block-5-Cards-Container">
          <div className="App-Page-Block-5-SubBlock-1">
            <div className="App-Page-Block-5-Blur">
              <h2>Анализ с отечественного спутника «Лобачевский»</h2>
              <p>
                В отличие от аналогов наш сервис работает с данными высокого
                спектрального и пространственного разрешения, что позволяет
                детальнеее отслеживать состояние посевов.
              </p>
            </div>
          </div>

          <div className="App-Page-Block-5-SubBlock-2">
            <div className="App-Page-Block-5-Blur">
              <h2>Комплексный подход</h2>
              <p>
                Мы объединяем данные дистанционного зондирования Земли (ДЗЗ) с
                реальными агрохимическими характеристиками почв конкретного
                хозяйства.
              </p>
            </div>
          </div>

          <div className="App-Page-Block-5-SubBlock-3">
            <div className="App-Page-Block-5-Blur">
              <h2>Совместимость</h2>
              <p>
                Результаты экспортируются в виде цифровых карт, полностью
                совместимых с современными системами точного земледелия для
                дифференцированного внесения.
              </p>
            </div>
          </div>

          <div className="App-Page-Block-5-SubBlock-4">
            <div className="App-Page-Block-5-Blur">
              <h2>Автоматизация через ML и LLM</h2>
              <p>
                Использоваание современных алгоритмов машинного обучения и
                кластерного анализа позволяет выделять агрозоны автоматически,
                без необходимости ручной настройки агрономом.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="App-Page-Block-6">
        <h2 className="App-Page-Block-6-Header">Для кого</h2>
        <div className="App-Page-Block-6-Cards-Container">
          <div className="App-Page-Block-6-SubBlock">
            <div className="App-Page-Block-6-Icon-Wrapper">
              <Image
                className="App-Page-Truck-Picture"
                src="/app-page/Truck.svg"
                alt="Truck picture"
                width={100}
                height={100}
                priority
              />
            </div>

            <p className="App-Page-Block-6-SubHeader">Перерасход ресурсов</p>
            <p className="App-Page-Block-6-SubText">
              Усреднённые нормы приводят к переизбытку удобрений на одних
              участках и нехватке на других
            </p>
          </div>

          <div className="App-Page-Block-6-SubBlock">
            <div className="App-Page-Block-6-Icon-Wrapper">
              <Image
                className="App-Page-Bank-Picture"
                src="/app-page/Bank.svg"
                alt="Bank picture"
                width={100}
                height={100}
                priority
              />
            </div>

            <p className="App-Page-Block-6-SubHeader">Снижение урожайности</p>
            <p className="App-Page-Block-6-SubText">
              Неравномерное удобрение растений снижает общую продуктивность поля
            </p>
          </div>

          <div className="App-Page-Block-6-SubBlock">
            <div className="App-Page-Block-6-Icon-Wrapper">
              <Image
                className="App-Page-Atom-Picture"
                src="/app-page/Atom.svg"
                alt="Atom picture"
                width={100}
                height={100}
                priority
              />
            </div>
            <p className="App-Page-Block-6-SubHeader">Экологический вред</p>
            <p className="App-Page-Block-6-SubText">
              Избыток удобрений загрязняет близлежащие почву и водоемы
            </p>
          </div>
        </div>
      </div>

      <div className="App-Page-Block-7">
        <h2 className="App-Page-Block-7-Header">Поддержка</h2>

        <div className="App-Page-Block-7-Content">
          <div className="App-Page-Block-7-Images">
            <Image
              className="App-Page-Fasie-Picture"
              src="/app-page/Fasie.png"
              alt="Fasie logo"
              width={500} // Уменьшил базовое значение для корректного масштабирования
              height={150}
              priority
            />
            <Image
              className="App-Page-Platform-Picture"
              src="/app-page/Platform.png"
              alt="Platform Logo"
              width={500}
              height={150}
              priority
            />
          </div>

          <div className="App-Page-Block-7-Text">
            <p>
              Проект реализован при поддержке Фонда содействия инновациям в
              рамках программы «Студенческий стартап» мероприятия «Платформа
              университетского технологического предпринимательства»
              федерального проекта «Платформа»
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
