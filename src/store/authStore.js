// stores/authStore.js
import { defineStore } from "pinia";
import { authApi } from "../services/api";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: localStorage.getItem("isLoggedIn") === 'true',
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  }),
  actions: {
    async login(userInfo) {
      try {
        const res = await authApi.login(userInfo);
        if (res.data.token) {
          const userInfos = {
            user_id: userInfo?.user_id,
            token: res.data.token,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfos));
          localStorage.setItem("isLoggedIn", 'true');
    
          this.isLoggedIn = true;
          this.userInfo = userInfos;
          return { success: true, message: "Login successful" };
        } else {
          throw new Error("Login failed. No token received.");
        }
      } catch (error) {
        return { success: false, message: "Invalid login or password!"};
      }
    },
    async logout() {
      try {
        const res = await authApi.logout();
        if (res.data) {
          localStorage.removeItem("userInfo");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("redirectUrl");
          this.isLoggedIn = false;
          this.userInfo = {};
          window.location = '/login';
          return { success: true, message: "Logout successful" };
        } else {
        }
      } catch (error) {
        return { success: false, message: "Test"};
      }
    },
  },
});