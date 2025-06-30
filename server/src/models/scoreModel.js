import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    team1 : {
        type: String,
        required : true
    },
    team2: {
        type: String,
        required: true
    },
    score1: {
        type: Number,
        required: true
    },
    score2: {
        type: Number,
        required: true
    },
    wicket1: {
        type: Number,
        required: true
    },
    wicket2: {
        type: Number,
        required: true
    },
    matchName: {
        type: String,
        required: true
    },
    matchType: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
    
})

const Score = mongoose.model('Score', scoreSchema);

export default Score;