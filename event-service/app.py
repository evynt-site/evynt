from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from dotenv import load_dotenv
from flask_cors import CORS

import os

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Database Configuration
# Access environment variables
db_user = os.environ.get("MYSQL_USER")
db_password = os.environ.get("MYSQL_PASSWORD")
db_host = os.environ.get("MYSQL_HOST")
db_name = os.environ.get("MYSQL_DB")

# Construct the database URI
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False) 
    location = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    availability = db.Column(db.Boolean, default=True)
    date = db.Column(db.String(50), nullable=False)

# Ensure the table is created
with app.app_context():
    db.create_all()

# Route to GET all events
@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([{
        "id": event.id,
        "name": event.name,
        "location": event.location,
        "price": event.price,
        "availability": event.availability,
        "date": event.date
    } for event in events])
    
# Route to GET all available events
@app.route('/events/available', methods=['GET'])
def get_available_events():
    available_events = Event.query.filter_by(availability=True).all()
    return jsonify([{
        "id": event.id,
        "name": event.name,
        "location": event.location,
        "price": event.price,
        "availability": event.availability,
        "date": event.date
    } for event in available_events])

# Route to POST a new event
@app.route('/events', methods=['POST'])
def create_event():
    data = request.json
    new_event = Event(
        name=data.get('name'),
        location=data.get('location'),
        price=data.get('price'),
        availability=data.get('availability', True),
        date=data.get('date')
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"message": "Event created successfully!"}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)