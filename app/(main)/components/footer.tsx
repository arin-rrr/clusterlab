import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/(auth)/components/footer.css";

export default function Footer() {
  return (
    <footer className="Footer-footer">
      {/* === Строка 1: Лого + название, почта, документы === */}
      <div className="Footer-TopRow">
        <div className="Footer-LogoWrap">
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

        <a
          href="mailto:clusterlab.ru@gmail.com"
          className="Footer-TopLink Footer-TopLink--email"
        >
          clusterlab.ru@gmail.com
        </a>

        <Link href="/privacy" className="Footer-TopLink">
          Согласие на обработку данных
        </Link>

        <Link href="/offer" className="Footer-TopLink">
          Договор оферты
        </Link>
      </div>

      {/* === Строка 2: Юр. адрес | Реквизиты === */}
      <div className="Footer-BottomRow">
        <div className="Footer-BottomCol">
          <h4 className="Footer-Title">Юридический адрес</h4>
          <div className="Footer-Requisites">
            <div className="Footer-ContactItem">
              <span className="Footer-Icon">🏢</span>
              <span>ООО «КластерЛаб»</span>
            </div>
            <div className="Footer-ContactItem">
              <span className="Footer-Icon">📍</span>
              <span>Санкт-Петербург, ул. Добровольцев, д. 44</span>
            </div>
          </div>
        </div>

        <div className="Footer-BottomCol">
          <h4 className="Footer-Title">Реквизиты</h4>
          <div className="Footer-Requisites">
            <div className="Footer-ContactItem">
              <span className="Footer-Icon">📋</span>
              <span>ИНН: 7807402857</span>
            </div>
            <div className="Footer-ContactItem">
              <span className="Footer-Icon">📋</span>
              <span>ОГРН: 1187847123456</span>
            </div>
          </div>
        </div>
      </div>

      {/* === Нижняя плашка === */}
      <div className="Footer-Bottom">
        <p>© {new Date().getFullYear()} ClusterLab. Все права защищены.</p>
      </div>
    </footer>
  );
}