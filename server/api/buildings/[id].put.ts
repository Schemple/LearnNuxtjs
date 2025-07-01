const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9)
}
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const id = event.context.params.id
    await new Promise(resolve => setTimeout(resolve, 500))
    const buildings = [
        {
          id: id,
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