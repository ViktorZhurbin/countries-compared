import { UpdateModel } from "$lib/schema/updated";

export async function getLastUpdated() {
  const updated = await UpdateModel.find({
    id: 0,
  }).lean();

  return JSON.stringify(updated[0].lastUpdated);
}
