import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/(auth)/components/footer.css";

export default function Footer() {
  return (
    <footer className="Footer-footer">
      <div className="Footer-Content">
        {/* Блок с логотипом и названием */}
        <div className="Footer-Logo">
          <Image
            className="Footer-LogoImg"
            src="/footer/Logo-Transparent.svg"
            alt="ClusterLab Logo"
            width={50}
            height={100}
            priority
          />
          <Link href="/">
            <p className="Footer-LogoText">ClusterLab</p>
          </Link>
        </div>

        {/* Навигация и юридические документы */}
        <nav className="Footer-Pages">
          <Link href="/privacy">
            <p>Согласие на обработку персональных данных</p>
          </Link>
          <Link href="/offer">
            <p>Договор оферты</p>
          </Link>
        </nav>

        {/* Контактная информация */}
        <div className="Footer-Contacts">
          <p className="Footer-Title">Контакты</p>
          <p>
            Телефон: <a href="tel:+79000000000">+7 (900) 000-00-00</a>
          </p>
          <p>
            E-mail: <a href="mailto:support@clusterlab.ru">support@clusterlab.ru</a>
          </p>
          <p>Адрес: г. Краснодар, ул. Красная, д. 10</p>
        </div>

        {/* Реквизиты компании */}
        <div className="Footer-Requisites">
          <p className="Footer-Title">Реквизиты</p>
          <p>ООО «КластерЛаб»</p>
          <p>ИНН: 2310000000</p>
          <p>ОГРН: 1232300000000</p>
        </div>
      </div>

      {/* Копирайт внизу футера */}
      <div className="Footer-Bottom">
        <p>© {new Date().getFullYear()} ClusterLab. Все права защищены.</p>
      </div>
    </footer>
  );
}
