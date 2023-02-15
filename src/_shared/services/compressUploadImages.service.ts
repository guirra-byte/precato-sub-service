import path from 'path';
import sharp from 'sharp';

export const compressUploadImages = async (local: string, image: Buffer) => {
  await sharp(image).resize(320, 240).toFile(path.join(local));
};
