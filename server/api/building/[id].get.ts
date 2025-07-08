import { getBuildingById } from '~/server/utils/buildingStore';

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id, 10);
    if (isNaN(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid building ID',
        });
    }
    let building = [];
    try {
        building = await getBuildingById(id);
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }

    return building;
});
