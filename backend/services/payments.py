import os
import uuid
from yookassa import Configuration, Payment as YKPayment
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

Configuration.account_id = os.getenv("YOOKASSA_SHOP_ID")
Configuration.secret_key = os.getenv("YOOKASSA_SECRET_KEY")

TARIFF_PRICES = {
    "standard": {"amount": 1500.00, "max_area": 100},
    "pro": {"amount": 4500.00, "max_area": 500},
}


def create_payment(user_id: int, tariff: str, return_url: str):
    if tariff not in TARIFF_PRICES:
        raise ValueError("Неизвестный тариф")

    amount = TARIFF_PRICES[tariff]["amount"]
    idempotence_key = str(uuid.uuid4())

    payment = YKPayment.create({
        "amount": {"value": f"{amount:.2f}", "currency": "RUB"},
        "confirmation": {
            "type": "redirect",
            "return_url": return_url,
        },
        "capture": True,
        "description": f"Подписка «{tariff}» — ClusterLab",
        "metadata": {"user_id": str(user_id), "tariff": tariff},
    }, idempotence_key)

    return payment