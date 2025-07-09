// middleware/guest.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')

  if (!token.value) {
    return navigateTo('/auth/login')
  }
})

// Middleware này sẽ được áp dụng cho các route có meta { guest: true }
export const guest = defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')

  // Nếu đã có token => chuyển hướng sang trang chính
  if (token.value) {
    return navigateTo('/')
  }

  // Nếu chưa có token => cho phép truy cập vào các trang không yêu cầu đăng nhập
  return true
})