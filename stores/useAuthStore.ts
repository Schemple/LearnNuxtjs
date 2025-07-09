// stores/useAuthStore.ts

export const useAuthStore = defineStore('user', () => {
    const token = ref(useCookie('token')?.value || null);
    const user  = ref(null);

    const isAuthenticated = computed(() => token.value !== null || user.value !== null);
    
    const login = async (email: string, password: string) => {
        try {
            const res = await $fetch('/api/login', {
                method: 'POST',
                body: { email, password }
            })
            if (res.token) {
                token.value = res.token;
                user.value = JSON.stringify(res.user);

                // Lưu token vào cookie
                const cookie = useCookie('token');
                cookie.value = res.token;
            } else {
                throw new Error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.');
            }
        } catch (error) {
            throw new Error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.');
        }
    }


    const logout = async () => {
        user.value = null
        token.value = null
        
        const cookie = useCookie('token')
        cookie.value = null
    }
    
    return { 
        token, 
        user, 
        isAuthenticated,
        login, 
        logout 
    }
})