export const validatePhone = (phone) => {
  return /^[0-9]{10,11}$/.test(phone)
}

export const validateCCCD = (cccd) => {
  return /^[0-9]{12}$/.test(cccd)
}

export const validateBuilding = (building) => {
  const errors = []
  
  if (!building.name?.trim()) {
    errors.push('Tên tòa nhà không được để trống')
  }
  
  if (!validatePhone(building.phone)) {
    errors.push('Số điện thoại phải có 10-11 chữ số')
  }
  
  if (!validateCCCD(building.cccd)) {
    errors.push('Số CCCD phải có đúng 12 chữ số')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}