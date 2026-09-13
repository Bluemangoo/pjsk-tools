<script setup lang="ts">
import CardShortcut from "@/components/containers/card-shortcut.vue";
import EffectLink from "@/components/effects/effect-link.vue";
import ContainerPageIndex from "@/components/containers/container-page-index.vue";
import PartH2 from "@/components/parts/part-h2.vue";
</script>

<template>
    <ContainerPageIndex>
        <!-- Logo -->
        <div class="flex flex-col items-center gap-6 mt-8">
            <h1 class="hidden">Moesekai tools</h1>
            <div class="flex flex-col items-center justify-center gap-2">
                <div class="flex flex-row items-end pb-2">
                    <div
                        class="h-16 w-56 sm:h-20 sm:w-80 lg:h-24 lg:w-96 bg-linear-to-r from-miku to-miku-dark transition-all hover:brightness-110 drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(51,204,187,0.3)]"
                        style="
                            mask-image: url(https://moe.exmeaning.com/assets/logo.svg);
                            mask-size: contain;
                            mask-position: center;
                            mask-repeat: no-repeat;
                            -webkit-mask-image: url(https://moe.exmeaning.com/assets/logo.svg);
                            -webkit-mask-size: contain;
                            -webkit-mask-position: center;
                            -webkit-mask-repeat: no-repeat;
                        "
                        role="img"
                        aria-label="Moesekai"
                    ></div>
                    <span
                        class="px-3 py-1.5 ml-3 mb-2 sm:mb-4 rounded-xl bg-miku/10 dark:bg-miku/20 text-miku text-sm sm:text-base font-bold tracking-widest uppercase border-2 border-miku/20 shadow-sm leading-none"
                    >
                        tools
                    </span>
                </div>
            </div>
            <EffectLink
                class="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 text-blue-600 dark:text-blue-300 text-sm sm:text-base font-bold transition-all hover:bg-blue-100 dark:hover:bg-blue-800/50 hover:scale-105 duration-300 shadow-sm hover:shadow-md dark:hover:shadow-blue-900/30 backdrop-blur-sm"
                href="https://pjsk.moe/"
            >
                <span
                    class="flex h-2.5 w-2.5 rounded-full bg-blue-400 dark:bg-blue-500 animate-pulse-fast shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                ></span>
                <span>
                    去往主站
                    <span
                        class="ml-1 font-medium underline decoration-1 underline-offset-4 decoration-blue-300/70 dark:decoration-blue-500/50 group-hover:decoration-blue-500 dark:group-hover:decoration-blue-400 transition-colors"
                        >pjsk.moe</span
                    >
                </span>
            </EffectLink>
        </div>

        <div class="w-full max-w-5xl mt-12">
            <PartH2>全部工具</PartH2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                <EffectLink href="/tools/1an-collection">
                    <CardShortcut>
                        <template #label>1 周年集章</template>
                        <template #subLabel>1st Anniversary Collection</template>
                    </CardShortcut>
                </EffectLink>
            </div>
        </div>
    </ContainerPageIndex>
</template>

<style scoped></style>
