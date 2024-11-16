# app/app.py
from flask import Flask, request, jsonify
from random import randrange
from database import get_db_connection

app = Flask(__name__)

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

