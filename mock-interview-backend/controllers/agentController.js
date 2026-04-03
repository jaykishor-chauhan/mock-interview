const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getQuestionsFromAI = async (req, res) => {
    try {

        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

        const SYSTEM_PROMPT = `Act as a Senior Technical Interviewer.
            Task: Generate a list of [INSERT NUMBER] unique interview questions on the topic of Java.

            Requirements:
            Difficulty: The questions must be a mix of Basic and Intermediate levels.

            Scope: Cover various aspects such as Syntax, OOP concepts, Collections, and Exception Handling.

            Format: Return the output in strictly raw JSON format. Do not wrap the output in markdown code blocks (e.g., no \`\`\`json). Do not provide any introductory or concluding text.

            Structure: Follow this exact JSON structure: { "questions": [ { "question": "Question text here", "difficulty": "Basic or Intermediate" },{ "question": "Question text here", "difficulty": "Basic or Intermediate" }]}.`;



        const result = await model.generateContent(SYSTEM_PROMPT);
        // console.log("AI Result:", result);
        const responseText = result.response.text().trim();
        // console.log("AI Response Text:", responseText);

        const jsonString = responseText.replace(/```json|```/g, '').replace(/```/g, '').trim();

        const parseResult = JSON.parse(jsonString);
        // console.log("Parsed Questions:", parseResult);

        res.status(200).json({ questions: parseResult });

    } catch (error) {
        // console.error("Error in getQuestionsFromAI:", error);
        res.status(500).json({ message: error.message || "An error occured on the servere." });
    }
};