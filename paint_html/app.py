from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(__name__)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="",  
    database="automotive_db"
)
cursor = db.cursor()

@app.route('/')
def home():
    return render_template('painting.html')  # Load the HTML form

@app.route('/submit_booking', methods=['POST'])
def submit_booking():
        # Get form data
        data = request.form
        vehicle_type = data.get("vehicle_type")
        model = data.get("model")
        vehicle_number = data.get("vehicle_number")
        price = data.get("price")
        customer_contact = data.get("customer_contact")
        appointment_date = data.get("appointment_date")

       
        query = "INSERT INTO appointments (vehicle_type, model, vehicle_number, price, customer_contact, appointment_date) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (vehicle_type, model, vehicle_number, price, customer_contact, appointment_date)
        cursor.execute(query,values)
        db.commit()
        return render_template('painting.html')
       

if __name__ == '__main__':
    app.run(debug=True, port=5000)
