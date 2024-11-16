import pymysql
from flask import current_app

# This file sets up the connection to the mysql database 

def get_db_connection():
    connection = pymysql.connect(
        host='db',  # Name of your MySQL container service
        user='myuser',
        password='mypassword',
        db='mydatabase',
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection