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
        </div>

        {/* Колонка 2: Документы */}
        <div className="Footer-Col">
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
            <p><a href="mailto:clusterlab@yandex.ru">clusterlab.ru@gmail.com</a></p>
            <p>198334, СПб, Добровольцев ул., д. 44, Лит. А, пом. 3-Н, офис 11-2</p>
          </div>
        </div>

        {/* Колонка 4: Реквизиты */}
        <div className="Footer-Col">
          <p className="Footer-Title">Реквизиты</p>
          <div className="Footer-Info">
            <p>ООО «КластерЛаб»</p>
            <p>ИНН: 7807402857</p>
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