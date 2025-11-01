import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const VEDAI_SYSTEM_INSTRUCTION = `You are VedAI, an expert in Vedic Mathematics and ancient Indian knowledge. Your role is to receive a query about a Vedic concept, sutra, or method and provide a clear, structured explanation. You must respond in a specific JSON format. For example, if asked about 'Ekadhikena Purvena,' provide its Sanskrit name, transliteration, a simple explanation, the formula, a deeper insight into its application, and its modern mathematical equivalent.`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    sanskrit_term: { type: Type.STRING, description: 'The original term or phrase in Sanskrit/Devanagari script.' },
    transliteration: { type: Type.STRING, description: 'The transliteration of the Sanskrit term in IAST format.' },
    explanation: { type: Type.STRING, description: 'A detailed explanation of the concept, suitable for a beginner.' },
    formula: { type: Type.STRING, description: 'If applicable, the sutra or formula associated with the concept.' },
    deeper_insight: { type: Type.STRING, description: 'A more profound or philosophical insight into the topic.' },
    modern_equivalent: { type: Type.STRING, description: 'The corresponding or resonant concept in modern science, math, or philosophy.' },
  },
  required: ['transliteration', 'explanation', 'modern_equivalent']
};


/**
 * Extracts text from an image using Gemini.
 * @param base64Image The base64 encoded image string.
 * @param mimeType The MIME type of the image.
 * @returns The extracted text.
 */
export const getTextFromImage = async (base64Image: string, mimeType: string): Promise<string> => {
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType,
    },
  };

  const textPart = {
    text: "Extract the Sanskrit or Hindi text from this image. If the text is unreadable, respond with 'Sorry, I can’t read the text clearly.'",
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
  });

  return response.text;
};

/**
 * Generates a modern interpretation of Vedic text using Gemini.
 * @param text The text to analyze.
 * @returns The resonance mapping from the AI as a JSON string.
 */
export const getResonance = async (text: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: text,
    config: {
        systemInstruction: VEDAI_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
    }
  });
  
  return response.text;
};