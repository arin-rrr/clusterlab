import React from "react";
import "@/app/(main)/components/auth-footer.css";

export default function Footer() {
  return (
    <footer className="AuthFooter">
      <nav className="AuthFooter-Links">
        <a href="/privacy">Согласие на обработку персональных данных</a>
        <a href="/offer">Договор оферты</a>
      </nav>
      <a href="mailto:clusterlab.ru@gmail.com" className="AuthFooter-Mail">
        clusterlab.ru@gmail.com
      </a>
    </footer>
  );
}
