<script setup>
import { reactive, ref } from 'vue';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
const toast = useToast();
const router = useRouter()
const authStore = useAuthStore();
const isLoading = ref(false);
const initialValues = reactive({
    user_id: '',
    password: '',
});

const loginSchema = z.object({
    user_id: z.string().min(1, { message: '사용자가 필요합니다!' }),
    password: z.string().min(1, { message: '비밀번호는 필수입니다!' }),
});

const resolver = zodResolver(loginSchema);

const onFormSubmit = async ({ valid, values }) => {
    isLoading.value = true;
    if (valid) {
        console.log("values", values)
        const urlRedirect = localStorage.getItem("redirectUrl") || "/"
        const result = await authStore.login(values);
        if (result.success) {
            isLoading.value = false;
            toast.add({ severity: 'success', summary: '성공적으로 로그인.', life: 3000 });
            return router.replace(`${urlRedirect}`);
        } else {
            isLoading.value = false;
            toast.add({ severity: 'error', summary: result.message, life: 3000 });
        }
    } else {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: '모든 정보를 입력하세요!', life: 3000 });
    }
};
</script>
<template>
    <div class="animate-scalein animate-duration-1000 flex justify-center items-center h-screen">
        <div
            class="p-5 shadow-2xl w-full sm:w-[28rem] relative bg-white rounded-lg border border-[#0D1936] transition-all overflow-hidden">
            <div
                class="form-header absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-20 bg-[#0D1936] rounded-b-2xl flex items-center justify-center">
                <div class="titles">
                    <div class="absolute animate-zoominleft animate-duration-1000 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">로그인</div>
                </div>
            </div>
            <Form :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit" :validateOnBlur="true"
                class="flex flex-col gap-4 mt-32">
                <FormField v-slot="$field" name="user_id" initialValue="" class="gap-1 mb-4">
                    <FloatLabel variant="on" class ="animate-fadeinleft animate-once animate-duration-1000" >
                        <IconField>
                            <InputText type="text" v-model="$field.value" size="large"
                                class="w-full p-4 rounded-full" />
                            <InputIcon class="pi pi-user mr-[10px]" />
                        </IconField>
                        <label class="text-sm ml-2.5 text-[#122143]" for="user_id">아이디</label>
                    </FloatLabel>
                    <Message v-show="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>
                <FormField v-slot="$field" name="password" initialValue="" class="gap-1 mb-4">
                    <FloatLabel variant="on" class ="animate-fadeinright animate-once animate-duration-1000">
                        <IconField>
                            <InputText type="password" v-model="$field.value" size="large"
                                class="w-full p-4 rounded-full" />
                            <InputIcon class="pi pi-lock mr-[10px]" />
                        </IconField>
                        <label class="text-sm ml-2.5 text-[#122143]" for="password">비밀번호</label>
                    </FloatLabel>
                    <Message v-show="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>
                <a class="animate-fadein animate-once animate-duration-2000 text-right text-sm text-link hover:underline mt-5" href="#">비밀번호 찾기?</a>
                <Button type="submit" label="로그인" icon="pi pi-sign-in" iconPos="right"
                    class="border-none animate-zoominup animate-once animate-duration-1000 p-button p-button-lg w-full bg-[#122143] text-white text-lg font-bold py-4 rounded-full"
                    :loading="isLoading" />
            </Form>

            <p class="animate-fadein animate-once animate-duration-2000 text-center text-sm mt-6 mb-5">
                계정이 없나요?  <a href="#" class="text-link hover:underline">등록하다</a>
            </p>
        </div>
    </div>
</template>


<style scoped>
.form-header {
    width: 140px;
    border-radius: 0 0 20px 20px;
}

.form-header::before,
.form-header::after {
    content: "";
    position: absolute;
    top: 0;
    width: 30px;
    height: 30px;
}

.form-header::before {
    left: -30px;
    border-top-right-radius: 50%;
    box-shadow: 15px 0 0 #0D1936;
}

.form-header::after {
    right: -30px;
    border-top-left-radius: 50%;
    box-shadow: -15px 0 0 #0D1936;
}

</style>
