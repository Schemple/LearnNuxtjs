<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const authStore = useAuthStore();
const alert = useAlert();

const schema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc').max(255, 'Email không được vượt quá 255 ký tự'),
    password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
});

const { handleSubmit, errors, resetForm, setValues } = useForm({
    validationSchema: schema,
});
const { value: email } = useField('email');
const { value: password } = useField('password')

const signIn = handleSubmit(async (values) => {
    try {
        await authStore.login(values.email, values.password);
        resetForm();
        setValues({ email: '', password: '' });
        alert.showSuccessAlert('Chuyển hướng bạn tới trang chính...', 'Đăng nhập thành công!');
        return navigateTo('/');
    } catch (error) {
        alert.showErrorAlert(error.message || 'Vui lòng thử lại sau.', 'Đăng nhập thất bại!');
    }
});

const checked = ref(false);
definePageMeta({
    layout: 'auth',
    title: 'Đăng nhập',
    meta: [
        { name: 'description', content: 'Đăng nhập vào hệ thống quản lý Tòa nhà Thành phố Hà Nội' },
        { name: 'keywords', content: 'đăng nhập, quản lý tòa nhà, hệ thống, thành phố Hà Nội' },
    ],
});
</script>

<template>
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: var(--color-emerald-100)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Chào mừng tới trang quản lý Tòa nhà Thành phố Hà Nội!</div>
                        <span class="text-muted-color font-medium">Hãy đăng nhập để tiếp tục</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText 
                            id="email1" 
                            type="text" 
                            placeholder="Địa chỉ Email" 
                            class="w-full  mb-2" 
                            v-model="email" 
                            :invalid="errors.email? true : false" 
                        />
                        <Message 
                            v-if="errors.email" 
                            severity="error" 
                            size="small" 
                            class="mb-4" 
                            variant="simple"
                        >{{ errors?.email }}</Message>
                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password 
                            id="password1" 
                            v-model="password" 
                            placeholder="Mật khẩu" 
                            :toggleMask="true" 
                            class="mb-2" 
                            fluid 
                            :feedback="false
                        ">
                        </Password>
                        <Message 
                            v-if="errors?.password" 
                            severity="error"
                            size="small" 
                            class="mb-4" 
                            variant="simple"
                        >{{ errors.password }}</Message>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                        </div>
                        <Button label="Đăng nhập" class="w-full" @click="signIn"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>