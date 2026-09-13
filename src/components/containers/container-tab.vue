<script setup lang="ts">
import { computed } from "vue";

interface Tab {
    key: string;
    label: string;
}

const props = defineProps<{
    tabs: Tab[];
    modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const activeIndex = computed(() => props.tabs.findIndex((t) => t.key === props.modelValue));

const selectTab = (key: string) => {
    emit("update:modelValue", key);
};
</script>

<template>
    <div class="w-full flex w-full min-w-0 flex-col items-center">
        <nav
            class="sticky top-18 sm:top-20 z-50 p-1 mx-4 sm:mx-0 flex items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-miku/20 dark:border-slate-700/50 rounded-full shadow-md dark:shadow-slate-900/50 transition-colors duration-300 w-[calc(100%-2rem)] sm:w-max max-w-full overflow-x-auto scroller-hide"
        >
            <div class="relative flex items-center shrink-0">
                <div
                    class="absolute h-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-miku rounded-full shadow-[0_2px_8px_rgba(51,204,187,0.4)]"
                    :style="{
                        width: `${100 / tabs.length}%`,
                        transform: `translateX(${activeIndex * 100}%)`
                    }"
                />

                <button
                    v-for="tab in tabs"
                    :key="tab.key"
                    @click="selectTab(tab.key)"
                    class="relative z-10 flex-1 h-full px-5 py-2 text-sm font-bold transition-colors duration-200 rounded-full cursor-pointer flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap overflow-hidden min-w-[5rem]"
                    :class="
                        modelValue === tab.key
                            ? 'text-white'
                            : 'text-slate-500 dark:text-slate-400 hover:text-miku-dark dark:hover:text-miku transition-colors'
                    "
                >
                    <span
                        class="flex items-center flex-row w-max drop-shadow-sm"
                        v-html="tab.label"
                    ></span>
                </button>
            </div>
        </nav>

        <div class="w-full mt-8">
            <div v-for="tab in tabs" :key="tab.key">
                <Transition
                    enter-active-class="transition duration-300 ease-out"
                    enter-from-class="opacity-0 translate-y-4"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="hidden"
                >
                    <div v-show="modelValue === tab.key" class="w-full">
                        <slot :name="tab.key" />
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scroller-hide::-webkit-scrollbar {
    display: none;
}
</style>
