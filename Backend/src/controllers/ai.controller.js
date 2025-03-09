const aiService = require("../services/ai.services.js");
module.exports.getReview = async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).send("Code is required");
  }
try{
  const result = await aiService(code);
  res.send(result);
}catch(err){
  console.error("Error in getReview:", err);
  res.status(500).send("An error occurred while processing your request.");
}
};
