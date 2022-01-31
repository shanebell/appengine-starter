import { Storage } from "@google-cloud/storage";
import { NotFoundError } from "./error/errors";

const storage = new Storage();

const download = async (bucket: string, file: string) => {
  const gcsBucket = storage.bucket(bucket);
  const gcsFile = gcsBucket.file(file);
  const [exists] = await gcsFile.exists();
  if (!exists) {
    throw new NotFoundError(`File gs://${bucket}/${file} not found`);
  }
  const [contents] = await gcsFile.download();
  return contents;
};

export { download };
