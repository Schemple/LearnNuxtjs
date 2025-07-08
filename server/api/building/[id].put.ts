import { updateBuilding } from '~/server/utils/buildingStore';

export default defineEventHandler(async (event) => {
    const contentLength = event.node.req.headers['content-length']
    if (contentLength && parseInt(contentLength) > 1_000_000) {
        throw createError({ statusCode: 413, message: 'Payload quá lớn' })
    }
    const id = parseInt(event.context.params.id);
    const body = await readBody(event);
    if (isNaN(id)) {
        throw createError({
        statusCode: 400,
        statusMessage: 'ID không hợp lệ',
        });
    }
    try {
        const updatedBuilding = await updateBuilding(id, body);
        return updatedBuilding;
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message || 'Lỗi hệ thống',
        });
    }
    return [];
});
