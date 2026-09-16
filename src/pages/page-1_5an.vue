<!--suppress CssUnusedSymbol -->
<script setup lang="ts">
import ContainerPageContent from "@/components/containers/container-page-content.vue";
import PartH1 from "@/components/parts/part-h1.vue";
import PartH2 from "@/components/parts/part-h2.vue";
import { computed, onMounted, type Reactive, reactive, type Ref, ref, watch } from "vue";
import data from "../data/1_5an/1_5an-data.ts";
import ContainerTab from "@/components/containers/container-tab.vue";
import CheckboxGroup from "@/components/controls/checkbox-group.vue";
import InputNumber from "@/components/controls/input-number.vue";
import CheckboxSwitch from "@/components/controls/checkbox-switch.vue";
import CheckboxSlide from "@/components/controls/checkbox-slide.vue";
import { parseCharaIcon } from "@/utils/icon.ts";
import ButtonNormal from "@/components/controls/button-normal.vue";
import InputTextarea from "@/components/controls/input-textarea.vue";
import FlagUnclear from "@/components/shorten/flag-unclear.vue";

// vars
const preSignDays = ref(0);
const signDays = ref(0);
const memoryGiftsLevel: Ref<number[]> = ref([0, 0, 0, 0, 0, 0, 0]);
const gachaFesFree = ref(0);
const gachaFesPaid = ref(0);
const gachaGiftStepValue = ref(0);
const minGachaGiftStep = computed(() => {
    if (stamp[3]) {
        if (stamp[3] == 1) {
            return 1;
        } else if (stamp[3] == 2) {
            return 4;
        }
    }
    return 0;
});
const gachaGift = computed({
    get: () => {
        if (gachaGiftStepValue.value < minGachaGiftStep.value) {
            return minGachaGiftStep.value;
        }
        return gachaGiftStepValue.value;
    },
    set: (value: number) => {
        gachaGiftStepValue.value = value;
    }
});
const gachaSelectValue = ref(false);
const gachaSelect = computed({
    get: () => (stamp[3] ? true : gachaSelectValue.value),
    set: (value: boolean) => {
        gachaSelectValue.value = value;
    }
});
const gachaCostumeStepValue = ref(0);
const minGachaCostumeStep = computed(() => {
    if (stamp[3]) {
        if (stamp[3] == 1) {
            return 1;
        } else if (stamp[3] == 2) {
            return 4;
        }
    }
    return 0;
});
const gachaCostume = computed({
    get: () => {
        if (gachaCostumeStepValue.value < minGachaCostumeStep.value) {
            return minGachaCostumeStep.value;
        }
        return gachaCostumeStepValue.value;
    },
    set: (value: number) => {
        gachaCostumeStepValue.value = value;
    }
});
// const rankStep = ref(0);
const live = ref(0);
const mySekai = ref(0);
const stamp: Reactive<(number | undefined)[]> = reactive([]);
watch(minGachaCostumeStep, () => {
    if (gachaCostumeStepValue.value < minGachaCostumeStep.value) {
        gachaCostumeStepValue.value = minGachaCostumeStep.value;
        updateGachaCostume();
    }
});

const rainbowConverted = ref(false);
const purpleConverted = ref(0);

const redExchange = reactive(
    (() => {
        const exchange: { [key: string]: number } = {};
        for (let key in data.redExchange) {
            exchange[key] = 0;
        }
        return exchange as { [key in keyof typeof data.redExchange]: number };
    })()
);
const blueExchange = reactive(
    (() => {
        const exchange: { [key: string]: number } = {};
        for (let key in data.blueExchange) {
            exchange[key] = 0;
        }
        return exchange as { [key in keyof typeof data.blueExchange]: number };
    })()
);
const purpleExchange = reactive(
    (() => {
        const exchange: { [key: string]: number } = {};
        for (let key in data.purpleExchange) {
            exchange[key] = 0;
        }
        return exchange as { [key in keyof typeof data.purpleExchange]: number };
    })()
);
const rainbowExchange = reactive(
    (() => {
        const exchange: { [key: string]: number } = {};
        for (let key in data.rainbowExchange) {
            exchange[key] = 0;
        }
        return exchange as { [key in keyof typeof data.rainbowExchange]: number };
    })()
);
const ptExchange = reactive(
    (() => {
        const exchange: { [key: string]: number } = {};
        for (let key in data.ptExchange) {
            exchange[key] = 0;
        }
        return exchange as { [key in keyof typeof data.ptExchange]: number };
    })()
);

// import and export
function clear() {
    preSignDays.value = 0;
    updatePreSignIn();
    signDays.value = 0;
    updateSignIn();
    live.value = 0;
    mySekai.value = 0;
    memoryGiftsLevel.value = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < memoryGifts.length; i++) {
        memoryGifts[i]!.updateGift();
    }

    gachaFesFree.value = 0;
    gachaFesPaid.value = 0;
    gachaGiftStepValue.value = 0;
    gachaCostumeStepValue.value = 0;
    gachaSelectValue.value = false;
    updateGachaCostume();

    stamp.length = 0;
    rainbowConverted.value = false;
    purpleConverted.value = 0;

    const exchanges = [redExchange, blueExchange, purpleExchange, rainbowExchange, ptExchange];
    for (const target of exchanges) {
        for (const key in target) {
            (target as any)[key] = 0;
        }
    }
}
function exportTo(): string {
    const filterExchange = (
        exchangeObj: Record<string, number>,
        originalSource: Record<string, any>
    ) => {
        const result: Record<string, number | undefined> = { ...exchangeObj };
        for (const key in result) {
            if (!Object.prototype.hasOwnProperty.call(originalSource, key) || result[key] === 0) {
                result[key] = undefined;
            }
        }
        return result;
    };

    const exportData = {
        preSignDays: preSignDays.value,
        signDays: signDays.value,
        memoryGiftsLevel: memoryGiftsLevel.value,
        live: live.value,
        mySekai: mySekai.value,
        gachaFesFree: gachaFesFree.value,
        gachaFesPaid: gachaFesPaid.value,
        gachaGiftStepValue: gachaGiftStepValue.value,
        gachaCostumeStepValue: gachaCostumeStepValue.value,
        gachaSelectValue: gachaSelectValue.value,
        rainbowConverted: rainbowConverted.value,
        purpleConverted: purpleConverted.value,
        stamp: [...stamp],
        redExchange: filterExchange(redExchange, data.redExchange),
        blueExchange: filterExchange(blueExchange, data.blueExchange),
        purpleExchange: filterExchange(purpleExchange, data.purpleExchange),
        rainbowExchange: filterExchange(rainbowExchange, data.rainbowExchange),
        ptExchange: filterExchange(ptExchange, data.ptExchange)
    };

    return JSON.stringify(exportData);
}
function number(value: any, defaultValue: number = 0): number {
    if (typeof value === "number" && !isNaN(value)) {
        return value;
    }
    return defaultValue;
}
function importFrom(dataStr: string) {
    const importData = JSON.parse(dataStr);

    // 清空并重置现有状态
    clear();

    // 基础签到与Live
    preSignDays.value = number(importData.preSignDays);
    updatePreSignIn();
    signDays.value = number(importData.signDays);
    updateSignIn();
    live.value = number(importData.live);
    mySekai.value = number(importData.mySekai);

    // 抽卡与转换（存储底层 step 值，保证 computed 正确生效）
    gachaFesFree.value = number(importData.gachaFesFree);
    gachaFesPaid.value = number(importData.gachaFesPaid);
    gachaGiftStepValue.value = number(importData.gachaGiftStepValue);
    gachaCostumeStepValue.value = number(importData.gachaCostumeStepValue);
    gachaSelectValue.value = Boolean(importData.gachaSelectValue);
    updateGachaCostume();

    rainbowConverted.value = Boolean(importData.rainbowConverted);
    purpleConverted.value = number(importData.purpleConverted);

    // 印章
    if (Array.isArray(importData.stamp)) {
        for (let i = 0; i < importData.stamp.length; i++) {
            stamp[i] = importData.stamp[i];
        }
    }

    if (Array.isArray(importData.memoryGiftsLevel)) {
        for (let i = 0; i < importData.memoryGiftsLevel.length; i++) {
            memoryGiftsLevel.value[i] = number(importData.memoryGiftsLevel[i]);
            memoryGifts[i]!.updateGift();
        }
    }

    // 各兑换项导入
    const exchangeMap = [
        { target: redExchange, source: importData.redExchange },
        { target: blueExchange, source: importData.blueExchange },
        { target: purpleExchange, source: importData.purpleExchange },
        { target: rainbowExchange, source: importData.rainbowExchange },
        { target: ptExchange, source: importData.ptExchange }
    ];

    for (const { target, source } of exchangeMap) {
        if (source) {
            for (const key in source) {
                if (key in target && source[key] !== undefined) {
                    (target as any)[key] = number(source[key]);
                }
            }
        }
    }
}
onMounted(() => {
    const savedData = localStorage.getItem("1_5an-collection");
    if (savedData) {
        try {
            importFrom(savedData);
            console.log(savedData);
        } catch (e) {
            console.error(e);
        }
    }
});
watch(
    [
        preSignDays,
        signDays,
        memoryGiftsLevel,
        gachaFesFree,
        gachaFesPaid,
        gachaGift,
        gachaSelect,
        gachaCostume,
        live,
        mySekai,
        stamp,
        redExchange,
        blueExchange,
        purpleExchange,
        rainbowExchange,
        purpleConverted,
        rainbowConverted,
        ptExchange
    ],
    () => {
        const dataStr = exportTo();
        localStorage.setItem("1_5an-collection", dataStr);
    },
    { deep: true }
);

// counters
// negative
const redUsedCount = computed(() => {
    let count = 0;

    count += purpleConverted.value * 10;

    for (const key1 in data.redExchange) {
        const key = key1 as keyof typeof data.redExchange;
        count += redExchange[key] * data.redExchange[key].expense;
    }

    return count;
});
const blueUsedCount = computed(() => {
    let count = 0;

    count += purpleConverted.value * 10;

    for (const key1 in data.blueExchange) {
        const key = key1 as keyof typeof data.blueExchange;
        count += blueExchange[key] * data.blueExchange[key].expense;
    }

    return count;
});
const purpleUsedCount = computed(() => {
    let count = 0;

    if (rainbowConverted.value) {
        count += 500;
    }

    for (const key1 in data.purpleExchange) {
        const key = key1 as keyof typeof data.purpleExchange;
        count += purpleExchange[key] * data.purpleExchange[key].expense;
    }

    return count;
});
const rainbowUsedCount = computed(() => {
    let count = 0;

    for (const key1 in data.rainbowExchange) {
        const key = key1 as keyof typeof data.rainbowExchange;
        count += rainbowExchange[key] * data.rainbowExchange[key].expense;
    }

    return count;
});
const ptUsedCount = computed(() => {
    let count = 0;

    for (const key1 in data.ptExchange) {
        const key = key1 as keyof typeof data.ptExchange;
        count += ptExchange[key] * data.ptExchange[key].expense;
    }

    return count;
});
const paidJewelUsedCount = computed(() => {
    let count = 0;

    count += gachaGift.value * 3000;
    count += gachaCostumeUsed.value;
    if (gachaSelect.value) {
        count += 3000;
    }
    const stampLevel = stamp[4];
    if (stampLevel == 1) {
        count += 1500; //  1种周年set
    }
    if (stampLevel == 2) {
        count += 1500 + 3000; // 2种周年set(1500+3000)
    }

    return count;
});
// positive

// const gachaPoints = computed(() => gachaFesFree.value * 0.5 + gachaFesPaid.value);
// const gachaFesProgress = computed(() => gachaPoints.value % 50);
// const gachaGotPurple = computed(() => Math.floor(gachaPoints.value / 50) * 100);

const redGotCount = computed(() => {
    let count = 0;

    count += live.value;

    for (let i = 0; i < 4; i++) {
        if (stamp[i] == undefined) {
            continue;
        }
        count += data.stamp[i]!.level[stamp[i]!]!.rewards.redDrip || 0;
    }

    return count;
});
const redCount = computed(() => {
    return redGotCount.value - redUsedCount.value;
});

const blueGotCount = computed(() => {
    let count = 0;

    count += mySekai.value;

    for (let i = 0; i < 4; i++) {
        if (stamp[i] == undefined) {
            continue;
        }
        count += data.stamp[i]!.level[stamp[i]!]!.rewards.blueDrip || 0;
    }

    return count;
});
const blueCount = computed(() => {
    return blueGotCount.value - blueUsedCount.value;
});

const purpleGotCount = computed(() => {
    let count = 0;

    count += gachaCostume.value * 50;
    count += purpleConverted.value;

    for (let i = 0; i < 4; i++) {
        if (stamp[i] == undefined) {
            continue;
        }
        count += data.stamp[i]!.level[stamp[i]!]!.rewards.purpleDrip || 0;
    }

    return count;
});

const purpleCount = computed(() => {
    return purpleGotCount.value - purpleUsedCount.value;
});

const rainbowGotCount = computed(() => {
    return rainbowConverted.value ? 1 : 0;
});

const rainbowCount = computed(() => {
    return rainbowGotCount.value - rainbowUsedCount.value;
});

const statistics = computed(() => {
    const map: { [key: string]: { icon: string; count: number } } = {};
    const alias: Record<string, string> = { coinSet: "coin" };
    const ignore: string[] = ["p"];

    let jewel = 0;
    let gachaFree = 0;
    let drinkL = 0;
    let drink = 0;
    let heartpiece = 0;

    for (let i = 0; i < signDays.value; i++) {
        jewel += data.signIn[i]!.jewel || 0;
        gachaFree += data.signIn[i]!.gachaFree || 0;
        drink += data.signIn[i]!.drink || 0;
        drinkL += data.signIn[i]!.drinkL || 0;
    }

    for (let i = 0; i < 5; i++) {
        if (stamp[i] == undefined) {
            continue;
        }
        jewel += data.stamp[i]!.level[stamp[i]!]!.rewards.jewel || 0;
        gachaFree += data.stamp[i]!.level[stamp[i]!]!.rewards.gachaFree || 0;
        drink += data.stamp[i]!.level[stamp[i]!]!.rewards.drink || 0;
        drinkL += data.stamp[i]!.level[stamp[i]!]!.rewards.drinkL || 0;
        heartpiece += 70;
    }

    map["jewel"] = {
        icon: "icon-jewel",
        count: jewel
    };
    map["gachaFree"] = {
        icon: "icon-gacha-ticket-cn-free",
        count: gachaFree
    };
    map["drinkL"] = {
        icon: "icon-boost-item2",
        count: drinkL
    };
    map["drink"] = {
        icon: "icon-boost-item1",
        count: drink
    };
    map["heartcrystal"] = {
        icon: "icon-material16",
        count: 0
    };
    map["heartpiece"] = {
        icon: "icon-material15",
        count: heartpiece
    };

    for (let i = 0; i < preSignDays.value; i++) {
        for (const key in data.preSignIn[i]!) {
            const r = data.rewardIcon[key as keyof typeof data.rewardIcon]!;
            const mapK = alias[key] == undefined ? key : alias[key];
            if (map[mapK] == undefined) {
                map[mapK] = {
                    icon: r,
                    count: 0
                };
            }
            map[mapK].count += (data.preSignIn[i] as any)[key];
        }
    }

    for (let i = 0; i < memoryGifts.length; i++) {
        if (memoryGiftsLevel.value[i]! > 0) {
            const reward = data.memoryGifts[i]!.level[memoryGiftsLevel.value[i]! - 1]!.reward;
            for (const key in reward) {
                const r = reward[key]!;
                const mapK = alias[key] == undefined ? key : alias[key];
                if (map[mapK] == undefined) {
                    map[mapK] = {
                        icon: r.icon,
                        count: 0
                    };
                }
                map[mapK].count += r.count;
            }
        }
    }

    for (const key1 in data.redExchange) {
        const key = key1 as keyof typeof data.redExchange;
        if (ignore.includes(key)) {
            continue;
        }
        const mapK = alias[key] == undefined ? key : alias[key];
        if (map[mapK] == undefined) {
            map[mapK] = {
                icon: data.redExchange[key].icon,
                count: 0
            };
        }
        map[mapK].count += redExchange[key] * data.redExchange[key].count;
    }

    for (const key1 in data.blueExchange) {
        const key = key1 as keyof typeof data.blueExchange;
        if (ignore.includes(key)) {
            continue;
        }
        const mapK = alias[key] == undefined ? key : alias[key];
        if (map[mapK] == undefined) {
            map[mapK] = {
                icon: data.blueExchange[key].icon,
                count: 0
            };
        }
        map[mapK].count += blueExchange[key] * data.blueExchange[key].count;
    }

    for (const key1 in data.purpleExchange) {
        const key = key1 as keyof typeof data.purpleExchange;
        if (ignore.includes(key)) {
            continue;
        }
        const mapK = alias[key] == undefined ? key : alias[key];
        if (map[mapK] == undefined) {
            map[mapK] = {
                icon: data.purpleExchange[key].icon,
                count: 0
            };
        }
        map[mapK].count += purpleExchange[key] * data.purpleExchange[key].count;
    }

    for (const key1 in data.rainbowExchange) {
        const key = key1 as keyof typeof data.rainbowExchange;
        if (ignore.includes(key)) {
            continue;
        }
        const mapK = alias[key] == undefined ? key : alias[key];
        if (map[mapK] == undefined) {
            map[mapK] = {
                icon: data.rainbowExchange[key].icon,
                count: 0
            };
        }
        map[mapK].count += rainbowExchange[key] * data.rainbowExchange[key].count;
    }

    for (const key1 in data.ptExchange) {
        const key = key1 as keyof typeof data.ptExchange;
        if (ignore.includes(key)) {
            continue;
        }
        const mapK = alias[key] == undefined ? key : alias[key];
        if (map[mapK] == undefined) {
            map[mapK] = {
                icon: data.ptExchange[key].icon,
                count: 0
            };
        }
        map[mapK].count += ptExchange[key] * data.ptExchange[key].count;
    }

    const result: typeof map = {};
    for (const key in map) {
        if (map[key] && map[key].count > 0) {
            result[key] = map[key];
        }
    }

    return result;
});

// format
// const pCountFormatted = computed(() => {
//     if (Math.abs(pCount.value) >= 10000000) {
//         return (pCount.value / 1000000).toFixed(0) + "M";
//     }
//     if (Math.abs(pCount.value) >= 1000) {
//         return (pCount.value / 1000).toFixed(0) + "K";
//     }
//     return pCount.value.toString();
// });

// page controls
// tabs
const tabs = [
    { key: "collect", label: "收集" },
    { key: "exchangeDrip", label: '<i class="icon-material202" ></i>兑换所' },
    // { key: "exchangeBadge", label: '<i class="icon-eventbadge-shiho3" ></i>兑换所' },
    { key: "materials", label: "资源统计" },
    { key: "importExport", label: "导入导出" }
];
const activeTab = ref(tabs[0]!.key);

const purpleConvertedMinTimes = computed(() => {
    let cnt = purpleConverted.value;
    if (cnt === 0) {
        return 0;
    }
    return Math.ceil(cnt / 100);
});

// pre sign in
const preSignInRewardList = data.preSignIn.map((item, index) => {
    let tooltip = "";
    for (const key in item) {
        const r = data.rewardIcon[key as keyof typeof data.rewardIcon]!;
        tooltip += `${(item as any)[key]}<i class="${r}" ></i> `;
    }
    return {
        label: `<div class="block"><div><i class="icon-boost-item2 size-16"></i></div><div class="text-xs font-medium">DAY ${index + 1}</div></div><span
            class="absolute right-2 bottom-6 min-w-5 h-5 px-1.5 bg-miku text-white rounded-full text-[0.65rem] font-bold flex items-center justify-center shadow-md border border-white"
            >${item.drinkL}</span
        >`,
        value: index,
        tooltip
    };
});
const preSignInRewardSelects: Ref<number[]> = ref([]);
const handlePreSignInRewardChange = (payload: {
    value: string | number;
    checked: boolean;
    currentList: (string | number)[];
}) => {
    if (payload.value === preSignDays.value - 1 && !payload.checked) {
        preSignDays.value = 0;
    } else {
        preSignDays.value = (payload.value as number) + 1;
    }
    preSignInRewardSelects.value = [];
    for (let i = 0; i < preSignDays.value; i++) {
        preSignInRewardSelects.value.push(i);
    }
};
function updatePreSignIn() {
    preSignInRewardSelects.value = [];
    for (let i = 0; i < preSignDays.value; i++) {
        signInRewardSelects.value.push(i);
    }
}
const preSignInRewards = computed(() => {
    const count: Record<string, { icon: string; count: number }> = {};
    for (let i = 0; i < preSignDays.value; i++) {
        const item = data.preSignIn[i]!;
        for (const key in item) {
            const r = data.rewardIcon[key as keyof typeof data.rewardIcon]!;
            if (!count[key]) {
                count[key] = { icon: r, count: 0 };
            }
            count[key].count += (item as any)[key];
        }
    }
    return count;
});

// sign in
const signInRewardList = data.signIn.map((item, index) => {
    let tooltip = "";
    if (item.rainbowMelody) {
        tooltip += `${item.rainbowMelody}<i class="icon-material204" ></i> `;
    }
    if (item.jewel) {
        tooltip += `${item.jewel}<i class="icon-jewel" ></i> `;
    }
    if (item.drinkL) {
        tooltip += `${item.drinkL}<i class="icon-boost-item2" ></i> `;
    }
    if (item.gachaFree) {
        tooltip += `${item.gachaFree}<i class="icon-gacha-ticket-cn-free" ></i> `;
    }
    const d = {
        icon: "",
        count: 0
    };
    if (item.rainbowMelody) {
        d.icon = "icon-material204";
        d.count = item.rainbowMelody;
    } else {
        d.icon = "icon-gacha-ticket-cn-free";
        d.count = item.gachaFree || 0;
    }
    return {
        label: `<div class="block"><div><i class="${d.icon} size-16"></i></div><div class="text-xs font-medium">DAY ${index + 1}</div></div><span
            class="absolute right-2 bottom-6 min-w-5 h-5 px-1.5 bg-miku text-white rounded-full text-[0.65rem] font-bold flex items-center justify-center shadow-md border border-white"
            >${d.count}</span
        >`,
        value: index,
        tooltip
    };
});
const signInRewardSelects: Ref<number[]> = ref([]);
const handleSignInRewardChange = (payload: {
    value: string | number;
    checked: boolean;
    currentList: (string | number)[];
}) => {
    if (payload.value === signDays.value - 1 && !payload.checked) {
        signDays.value = 0;
    } else {
        signDays.value = (payload.value as number) + 1;
    }
    signInRewardSelects.value = [];
    for (let i = 0; i < signDays.value; i++) {
        signInRewardSelects.value.push(i);
    }
};
function updateSignIn() {
    signInRewardSelects.value = [];
    for (let i = 0; i < signDays.value; i++) {
        signInRewardSelects.value.push(i);
    }
}
const signInRewards = computed(() => {
    const count = {
        rainbowMelody: 0,
        gachaFree: 0,
        jewel: 0,
        drinkL: 0
    };
    for (let i = 0; i < signDays.value; i++) {
        count.rainbowMelody += data.signIn[i]!.rainbowMelody || 0;
        count.gachaFree += data.signIn[i]!.gachaFree || 0;
        count.jewel += data.signIn[i]!.jewel || 0;
        count.drinkL += data.signIn[i]!.drinkL || 0;
    }
    return count;
});

// memory gifts
const memoryGifts = reactive(
    data.memoryGifts.map((dayData) => {
        const rewardList = dayData.level.map((item, index) => {
            const [firstReward] = Object.values(item.reward);
            if (firstReward == undefined) {
                throw new Error();
            }
            let tooltip = ``;

            for (const reward in item.reward) {
                const r = item.reward[reward]!;
                tooltip += `${r.count}<i class="${r.icon}" ></i> `;
            }

            return {
                label: `<div class="block"><div><i class="${firstReward.icon} size-16"></i></div><div class="text-xs font-medium">${item.text}</div></div><span
            class="absolute right-2 bottom-6 min-w-5 h-5 px-1.5 bg-miku text-white rounded-full text-[0.65rem] font-bold flex items-center justify-center shadow-md border border-white"
            >${firstReward.count}</span
        >`,
                value: index,
                tooltip
            };
        });
        const rewardSelects: Ref<number[]> = ref([]);
        const handleRewardChange = (payload: {
            value: string | number;
            checked: boolean;
            currentList: (string | number)[];
        }) => {
            if (
                payload.value === memoryGiftsLevel.value[dayData.day - 1]! - 1 &&
                !payload.checked
            ) {
                memoryGiftsLevel.value[dayData.day - 1] = 0;
            } else {
                memoryGiftsLevel.value[dayData.day - 1] = (payload.value as number) + 1;
            }
            if (memoryGiftsLevel.value[dayData.day - 1]! != 0) {
                rewardSelects.value = [memoryGiftsLevel.value[dayData.day - 1]! - 1];
            } else {
                rewardSelects.value = [];
            }
        };
        const updateGift = () => {
            if (memoryGiftsLevel.value[dayData.day - 1]! != 0) {
                rewardSelects.value = [memoryGiftsLevel.value[dayData.day - 1]! - 1];
            } else {
                rewardSelects.value = [];
            }
        };
        return {
            rewardList,
            rewardSelects,
            handleRewardChange,
            updateGift
        };
    })
);

// costume gacha
const gachaCostumePrice = data.costumePriceLevel.map((count, index) => {
    return {
        label: `<div class="block"><div><i class="icon-jewel size-16"></i></div><div class="text-xs font-medium">Step ${index + 1}</div></div><span
            class="absolute right-2 bottom-6 min-w-5 h-5 px-1.5 bg-miku text-white rounded-full text-[0.65rem] font-bold flex items-center justify-center shadow-md border border-white"
            >${count}</span
        >`,
        value: index,
        tooltip: `${count} 付费<i class="icon-jewel" ></i>`
    };
});
const gachaCostumeSelects: Ref<number[]> = ref([]);
const handleGachaCostumeChange = (payload: {
    value: string | number;
    checked: boolean;
    currentList: (string | number)[];
}) => {
    if (payload.value === gachaCostumeStepValue.value - 1 && !payload.checked) {
        gachaCostumeStepValue.value = minGachaCostumeStep.value;
    } else {
        const value = (payload.value as number) + 1;
        if (value >= minGachaCostumeStep.value) {
            gachaCostumeStepValue.value = value;
        }
    }
    gachaCostumeSelects.value = [];
    for (let i = 0; i < gachaCostumeStepValue.value; i++) {
        gachaCostumeSelects.value.push(i);
    }
};
const gachaCostumeLock = computed(() => {
    const list = [];
    for (let i = 0; i < minGachaCostumeStep.value; i++) {
        list.push(i);
    }
    return list;
});
function updateGachaCostume() {
    gachaCostumeSelects.value = [];
    for (let i = 0; i < gachaCostumeStepValue.value; i++) {
        gachaCostumeSelects.value.push(i);
    }
}
const gachaCostumeUsed = computed(() => {
    let sum = 0;
    for (let i = 0; i < gachaCostumeStepValue.value; i++) {
        sum += data.costumePriceLevel[i]!;
    }
    return sum;
});

// extra gacha
const unfoldExtraGacha = ref(false);
function toggleUnfoldExtraGacha() {
    unfoldExtraGacha.value = !unfoldExtraGacha.value;
}

// const rankStepList: { label: string; value: number; tooltip: string }[] = [];
// for (let i = 1; i <= 3; i++) {
//     let text = "";
//     let p = 0;
//     switch (i) {
//         case 1:
//             text = "排行榜 10 万名";
//             p = 50;
//             break;
//         case 2:
//             text = "排行榜 5 万名";
//             p = 75;
//             break;
//         case 3:
//             text = "排行榜 1 万名";
//             p = 100;
//             break;
//     }
//     const tooltip = `${p}<i class="icon-material170" ></i> `;
//     rankStepList.push({
//         label: `<div class="block"><div><i class="icon-material170 size-16" ></i></div><div class="text-xs font-medium">${text}</div></div><span
//             class="absolute right-2 bottom-6 min-w-5 h-5 px-1.5 bg-miku text-white rounded-full text-[0.65rem] font-bold flex items-center justify-center shadow-md border border-white"
//             >${p}</span
//         >`,
//         value: i,
//         tooltip
//     });
// }
// const rankStepSelect = ref<number[]>([]);
// const handleStepChange = (payload: {
//     value: string | number;
//     checked: boolean;
//     currentList: (string | number)[];
// }) => {
//     if (rankStep.value == payload.value) {
//         rankStep.value = 0;
//         rankStepSelect.value = [];
//         return;
//     }
//     rankStep.value = payload.value as number;
//     rankStepSelect.value = [payload.value as number];
// };
// function updateRankStep() {
//     if (rankStep.value > 0) {
//         rankStepSelect.value = [rankStep.value];
//     } else {
//         rankStepSelect.value = [];
//     }
// }

// import export controls
const importText = ref("");
const importStat = ref<boolean>();
function clearUI() {
    importStat.value = undefined;
    clear();
}
function importFromText() {
    importStat.value = undefined;
    try {
        importFrom(importText.value);
    } catch (e) {
        importStat.value = false;
        throw e;
    }
    importStat.value = true;
}
function exportAndCopy() {
    importStat.value = undefined;
    const str = exportTo();
    navigator.clipboard.writeText(str);
}
</script>

<template>
    <ContainerPageContent>
        <PartH1>
            <template #tag>活动攻略</template>
            <template #title>1.5 周年 <span class="text-miku">活动攻略</span></template>
            <template #subtitle>1.5 周年庆典活动道具计算器</template>
        </PartH1>

        <ContainerTab v-model="activeTab" :tabs="tabs">
            <template #collect>
                <div class="px-2">
                    <PartH2 level="3"> 即将 1.5 周年登录奖励 </PartH2>
                </div>
                <CheckboxGroup
                    v-model="preSignInRewardSelects"
                    :options="preSignInRewardList"
                    @change="handlePreSignInRewardChange"
                ></CheckboxGroup>
                <div
                    class="my-6 p-4 sm:px-6 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-white/40 dark:border-slate-700/50 flex flex-wrap items-center gap-y-2 text-slate-700 dark:text-slate-200 font-medium shadow-sm backdrop-blur-sm"
                >
                    <span class="mr-2">共计</span>
                    <template v-for="(item, key) in preSignInRewards" :key="key">
                        <span class="text-lg mx-1 sm:mx-2">{{ item.count }}</span>
                        <i :class="item.icon" class="drop-shadow-sm"></i>
                    </template>
                </div>

                <div class="px-2">
                    <PartH2 level="3"> 登录奖励 </PartH2>
                </div>
                <CheckboxGroup
                    v-model="signInRewardSelects"
                    :options="signInRewardList"
                    @change="handleSignInRewardChange"
                ></CheckboxGroup>
                <div
                    class="my-6 p-4 sm:px-6 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-white/40 dark:border-slate-700/50 flex flex-wrap items-center gap-y-2 text-slate-700 dark:text-slate-200 font-medium shadow-sm backdrop-blur-sm"
                >
                    <span class="mr-2">共计</span>
                    <span class="text-miku text-lg mx-1 sm:mx-2">{{
                        signInRewards.rainbowMelody
                    }}</span>
                    <i class="icon-material204 mr-3 sm:mr-4 drop-shadow-sm"></i>
                    <span class="text-blue-400 dark:text-blue-300 text-lg mx-1 sm:mx-2">{{
                        signInRewards.jewel
                    }}</span>
                    <i class="icon-jewel mr-3 sm:mr-4 drop-shadow-sm"></i>
                    <span class="text-yellow-400 dark:text-yellow-300 text-lg mx-1 sm:mx-2">{{
                        signInRewards.drinkL
                    }}</span>
                    <i class="icon-boost-item2 mr-3 sm:mr-4 drop-shadow-sm"></i>
                    <span class="text-lg mx-1 sm:mx-2">{{ signInRewards.gachaFree }}</span>
                    <i class="icon-gacha-ticket-cn-free drop-shadow-sm"></i>
                </div>

                <div class="px-2 mt-2">
                    <PartH2 level="3"> YOUR MEMORIES GIFT </PartH2>
                </div>
                <FlagUnclear class="mb-2" />
                <div v-for="(control, index) in memoryGifts" :key="index" class="my-4">
                    {{ data.memoryGifts[index]!.date }}
                    {{ data.memoryGifts[index]!.details }}
                    <CheckboxGroup
                        class="mt-2"
                        v-model="control.rewardSelects"
                        :options="control.rewardList"
                        @change="control.handleRewardChange"
                    ></CheckboxGroup>
                </div>
                <div class="px-2 mt-6">
                    <PartH2 level="3"> 卡池获取 </PartH2>
                </div>
                <div
                    class="flex flex-col sm:flex-row items-center bg-white/40 dark:bg-slate-800/40 p-3 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm mb-4"
                >
                    <i class="icon-gacha-logo826 w-60 h-28 rounded-xl shadow-md" />
                    <div class="m-3 sm:m-5 flex flex-col items-center sm:items-start gap-3">
                        <div
                            class="flex items-center text-center sm:text-left text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium"
                        >
                            共 6 个池子。
                        </div>
                        <div
                            class="flex flex-row items-center gap-3 w-max font-bold text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-900/60 px-4 py-2 rounded-full border border-white/50 dark:border-slate-700/50 shadow-inner"
                        >
                            <div class="h-8 min-w-24">
                                <InputNumber v-model="gachaGift" :min="minGachaGiftStep" :max="6" />
                            </div>
                            * 3000 付费<i class="icon-jewel mx-1" /> → {{ gachaGift }} * 50 =
                            {{ gachaGift * 50 }}<i class="icon-material202 mx-1" />
                            <span v-if="stamp[4]" class="ml-2 font-normal text-sm"
                                >被集章卡要求锁定了！</span
                            >
                        </div>
                    </div>
                </div>
                <div class="text-miku mb-4 cursor-pointer" @click="toggleUnfoldExtraGacha">
                    点击{{ unfoldExtraGacha ? "收起" : "展开" }}非道具卡池
                </div>
                <div
                    v-if="unfoldExtraGacha"
                    class="flex flex-col sm:flex-row items-center bg-white/40 dark:bg-slate-800/40 p-3 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm mb-4"
                >
                    <i class="icon-gacha-banner833 w-60 h-28 rounded-xl shadow-md" />
                    <div class="m-3 sm:m-5 flex flex-col items-center sm:items-start gap-3">
                        <div
                            class="flex items-center text-center sm:text-left text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium"
                        >
                            3000 付费<i class="icon-jewel mx-1" />
                        </div>
                        <div
                            class="flex flex-row items-center gap-3 w-max font-bold text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-900/60 px-4 py-2 rounded-full border border-white/50 dark:border-slate-700/50 shadow-inner"
                        >
                            <span class="mr-2">我要抽！</span>
                            <div class="h-6 w-12 my-auto">
                                <CheckboxSwitch v-model="gachaSelect" :disabled="!!stamp[4]" />
                            </div>
                            <span v-if="stamp[4]" class="ml-2 font-normal text-sm"
                                >被集章卡要求锁定了！</span
                            >
                        </div>
                    </div>
                </div>
                <div
                    v-if="unfoldExtraGacha"
                    class="flex flex-col sm:flex-row items-center bg-white/40 dark:bg-slate-800/40 p-3 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm mb-6"
                >
                    <i class="icon-gacha-banner? w-60 h-28 rounded-xl shadow-md" />
                    <div class="m-3 sm:m-5 flex flex-col items-center sm:items-start gap-3">
                        <CheckboxGroup
                            v-model="gachaCostumeSelects"
                            :options="gachaCostumePrice"
                            :locked-value="gachaCostumeLock"
                            @change="handleGachaCostumeChange"
                        ></CheckboxGroup>

                        <span
                            v-if="minGachaCostumeStep && gachaCostume <= minGachaCostumeStep"
                            class="ml-2 font-normal text-sm"
                            >被集章卡要求锁定了！</span
                        >
                        <div
                            class="flex items-center text-center sm:text-left text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium"
                        >
                            共需 {{ gachaCostumeUsed }} 付费<i class="icon-jewel mx-1" />
                        </div>
                    </div>
                </div>
                <!--                <div class="px-2">-->
                <!--                    <PartH2 level="3"> 排行榜 </PartH2>-->
                <!--                </div>-->
                <!--                <CheckboxGroup-->
                <!--                    v-model="rankStepSelect"-->
                <!--                    :options="rankStepList"-->
                <!--                    @change="handleStepChange"-->
                <!--                ></CheckboxGroup>-->
                <div class="px-2 mt-6">
                    <PartH2 level="3"> 烤森转换器 </PartH2>
                </div>
                <div
                    class="bg-white/40 dark:bg-slate-800/40 p-4 sm:p-6 mb-6 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm flex flex-col md:flex-row gap-6 md:gap-8"
                >
                    <div class="flex-1 flex flex-col">
                        <div class="flex items-center font-medium p-3 mb-3 inline-block">
                            500
                            <i class="icon-material202 size-8 shrink-0 ml-1" />
                            + 1
                            <i class="icon-material204 size-8 shrink-0 ml-1" />
                            -> 1
                            <i class="icon-material203 size-8 shrink-0 ml-1" />
                        </div>

                        <div class="mb-3">合成需要 30(月卡)/60 分钟</div>
                        <div
                            class="flex flex-row items-center mt-auto font-bold pl-2 pr-4 py-2 w-max"
                        >
                            转换一次
                            <div class="h-6 w-12 ml-2">
                                <CheckboxSwitch v-model="rainbowConverted" />
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block w-px bg-slate-200 dark:bg-slate-700/60 my-2"></div>
                    <div class="flex-1 flex flex-col">
                        <div class="flex items-center font-medium p-3 mb-3 inline-block">
                            10
                            <i class="icon-material200 size-8 shrink-0 ml-1" />
                            + 10
                            <i class="icon-material201 size-8 shrink-0 ml-1" />
                            -> 1
                            <i class="icon-material202 size-8 shrink-0 ml-1" />
                        </div>
                        <div class="mb-3">一次最多合成 100 个，需要 15(月卡)/30 分钟</div>
                        <div
                            class="flex flex-row items-center mt-auto font-bold pl-2 pr-4 py-2 w-max"
                        >
                            转换
                            <div class="h-8 min-w-28 mx-2">
                                <InputNumber v-model="purpleConverted" :min="0" />
                            </div>
                            个，至少 {{ purpleConvertedMinTimes }} 格次共
                            {{ Math.floor((purpleConverted / 4 / 3) * 100) / 100 }}(月卡)/{{
                                purpleConverted / 2
                            }}
                            小时
                        </div>
                    </div>
                </div>

                <div class="px-2 mt-6">
                    <PartH2 level="3"> 获取零碎道具 </PartH2>
                </div>
                <!-- Combined Box for PT Exchange & My Sekai -->
                <div
                    class="bg-white/40 dark:bg-slate-800/40 p-4 sm:p-6 mb-6 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm flex flex-col md:flex-row gap-6 md:gap-8"
                >
                    <!-- PT Exchange (活动兑换所) -->
                    <!--                    <div class="flex-1 flex flex-col">-->
                    <!--                        <div-->
                    <!--                            class="text-base font-bold text-slate-800 dark:text-slate-100 mb-3 ml-1 flex items-center"-->
                    <!--                        >-->
                    <!--                            活动兑换所-->
                    <!--                        </div>-->
                    <!--                        <div-->
                    <!--                            class="flex items-center text-sm text-slate-600 dark:text-slate-300 font-medium bg-white/50 dark:bg-slate-900/40 p-3 rounded-xl border border-white/40 dark:border-slate-700/40 shadow-inner mb-3"-->
                    <!--                        >-->
                    <!--                            5000 <i class="icon-eventbadge-shiho3 mx-1" /> → 10<i-->
                    <!--                                class="icon-material170 mx-1"-->
                    <!--                            />，限15次-->
                    <!--                        </div>-->
                    <!--                        <div-->
                    <!--                            class="flex flex-row items-center mt-auto text-slate-700 dark:text-slate-200 font-bold bg-white/60 dark:bg-slate-900/60 pl-2 pr-4 py-2 rounded-full border border-white/50 dark:border-slate-700/50 shadow-sm w-max"-->
                    <!--                        >-->
                    <!--                            <div class="h-8 min-w-24 mr-3">-->
                    <!--                                <InputNumber v-model="ptExchange.p" :min="0" :max="15" />-->
                    <!--                            </div>-->
                    <!--                            <span class="text-slate-400 dark:text-slate-500 mx-1">*</span> 5k-->
                    <!--                            <i class="icon-eventbadge-shiho3 ml-0.5 mr-2" />-->
                    <!--                            <span class="text-slate-400 dark:text-slate-500 mr-2">→</span>-->
                    <!--                            <span class="text-miku text-lg mr-1">{{ ptExchange.p * 10 }}</span>-->
                    <!--                            <i class="icon-material170 drop-shadow-sm" />-->
                    <!--                        </div>-->
                    <!--                    </div>-->

                    <!-- Live -->
                    <div class="flex-1 flex flex-col">
                        <div
                            class="text-base font-bold text-slate-800 dark:text-slate-100 mb-3 ml-1 flex items-center"
                        >
                            演出
                        </div>
                        <div
                            class="flex items-center text-sm text-slate-600 dark:text-slate-300 font-medium bg-white/50 dark:bg-slate-900/40 p-3 rounded-xl border border-white/40 dark:border-slate-700/40 shadow-inner mb-3 inline-block"
                        >
                            S级必得，小概率翻倍，受到演出能量倍数影响；每日挑战固定掉落3个
                            <i class="icon-material200 shrink-0 ml-1" />
                        </div>
                        <div
                            class="flex flex-row items-center mt-auto font-bold pl-2 pr-4 py-2 w-max"
                        >
                            <span class="mr-2">累计产出</span>
                            <div class="h-8 min-w-28 mr-3">
                                <InputNumber v-model="live" :min="0" />
                            </div>
                            <i class="icon-material200 drop-shadow-sm" />
                            ，需要约 {{ live / 5 }}
                            <i class="icon-boost-item1 drop-shadow-sm" />
                        </div>
                    </div>

                    <!-- Divider for desktop -->
                    <div class="hidden md:block w-px bg-slate-200 dark:bg-slate-700/60 my-2"></div>

                    <!-- My Sekai (烤森) -->
                    <div class="flex-1 flex flex-col">
                        <div
                            class="text-base font-bold text-slate-800 dark:text-slate-100 mb-3 ml-1 flex items-center"
                        >
                            烤森
                        </div>
                        <div
                            class="flex items-center text-sm text-slate-600 dark:text-slate-300 font-medium bg-white/50 dark:bg-slate-900/40 p-3 rounded-xl border border-white/40 dark:border-slate-700/40 shadow-inner mb-3 inline-block"
                        >
                            砍树/挖矿有概率获得 30 个
                            <i class="icon-material201 shrink-0 ml-1" />
                        </div>
                        <div
                            class="flex flex-row items-center mt-auto font-bold pl-2 pr-4 py-2 w-max"
                        >
                            <span class="mr-2">累计产出</span>
                            <div class="h-8 min-w-28 mr-3">
                                <InputNumber v-model="mySekai" :min="0" :step="30" />
                            </div>
                            <i class="icon-material201 drop-shadow-sm" />
                        </div>
                    </div>
                </div>
                <PartH2 level="3"> 集章任务 </PartH2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                    <div
                        v-for="(cardGroup, cardGroupIndex) in data.stamp"
                        :key="cardGroupIndex"
                        class="bg-white/30 dark:bg-slate-800/30 p-4 rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-sm flex flex-col h-full"
                    >
                        <div
                            class="ml-2 p-2 text-lg font-bold text-slate-800 dark:text-slate-100 drop-shadow-sm flex-none"
                        >
                            {{ cardGroupIndex + 1 }}. {{ cardGroup.description }}
                        </div>
                        <div class="w-full h-80 sm:h-76 mt-2 px-1 sm:px-2 box-border flex-1">
                            <CheckboxSlide v-model="stamp[cardGroupIndex]">
                                <div
                                    v-for="(card, cardIndex) of cardGroup.level"
                                    :key="cardIndex"
                                    class="flex flex-col gap-3 sm:gap-4 items-center w-full justify-center h-full"
                                >
                                    <!-- require text styling -->
                                    <div
                                        class="flex justify-center font-black text-xl sm:text-2xl text-slate-800 dark:text-slate-100 drop-shadow-sm tracking-wide"
                                        style="text-wrap: pretty"
                                    >
                                        {{ card.require }}
                                    </div>

                                    <!-- extra tasks list styling -->
                                    <ul
                                        v-if="card.extra"
                                        class="flex flex-col gap-1 sm:gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 w-full max-w-md bg-white/50 dark:bg-slate-800/60 px-3 py-2 sm:p-4 rounded-xl border border-white/60 dark:border-slate-600/50 shadow-sm backdrop-blur-sm self-center"
                                    >
                                        <li
                                            v-for="extra of card.extra"
                                            class="flex items-start gap-2 text-left"
                                        >
                                            <div
                                                class="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-1 sm:mt-1.5 shrink-0"
                                            ></div>
                                            <span class="flex-1 leading-snug">{{ extra }}</span>
                                        </li>
                                    </ul>

                                    <!-- rewards styling -->
                                    <div
                                        class="flex flex-wrap justify-center items-center gap-1 sm:gap-2 font-bold text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-900/60 px-3 sm:px-4 py-1.5 sm:py-2 mt-1 sm:mt-2 rounded-full border border-white/50 dark:border-slate-700/50 shadow-inner self-center"
                                    >
                                        <span
                                            v-for="(icon, reward) in data.rewardIcon"
                                            :id="reward"
                                        >
                                            <span
                                                v-if="card.rewards[reward]"
                                                class="flex items-center"
                                            >
                                                <span class="text-miku mr-0.5">{{
                                                    card.rewards[reward]
                                                }}</span
                                                ><i class="drop-shadow-sm gap-1" :class="icon" />
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </CheckboxSlide>
                        </div>
                    </div>
                </div>
            </template>

            <template #exchangeDrip>
                <h2 class="hidden">活动道具兑换所</h2>

                <TransitionGroup name="yslide">
                    <div
                        v-if="redCount < 0 || blueCount < 0 || purpleCount < 0 || rainbowCount < 0"
                        class="flex w-full mb-2"
                    >
                        <div
                            class="mr-auto py-1.5 px-3 border-red-500/50 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 font-bold border rounded-lg shadow-sm text-sm"
                        >
                            获取量小于消耗量！
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <div
                            class="mt-2 mb-8 bg-white/40 dark:bg-slate-800/40 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm flex flex-wrap items-center gap-y-2 w-full sm:w-max mx-auto sm:mx-0"
                        >
                            <span class="mr-2">共获得</span>
                            <span class="text-miku text-lg mx-1 sm:mx-2">{{ redGotCount }}</span>
                            <i class="icon-material200 mr-3 sm:mr-4 drop-shadow-sm" />
                            <span class="ml-2 sm:ml-0 mr-2">消耗</span>
                            <span class="text-slate-500 dark:text-slate-400 text-lg mx-1 sm:mx-2">{{
                                redUsedCount
                            }}</span>
                            <i class="icon-material200 drop-shadow-sm" />
                        </div>
                        <div
                            class="mt-2 mb-8 bg-white/40 dark:bg-slate-800/40 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm flex flex-wrap items-center gap-y-2 w-full sm:w-max mx-auto sm:mx-0"
                        >
                            <span class="mr-2">共获得</span>
                            <span class="text-miku text-lg mx-1 sm:mx-2">{{ blueGotCount }}</span>
                            <i class="icon-material201 mr-3 sm:mr-4 drop-shadow-sm" />
                            <span class="ml-2 sm:ml-0 mr-2">消耗</span>
                            <span class="text-slate-500 dark:text-slate-400 text-lg mx-1 sm:mx-2">{{
                                blueUsedCount
                            }}</span>
                            <i class="icon-material201 drop-shadow-sm" />
                        </div>
                        <div
                            class="mt-2 mb-8 bg-white/40 dark:bg-slate-800/40 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm flex flex-wrap items-center gap-y-2 w-full sm:w-max mx-auto sm:mx-0"
                        >
                            <span class="mr-2">共获得</span>
                            <span class="text-miku text-lg mx-1 sm:mx-2">{{ purpleGotCount }}</span>
                            <i class="icon-material202 mr-3 sm:mr-4 drop-shadow-sm" />
                            <span class="ml-2 sm:ml-0 mr-2">消耗</span>
                            <span class="text-slate-500 dark:text-slate-400 text-lg mx-1 sm:mx-2">{{
                                purpleUsedCount
                            }}</span>
                            <i class="icon-material202 drop-shadow-sm" />
                        </div>
                        <div
                            class="mt-2 mb-8 bg-white/40 dark:bg-slate-800/40 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm flex flex-wrap items-center gap-y-2 w-full sm:w-max mx-auto sm:mx-0"
                        >
                            <span class="mr-2">共获得</span>
                            <span class="text-miku text-lg mx-1 sm:mx-2">{{
                                rainbowGotCount
                            }}</span>
                            <i class="icon-material203 mr-3 sm:mr-4 drop-shadow-sm" />
                            <span class="ml-2 sm:ml-0 mr-2">消耗</span>
                            <span class="text-slate-500 dark:text-slate-400 text-lg mx-1 sm:mx-2">{{
                                rainbowUsedCount
                            }}</span>
                            <i class="icon-material203 drop-shadow-sm" />
                        </div>
                    </div>

                    <div class="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-5 mt-4">
                        <button
                            v-for="(item, key) in data.redExchange"
                            :key="key"
                            class="flex flex-col items-center justify-center p-3 gap-2 rounded-2xl border-2 transition-all duration-300 active:scale-95 min-w-36 overflow-hidden shadow-sm"
                            :class="
                                redExchange[key]! > 0
                                    ? 'border-miku bg-miku/10 dark:bg-miku/20 shadow-[0_4px_15px_rgba(51,204,187,0.15)]'
                                    : 'bg-white/40 dark:bg-slate-800/40 border-zinc-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-miku/50 dark:hover:border-miku/60'
                            "
                            @click="redExchange[key]!++"
                        >
                            <div class="relative drop-shadow-md">
                                <div>
                                    <Component
                                        v-if="item.icon.startsWith('chara-')"
                                        :is="parseCharaIcon(item.icon)"
                                        class="size-16"
                                    />
                                    <i v-else :class="item.icon" class="size-16" />
                                </div>
                                <span
                                    class="absolute -right-2 -bottom-2 min-w-6 h-6 px-1.5 bg-miku text-white rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800"
                                    >{{
                                        redExchange[key]! > 0
                                            ? redExchange[key]! * data.redExchange[key]!.count
                                            : data.redExchange[key]!.count
                                    }}</span
                                >
                            </div>
                            <div
                                class="flex items-center text-sm font-bold text-slate-700 dark:text-slate-200 mt-1 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full border border-white/30 dark:border-slate-700/30"
                            >
                                <i class="icon-material200 mr-1 drop-shadow-sm" />
                                {{
                                    redExchange[key]! > 0
                                        ? redExchange[key]! * data.redExchange[key]!.expense
                                        : data.redExchange[key]!.expense
                                }}
                            </div>
                            <div class="h-8 w-20 mt-1">
                                <InputNumber
                                    v-model="redExchange[key]!"
                                    :min="0"
                                    :max="data.redExchange[key]!.limit"
                                    @click.stop
                                />
                            </div>
                            <div
                                v-if="data.redExchange[key]!.limit !== Infinity"
                                class="text-[0.7rem] font-bold text-slate-500 dark:text-slate-400 mt-0.5"
                            >
                                余 {{ data.redExchange[key]!.limit - redExchange[key]! }}
                            </div>
                        </button>
                    </div>
                    <div
                        class="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-5 mt-16"
                    >
                        <button
                            v-for="(item, key) in data.blueExchange"
                            :key="key"
                            class="flex flex-col items-center justify-center p-3 gap-2 rounded-2xl border-2 transition-all duration-300 active:scale-95 min-w-36 overflow-hidden shadow-sm"
                            :class="
                                blueExchange[key]! > 0
                                    ? 'border-miku bg-miku/10 dark:bg-miku/20 shadow-[0_4px_15px_rgba(51,204,187,0.15)]'
                                    : 'bg-white/40 dark:bg-slate-800/40 border-zinc-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-miku/50 dark:hover:border-miku/60'
                            "
                            @click="blueExchange[key]!++"
                        >
                            <div class="relative drop-shadow-md">
                                <div>
                                    <Component
                                        v-if="item.icon.startsWith('chara-')"
                                        :is="parseCharaIcon(item.icon)"
                                        class="size-16"
                                    />
                                    <i v-else :class="item.icon" class="size-16" />
                                </div>
                                <span
                                    class="absolute -right-2 -bottom-2 min-w-6 h-6 px-1.5 bg-miku text-white rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800"
                                    >{{
                                        blueExchange[key]! > 0
                                            ? blueExchange[key]! * data.blueExchange[key]!.count
                                            : data.blueExchange[key]!.count
                                    }}</span
                                >
                            </div>
                            <div
                                class="flex items-center text-sm font-bold text-slate-700 dark:text-slate-200 mt-1 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full border border-white/30 dark:border-slate-700/30"
                            >
                                <i class="icon-material201 mr-1 drop-shadow-sm" />
                                {{
                                    blueExchange[key]! > 0
                                        ? blueExchange[key]! * data.blueExchange[key]!.expense
                                        : data.blueExchange[key]!.expense
                                }}
                            </div>
                            <div class="h-8 w-20 mt-1">
                                <InputNumber
                                    v-model="blueExchange[key]!"
                                    :min="0"
                                    :max="data.blueExchange[key]!.limit"
                                    @click.stop
                                />
                            </div>
                            <div
                                v-if="data.blueExchange[key]!.limit !== Infinity"
                                class="text-[0.7rem] font-bold text-slate-500 dark:text-slate-400 mt-0.5"
                            >
                                余 {{ data.blueExchange[key]!.limit - blueExchange[key]! }}
                            </div>
                        </button>
                    </div>
                    <div
                        class="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-5 mt-16"
                    >
                        <button
                            v-for="(item, key) in data.purpleExchange"
                            :key="key"
                            class="flex flex-col items-center justify-center p-3 gap-2 rounded-2xl border-2 transition-all duration-300 active:scale-95 min-w-36 overflow-hidden shadow-sm"
                            :class="
                                purpleExchange[key]! > 0
                                    ? 'border-miku bg-miku/10 dark:bg-miku/20 shadow-[0_4px_15px_rgba(51,204,187,0.15)]'
                                    : 'bg-white/40 dark:bg-slate-800/40 border-zinc-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-miku/50 dark:hover:border-miku/60'
                            "
                            @click="purpleExchange[key]!++"
                        >
                            <div class="relative drop-shadow-md">
                                <div>
                                    <Component
                                        v-if="item.icon.startsWith('chara-')"
                                        :is="parseCharaIcon(item.icon)"
                                        class="size-16"
                                    />
                                    <i v-else :class="item.icon" class="size-16" />
                                </div>
                                <span
                                    class="absolute -right-2 -bottom-2 min-w-6 h-6 px-1.5 bg-miku text-white rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800"
                                    >{{
                                        purpleExchange[key]! > 0
                                            ? purpleExchange[key]! * data.purpleExchange[key]!.count
                                            : data.purpleExchange[key]!.count
                                    }}</span
                                >
                            </div>
                            <div
                                class="flex items-center text-sm font-bold text-slate-700 dark:text-slate-200 mt-1 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full border border-white/30 dark:border-slate-700/30"
                            >
                                <i class="icon-material202 mr-1 drop-shadow-sm" />
                                {{
                                    purpleExchange[key]! > 0
                                        ? purpleExchange[key]! * data.purpleExchange[key]!.expense
                                        : data.purpleExchange[key]!.expense
                                }}
                            </div>
                            <div class="h-8 w-20 mt-1">
                                <InputNumber
                                    v-model="purpleExchange[key]!"
                                    :min="0"
                                    :max="data.purpleExchange[key]!.limit"
                                    @click.stop
                                />
                            </div>
                            <div
                                v-if="data.purpleExchange[key]!.limit !== Infinity"
                                class="text-[0.7rem] font-bold text-slate-500 dark:text-slate-400 mt-0.5"
                            >
                                余 {{ data.purpleExchange[key]!.limit - purpleExchange[key]! }}
                            </div>
                        </button>
                    </div>
                    <div
                        class="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-5 mt-16"
                    >
                        <button
                            v-for="(item, key) in data.rainbowExchange"
                            :key="key"
                            class="flex flex-col items-center justify-center p-3 gap-2 rounded-2xl border-2 transition-all duration-300 active:scale-95 min-w-36 overflow-hidden shadow-sm"
                            :class="
                                rainbowExchange[key]! > 0
                                    ? 'border-miku bg-miku/10 dark:bg-miku/20 shadow-[0_4px_15px_rgba(51,204,187,0.15)]'
                                    : 'bg-white/40 dark:bg-slate-800/40 border-zinc-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-miku/50 dark:hover:border-miku/60'
                            "
                            @click="rainbowExchange[key]!++"
                        >
                            <div class="relative drop-shadow-md">
                                <div>
                                    <Component
                                        v-if="item.icon.startsWith('chara-')"
                                        :is="parseCharaIcon(item.icon)"
                                        class="size-16"
                                    />
                                    <i v-else :class="item.icon" class="size-16" />
                                </div>
                                <span
                                    class="absolute -right-2 -bottom-2 min-w-6 h-6 px-1.5 bg-miku text-white rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800"
                                    >{{
                                        rainbowExchange[key]! > 0
                                            ? rainbowExchange[key]! *
                                              data.rainbowExchange[key]!.count
                                            : data.rainbowExchange[key]!.count
                                    }}</span
                                >
                            </div>
                            <div
                                class="flex items-center text-sm font-bold text-slate-700 dark:text-slate-200 mt-1 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full border border-white/30 dark:border-slate-700/30"
                            >
                                <i class="icon-material203 mr-1 drop-shadow-sm" />
                                {{
                                    rainbowExchange[key]! > 0
                                        ? rainbowExchange[key]! * data.rainbowExchange[key]!.expense
                                        : data.rainbowExchange[key]!.expense
                                }}
                            </div>
                            <div class="h-8 w-20 mt-1">
                                <InputNumber
                                    v-model="rainbowExchange[key]!"
                                    :min="0"
                                    :max="data.rainbowExchange[key]!.limit"
                                    @click.stop
                                />
                            </div>
                            <div
                                v-if="data.rainbowExchange[key]!.limit !== Infinity"
                                class="text-[0.7rem] font-bold text-slate-500 dark:text-slate-400 mt-0.5"
                            >
                                余 {{ data.rainbowExchange[key]!.limit - rainbowExchange[key]! }}
                            </div>
                        </button>
                    </div>
                </TransitionGroup>
            </template>

            <template #exchangeBadge>
                <h2 class="hidden">活动徽章兑换所</h2>
                <TransitionGroup name="yslide">
                    <div
                        class="mt-2 mb-8 bg-white/40 dark:bg-slate-800/40 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm flex flex-wrap items-center gap-y-2 w-full sm:w-max mx-auto sm:mx-0"
                    >
                        <span class="mr-2">共消耗</span>
                        <span class="text-slate-500 dark:text-slate-400 text-lg mx-1 sm:mx-2">{{
                            ptUsedCount
                        }}</span>
                        <i class="icon-eventbadge-shiho3 drop-shadow-sm" />
                    </div>
                    <div class="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-5">
                        <button
                            v-for="(item, key) in data.ptExchange"
                            :key="key"
                            class="flex flex-col items-center justify-center p-3 gap-2 rounded-2xl border-2 transition-all duration-300 active:scale-95 min-w-36 overflow-hidden shadow-sm"
                            :class="
                                ptExchange[key]! > 0
                                    ? 'border-miku bg-miku/10 dark:bg-miku/20 shadow-[0_4px_15px_rgba(51,204,187,0.15)]'
                                    : 'bg-white/40 dark:bg-slate-800/40 border-zinc-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-miku/50 dark:hover:border-miku/60'
                            "
                            @click="ptExchange[key]!++"
                        >
                            <div class="relative drop-shadow-md">
                                <div>
                                    <Component
                                        v-if="item.icon.startsWith('chara-')"
                                        :is="parseCharaIcon(item.icon)"
                                        class="size-16"
                                    />
                                    <i v-else :class="item.icon" class="size-16" />
                                </div>
                                <span
                                    class="absolute -right-2 -bottom-2 min-w-6 h-6 px-1.5 bg-miku text-white rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800"
                                    >{{
                                        ptExchange[key]! > 0
                                            ? ptExchange[key]! * data.ptExchange[key]!.count
                                            : data.ptExchange[key]!.count
                                    }}</span
                                >
                            </div>
                            <div
                                class="flex items-center text-sm font-bold text-slate-700 dark:text-slate-200 mt-1 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full border border-white/30 dark:border-slate-700/30"
                            >
                                <i class="icon-eventbadge-shiho3 mr-1 drop-shadow-sm" />
                                {{
                                    ptExchange[key]! > 0
                                        ? ptExchange[key]! * data.ptExchange[key]!.expense
                                        : data.ptExchange[key]!.expense
                                }}
                            </div>
                            <div class="h-8 w-20 mt-1">
                                <InputNumber
                                    v-model="ptExchange[key]!"
                                    :min="0"
                                    :max="data.ptExchange[key]!.limit"
                                    @click.stop
                                />
                            </div>
                            <div
                                v-if="data.ptExchange[key]!.limit !== Infinity"
                                class="text-[0.7rem] font-bold text-slate-500 dark:text-slate-400 mt-0.5"
                            >
                                余 {{ data.ptExchange[key]!.limit - ptExchange[key]! }}
                            </div>
                        </button>
                    </div>
                </TransitionGroup>
            </template>

            <template #materials>
                <h2 class="hidden">资源统计</h2>
                <PartH2 level="3">兑换物</PartH2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div
                        class="bg-white/40 dark:bg-slate-800/40 py-3 sm:py-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm grid grid-cols-2 items-center"
                    >
                        <div class="flex items-center justify-center whitespace-nowrap">
                            共获得
                            <span class="text-miku text-[1.05rem] sm:text-lg font-bold mx-1.5">{{
                                redGotCount
                            }}</span>
                            <i class="icon-material200 drop-shadow-sm" />
                        </div>
                        <div
                            class="flex items-center justify-center border-l dark:border-slate-600 border-slate-300 whitespace-nowrap"
                        >
                            消耗
                            <span
                                class="text-slate-500 dark:text-slate-400 text-[1.05rem] sm:text-lg font-bold mx-1.5"
                                >{{ redUsedCount }}</span
                            >
                            <i class="icon-material200 drop-shadow-sm" />
                        </div>
                    </div>
                    <div
                        class="bg-white/40 dark:bg-slate-800/40 py-3 sm:py-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm grid grid-cols-2 items-center"
                    >
                        <div class="flex items-center justify-center whitespace-nowrap">
                            共获得
                            <span class="text-miku text-[1.05rem] sm:text-lg font-bold mx-1.5">{{
                                blueGotCount
                            }}</span>
                            <i class="icon-material201 drop-shadow-sm" />
                        </div>
                        <div
                            class="flex items-center justify-center border-l dark:border-slate-600 border-slate-300 whitespace-nowrap"
                        >
                            消耗
                            <span
                                class="text-slate-500 dark:text-slate-400 text-[1.05rem] sm:text-lg font-bold mx-1.5"
                                >{{ blueUsedCount }}</span
                            >
                            <i class="icon-material201 drop-shadow-sm" />
                        </div>
                    </div>
                    <div
                        class="bg-white/40 dark:bg-slate-800/40 py-3 sm:py-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm grid grid-cols-2 items-center"
                    >
                        <div class="flex items-center justify-center whitespace-nowrap">
                            共获得
                            <span class="text-miku text-[1.05rem] sm:text-lg font-bold mx-1.5">{{
                                purpleGotCount
                            }}</span>
                            <i class="icon-material202 drop-shadow-sm" />
                        </div>
                        <div
                            class="flex items-center justify-center border-l dark:border-slate-600 border-slate-300 whitespace-nowrap"
                        >
                            消耗
                            <span
                                class="text-slate-500 dark:text-slate-400 text-[1.05rem] sm:text-lg font-bold mx-1.5"
                                >{{ purpleUsedCount }}</span
                            >
                            <i class="icon-material202 drop-shadow-sm" />
                        </div>
                    </div>
                    <div
                        class="bg-white/40 dark:bg-slate-800/40 py-3 sm:py-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm grid grid-cols-2 items-center"
                    >
                        <div class="flex items-center justify-center whitespace-nowrap">
                            共获得
                            <span class="text-miku text-[1.05rem] sm:text-lg font-bold mx-1.5">{{
                                rainbowGotCount
                            }}</span>
                            <i class="icon-material203 drop-shadow-sm" />
                        </div>
                        <div
                            class="flex items-center justify-center border-l dark:border-slate-600 border-slate-300 whitespace-nowrap"
                        >
                            消耗
                            <span
                                class="text-slate-500 dark:text-slate-400 text-[1.05rem] sm:text-lg font-bold mx-1.5"
                                >{{ rainbowUsedCount }}</span
                            >
                            <i class="icon-material203 drop-shadow-sm" />
                        </div>
                    </div>
                    <div
                        class="bg-white/40 dark:bg-slate-800/40 py-3 sm:py-4 rounded-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium shadow-sm grid grid-cols-2 items-center col-span-1 md:col-span-2 lg:col-span-1"
                    >
                        <!--                        <div class="flex items-center justify-center whitespace-nowrap">-->
                        <!--                            共消耗-->
                        <!--                            <span-->
                        <!--                                class="text-slate-500 dark:text-slate-400 text-[1.05rem] sm:text-lg font-bold mx-1.5"-->
                        <!--                                >{{ ptUsedCount }}</span-->
                        <!--                            >-->
                        <!--                            <i class="icon-eventbadge-shiho3 drop-shadow-sm" />-->
                        <!--                        </div>-->
                        <div
                            class="flex items-center justify-center dark:border-slate-600 border-slate-300 whitespace-nowrap"
                        >
                            消耗
                            <span
                                class="text-blue-400 text-[1.05rem] sm:text-lg font-bold ml-1.5 mr-1 text-shadow-sm"
                                >{{ paidJewelUsedCount }}</span
                            >
                            <span class="text-sm dark:text-slate-400 text-slate-500 mr-1"
                                >付费</span
                            >
                            <i class="icon-jewel drop-shadow-sm" />
                        </div>
                    </div>
                </div>

                <PartH2 level="3">获得的资源</PartH2>
                <div class="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-5 pb-8">
                    <div
                        v-for="(item, key) in statistics"
                        :key="key"
                        class="flex flex-col items-center justify-center p-3 gap-2 rounded-2xl border border-white/40 bg-white/40 dark:bg-slate-800/40 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-colors shadow-sm min-w-24 overflow-hidden"
                    >
                        <div class="relative drop-shadow-md">
                            <div>
                                <Component
                                    v-if="item.icon.startsWith('chara-')"
                                    :is="parseCharaIcon(item.icon)"
                                    class="size-16"
                                />
                                <i v-else :class="item.icon" class="size-16" />
                            </div>
                            <span
                                v-if="item.count > 1"
                                class="absolute -right-2 -bottom-2 min-w-6 h-6 px-1.5 bg-miku text-white rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800"
                                >{{ item.count }}</span
                            >
                        </div>
                    </div>
                </div>
            </template>

            <template #importExport>
                <h2 class="hidden">导入导出</h2>
                <div
                    class="flex flex-nowrap items-center my-4 text-slate-700 dark:text-slate-200 font-medium"
                >
                    清空选择：
                    <div class="w-20">
                        <ButtonNormal type="secondary" @click="clearUI">清空</ButtonNormal>
                    </div>
                </div>
                <div
                    class="flex flex-nowrap items-center my-4 text-slate-700 dark:text-slate-200 font-medium border-t border-slate-200 dark:border-slate-700/50 pt-4"
                >
                    导出到剪切板：
                    <div class="w-20"><ButtonNormal @click="exportAndCopy">导出</ButtonNormal></div>
                </div>

                <div
                    class="flex flex-nowrap items-center my-4 text-slate-700 dark:text-slate-200 font-medium"
                >
                    导入：
                    <div class="w-20 mr-3">
                        <ButtonNormal @click="importFromText">导入</ButtonNormal>
                    </div>
                    <span
                        v-if="importStat == true"
                        class="text-miku font-bold bg-miku/10 px-3 py-1 rounded-full border border-miku/20"
                    >
                        导入成功！
                    </span>
                    <span
                        v-else-if="importStat == false"
                        class="text-red-500 dark:text-red-400 font-bold bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full border border-red-200 dark:border-red-800/50"
                    >
                        导入失败！
                    </span>
                </div>
                <div class="h-40">
                    <InputTextarea v-model="importText" placeholder="在此粘贴导出的数据..." />
                </div>
            </template>
        </ContainerTab>
    </ContainerPageContent>
    <!-- 给底部留出滑动空间 -->
    <div class="h-30" />
    <!--    <div-->
    <!--        class="fixed right-6 size-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md flex items-center justify-center text-slate-800 dark:text-slate-100 text-2xl z-50 rounded-full shadow-lg border border-white/50 dark:border-slate-700/50 cursor-pointer transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-miku/30 dark:hover:shadow-miku/20 active:scale-95 group"-->
    <!--        :style="`bottom: calc(var(&#45;&#45;spacing) * 6 + ${footerOverlapHeight}px)`"-->
    <!--    >-->
    <!--        <div-->
    <!--            class="absolute inset-0 rounded-full bg-linear-to-tr from-miku/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"-->
    <!--        ></div>-->
    <!--        <i-->
    <!--            class="icon-material-bare170 size-24 drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(51,204,187,0.5)] transition-all duration-300 relative z-10"-->
    <!--        />-->
    <!--        <span-->
    <!--            class="absolute right-0 bottom-0 min-w-8 h-6 px-2 bg-miku text-white rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800 z-20"-->
    <!--            >{{ pCountFormatted }}</span-->
    <!--        >-->
    <!--    </div>-->
</template>

<style scoped>
.yslide-enter-active,
.yslide-leave-active,
.yslide-move {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.yslide-enter-from {
    opacity: 0;
    transform: translateY(-2.69rem);
}

.yslide-leave-to {
    opacity: 0;
}

.yslide-leave-active {
    margin-top: -2.69rem;
}
</style>
