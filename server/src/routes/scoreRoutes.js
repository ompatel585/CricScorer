import express from 'express'
const router = express.Router();
import  {getScore,createScore, updateScore, deleteScore}  from '../controllers/scoreController.js'

router.get('/', getScore);
router.post('/',createScore);
router.put('/:id',updateScore);
router.delete('/:id',deleteScore);

export default router;