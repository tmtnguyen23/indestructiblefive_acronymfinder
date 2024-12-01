import pytest
from app import app
from database import get_db_connection
import redis
from unittest.mock import patch

@pytest.fixture
def client():
    """Fixture for test client."""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture
def mock_redis():
    """Mock Redis connection."""
    with patch('app.client', redis.Redis(host='localhost', port=6379, decode_responses=True)) as mock_client:
        yield mock_client

@pytest.fixture
def mock_db():
    """Mock database connection."""
    with patch('app.get_db_connection') as mock_conn:
        mock_cursor = mock_conn.return_value.cursor.return_value
        yield mock_cursor
