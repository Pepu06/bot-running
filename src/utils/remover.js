import fs from "fs";

export const removeFile = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    } else {
      console.error("File not found", filePath);
    }
  } catch (error) {
    console.error(`Error removing file at ${filePath}, error:`, error);
  }
};
