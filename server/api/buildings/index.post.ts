const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9)
}
export default defineEventHandler(async (event) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const body = await readBody(event)

    const buildings = [
        {
          id: generateId(),
          name: body.name,
          address: body.address,
          representative: body.representative,
          phone: body.phone,
          cccd: body.cccd,
          cccdDate: body.cccdDate
        },
        {
          id: generateId(),
          name: body.name,
          address: body.address,
          representative: body.representative,
          phone: body.phone,
          cccd: body.cccd,
          cccdDate: body.cccdDate
        },
        {
          id: generateId(),
          name: body.name,
          address: body.address,
          representative: body.representative,
          phone: body.phone,
          cccd: body.cccd,
          cccdDate: body.cccdDate
        },
        {
          id: generateId(),
          name: body.name,
          address: body.address,
          representative: body.representative,
          phone: body.phone,
          cccd: body.cccd,
          cccdDate: body.cccdDate
        },
    ]
    
    return buildings;
});