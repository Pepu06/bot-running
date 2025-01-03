import { downloadMediaMessage } from "@adiwajshing/baileys";
import fs from "fs";
import path from "path";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const formats = {
  mp3: {
    code: "libmp3lame",
    ext: "mp3",
  },
};

const convertAudio = async (filePath, format = "mp3") => {
  if (!filePath) {
    throw new Error("No file path provided");
  }

  const convertedFilePath = path.join(
    path.dirname(filePath),
    `${path.basename(filePath, path.extname(filePath))}.${formats[format].ext}`
  );

  await new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .audioToCodec(formats[format].code)
      .audioBitrate("128k")
      .format(formats[format].ext)
      .output(convertedFilePath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .run();
  });

  return convertedFilePath;
};

export const downloadFileBaileys = async (ctx) => {
  const buffer = await downloadMediaMessage(ctx, "buffer");

  const tmpDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  const fileName = `file-${Date.now()}.ogg`;
  const filePath = path.join(tmpDir, fileName);
  await fs.writeFileSync(filePath, buffer);

  const audioExtensions = ["oga", "ogg", "wav", "mp3"];
  let finalFilePath = filePath;
  let finalExtension = "ogg";

  if (!audioExtensions.includes(finalExtension)) {
    try {
      finalFilePath = await convertAudio(filePath, "mp3");
      finalExtension = "mp3";
    } catch (error) {
      console.error(`Error converting audio: ${error.message}`);
    }
  }

  return {
    fileName: path.basename(finalFilePath),
    fileOldPath: filePath,
    filePath: finalFilePath,
    fileBuffer: fs.readFileSync(finalFilePath),
    extension: finalExtension,
  };
};

export default { downloadFileBaileys };
