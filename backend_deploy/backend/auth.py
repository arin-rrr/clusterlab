from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
import jwt
from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import bcrypt
import os
import resend
import smtplib
from email.mime.text import MIMEText

from backend.models.users import User as UserModel
from backend.config import SECRET_KEY, ALGORITHM
from backend.db_depends import get_async_db
import random
import string

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  # объект, хэширующий пароль

ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='users/token')

resend.api_key = os.environ.get("RESEND_API_KEY")


def hash_password(password: str) -> str:
    # Превращаем строку в байты
    pwd_bytes = password.encode('utf-8')
    # Генерируем соль
    salt = bcrypt.gensalt()
    # Хешируем
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    # Возвращаем обратно как строку для базы данных
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode('utf-8'),
        hashed_password.encode('utf-8')
    )


def create_access_token(data: dict):
    '''
    creating JWT
    '''

    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({
        'exp': expire, 'token_type': 'refresh'
    })
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_scheme),
                           db: AsyncSession = Depends(get_async_db)):
    """
    Проверяет JWT и возвращает пользователя из базы.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError:
        raise credentials_exception
    result = await db.scalars(
        select(UserModel).where(UserModel.email == email))
    user = result.first()
    if user is None:
        raise credentials_exception
    return user


def generate_verification_code() -> str:
    return "".join(random.choices(string.digits, k=6))


def send_verification_email(to_email: str, code: str):
    try:
        resend.Emails.send({
            "from": "ClusterLab <onboarding@clusterlab.site>",
            "to": [to_email],
            "subject": "Подтверждение регистрации в ClusterLab",
            "html": f"<strong>Ваш код подтверждения: {code}</strong><p>Код действителен 15 минут.</p>",
        })
    except Exception as e:
        print(f"Failed to send verification email to {to_email}: {e}")

# from passlib.context import CryptContext
# from fastapi.security import OAuth2PasswordBearer
# from datetime import datetime, timedelta, timezone
# import jwt
# from fastapi import Depends, HTTPException, status
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import select
# import bcrypt
# import os
#
# from backend.models.users import User as UserModel
# from backend.config import SECRET_KEY, ALGORITHM
# from backend.db_depends import get_async_db
# import smtplib
# from email.mime.text import MIMEText
# import random
# import string
#
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  # объект, хэширующий пароль
#
# ACCESS_TOKEN_EXPIRE_MINUTES = 30
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl='users/token')
#
#
# def hash_password(password: str) -> str:
#     # Превращаем строку в байты
#     pwd_bytes = password.encode('utf-8')
#     # Генерируем соль
#     salt = bcrypt.gensalt()
#     # Хешируем
#     hashed = bcrypt.hashpw(pwd_bytes, salt)
#     # Возвращаем обратно как строку для базы данных
#     return hashed.decode('utf-8')
#
#
# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return bcrypt.checkpw(
#         plain_password.encode('utf-8'),
#         hashed_password.encode('utf-8')
#     )
#
#
# def create_access_token(data: dict):
#     '''
#     creating JWT
#     '''
#
#     to_encode = data.copy()
#     expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({
#         'exp': expire, 'token_type': 'refresh'
#     })
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#
#
# async def get_current_user(token: str = Depends(oauth2_scheme),
#                            db: AsyncSession = Depends(get_async_db)):
#     """
#     Проверяет JWT и возвращает пользователя из базы.
#     """
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         email: str = payload.get("sub")
#         if email is None:
#             raise credentials_exception
#     except jwt.ExpiredSignatureError:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Token has expired",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     except jwt.PyJWTError:
#         raise credentials_exception
#     result = await db.scalars(
#         select(UserModel).where(UserModel.email == email))
#     user = result.first()
#     if user is None:
#         raise credentials_exception
#     return user
#
#
# def generate_verification_code() -> str:
#     return "".join(random.choices(string.digits, k=6))
#
# def send_verification_email(to_email: str, code: str):
#     sender = os.getenv("SMTP_EMAIL")
#     password = os.getenv("SMTP_PASSWORD")
#
#     msg = MIMEText(f"Ваш код подтверждения: {code}\n\nКод действителен 15 минут.")
#     msg["Subject"] = "Подтверждение регистрации в ClusterLab"
#     msg["From"] = sender
#     msg["To"] = to_email
#
#     with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
#         server.login(sender, password)
#         server.sendmail(sender, [to_email], msg.as_string())