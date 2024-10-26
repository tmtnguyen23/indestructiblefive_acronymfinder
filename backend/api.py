from flask import Flask, jsonify
app = Flask(__name__)

# Root endpoint
@app.route('/')
def home():
    return '<h1>Hello Indestructible five!</h1>'

@app.route('/members')
def members():
    return {"members": ["Member1", "Member2", "Member3"]}
