"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import "@/app/ui/profile.css";

interface Field {
  id: number;
  area: number;
  culture: string;
  status: string;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function FieldsPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFields = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/fields/my_fields`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const sorted = [...data].sort((a: Field, b: Field) => b.id - a.id);
        setFields(sorted);
      } else {
        console.error("Ошибка загрузки полей, статус:", response.status);
      }
    } catch (error) {
      console.error("Ошибка загрузки полей:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  // Поллинг: пока есть поля не в финальном статусе — проверяем каждые 5 секунд
  useEffect(() => {
    const hasProcessing = fields.some(
      (f) => f.status !== "Готово" && f.status !== "Ошибка"
    );
    if (!hasProcessing) return;

    const interval = setInterval(fetchFields, 5000);
    return () => clearInterval(interval);
  }, [fields, fetchFields]);

  if (loading) return <p>Загрузка полей...</p>;

  return (
    <main className="Fields-Background">
      <h2 className="Fields-Header">Мои поля</h2>

      <div className="Fields-Cards-Container">
        {fields.length > 0 ? (
          fields.map((field) => <FieldCard key={field.id} field={field} />)
        ) : (
          <p>
            У вас пока нет полей для анализа. Создайте первое в разделе "Новое
            поле"!
          </p>
        )}
      </div>
    </main>
  );
}

function FieldCard({ field }: { field: Field }) {
  const isReady = field.status === "Готово";
  const isError = field.status === "Ошибка";

  const cardContent = (
    <div className={`Field-Card ${isReady ? "Field-Card--clickable" : ""}`}>
      <div className="Field-Card-Top">
        <span className="Field-Name">Поле #{field.id}</span>
        <span className="Field-Date">
          {field.created_at
            ? new Date(field.created_at).toLocaleDateString("ru-RU")
            : "Дата не указана"}
        </span>
      </div>

      <div className="Field-Card-Info">
        <div className="Info-Item">
          <img src="/dashboard/area.svg" alt="Площадь:" />
          <span>{field.area} га</span>
        </div>
        <div className="Info-Item">
          <img src="/dashboard/leaf.svg" alt="Культура:" />
          <span>{field.culture}</span>
        </div>
        <div className="Info-Item">
          <span
            className={`Status-Dot ${
              isReady ? "status-green" : isError ? "status-red" : "status-orange"
            }`}
          ></span>
          <span>{field.status}</span>
        </div>
      </div>
    </div>
  );

  return isReady ? (
    <Link href={`/fields/${field.id}`}>{cardContent}</Link>
  ) : (
    cardContent
  );
}