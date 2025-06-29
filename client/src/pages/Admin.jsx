import { useState, useEffect } from "react";
import axios from "axios";
import ScoreCard from "../components/ScoreCard";

const Admin = () => {
  const [form, setForm] = useState({
    team1: "",
    team2: "",
    run1: "",
    run2: "",
    wicket1: "",
    wicket2: "",
  });
  const [scores, setScores] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // For validation errors
  const [editingScoreId, setEditingScoreId] = useState(null);

  // Fetch scores on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/score")
      .then((res) => {
        setScores(res.data);
      })
      .catch((err) => {
        console.error("Error fetching scores:", err);
        setMessage("Failed to load scores.");
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  // Validate form inputs
  const validateForm = () => {
    const run1 = Number(form.run1);
    const run2 = Number(form.run2);
    const wicket1 = Number(form.wicket1);
    const wicket2 = Number(form.wicket2);

    if (run1 < 0 || run2 < 0) {
      return "Runs cannot be negative.";
    }
    if (run2 > run1 + 6) {
      return "Team 2's runs cannot exceed Team 1's runs by more than 6.";
    }
    if (wicket1 < 0 || wicket1 > 10) {
      return "Wickets for Team 1 must be between 0 and 10.";
    }
    if (wicket2 < 0 || wicket2 > 10) {
      return "Wickets for Team 2 must be between 0 and 10.";
    }
    return "";
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const scoreData = {
      team1: form.team1,
      team2: form.team2,
      run1: Number(form.run1),
      run2: Number(form.run2),
      wicket1: Number(form.wicket1),
      wicket2: Number(form.wicket2),
    };

    try {
      if (editingScoreId) {
        // Update existing score
        const res = await axios.put(
          `http://localhost:5001/api/score/${editingScoreId}`,
          scoreData
        );
        setScores(
          scores.map((score) =>
            score._id === editingScoreId ? res.data : score
          )
        );
        setMessage("Score updated successfully!");
      } else {
        // Create new score
        const res = await axios.post(
          "http://localhost:5001/api/score",
          scoreData
        );
        setScores([...scores, res.data]);
        setMessage("Score added successfully!");
      }

      // Reset form
      setForm({
        team1: "",
        team2: "",
        run1: "",
        run2: "",
        wicket1: "",
        wicket2: "",
      });
      setEditingScoreId(null);
      setError("");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  // Handle edit button click
  const handleEdit = (score) => {
    setForm({
      team1: score.team1,
      team2: score.team2,
      run1: score.run1.toString(),
      run2: score.run2.toString(),
      wicket1: score.wicket1.toString(),
      wicket2: score.wicket2.toString(),
    });
    setEditingScoreId(score._id);
    setError("");
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this score?")) return;

    try {
      await axios.delete(`http://localhost:5001/api/score/${id}`);
      setScores(scores.filter((score) => score._id !== id));
      setMessage("Score deleted successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to delete score.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editingScoreId ? "Update Match Score" : "Add New Match Score"}
      </h2>

      {/* Form for creating or updating scores */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white shadow-md p-6 rounded-xl mb-6"
      >
        <input
          type="text"
          name="team1"
          placeholder="Team 1"
          value={form.team1}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="team2"
          placeholder="Team 2"
          value={form.team2}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="run1"
          placeholder="Runs by Team 1"
          value={form.run1}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="run2"
          placeholder="Runs by Team 2"
          value={form.run2}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="wicket1"
          placeholder="Wickets Team 1"
          value={form.wicket1}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="wicket2"
          placeholder="Wickets Team 2"
          value={form.wicket2}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="col-span-2 mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {editingScoreId ? "Update Score" : "Submit Score"}
        </button>
        {editingScoreId && (
          <button
            type="button"
            onClick={() => {
              setForm({
                team1: "",
                team2: "",
                run1: "",
                run2: "",
                wicket1: "",
                wicket2: "",
              });
              setEditingScoreId(null);
              setMessage("");
              setError("");
            }}
            className="col-span-2 mt-2 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      {message && <p className="mt-4 text-center text-blue-600">{message}</p>}

      {/* Display existing scores */}
      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800">
        Existing Scores
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {scores.length > 0 ? (
          scores.map((score) => (
            <div key={score._id} className="flex items-center gap-4">
              <div className="flex-1">
                <ScoreCard score={score} />
              </div>
              <button
                onClick={() => handleEdit(score)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(score._id)}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No scores available.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
