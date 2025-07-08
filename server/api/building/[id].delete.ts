import { deleteBuilding } from '~/server/utils/buildingStore';

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id);
    try {
        const deletedBuilding = await deleteBuilding(id);
        setResponseStatus(event, 200);
        return deletedBuilding;
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message || 'Lỗi hệ thống',
        });
    }
});
