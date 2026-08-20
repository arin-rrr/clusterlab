import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="Footer-root">
      {/* === Строка 1: Лого, почта, документы === */}
      <div className="Footer-row Footer-row--top">
        <div className="Footer-brand">
          <Image
            className="Footer-logoImg"
            src="/footer/Logo-Transparent.svg"
            alt="ClusterLab Logo"
            width={44}
            height={44}
            priority
          />
          <Link href="/" className="Footer-logoLink">
            <span className="Footer-logoText">ClusterLab</span>
          </Link>
        </div>

        <a
          href="mailto:clusterlab.ru@gmail.com"
          className="Footer-topLink Footer-topLink--email"
        >
          clusterlab.ru@gmail.com
        </a>

        <Link href="/privacy" className="Footer-topLink">
          Согласие на обработку данных
        </Link>

        <Link href="/offer" className="Footer-topLink">
          Договор оферты
        </Link>
      </div>

      {/* === Строка 2: Юр. адрес | Реквизиты === */}
      <div className="Footer-row Footer-row--middle">
        <div className="Footer-col">
          <h4 className="Footer-heading">Юридический адрес</h4>
          <div className="Footer-list">
            <div className="Footer-item">
              <span className="Footer-icon">🏢</span>
              <span>ООО «КластерЛаб»</span>
            </div>
            <div className="Footer-item">
              <span className="Footer-icon">📍</span>
              <span>Санкт-Петербург, ул. Добровольцев, д. 44</span>
            </div>
          </div>
        </div>

        <div className="Footer-col">
          <h4 className="Footer-heading">Реквизиты</h4>
          <div className="Footer-list">
            <div className="Footer-item">
              <span className="Footer-icon">📋</span>
              <span>ИНН: 7807402857</span>
            </div>
            <div className="Footer-item">
              <span className="Footer-icon">📋</span>
              <span>ОГРН: 1187847123456</span>
            </div>
          </div>
        </div>
      </div>

      {/* === Строка 3: Нижняя плашка === */}
      <div className="Footer-row Footer-row--bottom">
        <p className="Footer-copyright">
          © {new Date().getFullYear()} ClusterLab. Все права защищены.
        </p>
      </div>
    </footer>
  );
}