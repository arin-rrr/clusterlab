import os
import uuid
from yookassa import Configuration, Payment as YKPayment

Configuration.account_id = os.getenv("YOOKASSA_SHOP_ID")
Configuration.secret_key = os.getenv("YOOKASSA_SECRET_KEY")

TARIFF_PRICES = {
    "standard": {"amount": 1500.00, "max_area": 100},
    "pro": {"amount": 4500.00, "max_area": 500},
}


def create_payment(user_id: int, tariff: str):
    if tariff not in TARIFF_PRICES:
        raise ValueError("Неизвестный тариф")

    amount = TARIFF_PRICES[tariff]["amount"]
    frontend_url = os.getenv("FRONTEND_URL", "https://clusterlab.site")

    payment = YKPayment.create({
        "amount": {
            "value": f"{amount:.2f}",
            "currency": "RUB"
        },
        "confirmation": {
            "type": "redirect",
            "return_url": f"{frontend_url}/profile"
        },
        "capture": True,
        "description": f"Подписка «{tariff}» — ClusterLab",
        "metadata": {"user_id": str(user_id), "tariff": tariff},
    }, str(uuid.uuid4()))  # ключ идемпотентности — случайное значение, как в инструкции

    return payment