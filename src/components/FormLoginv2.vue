<script setup>
import { reactive, ref, onMounted } from 'vue';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import logo from '@/assets/images/logo.png'
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
    user_id: z.string().min(1, { message: 'User_id is required!' }),
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
        <div class="night-sky flex bg-[#000] w-full">
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
                class="bg-[#fff] z-10 p-4 sm:p-16 shadow-2xl w-full text-center sm:w-[60rem] relative transition-all overflow-hidden">
                <div ref="titleContainer" class="text-container text-4xl flex-wrap text-center p-4">
                    <span v-for="(char, index) in titleArray" :key="index" class="text">{{ char }}</span>
                </div>
                <div class="animate-fadein animate-once font-light animate-duration-1000 hidden lg:block mt-6 text-lg ">
                    Today is a new day.It's your day. You shape it.
                    <br />Sign in to start managing your projects.
                </div>
                <Form :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit" :validateOnBlur="true"
                    class="flex flex-col gap-6 mt-16">
                    <FormField v-slot="$field" name="user_id" initialValue="" class="gap-1">
                        <FloatLabel variant="on" class="animate-fadeinleft animate-once animate-duration-1000">
                            <IconField>
                                <InputText type="text" v-model="$field.value" size="large"
                                    class="w-full p-4 rounded-full !important" />
                                <InputIcon class="pi pi-user mr-[10px]" />
                            </IconField>
                            <label class="text-sm ml-2.5 text-[#122143]" for="user_id">User_id</label>
                        </FloatLabel>
                        <Message v-show="$field?.invalid" severity="error" size="small" variant="simple">
                            {{ $field.error?.message }}
                        </Message>
                    </FormField>
                    <FormField v-slot="$field" name="password" initialValue="" class="gap-1">
                        <FloatLabel variant="on" class="animate-fadeinright animate-once animate-duration-1000">
                            <IconField>
                                <InputText type="password" v-model="$field.value" size="large"
                                    class="w-full p-4 rounded-full !important" />
                                <InputIcon class="pi pi-lock mr-[10px]" />
                            </IconField>
                            <label class="text-sm ml-2.5 text-[#122143]" for="password">Password</label>
                        </FloatLabel>
                        <Message v-show="$field?.invalid" severity="error" size="small" variant="simple">
                            {{ $field.error?.message }}
                        </Message>
                    </FormField>
                    <a class="animate-fadein animate-once animate-duration-1000 text-right text-sm text-primary hover:underline"
                        href="#">Forgot password?</a>
                    <Button type="submit" label="Sign In" icon="pi pi-sign-in" iconPos="right"
                        class="btn-submit animate-fadein animate-once animate-duration-1000 p-button p-button-lg w-full bg-blue-500 text-white text-lg font-bold py-4 rounded-full"
                        :loading="isLoading" />
                </Form>
                <div class="mt-10 gap-8">
                    <div class="auth-buttons-container">
                        <div class="flex items-center gap-2">
                            <div class="flex-grow h-px bg-gray-300"></div>
                            <span class="text-gray-500">Or</span>
                            <div class="flex-grow h-px bg-gray-300"></div>
                        </div>

                        <Button
                            class="btn-social w-full mt-8 animate-fadeinleft animate-once animate-duration-1000  bg-blue-100 hover:bg-blue-200 text-gray-800 shadow-xl rounded-lg"
                            label="Sign in with Google" icon="pi pi-google" />
                        <Button
                            class="btn-social w-full mt-8 animate-fadeinright animate-once animate-duration-1000  bg-blue-100 hover:bg-blue-200 text-gray-800 shadow-xl rounded-lg"
                            label="Sign in with Facebook" icon="pi pi-facebook" />

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

@keyframes twinkling {
    from {
        opacity: 0.5;
    }

    to {
        opacity: 1;
    }
}
.btn-social {
    border: none;
    background-color: #edf6f5;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #333;
}
</style>
