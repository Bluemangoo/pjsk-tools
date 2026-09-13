import { ref, watchEffect } from "vue";

const storedTheme = typeof window !== "undefined" ? localStorage.getItem("theme-dark") : null;
export const isDark = ref(storedTheme !== null ? JSON.parse(storedTheme) : false);

export function toggleDark() {
    isDark.value = !isDark.value;
}

watchEffect(() => {
    if (typeof window !== "undefined") {
        // 同步持久化到 localStorage
        localStorage.setItem("theme-dark", JSON.stringify(isDark.value));

        // 切换 html 上的 dark 类
        if (isDark.value) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }
});
