import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    team1: {
        type: String,
        required: [true, "Team 1 name is required"],
    },
    team2: {
        type: String,
        required: [true, "Team 2 name is required"],
    },
    run1: {
        type: Number,
        required: [true, "Runs by Team 1 are required"],
        min: [0, "Runs by Team 1 cannot be negative"],
    },
    run2: {
        type: Number,
        required: [true, "Runs by Team 2 are required"],
        min: [0, "Runs by Team 2 cannot be negative"],
        validate: {
            validator: function (value) {
                return value <= this.run1 + 6; 
            },
            message: "Runs by Team 2 cannot exceed Team 1's runs by more than 6",
        },
    },
    wicket1: {
        type: Number,
        required: [true, "Wickets for Team 1 are required"],
        min: [0, "Wickets for Team 1 cannot be negative"],
        max: [10, "Wickets for Team 1 cannot exceed 10"],
    },
    wicket2: {
        type: Number,
        required: [true, "Wickets for Team 2 are required"],
        min: [0, "Wickets for Team 2 cannot be negative"],
        max: [10, "Wickets for Team 2 cannot exceed 10"],
    },
});

const Score = mongoose.model('Score', scoreSchema);
export default Score;