import { getBuildings } from '~/server/utils/buildingStore';

export default defineEventHandler(async (event) => {
    const contentLength = event.node.req.headers['content-length']
    if (contentLength && parseInt(contentLength) > 1_000_000) {
        throw createError({ statusCode: 413, message: 'Payload quá lớn' })
    }
    const buildings = await getBuildings();
    if (!buildings || buildings.length === 0) {
        throw createError({
            
            statusCode: 404,
            statusMessage: 'Không có tòa nhà nào được tìm thấy',
        });
    }

    return buildings;
});
