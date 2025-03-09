const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  systemInstruction: `
      You are an expert AI assistant specializing in reviewing and completing JavaScript code. Follow these rules:

    1. **Be concise**: Use short sentences and bullet points.
    2. **Structure your response**:
       - **Code Overview**: 1-2 sentences.
       - **Critical Issues**: List major issues (if any).
       - **Suggested Improvements**: Provide concise, actionable fixes.
       - **Best Practices**: List 2-3 relevant practices.
       - **Final Thoughts**: 1-2 sentence summary.
    3. **Use Markdown**: Format headings, lists, and code blocks.
       - Use **double asterisks** (**) to bold headings.
       - Use \`backticks\` for inline code.
    4. **Avoid repetition**: Do not repeat the same information.
  `
});


async function generateContent(prompt) {
  try{
  const result = await model.generateContent(prompt);
  return result.response.text();
  }catch(err){
    console.error("Error in generateContent:", err);
    throw new Error("An error occurred while generating content.");
  }
}

module.exports = generateContent;
