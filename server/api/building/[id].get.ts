let buildings = [
    // Dữ liệu mẫu
    {
        id: 1,
        name: 'Building A',
        address: '123 Main St',
        representative: 'John Doe',
        phone: '123456789',
        cccd: '123456789012',
        cccdDate: new Date(),
        longtitude: 105.8342,
        latitude: 21.0285,
    },
    { 
        id: 5, 
        name: 'Tòa nhà A', 
        address: 'Số 1, Đường A, Quận 1', 
        representative: 'Nguyễn Văn A',
        phone: '0987654321',
        cccd: '123456789012',
        cccdDate: new Date(),
        longtitude: 105.2542, 
        latitude: 22.0285 
    },
    { 
        id: 2, 
        name: 'Tòa nhà B', 
        address: 'Số 2, Đường B, Quận 2', 
        representative: 'Nguyễn Văn B',
        phone: '0987654322',
        cccd: '123456789013',
        cccdDate: new Date(),
        longtitude: 105.6543, 
        latitude: 28.0286 
    },
    { 
        id: 3, 
        name: 'Tòa nhà C', 
        address: 'Số 3, Đường C, Quận 3', 
        representative: 'Nguyễn Văn C',
        phone: '0987654323',
        cccd: '123456789014',
        cccdDate: new Date(),
        longtitude: 105.8143, 
        latitude: 21.0286 
    },
    { 
        id: 4, 
        name: 'Tòa nhà D', 
        address: 'Số 4, Đường D, Quận 4', 
        representative: 'Nguyễn Văn D',
        phone: '0987654324',
        cccd: '123456789015',
        cccdDate: new Date(),
        longtitude: 105.8243, 
        latitude: 21.0286 
    },
];

export default defineEventHandler((event) => {
    const id = parseInt(event.context.params.id, 10);
    const building = buildings.find(b => b.id === id);

    if (!building) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Building not found',
        });
    }

    return building;
});
