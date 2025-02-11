<script setup>
import { reactive, ref, onMounted } from 'vue';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import logo from '@/assets/images/logo.png'
import google from '@/assets/images/Google.png'
import facebook from '@/assets/images/Facebook.png'
const toast = useToast();
const router = useRouter()
const authStore = useAuthStore();
const isLoading = ref(false);
const initialValues = reactive({
    user_id: '',
    password: '',
});
const title = `Welcome Back 👋`;
const titleArray = title.split("");
const titleContainer = ref(null);
onMounted(() => {
    gsap.fromTo(
        titleContainer.value.children,
        { opacity: 0, y: 50 },
        {
            opacity: 1, y: 0,
            duration: 0.05,
            stagger: 0.1,
            ease: 'power2.out',
            color: () => '#000'
            // `hsl(${Math.random() * 360}, 100%, 50%)`,
        }
    );
});
const loginSchema = z.object({
    user_id: z.string().min(1, { message: 'User ID is required!' }),
    password: z.string().min(1, { message: 'Password is required!' }),
});

const resolver = zodResolver(loginSchema);

const onFormSubmit = async ({ valid, values }) => {
    isLoading.value = true;
    if (valid) {
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
        // toast.add({ severity: 'error', summary: '모든 정보를 입력하세요!', life: 3000 });
    }
};
</script>
<template>
    <div class="bg-[#F5F5F5] flex justify-center items-center h-screen">
        <div class="night-sky flex bg-[#000] w-full transition-all">
            <div class="w-full hidden lg:block item-center p-24">
                <div class="animate-fadeinleft animate-once animate-duration-1000 z-10">
                    <Image class="flex items-center justify-center" :src="logo" alt="Image" width="500" />
                </div>
                <!-- <h1 ref="textContainer" class="text-container flex-wrap text-center p-5">
                    <span v-for="(char, index) in textArray" :key="index" class="text">{{ char }}</span>
                </h1> -->
                <div class="animate-fadeinup animate-once animate-duration-1000 mt-10">
                    <div class="flex flex-wrap justify-center ">
                        <h1>"A room without books<br>is like a body<br> without a soul."</h1>
                    </div>
                    <div class="flex flex-wrap justify-center ">
                        <h4>- Marcus Tullius Cicero -</h4>
                    </div>
                </div>


            </div>
            <!-- bg-opacity-50 -->
            <div
                class="bg-gray-100/50 z-10 p-4 sm:px-28 sm:py-16 shadow-2xl w-full text-center sm:w-[60rem] relative transition-all overflow-hidden">
                <div ref="titleContainer" class="text-container text-4xl flex-wrap text-center p-4">
                    <span v-for="(char, index) in titleArray" :key="index" class="text">{{ char }}</span>
                </div>
                <!-- <div class="text-4xl">
                    돌아온 것을 환영합니다 👋
                </div> -->
                <div class="flex justify-start text-left animate-fadein animate-once font-light animate-duration-1000 hidden lg:block text-lg ">
                    Today is a new day.It's your day. You shape it.
                    <br />Sign in to start managing your projects.
                </div>
                <Form :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit" :validateOnBlur="true"
                    class="flex flex-col gap-6 mt-16">
                    <FormField v-slot="$field" name="user_id" initialValue="" class="gap-1">
                        <FloatLabel class="animate-fadeinleft animate-once animate-duration-1000">
                            <IconField>
                                <InputText type="text" v-model="$field.value" size="large" class="w-full rounded-lg " />
                                <InputIcon class="pi pi-user" />
                            </IconField>
                            <label class="text-sm ml-2.5 text-[#122143]" for="user_id">User ID</label>
                        </FloatLabel>
                        <Message v-show="$field?.invalid" severity="error" size="small" variant="simple">
                            {{ $field.error?.message }}
                        </Message>
                    </FormField>
                    <FormField v-slot="$field" name="password" initialValue="" class="gap-1">
                        <FloatLabel class="animate-fadeinright animate-once animate-duration-1000">
                            <Password type="text" :feedback="false" toggleMask fluid size="large" />
                            <!-- <IconField>
                                <InputText type="password" v-model="$field.value" size="large"
                                    class="w-full rounded-lg " />
                                <InputIcon class="pi pi-lock mr-[10px]" />
                            </IconField> -->
                            <label class="text-sm ml-2.5 text-[#122143]" for="password">Password</label>
                        </FloatLabel>
                        <Message v-show="$field?.invalid" severity="error" size="small" variant="simple">
                            {{ $field.error?.message }}
                        </Message>
                    </FormField>
                    <a class="animate-fadein animate-once animate-duration-1000 text-right text-sm text-link hover:underline "
                        href="#">Forgot password?</a>
                    <!-- icon="pi pi-sign-in" iconPos="right" -->
                    <Button type="submit" label="Sign In"
                        class="border-none bg-[#162D3A] animate-fadein animate-once animate-duration-1000 p-button p-button-lg w-full text-white text-lg font-bold rounded-lg"
                        :loading="isLoading" />
                </Form>
                <div class="mt-10 gap-8">
                    <div class="auth-buttons-container">
                        <div class="flex items-center gap-2">
                            <div class="flex-grow h-px bg-gray-300"></div>
                            <span class="text-black">Or</span>
                            <div class="flex-grow h-px bg-gray-300"></div>
                        </div>
                        <Button
                            class="border-none w-full justify-start mt-6 animate-fadeinleft animate-once animate-duration-1000 !bg-[#F3F9FA] text-gray-800 shadow-xl rounded-lg font-light"
                            label="Sign in with Google">
                            <template #icon>
                                <img :src="google" alt="Google" class="w-5 h-5 ml-[25%] mr-2" />
                            </template>
                        </Button>
                        <Button
                            class="border-none w-full justify-start mt-6 animate-fadeinright animate-once animate-duration-1000 !bg-[#F3F9FA] text-gray-800 shadow-xl rounded-lg font-light"
                            label="Sign in with Facebook">
                            <template #icon>
                                <img :src="facebook" alt="Google" class="w-5 h-5 ml-[25%] mr-2" />
                            </template>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<style scoped>
.night-sky {
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/images/background6.jpg');
    background-position: center;
    overflow: hidden;
    background-size: cover;
}
</style>
