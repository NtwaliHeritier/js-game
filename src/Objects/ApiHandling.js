const ApiHandling = (()=>{
  const addScore = async (name, score) => {
    const obj = {name, score};
    const data = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/0z8CWBMSFCikFw74hE0v/scores/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    const response = data.json;
    return response;
  };

  return {addScore};
})();

export default ApiHandling;