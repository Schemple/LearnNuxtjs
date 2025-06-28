export const extractDistrict = (address) => {
    const match = address.match(/(Ba Đình|Hoàn Kiếm|Tây Hồ|Long Biên|Cầu Giấy|Đống Đa|Hai Bà Trưng|Hoàng Mai|Thanh Xuân|Nam Từ Liêm|Bắc Từ Liêm|Hà Đông)/i)
    return match ? match[1] : 'Khác'
}

export const getCurrentDateString = () => {
    return new Date().toISOString().split('T')[0];
};

export const getCurrentDate = () => {
    return new Date().toLocaleDateString('vi-VN');
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
};
