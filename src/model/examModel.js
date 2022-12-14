const mongoose = require("mongoose");
const random = require("mongoose-simple-random")
const examQuestion = new mongoose.Schema({

    option1:{
        type: String,
        require: true
    },
    option2:{
        type: String,
        require: true
    },
    option3:{
        type: String,
        require: true
      
    },
    option4:{
        type: String,
        require: true
      
    },
    answer: String,
    quesImage: {
        type: String,
        default: "NA",
        trim: true
    },
    quesVideo: {
        type: String,
        default: "NA",
        trim: true
    },
    equation: {
        type: String,
        default: "NA",
        trim: true
    },

},{ timeStamp:true
})

examQuestion.plugin(random)

module.exports=mongoose.model('question',examQuestion)