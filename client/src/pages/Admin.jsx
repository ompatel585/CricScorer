// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://your-render-backend.onrender.com/api/score";

const AdminPage = () => {
  const [scores, setScores] = useState([]);
  const [formData, setFormData] = useState({
    team1: "",
    team2: "",
    score1: "",
    score2: "",
    wicket1: "",
    wicket2: "",
    matchName: "",
    matchType: "",
    result: "",
  });

  const fetchScores = async () => {
    try {
      const res = await axios.get(API);
      setScores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, formData);
    setFormData({
      team1: "",
      team2: "",
      score1: "",
      score2: "",
      wicket1: "",
      wicket2: "",
      matchName: "",
      matchType: "",
      result: "",
    });
    fetchScores();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchScores();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
        Admin Panel
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        {Object.keys(formData).map((key, i) => (
          <input
            key={i}
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key}
            className="border rounded-lg p-2"
            required
          />
        ))}
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Add Score
        </button>
      </form>

      <div className="space-y-4">
        {scores.map((score) => (
          <div key={score._id} className="p-4 border rounded shadow">
            <p>
              <strong>
                {score.matchName} ({score.matchType})
              </strong>
            </p>
            <p>
              {score.team1}: {score.score1}/{score.wicket1}
            </p>
            <p>
              {score.team2}: {score.score2}/{score.wicket2}
            </p>
            <p className="text-green-600">{score.result}</p>
            <button
              onClick={() => handleDelete(score._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
