import { Storage } from "@google-cloud/storage";

const storage = new Storage();

const download = async (bucket: string, file: string) => {
  const gcsBucket = storage.bucket(bucket);
  const gcsFile = gcsBucket.file(file);
  const [contents] = await gcsFile.download();
  return contents;
};

export { download };
