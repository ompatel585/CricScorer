import Score from "../models/scoreModel.js"

export  async function fetchScore(req,res){
    try {
        const scores = await Score.find();
        res.json(scores)
    } catch (error) {
        console.error("Error fetching the scores, error in fetchScore Controller");
        res.status(500).json({error:"Server Error"})
    }
}

export  async function createScore(req, res) {
    try {
        const newScore = new Score(req.body)
        const savedScore = await newScore.save();
        console.log("Successfully added score");
        res.status(201).json({message:"Score created successfully",message:savedScore});
    } catch (error) {
        console.error("Error in createScore Controller");
        res.status(500).json({ error: "Server Error" })
    }
}

export async function updateScore(req, res) {
    try {
        const {id} = req.params;
        const updateScore = await Score.findByIdAndUpdate(id,req.body,{new:true});

        if(!updateScore){
            return res.status(404).json({error : "Score is not updated "})
        }
        console.log("Successfully updated score");
        res.status(200).json({message:"Score updated" ,data:updateScore});
    } catch (error) {
        console.error("Error in updateScore Controller");
        res.status(500).json({ error: "Server Error" })
    }
}

export async function deleteScore(req, res) {
    try {
        const { id } = req.params;
        const deleteScore = await Score.findByIdAndDelete(id)

        if (!deleteScore) {
            return res.status(404).json({ error: "Score is not Deleted " })
        }
        console.log("Successfully deleted score");
        res.status(200).json({ message: "the score is deleted",data:deleteScore});
    } catch (error) {
        console.error("Error in deleteScore Controller");
        res.status(500).json({ error: "Server Error" })
    }
}