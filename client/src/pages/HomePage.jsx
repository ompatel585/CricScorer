// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
//import axios from "axios";
import api from "../lib/axios";

const HomePage = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    api
      .get("/score")
      .then((res) => setScores(res.data))
      .catch((err) => console.error("Error fetching scores", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-6">
        Cricket Scorer
      </h1>
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-[90%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[18%] gap-4">
          {scores.map((score) => (
            <div
              key={score._id}
              className="bg-white shadow-md rounded-xl p-4 border text-center"
            >
              <h2 className="font-semibold">
                {score.matchName} ({score.matchType})
              </h2>
              <p>
                {score.team1}: {score.score1}/{score.wicket1}
              </p>
              <p>
                {score.team2}: {score.score2}/{score.wicket2}
              </p>
              <p className="font-medium text-green-600 mt-2">{score.result}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
