const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9)
}
export default defineEventHandler(async (event) => {
    const id = event.context.params.id
    await new Promise(resolve => setTimeout(resolve, 500))
    const buildings = [
        {
          id: generateId(),
          name: 'DELETE WORKED',
          address: '54 Liễu Giai, Ba Đình, Hà Nội',
          representative: 'Nguyễn Văn An',
          phone: '0987654321',
          cccd: '001234567890',
          cccdDate: '2020-01-15'
        },
        {
          id: generateId(),
          name: 'Keangnam Landmark 72',
          address: 'Phạm Hùng, Nam Từ Liêm, Hà Nội',
          representative: 'Trần Thị Bình',
          phone: '0912345678',
          cccd: '001234567891',
          cccdDate: '2019-05-20'
        },
    ]
    
    return buildings;
});