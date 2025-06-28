// composables/useAlert.js
export const useAlert = () => {
  const { $swal } = useNuxtApp()

  // Thông báo thành công
  const showSuccessAlert = (message, title = 'Thành công!') => {
    return $swal.fire({
      icon: 'success',
      title: title,
      text: message,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timerProgressBar: true
    })
  }

  // Thông báo lỗi
  const showErrorAlert = (message, title = 'Lỗi!') => {
    return $swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#dc3545'
    })
  }

  // Thông báo cảnh báo
  const showWarningAlert = (message, title = 'Cảnh báo!') => {
    return $swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#ffc107'
    })
  }

  // Thông báo thông tin
  const showInfoAlert = (message, title = 'Thông tin') => {
    return $swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#0dcaf0'
    })
  }

  // Xác nhận hành động
  const confirmAction = (
    message, 
    title = 'Xác nhận', 
    confirmText = 'Xác nhận', 
    cancelText = 'Hủy'
  ) => {
    return $swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
      focusCancel: true
    })
  }

  // Xác nhận xóa
  const confirmDelete = (itemName, message = null) => {
    const text = message || `Bạn có chắc chắn muốn xóa "${itemName}"? Hành động này không thể hoàn tác.`
    
    return $swal.fire({
      title: 'Xác nhận xóa',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      reverseButtons: true,
      focusCancel: true
    })
  }

  // Loading alert
  const showLoadingAlert = (message = 'Đang xử lý...') => {
    return $swal.fire({
      title: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        $swal.showLoading()
      }
    })
  }

  // Đóng alert
  const closeAlert = () => {
    $swal.close()
  }

  // Alert với input
  const showInputAlert = (title, inputPlaceholder, inputValue = '') => {
    return $swal.fire({
      title: title,
      input: 'text',
      inputPlaceholder: inputPlaceholder,
      inputValue: inputValue,
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      reverseButtons: true,
      focusCancel: true
    })
  }

  return {
    showSuccessAlert,
    showErrorAlert,
    showWarningAlert,
    showInfoAlert,
    confirmAction,
    confirmDelete,
    showLoadingAlert,
    closeAlert,
    showInputAlert
  }
}
      