import React, { useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './ModelComparison.css'; // We'll create this file next

const ModelComparison = () => {
  const [inputs, setInputs] = useState({
    Open: '',
    High: '',
    Low: '',
    AdjClose: '',
    Volume: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const predictPrice = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        Open: parseFloat(inputs.Open),
        High: parseFloat(inputs.High),
        Low: parseFloat(inputs.Low),
        AdjClose: parseFloat(inputs.AdjClose),
        Volume: parseInt(inputs.Volume)
      });
      

      const actualClose = parseFloat(inputs.AdjClose);
      const predictedClose = response.data.PredictedClose;

      setChartData([
        { name: 'Actual', Close: actualClose },
        { name: 'Predicted', Close: predictedClose }
      ]);

      setResult(predictedClose);
    } catch (err) {
      console.error('Prediction Error:', err);
      alert("Prediction failed. See console.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Gold Price Predictor</h2>

        <div className="form">
          {['Open', 'High', 'Low', 'AdjClose', 'Volume'].map((field) => (
            <div className="form-group" key={field}>
              <label>{field}:</label>
              <input
                type="number"
                name={field}
                value={inputs[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
        </div>

        <button onClick={predictPrice} disabled={loading}>
          {loading ? <div className="loader"></div> : "Predict"}
        </button>

        {result !== null && (
          <div className="result-box">
            <p>📈 Predicted Close Price: ₹ {result.toFixed(2)}</p>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="chart-box">
            <h3>Actual vs Predicted Price</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Close" stroke="#0074D9" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelComparison;
