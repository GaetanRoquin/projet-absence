const mongoose = require('mongoose');

const absenceSchema = new mongoose.Schema({
    student:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true },
    subject:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Subject',
        required: true },
    date:{ 
        type: Date, 
        required: true },
    duration:{ 
        type: Number, 
        required: true },
    reason:{ 
        type: String, 
        enum: ['maladie', 'non_justifiee', 'rdv', 'autre'] },
    justification:{ 
        type: Boolean,
        default: false },
}, { timestamps: true });

module.exports = mongoose.model('Absence', absenceSchema);
