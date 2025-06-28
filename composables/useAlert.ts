// composables/useAlert.js
export const useAlert = () => {
  const { $swal } = useNuxtApp()

  const showSuccessAlert = (message, title = 'Thành công!', timer = 2000) => {
    return $swal.fire({
      icon: 'success',
      title: title,
      text: message,
      timer: timer,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timerProgressBar: true
    })
  }

  const showErrorAlert = (message, title = 'Lỗi!') => {
    return $swal.fire({
      icon: 'error',
      title: title,
      text: message,
      toast: true,
      position: 'top-end',
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#dc3545'
    })
  }

  const showWarningAlert = (message, title = 'Cảnh báo!') => {
    return $swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      toast: true,
      position: 'top-end',
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#ffc107'
    })
  }

  const showInfoAlert = (message, title = 'Thông tin') => {
    return $swal.fire({
      icon: 'info',
      title: title,
      text: message,
      toast: true,
      position: 'top-end',
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#0dcaf0'
    })
  }

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

  const closeAlert = () => {
    $swal.close()
  }

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
      