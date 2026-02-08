from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import numpy as np

app = FastAPI(title="ML Prediction API")

model = joblib.load("trained_model.pkl")
scaler = joblib.load("scaler.pkl")

EXPECTED_FEATURES = 11


class PredictRequest(BaseModel):
    features: list[float] = Field(
        example=[10, 20, 1, 0, 5, 2, 0, 1, 3, 7, 9]
    )


@app.get("/")
def home():
    return {"message": "ML Prediction API is running 🚀"}


@app.post("/predict")
def predict(data: PredictRequest):
    if len(data.features) != EXPECTED_FEATURES:
        raise HTTPException(
            status_code=400,
            detail=f"Expected {EXPECTED_FEATURES} features, but got {len(data.features)}"
        )

    X = np.array(data.features).reshape(1, -1)
    X_scaled = scaler.transform(X)
    prediction = model.predict(X_scaled)

    return {"prediction": int(prediction[0])}


# Run using:
# python -m uvicorn app:app --reload
