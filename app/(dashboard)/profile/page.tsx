"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/app/ui/profile.css"; // Создадим этот файл рядом

interface UserData {
  name: string;
  tier: string;
  expireDate: string;
  usedHectares: number;
  totalHectares: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null); // Изначально данных нет
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.push("/sign_in");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8000/users/personal_info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // Если токен протух (401), отправляем на вход
          localStorage.removeItem("access_token");
          router.push("/sign_in");
        }
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) return <p>Загрузка профиля...</p>;
  if (!userData) return null;

  const usagePercentage =
    (userData.usedHectares / userData.totalHectares) * 100;
  const isHighUsage = usagePercentage >= 80;

  return (
    <main className="profile-container">
      <div className="profile-header">
        <h1 className="profile-welcome">Добро пожаловать, {userData.name}!</h1>
        <p className="profile-info">
          Тариф: <span className="highlight">{userData.tier}</span>
        </p>
        <p className="profile-info">
          Действителен до:{" "}
          <span className="highlight">{userData.expireDate}</span>
        </p>
      </div>

      <div className="usage-section">
        <div className="progress-container">
          <div className="progress-labels">
            <span>Использовано площади</span>
            <span>
              {userData.usedHectares.toFixed(1)} / {userData.totalHectares} га
            </span>
          </div>

          <div className="progress-bar-bg">
            <div
              className={`progress-bar-fill ${isHighUsage ? "high-usage" : "normal-usage"}`}
              style={{ width: `${usagePercentage}%` }}
            >
              <span className="percent-text">
                {usagePercentage.toFixed(0)}%
              </span>
            </div>
          </div>

          <p className="usage-hint">
            {isHighUsage
              ? "Внимание: более 80% лимита использовано"
              : "Доступно для анализа достаточно места"}
          </p>
        </div>
      </div>
    </main>
  );
}
