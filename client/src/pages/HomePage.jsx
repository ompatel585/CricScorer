import { useState, useEffect } from "react";
import ScoreCard from "../components/ScoreCard";
import axios from 'axios';

const HomePage = () => {
    const [scores, setScores] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5001/api/score")
        .then((res) =>{
            setScores(res.data)
        })
        .catch((err)=>{
            console.error("Error fetching scores",err)
        })
    },[])
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Live cricket score</h1>
      <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
        {scores.map((score) => (
          <ScoreCard key={score._id} score={score} />
        ))}
      </div>
    </div>
  );
}

export default HomePage