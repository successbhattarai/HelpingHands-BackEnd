
const mongoose = require('mongoose')

const Contact = mongoose.model('Contact', {

    // Bet Details
    userFirstName:{
        type: String,
        require:true
    },
    userLastName:{
        type: String,
        require:true
    },
    userPhoneNumber:{
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        require:true
    },
    userMessage:{
        type: String,
        required: true
    },
    messageSentDate:{
        type: Date,
        required:false,
        default: Date.now
    },
    
});

module.exports = Contact;
