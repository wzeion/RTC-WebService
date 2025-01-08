import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAiWHaxNnKZWDsIyhiRBQhasmh2F46AlX0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "How can i walk on water?";

const result = await model.generateContent(prompt);
console.log(result.response.text());