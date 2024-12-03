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

@app.route('/add_acronym')
def add_acronym():
    """
    This function adds the user-suggested acronym to the database.
    """
    #TODO: HOW THE 'SUGGEST ACRONYM' PAGE LOOKS LIKE? 
    word = request.args.get('suggestion')
    meaning = request.args.get('meaning')
    
    # Get a database connection
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Query the database for the acronym
        query = "SELECT id, acronym, meaning FROM acronyms WHERE acronym = %s"
        iquery = "INSERT INTO acronyms (acronym, meaning) VALUES (%s, %s)"
        cursor.execute(query, (word,))

        results = cursor.fetchall()

        # Check if acronym is found
        if len(results) > 0:
            for result in results: 
                if word == result[1] and meaning == result[2]:
                    return jsonify({'message': 'Acronym already exists'}), 200
                else: 
                    cursor.execute(iquery, (word, meaning))
                    return jsonify({"message": "Added acronym to the database"}), 200
        else:
            return jsonify({"message": "Added acronym to the database"}), 200
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
    finally:
        cursor.close()
        conn.close()

@app.route('/top_searched_acronyms', methods=['GET'])
def top_searched_acronyms():
    """
    Retrieves the top 5 most searched acronyms along with their meanings.
    """
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = """
        SELECT fs.acronym, fs.freq, a.meaning
        FROM frequent_search fs
        LEFT JOIN acronyms a ON fs.acronym = a.acronym
        ORDER BY fs.freq DESC
        LIMIT 5
        """
        cursor.execute(query)
        results = cursor.fetchall()

        if results:
            return jsonify({'top_searched_acronyms': results}), 200
        else:
            return jsonify({'message': 'No searched acronyms found.'}), 404
    except Exception as e:
        print(f"Error retrieving top searched acronyms: {e}")
        return jsonify({'error': f"Internal Server Error: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

def process_freq(acronym):
    """
    Updates the frequency of the searched acronym in the database.
    If the acronym doesn't exist in the frequent_search table, it inserts it with freq = 1.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = """
        INSERT INTO frequent_search (acronym, freq)
        VALUES (%s, 1)
        ON DUPLICATE KEY UPDATE freq = freq + 1;
        """
        cursor.execute(query, (acronym,))
        conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"Error updating frequency for {acronym}: {e}")
    finally:
        cursor.close()
        conn.close()

# Route 1 - displays visitor count and increments
@app.route('/count')
def count():
    count = client.incr('visitor_count')
    message_str = f'You are Visitor number: {count}'
    return jsonify({'message' : message_str})