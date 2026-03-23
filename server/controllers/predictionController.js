const PredictionLog = require('../models/PredictionLog');

// @desc    Make a prediction
// @route   POST /api/predict
// @access  Private
const makePrediction = async (req, res) => {
    const {
        person_age,
        person_income,
        person_home_ownership,
        person_emp_length,
        loan_intent,
        loan_grade,
        loan_amnt,
        loan_int_rate,
        loan_percent_income,
        cb_person_default_on_file,
        cb_person_cred_hist_length
    } = req.body;

    // Validate all required fields are present
    const requiredFields = [
        'person_age', 'person_income', 'person_home_ownership',
        'person_emp_length', 'loan_intent', 'loan_grade', 'loan_amnt',
        'loan_int_rate', 'loan_percent_income', 'cb_person_default_on_file',
        'cb_person_cred_hist_length'
    ];
    const missingFields = requiredFields.filter(field => req.body[field] === undefined || req.body[field] === null);
    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    // Build structured payload for FastAPI
    const structuredPayload = {
        person_age: Number(person_age),
        person_income: Number(person_income),
        person_home_ownership: Number(person_home_ownership),
        person_emp_length: Number(person_emp_length),
        loan_intent: Number(loan_intent),
        loan_grade: Number(loan_grade),
        loan_amnt: Number(loan_amnt),
        loan_int_rate: Number(loan_int_rate),
        loan_percent_income: Number(loan_percent_income),
        cb_person_default_on_file: Number(cb_person_default_on_file),
        cb_person_cred_hist_length: Number(cb_person_cred_hist_length)
    };

    try {
        // Call ML API with structured JSON
        const mlApiEndpoint = process.env.ML_API_URL.endsWith('/predict') 
            ? process.env.ML_API_URL 
            : `${process.env.ML_API_URL}/predict`;

        const response = await fetch(mlApiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(structuredPayload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'ML API Error');
        }

        const data = await response.json();
        const { prediction, approval_probability, response_time_seconds } = data;

        // Log to MongoDB using structured fields
        await PredictionLog.create({
            userId: req.user._id,
            ...structuredPayload,
            prediction,
        });

        res.json({ prediction, approval_probability, response_time_seconds });
    } catch (error) {
        console.error('Prediction Error:', error.message);
        res.status(500).json({ message: 'Prediction service failed' });
    }
};

// @desc    Get user's prediction history
// @route   GET /api/predict/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const logs = await PredictionLog.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { makePrediction, getHistory };
