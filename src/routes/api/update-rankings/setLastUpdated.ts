import { UpdateModel } from "$lib/schema/updated";

export const setLastUpdated = async () => {
  const lastUpdated = new Date(Date.now()).toISOString();

  await UpdateModel.findOneAndUpdate(
    { id: 0 },
    {
      $set: {
        lastUpdated,
      },
    },
    { upsert: true, new: true },
  );

  return lastUpdated;
};
