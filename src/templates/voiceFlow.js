import { addKeyword, EVENTS } from "@builderbot/bot";
import { voice2text } from "../services/voicegpt.js";
import { getResponse } from "../services/gemini.js";
import { downloadFileBaileys } from "../utils/downloader.js";
import { removeFile } from "../utils/remover.js";

const voiceFlow = addKeyword(EVENTS.VOICE_NOTE).addAction(
  async (ctx, ctxFn) => {
    let filePath;
    filePath = await downloadFileBaileys(ctx);

    const transcript = await voice2text(filePath.filePath);

    const response = await getResponse(transcript);
    removeFile(filePath.filePath);
    removeFile(filePath.fileOldPath);
    return ctxFn.endFlow(response);
  }
);

export { voiceFlow };
