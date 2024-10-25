from flask import Flask, jsonify
app = Flask(__name__)

# Root endpoint
@app.route('/')
def home():
    return '<h1>Hello Indestructible five!</h1>'

@app.route('/greet/<string:name>', methods=['GET'])
def greet(name):
    return jsonify(message=f"Hello, {name}!")

if __name__ == '__main__':
    app.run(debug=True)  # Ensure it's set to run on port 5000
