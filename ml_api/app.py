from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import time
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LoanIQ ML Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Track server start time
start_time = time.time()
request_count = 0
total_latency = 0.0
error_count = 0

# Load model and scaler
model = joblib.load("trained_model.pkl")
scaler = joblib.load("scaler.pkl")


@app.get("/health")
def health_check():
    return {
        "status": "OK",
        "message": "ML API is healthy",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "uptime_seconds": round(time.time() - start_time, 2)
    }


# Request Schema (Named Features - Professional)
class PredictRequest(BaseModel):
    person_age: float
    person_income: float
    person_home_ownership: float
    person_emp_length: float
    loan_intent: float
    loan_grade: float
    loan_amnt: float
    loan_int_rate: float
    loan_percent_income: float
    cb_person_default_on_file: float
    cb_person_cred_hist_length: float


@app.get("/")
def home():
    return {"message": "LoanIQ ML Prediction API is running 🚀"}


@app.post("/predict")
def predict(data: PredictRequest):
    global request_count, total_latency, error_count
    try:
        req_start_time = time.time()

        # Convert input to numpy array
        X = np.array([[
            data.person_age,
            data.person_income,
            data.person_home_ownership,
            data.person_emp_length,
            data.loan_intent,
            data.loan_grade,
            data.loan_amnt,
            data.loan_int_rate,
            data.loan_percent_income,
            data.cb_person_default_on_file,
            data.cb_person_cred_hist_length
        ]])

        # Scale features
        X_scaled = scaler.transform(X)

        # Prediction
        prediction = model.predict(X_scaled)[0]
        probability = model.predict_proba(X_scaled)[0][1]

        end_time = time.time()
        
        latency = end_time - req_start_time
        request_count += 1
        total_latency += latency

        return {
            "prediction": int(prediction),
            "approval_probability": round(float(probability), 4),
            "response_time_seconds": round(latency, 4)
        }

    except Exception as e:
        error_count += 1
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/metrics")
def metrics():
    uptime = time.time() - start_time
    avg_latency = total_latency / request_count if request_count > 0 else 0.0
    error_rate = (error_count / request_count * 100) if request_count > 0 else 0.0
    
    return {
        "total_requests": request_count,
        "avg_latency_seconds": round(float(avg_latency), 4),
        "error_count": error_count,
        "error_rate_percent": round(float(error_rate), 2),
        "uptime_seconds": round(uptime, 2)
    }


# py -m uvicorn app:app --reload
#py -m uvicorn app:app --port 8000
