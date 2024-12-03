from unittest.mock import MagicMock

def test_home(client):
    """Test the home route."""
    response = client.get('/')
    assert response.status_code == 200
    assert b'Hello Indestructible five!' in response.data


def test_search_acronym_valid(client, mock_db):
    """Test search_acronym with valid input."""
    mock_db.fetchall.return_value = [{'meaning': 'First National Bank Omaha'}]
    response = client.get('/search_acronym?acronym=FNBO')
    assert response.status_code == 200
    assert response.json == {'result': ['First National Bank Omaha']}


def test_search_acronym_invalid(client, mock_db):
    """Test search_acronym with an acronym not in the database."""
    mock_db.fetchall.return_value = []
    response = client.get('/search_acronym?acronym=XYZ')
    assert response.status_code == 404
    assert response.json == {'message': 'Acronym not found'}


def test_search_acronym_no_input(client):
    """Test search_acronym with no input."""
    response = client.get('/search_acronym')
    assert response.status_code == 400
    assert response.json == {'error': 'Please enter the acronym'}


def test_random_acronym(client, mock_db):
    """Test random_acronym route."""
    mock_db.fetchone.return_value = {'acronym': 'FNBO', 'meaning': 'First National Bank Omaha'}
    response = client.get('/random_acronym')
    assert response.status_code == 200
    assert response.json == {'result': 'FNBO - First National Bank Omaha'}


def test_random_acronym_empty(client, mock_db):
    """Test random_acronym when no results are returned."""
    mock_db.fetchone.return_value = None
    response = client.get('/random_acronym')
    assert response.status_code == 404
    assert response.json == {'result': None}


def test_count(client, mock_redis):
    """Test count route."""
    # Mock the incr method of redis
    mock_redis.incr = MagicMock(return_value=42)

    # Call the /count route
    response = client.get('/count')

    # Validate the response
    assert response.status_code == 200
    assert response.json['message'] == 'You are Visitor number: 42'