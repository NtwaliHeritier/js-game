const ApiHandling = (() => {
  const addScore = (name, score) => {
    const myscore = {
      user: name,
      score,
    };

    fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/moPgZTWHxTnA8yxsQQ79/scores/',
      {
        method: 'POST',
        body: JSON.stringify(myscore),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      },
    )
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((json) => json)
      .catch((err) => err);
  };

  const showScores = async () => {
    const data = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/moPgZTWHxTnA8yxsQQ79/scores/');
    const response = data.json();
    return response;
  };

  return { addScore, showScores };
})();

export default ApiHandling;