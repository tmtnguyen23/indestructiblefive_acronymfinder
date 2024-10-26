import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{os.getenv('MYSQL_USER')}:{os.getenv('MYSQL_PASSWORD')}"
    f"@db:3306/{os.getenv('MYSQL_DATABASE')}"
)
SQLALCHEMY_TRACK_MODIFICATIONS = False