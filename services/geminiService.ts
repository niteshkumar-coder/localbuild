import { GoogleGenAI } from "@google/genai";

/**
 * Generates marketing advice using the Gemini 3 Flash model.
 * Adheres strictly to the @google/genai SDK standards.
 */
export async function generateMarketingAdvice(prompt: string): Promise<string> {
  try {
    // Rule: Always use new GoogleGenAI with the apiKey from process.env
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are 'Local Build AI', a high-performance marketing engine. Your advice must be aggressive, data-driven, and focused on high-conversion local marketing. Focus on YouTube, Instagram, and AI automation. Keep responses lethal, concise, and actionable.",
        temperature: 0.7,
      },
    });

    // Rule: Access .text as a property, not a method.
    return response.text || "System synchronization delayed. Please retry link.";
  } catch (error) {
    console.error("Gemini Core Error:", error);
    return "Error: Neural link failed. Check your environment API_KEY.";
  }
}

/**
 * Streams marketing advice for a more interactive experience.
 */
export async function* streamMarketingAdvice(prompt: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are 'Local Build AI'. Provide concise, high-impact marketing strategies.",
      }
    });

    for await (const chunk of response) {
      // Rule: Chunk text is a property.
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini Stream Error:", error);
    yield "Error: Data stream interrupted.";
  }
}