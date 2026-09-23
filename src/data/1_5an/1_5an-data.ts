import type { FixedLengthArray } from "@/types/typeConstraints.ts";

type Rewards = {
    redDrip?: number;
    blueDrip?: number;
    purpleDrip?: number;
    rainbowP?: number;
    rainbowMelody?: number;
    gachaFree?: number;
    jewel?: number;
    drink?: number;
    drinkL?: number;
    heartpiece?: number;
    virtual_coin?: number;
    skill2?: number;
    tone?: number;
    coin?: number;
    material14?: number; // 彩虹晶石
    material127?: number; // Leo/need 心愿碎片
    material128?: number; // MORE MORE JUMP! 心愿碎片
    material129?: number; // Vivid BAD SQUAD 心愿碎片
    material130?: number; // Wonderlands×Showtime 心愿碎片
    material131?: number; // 25-ji, Nightcord de. 心愿碎片
    material132?: number; // VIRTUAL SINGER 心愿碎片
};

const rewardIcon = {
    redDrip: "icon-material200",
    blueDrip: "icon-material201",
    purpleDrip: "icon-material202",
    rainbowP: "icon-material203",
    rainbowMelody: "icon-material204",
    gachaFree: "icon-gacha-ticket-cn-free",
    jewel: "icon-jewel",
    drink: "icon-boost-item1",
    drinkL: "icon-boost-item2",
    virtual_coin: "icon-virtual-coin",
    skill2: "icon-skill-practice-ticket2",
    tone: "icon-tone",
    coin: "icon-coinset",
    material14: "icon-material14",
    heartpiece: "icon-material15",
    material127: "icon-material127",
    material128: "icon-material128",
    material129: "icon-material129",
    material130: "icon-material130",
    material131: "icon-material131",
    material132: "icon-material132"
};

const preSignIn: FixedLengthArray<Rewards, 3> = [
    {
        drinkL: 1,
        material14: 50,
        heartpiece: 100
    },
    {
        drinkL: 1,
        skill2: 2,
        virtual_coin: 300
    },
    {
        drinkL: 1,
        tone: 1,
        coin: 100000
    }
];

const signIn: FixedLengthArray<Rewards, 7> = [
    {
        rainbowMelody: 1,
        jewel: 5000,
        drinkL: 3,
        gachaFree: 10
    },
    { drinkL: 2, gachaFree: 10 },
    { drinkL: 1, gachaFree: 10 },
    { drinkL: 1, gachaFree: 10 },
    { drinkL: 1, gachaFree: 10 },
    { drinkL: 1, gachaFree: 10 },
    { drinkL: 1, gachaFree: 10 }
];

export interface MemoryGiftLevel {
    text: string;
    reward: Record<
        string,
        {
            count: number;
            icon: string;
        }
    >;
}

const memoryGifts: {
    day: number;
    date: string;
    details: string;
    level: MemoryGiftLevel[];
}[] = [
    {
        day: 1,
        date: "DAY1 9.27",
        details: "累计登录天数",
        level: [
            {
                text: "30 天",
                reward: { gachaFree: { count: 3, icon: "icon-gacha-ticket-cn-free" } }
            },
            {
                text: "100 天",
                reward: { gachaFree: { count: 5, icon: "icon-gacha-ticket-cn-free" } }
            },
            {
                text: "250 天",
                reward: { gachaFree: { count: 7, icon: "icon-gacha-ticket-cn-free" } }
            },
            {
                text: "365 天",
                reward: { gachaFree: { count: 10, icon: "icon-gacha-ticket-cn-free" } }
            }
        ]
    },
    {
        day: 2,
        date: "DAY2 9.28",
        details: "歌曲的完成、FC、AP数",
        level: [
            {
                text: "30 首",
                reward: { exp3: { count: 3, icon: "icon-practice-ticket3" } }
            },
            {
                text: "60 首",
                reward: { exp3: { count: 5, icon: "icon-practice-ticket3" } }
            },
            {
                text: "100 首",
                reward: { exp3: { count: 7, icon: "icon-practice-ticket3" } }
            },
            {
                text: "150 首",
                reward: { exp3: { count: 10, icon: "icon-practice-ticket3" } }
            }
        ]
    },
    {
        day: 3,
        date: "DAY3 9.29",
        details: "拥有的成员数",
        level: [
            {
                text: "50 人",
                reward: { skill3: { count: 1, icon: "icon-skill-practice-ticket3" } }
            },
            {
                text: "100 人",
                reward: { skill3: { count: 2, icon: "icon-skill-practice-ticket3" } }
            },
            {
                text: "150 人",
                reward: { skill3: { count: 3, icon: "icon-skill-practice-ticket3" } }
            },
            {
                text: "200 人",
                reward: { skill3: { count: 4, icon: "icon-skill-practice-ticket3" } }
            }
        ]
    },
    {
        day: 4,
        date: "DAY4 9.30",
        details: "已制作家具的种类数",
        level: [
            {
                text: "10 种",
                reward: { material168: { count: 3, icon: "icon-material168" } }
            },
            {
                text: "25 种",
                reward: { material168: { count: 5, icon: "icon-material168" } }
            },
            {
                text: "50 种",
                reward: { material168: { count: 7, icon: "icon-material168" } }
            },
            {
                text: "80 种",
                reward: { material168: { count: 10, icon: "icon-material168" } }
            }
        ]
    },
    {
        day: 5,
        date: "DAY5 10.1",
        details: "最高角色等级",
        level: [
            {
                text: "20 级",
                reward: { jewel: { count: 100, icon: "icon-jewel" } }
            },
            {
                text: "35 级",
                reward: { jewel: { count: 200, icon: "icon-jewel" } }
            },
            {
                text: "50 级",
                reward: { jewel: { count: 300, icon: "icon-jewel" } }
            },
            {
                text: "65 级",
                reward: { jewel: { count: 400, icon: "icon-jewel" } }
            }
        ]
    },
    {
        day: 6,
        date: "DAY6 10.2",
        details: "主线、活动剧情全部观看率",
        level: [
            {
                text: "25%",
                reward: { heartpiece: { count: 100, icon: "icon-material15" } }
            },
            {
                text: "50%",
                reward: { heartpiece: { count: 200, icon: "icon-material15" } }
            },
            {
                text: "75%",
                reward: { heartpiece: { count: 300, icon: "icon-material15" } }
            },
            {
                text: "100%",
                reward: { heartpiece: { count: 400, icon: "icon-material15" } }
            }
        ]
    },
    {
        day: 7,
        date: "DAY7 10.3",
        details: "最高活动排名",
        level: [
            {
                text: "前100000名",
                reward: { drinkL: { count: 3, icon: "icon-boost-item2" } }
            },
            {
                text: "前50000名",
                reward: { drinkL: { count: 5, icon: "icon-boost-item2" } }
            },
            {
                text: "前20000名",
                reward: { drinkL: { count: 7, icon: "icon-boost-item2" } }
            },
            {
                text: "前1000名",
                reward: { drinkL: { count: 10, icon: "icon-boost-item2" } }
            }
        ]
    }
] as const;

const stamp: {
    description: string;
    level: { require: string; rewards: Rewards; extra?: string[] }[];
}[] = [
    {
        description: "组合卡",
        level: [
            {
                require: "选择VS分类的歌完成30次演出",
                rewards: {
                    redDrip: 1000,
                    material132: 300
                },
                extra: ["可以使用Auto"]
            },
            {
                require: "选择 LN 的书下曲完成30次演出",
                rewards: {
                    redDrip: 1000,
                    material127: 300
                },
                extra: ["不可使用Auto，仅成员箱活书下曲，团曲、电影原创曲等不包含在内"]
            },
            {
                require: "选择 MMJ 的书下曲完成30次演出",
                rewards: {
                    redDrip: 1000,
                    material128: 300
                },
                extra: ["不可使用Auto，仅成员箱活书下曲，团曲、电影原创曲等不包含在内"]
            },
            {
                require: "选择 VBS 的书下曲完成30次演出",
                rewards: {
                    redDrip: 1000,
                    material129: 300
                },
                extra: ["不可使用Auto，仅成员箱活书下曲，团曲、电影原创曲等不包含在内"]
            },
            {
                require: "选择 WS 的书下曲完成30次演出",
                rewards: {
                    redDrip: 1000,
                    material130: 300
                },
                extra: ["不可使用Auto，仅成员箱活书下曲，团曲、电影原创曲等不包含在内"]
            },
            {
                require: "选择 25 的书下曲完成30次演出",
                rewards: {
                    redDrip: 1000,
                    material131: 300
                },
                extra: ["不可使用Auto，仅成员箱活书下曲，团曲、电影原创曲等不包含在内"]
            }
        ]
    },
    {
        description: "演出卡",
        level: [
            {
                require: "累计完成1.5周年追加歌曲30次",
                rewards: {
                    blueDrip: 300,
                    drinkL: 1
                }
            },
            {
                require: "累计FC 20次（歌曲、难度不限）",
                rewards: {
                    blueDrip: 600,
                    drinkL: 2
                }
            },
            {
                require: "累计AP 15次（歌曲、难度不限）",
                rewards: {
                    blueDrip: 1000,
                    drinkL: 3
                }
            }
        ]
    },
    {
        description: "挑战任务",
        level: [
            {
                require: "完成全部子任务",
                rewards: {
                    blueDrip: 300,
                    drinkL: 1
                },
                extra: [
                    "完成1次《ペンタトニック（五声音阶）》",
                    "完成多人演出10次",
                    "达成Super Fever 3次（SF：多人演出且五人进歌，所有人在Fever Chance阶段全连）",
                    "累计消耗50点演出能量",
                    "观看活动“Our Golden Days”的结局",
                    "累计获得20w活动pt",
                    "烤森采集200个材料（不包括特殊活动材料与生日庆典甘露）"
                ]
            },
            {
                require: "完成全部子任务",
                rewards: {
                    blueDrip: 600,
                    drinkL: 2
                },
                extra: [
                    "完成10次《ペンタトニック（五声音阶）》",
                    "完成多人演出30次",
                    "达成Super Fever 10次",
                    "累计消耗100点演出能量",
                    "观看活动“Our Golden Days”的结局",
                    "累计获得100w活动pt",
                    "烤森采集500个材料（不包括特殊活动材料与生日庆典甘露）"
                ]
            },
            {
                require: "完成全部子任务",
                rewards: {
                    blueDrip: 1000,
                    drinkL: 3
                },
                extra: [
                    "多人演出中5人全员FC 5次",
                    "达成Super Fever 15次",
                    "获得MVP或SUPER STAR（多人演出结算时分数最高者）10次",
                    "完成30首不同的歌曲",
                    "累计消耗300点演出能量",
                    "累计获得300w活动pt",
                    "烤森采集1000个材料（不包括特殊活动材料与生日庆典甘露）"
                ]
            }
        ]
    },
    {
        description: "招募·商店",
        level: [
            {
                require: "累计招募任意卡池50次",
                rewards: {
                    purpleDrip: 60,
                    gachaFree: 10
                }
            },
            {
                require: "完成全部子任务",
                rewards: {
                    purpleDrip: 140,
                    gachaFree: 20,
                    jewel: 1000
                },
                extra: [
                    "累计招募任意卡池 100 次",
                    "招募 50 次 fes池或当期活动池",
                    "招募 1 个高级礼物池（团服池）",
                    "招募庆典服装阶梯池到 step1",
                    "招募纪念自选池",
                    "购买 1 种 1.5 周年纪念礼包（300的不算）",
                    "购买 10 月份的白金通行证或烤森通行证"
                ]
            },
            {
                require: "完成全部子任务",
                rewards: {
                    purpleDrip: 200,
                    gachaFree: 30,
                    jewel: 2000
                },
                extra: [
                    "累计招募任意卡池 200 次",
                    "招募 100 次 fes池或当期活动池",
                    "招募 2 个高级礼物池（团服池）",
                    "招募庆典服装阶梯池到 step4",
                    "招募纪念自选池",
                    "购买 2 种 1.5 周年纪念礼包（300的不算）",
                    "购买 10 月份的白金通行证或烤森通行证"
                ]
            }
        ]
    }
];

const costumePriceLevel = [500, 1000, 2000, 3900] as const;

type exchangeChoice = { count: number; expense: number; limit: number; icon: string };
const redExchange = {
    jewel: {
        count: 300,
        expense: 200,
        limit: 1,
        icon: "icon-jewel"
    },
    skill3: {
        count: 1,
        expense: 250,
        limit: 5,
        icon: "icon-skill-practice-ticket3"
    },
    exp3: {
        count: 10,
        expense: 300,
        limit: 5,
        icon: "icon-practice-ticket3"
    },
    liveCoin: {
        count: 300,
        expense: 500,
        limit: 5,
        icon: "icon-virtual-coin"
    },
    coin: {
        count: 1,
        expense: 1,
        limit: Infinity,
        icon: "icon-coin"
    }
} satisfies Record<string, exchangeChoice>;

const blueExchange = {
    jewel: {
        count: 300,
        expense: 200,
        limit: 1,
        icon: "icon-jewel"
    },
    anniv1_5Furniture: {
        count: 1,
        expense: 500,
        limit: 1,
        icon: "icon-text-['家具占位']"
    },
    blueprint: {
        count: 1,
        expense: 300,
        limit: 2,
        icon: "icon-item-blueprint"
    },
    chainsaw: {
        count: 1,
        expense: 300,
        limit: 2,
        icon: "icon-axe5"
    },
    rockDrill: {
        count: 1,
        expense: 300,
        limit: 2,
        icon: "icon-pickaxe5"
    },
    coin: {
        count: 1,
        expense: 1,
        limit: Infinity,
        icon: "icon-coin"
    }
} satisfies Record<string, exchangeChoice>;

const purpleExchange = {
    cos: {
        count: 1,
        expense: 300,
        limit: 1,
        icon: "icon-text-['服装占位']"
    },
    heartcrystal: {
        count: 1,
        expense: 100,
        limit: 1,
        icon: "icon-material16"
    },
    bottleVs: {
        count: 1,
        expense: 100,
        limit: 1,
        icon: "icon-item-expset-vs"
    },
    bottleLn: {
        count: 1,
        expense: 100,
        limit: 1,
        icon: "icon-item-expset-ln"
    },
    bottleMmj: {
        count: 1,
        expense: 100,
        limit: 1,
        icon: "icon-item-expset-mmj"
    },
    bottleVbs: {
        count: 1,
        expense: 100,
        limit: 1,
        icon: "icon-item-expset-vbs"
    },
    bottleWs: {
        count: 1,
        expense: 100,
        limit: 1,
        icon: "icon-item-expset-ws"
    },
    bottle25: {
        count: 1,
        expense: 100,
        limit: 1,
        icon: "icon-item-expset-25"
    },
    coin: {
        count: 1,
        expense: 1,
        limit: Infinity,
        icon: "icon-coin"
    }
} satisfies Record<string, exchangeChoice>;

const rainbowExchange = {
    gachaFree: {
        count: 100,
        expense: 1,
        limit: 1,
        icon: "icon-gacha-ticket-cn-free"
    },
    heartcrystal: {
        count: 3,
        expense: 1,
        limit: 1,
        icon: "icon-material16"
    },
    drinkL: {
        count: 50,
        expense: 1,
        limit: 1,
        icon: "icon-boost-item2"
    }
} satisfies Record<string, exchangeChoice>;

type setExchangeChoice = {
    expense: number;
    limit: number;
    icon: string;
    content: Record<string, { count: number; icon: string }>;
};

const medalExchange: Record<string, setExchangeChoice> = {
    // 300金牌：丰盛园艺礼包
    gardeningSet: {
        expense: 300,
        limit: 1,
        icon: "icon-gardeningset",
        content: {
            seed: {
                count: 250,
                icon: "icon-material17"
            },
            shizuku: {
                count: 15,
                icon: "icon-material57"
            }
        }
    },

    // 200金牌：闪亮珠宝礼包
    kirakiraSet: {
        expense: 200,
        limit: 1,
        icon: "icon-kirakiraset",
        content: {
            diamond: {
                count: 5,
                icon: "icon-item-mineral7"
            },
            material168: {
                count: 5,
                icon: "icon-material168"
            },
            material14: {
                count: 100,
                icon: "icon-material14"
            },
            jemSet: {
                count: 1000,
                icon: "icon-jem-set"
            }
        }
    },

    // 150金牌：100张技能升级用乐谱（中级）礼包
    skillPracticeSet: {
        expense: 150,
        limit: 1,
        icon: "icon-skillpracticeset",
        content: {
            skill2: {
                count: 100,
                icon: "icon-skill-practice-ticket2"
            }
        }
    },

    // 200金牌：大富豪硬币礼包
    coinSet: {
        expense: 200,
        limit: 1,
        icon: "icon-coinset",
        content: {
            coin: {
                count: 7777777,
                icon: "icon-coinset"
            }
        }
    },

    // 100金牌：大量硬币礼包
    coinMiddleSet: {
        expense: 100,
        limit: 1,
        icon: "icon-coinmiddleset",
        content: {
            coin: {
                count: 3000000,
                icon: "icon-coinmiddleset"
            }
        }
    },

    // 50金牌：适量金币礼包
    coinSmallSet: {
        expense: 50,
        limit: 1,
        icon: "icon-coinsmallset",
        content: {
            coin: {
                count: 1000000,
                icon: "icon-coinsmallset"
            }
        }
    },

    // 1金牌：硬币×10000
    singleCoin: {
        expense: 1,
        limit: Infinity,
        icon: "icon-coin",
        content: {
            coin: {
                count: 10000,
                icon: "icon-coin"
            }
        }
    }
};

export default {
    preSignIn,
    signIn,
    rewardIcon,
    memoryGifts,
    stamp,
    costumePriceLevel,
    redExchange,
    blueExchange,
    purpleExchange,
    rainbowExchange,
    medalExchange
};
