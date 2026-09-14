<script setup lang="ts">
import aJump from "@/utils/a-jump.ts";
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import { onErrorCaptured, ref } from "vue";
import ButtonNormal from "@/components/controls/button-normal.vue";

const hasError = ref(false);
const errorInfo = ref<Error | null>(null);

onErrorCaptured((err) => {
    hasError.value = true;
    errorInfo.value = err as Error;

    console.error(err);
    return false;
});
function resetLocalStorage() {
    localStorage.clear();
}

aJump.update();
</script>

<template>
    <div class="flex flex-col min-h-screen [timeline-scope:--footer-timeline]">
        <navbar />
        <div class="w-full max-w-7xl mx-auto flex flex-col min-w-0 overflow-x-hidden">
            <div v-if="hasError">
                <div class="w-full flex flex-col">
                    <div class="h-[40vh] w-full flex flex-col">
                        <div class="size-full" />
                        <div class="mx-auto flex flex-col gap-2">
                            <div class="text-2xl font-bold">Error</div>

                            <div>发生了错误，请尝试刷新页面，或点击下方按钮重置后刷新</div>
                            <div v-if="errorInfo?.message">{{ errorInfo?.message }}</div>
                            <div class="w-max mt-4">
                                <ButtonNormal class="px-4 py-1" @click="resetLocalStorage"
                                    >清空本地存储</ButtonNormal
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <component v-else v-bind:is="aJump.component.value"></component>
        </div>
        <Footer />
    </div>
</template>

<style>
.footer-tracker {
    view-timeline-name: --footer-timeline;
    view-timeline-axis: block;
}
</style>
