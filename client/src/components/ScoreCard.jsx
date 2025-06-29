const ScoreCard = ({score}) => {
    const { team1, team2, run1, run2, wicket1, wicket2 } = score;

    const result =
      run1 > run2
        ? `${team1} won by ${run1 - run2} runs`
        : run2 > run1
        ? `${team2} won by ${10 - wicket2} wickets`
        : "Match Tied";
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {team1} vs {team2}
        </h2>
        <div className="flex justify-between text-sm text-gray-800">
            <div>
                <p><span className="font-bold">{team1}</span>:{run1}/{wicket1}</p>
                <p><span className="font-bold">{team2}</span>:{run2}/{wicket2}</p>
            </div>
            <div className="text-right">
                <p className="text-green-600 font-semibold">{result}</p>
            </div>
        </div>
    </div>
  )
}

export default ScoreCard;