import React from "react";
import "@/app/(auth)/components/footer.css";

export default function Footer() {
  return (
    <footer className="AuthFooter">
      <nav className="AuthFooter-Links">
        <a href="/documents/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="Footer-topLink">
          Политика обработки персональных данных
        </a>
        <a href="/documents/oferta.pdf" target="_blank" rel="noopener noreferrer" className="Footer-topLink">
          Публичная оферта
        </a>
      </nav>
      <a href="mailto:clusterlab.ru@gmail.com" className="AuthFooter-Mail">
        clusterlab.ru@gmail.com
      </a>
    </footer>
  );
}
