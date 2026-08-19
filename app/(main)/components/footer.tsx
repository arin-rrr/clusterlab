import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/(auth)/components/footer.css";

export default function Footer() {
  return (
    <footer className="Footer-footer">
      <div className="Footer-Content">

        {/* Колонка 1: Логотип и краткое описание */}
        <div className="Footer-Col Footer-Col-Logo">
          <div className="Footer-Logo">
            <Image
              className="Footer-LogoImg"
              src="/footer/Logo-Transparent.svg"
              alt="ClusterLab Logo"
              width={40}
              height={40}
              priority
            />
            <Link href="/">
              <span className="Footer-LogoText">ClusterLab</span>
            </Link>
          </div>
          <p className="Footer-Subtext">
            Платформа спутникового мониторинга и кластеризации полей.
          </p>
        </div>

        {/* Колонка 2: Документы */}
        <div className="Footer-Col">
          <p className="Footer-Title">Документы</p>
          <nav className="Footer-Links">
            <Link href="/privacy">
              <p>Согласие на обработку данных</p>
            </Link>
            <Link href="/offer">
              <p>Договор оферты</p>
            </Link>
          </nav>
        </div>

        {/* Колонка 3: Контакты */}
        <div className="Footer-Col">
          <p className="Footer-Title">Контакты</p>
          <div className="Footer-Info">
            <p><a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
            <p><a href="mailto:support@clusterlab.ru">support@clusterlab.ru</a></p>
            <p>г. Краснодар, ул. Красная, д. 10</p>
          </div>
        </div>

        {/* Колонка 4: Реквизиты */}
        <div className="Footer-Col">
          <p className="Footer-Title">Реквизиты</p>
          <div className="Footer-Info">
            <p>ООО «КластерЛаб»</p>
            <p>ИНН: 2310000000</p>
            <p>ОГРН: 1232300000000</p>
          </div>
        </div>

      </div>

      {/* Нижняя плашка */}
      <div className="Footer-Bottom">
        <p>© {new Date().getFullYear()} ClusterLab. Все права защищены.</p>
      </div>
    </footer>
  );
}