const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9)
}
export default defineEventHandler(async (event) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const buildings = [
        {
          id: generateId(),
          name: 'Tòa nhà Lotte Center',
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
        {
          id: generateId(),
          name: 'Vincom Metropolis',
          address: '29 Liễu Giai, Ba Đình, Hà Nội',
          representative: 'Lê Minh Cường',
          phone: '0945678912',
          cccd: '001234567892',
          cccdDate: '2021-03-10'
        },
    ]
    
    return buildings;
});