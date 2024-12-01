# app/app.py
from flask import Flask, request, jsonify
import redis
from database import get_db_connection

app = Flask(__name__)

#connect to redis
client = redis.Redis(host='redis', port=6379)

@app.route('/')
def home():
    return '<h1>Hello Indestructible five!</h1>'

@app.route('/search_acronym')
def search_acronym():
    """
    This function looks up acronym (search box) and displays its meaning to the user.
    """
    acronym = request.args.get('acronym')

    if not acronym:
        return jsonify({"error": "Please enter the acronym"}), 400
    
    # Get a database connection
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Query the database for the acronym
        query = f"SELECT meaning FROM acronyms WHERE acronym = %s"
        cursor.execute(query, (acronym,))
        results = cursor.fetchall()

        result_list = []
        for i in range(len(results)):
            result = results[i] 
            result_list.append(result["meaning"])

        # Check if acronym is found
        if len(result_list) > 0:
            return jsonify({'result': result_list}), 200
        else:
            return jsonify({"message": "Acronym not found"}), 404
    finally:
        cursor.close()
        conn.close()

@app.route('/random_acronym')
def random_acronym():
    """
    This function picks up an entry from the database and displays it for the random acronym button. 
    """
    # Get a database connection
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Random query from the table acronyms 

        query = f"SELECT acronym, meaning FROM acronyms ORDER BY RAND() LIMIT 1"
        cursor.execute(query)
        result = cursor.fetchone()

        if result:
            result_str = ""
            acronym, meaning = result["acronym"], result["meaning"] 
            result_str = acronym + " - " + meaning 
            return jsonify({'result': result_str}), 200
        else: 
            return jsonify({'result': None}), 404
    finally:
        cursor.close()
        conn.close()

# Route 1 - displays visitor count and increments
@app.route('/count')
def count():
    count = client.incr('visitor_count')
    message_str = f'You are Visitor number: {count}'
    return jsonify({'message' : message_str})