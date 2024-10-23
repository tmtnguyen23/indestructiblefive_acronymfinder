from flask import Flask

app = Flask(__name__)

# Root endpoint
@app.route('/')
def home():
    return '<h1>Hello Indestructible five!</h1>'

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Ensure it's set to run on port 5000
