// server/api/login.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (email === 'test@example.com' && password === '123456') {
    return {
      token: 'fake-jwt-token-123',
      user: {
        email,
        name: 'Test User'
      }
    }
  } else {
    throw createError({ statusCode: 401, message: 'Sai email hoặc mật khẩu' })
  }
})