import express from 'express'
const router = express.Router();
import  {fetchScore,createScore, updateScore, deleteScore}  from '../controllers/scoreController.js'

router.get('/', fetchScore);
router.post('/',createScore);
router.put('/:id',updateScore);
router.delete('/:id',deleteScore);

export default router;