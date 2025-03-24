import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateReviewSummaryOpenAi = async (reviews) => {
  //   console.log({ reviews });

  try {
    if (!reviews || reviews.length === 0) return "No reviews available";
    const response = await openai.chat.completions.create({
      //   model: "gpt-4",
      model: "gpt-4o-mini",
      //   model: "GPT-3.5 Turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI that summarizes product reviews concisely.",
        },
        {
          role: "user",
          content: `Summarize these product reviews: ${reviews.join(" | ")}`,
        },
      ],
      max_tokens: 100,
    });
    console.log(response);
    // return response.choices[0]?.message?.content || "No summary available";
  } catch (error) {
    console.error("❌ OpenAI Error:", error.message || error);
    return "Summary generation failed";
  }
};
