# app/app.py
from flask import Flask, request, jsonify

from database import get_db_connection

app = Flask(__name__)

@app.route('/')
def home():
    return '<h1>Hello Indestructible five!</h1>'

@app.route('/members')
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route('/search_acronym')
def search_acronym():
    # Get the acronym to search from query parameters 
    # COMMENTED OUT FOR TESTING (WHILE NOT HAVING ANY PARAMETERS)
    #acronym = request.args.get('acronym')
    
    # Validate input
    #if not acronym:
    #    return jsonify({"error": "Acronym parameter is required"}), 400
    
    # Get a database connection
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Query the database for the acronym
        query = "SELECT id, acronym, meaning FROM acronyms WHERE acronym = 'VDC'"
        cursor.execute(query)
        #cursor.execute(query, (acronym,))
        # TODO: Switch to fetchall(), 'result' becomes a list 
        result = cursor.fetchone()

        # Check if acronym is found
        if result:
            # Format the result into a dictionary
            #acronym_data = {
            #    "id": result[0],
            #    "acronym": result[1],
            #    "meaning": result[2]
            #}
            return result
            #return jsonify(acronym_data), 200

        else:
            return jsonify({"message": "Acronym not found"}), 404
    finally:
        cursor.close()
        conn.close()
