import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/(auth)/components/footer.css";

export default function Footer() {
  return (
    <footer className="Footer-footer">
      <div className="Footer-Content">
        {/* Колонка 1: Логотип + описание */}
        <div className="Footer-Col Footer-Col-Logo">
          <div className="Footer-Logo">
            <Image
              className="Footer-LogoImg"
              src="/footer/Logo-Transparent.svg"
              alt="ClusterLab Logo"
              width={60}
              height={60}
              priority
            />
            <Link href="/">
              <span className="Footer-LogoText">ClusterLab</span>
            </Link>
          </div>
          <p className="Footer-Description">
            Платформа для точного земледелия
            <br />
            на основе спутниковых данных
          </p>
        </div>

        {/* Колонка 2: Документы */}
        <div className="Footer-Col">
          <h4 className="Footer-Title">Документы</h4>
          <nav className="Footer-Links">
            <Link href="/privacy">
              <span>Согласие на обработку данных</span>
            </Link>
            <Link href="/offer">
              <span>Договор оферты</span>
            </Link>
          </nav>
        </div>

        {/* Колонка 3: Контакты */}
        <div className="Footer-Col">
          <h4 className="Footer-Title">Контакты</h4>
          <div className="Footer-Contacts">
            <a href="mailto:clusterlab.ru@gmail.com" className="Footer-ContactItem">
              <span className="Footer-Icon">✉</span>
              <span>clusterlab.ru@gmail.com</span>
            </a>
            <div className="Footer-ContactItem">
              <span className="Footer-Icon">📍</span>
              <span>Санкт-Петербург, ул. Добровольцев, д. 44</span>
            </div>
          </div>
        </div>

        {/* Колонка 4: Реквизиты */}
        <div className="Footer-Col">
          <h4 className="Footer-Title">Реквизиты</h4>
          <div className="Footer-Requisites">
            <div className="Footer-ContactItem">
              <span className="Footer-Icon">🏢</span>
              <span>ООО «КластерЛаб»</span>
            </div>
            <div className="Footer-ContactItem">
              <span className="Footer-Icon">📋</span>
              <span>ИНН: 7807402857</span>
            </div>
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