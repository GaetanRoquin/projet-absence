const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName:{ 
        type: String, 
        required: true 
    },
    lastName:{ 
        type: String, 
        required: true 
    },
    classeroom:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classeroom',
        required: true 
    },
    dateOfBirth:{ 
        type: Date 
    },
    sexe:
        {
        type: String, 
        enum: ['M', 'F'] 
    },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);