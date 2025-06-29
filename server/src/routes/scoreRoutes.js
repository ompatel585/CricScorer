import express from 'express';
//import { getScore, createScore, updateScore, deleteScore } from '../controllers/scoreController.js';
import { createScoreController } from 'cruder-kit/score';
import Score from '../models/scoreModel.js';

const { getScore, createScore, updateScore, deleteScore } = createScoreController(Score);

const router = express.Router();

router.get('/', getScore);
router.post('/', createScore);
router.put('/:id', updateScore);
router.delete('/:id', deleteScore);

export default router;