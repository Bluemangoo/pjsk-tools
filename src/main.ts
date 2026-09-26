import { createApp } from "vue";
import "./styles/main.css";
import App from "./app.vue";

(function () {
    // 判断是否是小屏设备
    const isMobile =
        /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        ) &&
        (window.innerWidth <= 768 && "ontouchstart" in window);

    if (isMobile) {
        const targetScale = 0.75;

        let meta = document.querySelector('meta[name="viewport"]');
        if (!meta) {
            meta = document.createElement("meta");
            (meta as any).name = "viewport";
            document.head.appendChild(meta);
        }

        meta.setAttribute(
            "content",
            `width=device-width, initial-scale=${targetScale}, maximum-scale=${targetScale}, minimum-scale=${targetScale}, user-scalable=no`
        );
    }
})();

createApp(App).mount("#app");
