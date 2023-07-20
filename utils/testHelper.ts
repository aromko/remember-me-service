export async function insertDummyData(
  tableName: string,
  dummyData: Array<Object>
) {
  const collection = (global as any).__DB__.collection(tableName);
  await collection.insertMany(dummyData);
}
export async function clearDummyData(tableName: string) {
  const collection = (global as any).__DB__.collection(tableName);
  await collection.deleteMany({});
}
