import { GoogleGenerativeAI } from "@google/generative-ai";
import conf from "../../conf.js";

const genAI = new GoogleGenerativeAI(conf.GEMINI_API_KEY);



export const generateReviewSummaryGemini = async (reviews) => {
  //   console.log({ reviews });

  try {
    if (!reviews || reviews.length === 0) return "No reviews available";

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Summarize these product reviews concisely: ${reviews.join(
      " | "
    )}`;

    const response = await model.generateContent(prompt);
    const summary = response.response.text();

    // console.log("Generated Summary:", summary);
    return summary || "No summary available";
  } catch (error) {
    console.error("❌ Gemini Error:", error.message || error);
    return "Summary generation failed";
  }
};
