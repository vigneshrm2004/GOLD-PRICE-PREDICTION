import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load your dataset
df = pd.read_csv("FINAL_USO.csv")

# Drop rows with missing values
df.dropna(inplace=True)

# Features and Target
X = df[['Open', 'High', 'Low', 'Adj Close', 'Volume']]
y = df['Close']

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "gold_price_model.pkl")

print("✅ Model trained and saved as gold_price_model.pkl")

