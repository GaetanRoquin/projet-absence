const mongoose = require('mongoose');

const classeroomSchema = new mongoose.Schema({
    name:{ 
        type: String, 
        required: true 
    },
    level:{ 
        type: String, 
        required: true 
    },
    headTeacher:{ 
        type: String, 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Classeroom', classeroomSchema);