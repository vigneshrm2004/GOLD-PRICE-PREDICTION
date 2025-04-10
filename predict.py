from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Initialize Flask app
app = Flask(__name__)

# Allow CORS from all origins (you can restrict this if needed)
CORS(app)

# Load the trained model
model = joblib.load("gold_price_model.pkl")

# Test route to verify Flask is running
@app.route('/')
def home():
    return "✅ Flask server is running!"

# Predict route to handle input from frontend
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract features from the request
        open_price = float(data['Open'])
        high_price = float(data['High'])
        low_price = float(data['Low'])
        adj_close = float(data['AdjClose'])
        volume = int(data['Volume'])

        # Prepare input array
        input_features = np.array([[open_price, high_price, low_price, adj_close, volume]])

        # Make prediction
        predicted_close = model.predict(input_features)[0]

        # Return the result
        return jsonify({"PredictedClose": round(float(predicted_close), 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
