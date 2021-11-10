import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore();

const saveDocument = async (collection: string, data: any) => {
  const document = firestore.collection(collection).doc();
  await document.set(data);
  const doc = await document.get();
  return doc.data();
};

export { saveDocument };
