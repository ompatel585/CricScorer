// Correct import from cruder-kit (assuming your package exports ./score)
//import { createScoreController } from 'cruder-kit/score.js'; // if published with .js extension in exports

// OR if your package.json has this:
// "exports": { "./score": "./lib/node/score.js" }
// then use this clean import:
import { createScoreController } from 'cruder-kit/score'; // ✅ cleanest

// Import your Mongoose model (you can extend it however you want)
import Score from "../models/scoreModel.js";

// Get the controller functions using the factory
const {
    getScore,
    createScore,
    updateScore,
    deleteScore,
} = createScoreController(Score);

// Export them for use in your routes
export {
    getScore,
    createScore,
    updateScore,
    deleteScore,
};
