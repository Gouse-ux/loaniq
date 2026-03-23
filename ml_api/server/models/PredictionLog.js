const mongoose = require('mongoose');

const predictionLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Structured loan applicant features (replaces legacy features[] array)
    person_age: { type: Number, required: true },
    person_income: { type: Number, required: true },
    person_home_ownership: { type: Number, required: true },
    person_emp_length: { type: Number, required: true },
    loan_intent: { type: Number, required: true },
    loan_grade: { type: Number, required: true },
    loan_amnt: { type: Number, required: true },
    loan_int_rate: { type: Number, required: true },
    loan_percent_income: { type: Number, required: true },
    cb_person_default_on_file: { type: Number, required: true },
    cb_person_cred_hist_length: { type: Number, required: true },
    // ML prediction result
    prediction: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PredictionLog = mongoose.model('PredictionLog', predictionLogSchema);

module.exports = PredictionLog;
