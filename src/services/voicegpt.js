import OpenAi from "openai";
import { config } from "../config/index.js";
import fs from "fs";

const openaiApiKey = config.openaiApiKey;

export const voice2text = async (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error("File not found");
  }
  try {
    const openai = new OpenAi({ apiKey: openaiApiKey });
    const resp = await openai.audio.transcription.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });
    return resp.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw error;
  }
};
