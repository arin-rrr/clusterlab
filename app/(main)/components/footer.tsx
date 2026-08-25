"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="Footer-root">
      {/* Строка 1 */}
      <div className="Footer-topRow">
        <div className="Footer-brand">
          <Link href="/" className="Footer-logoLink">
            <span className="Footer-logoText">ClusterLab</span>
          </Link>
        </div>

        <span className="Footer-separator">|</span>

        <a
          href="mailto:clusterlab.ru@gmail.com"
          className="Footer-topLink Footer-topLink--email"
        >
          clusterlab.ru@gmail.com
        </a>

        <span className="Footer-separator">|</span>

        <a href="/documents/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="Footer-topLink">
          Политика обработки персональных данных
        </a>

        <span className="Footer-separator">|</span>

        <a href="/documents/oferta.pdf" target="_blank" rel="noopener noreferrer" className="Footer-topLink">
          Публичная оферта
        </a>
      </div>

      {/* Строка 2 */}
      <div className="Footer-middleRow">
        <div className="Footer-col">
          <h4 className="Footer-heading">Юридический адрес</h4>
          <div className="Footer-list">
            <div className="Footer-item">
              <span className="Footer-icon">🏢</span>
              <span>ООО «Кластерлаб»</span>
            </div>
            <div className="Footer-item">
              <span className="Footer-icon">📍</span>
              <span>198334, г. Санкт-Петербург, ул. Добровольцев, д. 44 литера А, помещ. 3-н офис 11-2 </span>
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
              <span>ОГРН: 1257800099006</span>
            </div>
          </div>
        </div>
      </div>

      {/* Строка 3 */}
      <div className="Footer-bottomRow">
        <p className="Footer-copyright">
          © {new Date().getFullYear()} ClusterLab. Все права защищены.
        </p>
      </div>
    </footer>
  );
}