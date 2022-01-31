import { Datastore, Entity } from "@google-cloud/datastore";
import { v4 as uuidv4 } from "uuid";

const datastore = new Datastore();

const getEntity = async (kind: string, name: string) => {
  const key = datastore.key([kind, name]);
  const [entity] = await datastore.get(key);
  return {
    id: entity[datastore.KEY].name,
    ...entity,
  };
};

const saveEntity = async (kind: string, data: any) => {
  const name = uuidv4();
  const key = datastore.key([kind, name]);
  await datastore.save({
    key,
    data: {
      ...data,
      created: new Date(),
    },
  });
  return getEntity(kind, name);
};

const updateEntity = async (kind: string, name: string, data: any) => {
  return await datastore.update({
    key: datastore.key([kind, name]),
    data: {
      ...data,
    },
  });
};

const listEntities = async (kind: string, limit: number = 10) => {
  const query = datastore.createQuery(kind).limit(limit);
  const [results] = await datastore.runQuery(query);
  return results.map((result: Entity) => ({
    id: result[datastore.KEY].name,
    ...result,
  }));
};

const deleteEntity = async (kind: string, name: string) => {
  const entity = await getEntity(kind, name);
  await datastore.delete(datastore.key([kind, name]));
  return entity;
};

export { getEntity, listEntities, saveEntity, deleteEntity, updateEntity };
