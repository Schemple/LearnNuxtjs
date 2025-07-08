import { addBuilding } from '~/server/utils/buildingStore';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body.id === null || body.id === undefined) {
    delete body.id;
  }
  try {
    const newBuilding = await addBuilding(body);
    return newBuilding;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Lỗi hệ thống',
    });
  }
});
