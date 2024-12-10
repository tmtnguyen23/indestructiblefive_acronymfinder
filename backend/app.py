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
    cursor_query = conn.cursor()
    
    try:
        # Query the database for the acronym
        query = f"SELECT meaning FROM acronyms WHERE acronym = %s"
        cursor_query.execute(query, (acronym,))
        results = cursor_query.fetchall()

        result_list = []
        for i in range(len(results)):
            result = results[i] 
            result_list.append(result["meaning"])

        # Check if acronym is found
        if len(result_list) > 0:
            process_freq(acronym)
            return jsonify({'result': result_list}), 200
        else:
            return jsonify({"message": "Acronym not found"}), 404
    finally:
        cursor_query.close()
        conn.close()

@app.route('/top_searched_acronyms', methods=['GET'])
def top_searched_acronyms():
    """
    Retrieves the top 5 most searched acronyms along with their meanings.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # First set the group_concat_max_len to a larger value
        cursor.execute("SET SESSION group_concat_max_len = 1000000;")
        
        query = """
            SELECT f.acronym, f.freq, GROUP_CONCAT(DISTINCT a.meaning SEPARATOR '|||') as meanings
            FROM frequent_search f
            INNER JOIN acronyms a ON f.acronym = a.acronym
            GROUP BY f.acronym, f.freq
            ORDER BY f.freq DESC, f.acronym ASC
            LIMIT 5
        """
        cursor.execute(query)
        results = cursor.fetchall()

        if results:
            formatted_results = [{
                'acronym': row['acronym'],
                'freq': row['freq'],
                'meanings': row['meanings'].split('|||') if row['meanings'] else []
            } for row in results]
            return jsonify({'top_searched_acronyms': formatted_results}), 200
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
        # First check if the acronym exists
        check_query = "SELECT freq FROM frequent_search WHERE acronym = %s"
        cursor.execute(check_query, (acronym,))
        result = cursor.fetchone()

        if result:
            # Update existing record
            update_query = "UPDATE frequent_search SET freq = freq + 1 WHERE acronym = %s"
            cursor.execute(update_query, (acronym,))
        else:
            # Insert new record
            insert_query = "INSERT INTO frequent_search (acronym, freq) VALUES (%s, 1)"
            cursor.execute(insert_query, (acronym,))

        conn.commit()  # Ensure the transaction is committed
    except Exception as e:
        conn.rollback()  # Rollback in case of error
        print(f"Error processing frequency: {e}")
        raise e  # Re-raise the exception for debugging
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
    message_str = f'Page Visits: {count}'
    return jsonify({'message' : message_str})