import * as fs from "node:fs";
import * as path from "node:path";
import type { Plugin } from "vite";

function generateIconCSS({
    inputDir = "public/assets/icons",
    outputFile = "src/styles/icons.css",
    iconSize = "1.5em"
} = {}) {
    const iconsDir = path.resolve(process.cwd(), inputDir);
    const outputCss = path.resolve(process.cwd(), outputFile);

    let icons: { [key: string]: string } = {};

    for (let i = 1; i <= 225; i++) {
        icons[`material${i}`] =
            `https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material/material${i}.png`;
    }
    // for (let i = 1; i <= 225; i++) {
    //     icons[`material-bare${i}`] =
    //         `https://storage.exmeaning.com/sekai-jp-assets/ondemand/mysekai/item_preview/material/material${i}.png`;
    // }
    for (let i = 1; i <= 27; i++) {
        icons[`boost-item${i}`] =
            `https://storage.exmeaning.com/sekai-jp-assets/thumbnail/boost_item/boost_item${i}.png`;
    }
    for (let i = 1; i <= 916; i++) {
        icons[`gacha-logo${i}`] =
            `https://storage.exmeaning.com/sekai-jp-assets/gacha/ab_gacha_${i}/logo/logo.png`;
        icons[`gacha-banner${i}`] =
            `https://storage.exmeaning.com/sekai-jp-assets/home/banner/banner_gacha${i}/banner_gacha${i}.png`;
    }
    for (let i = 1; i <= 4; i++) {
        icons[`skill-practice-ticket${i}`] =
            `https://storage.exmeaning.com/sekai-jp-assets/thumbnail/skill_practice_ticket/ticket${i}.png`;
    }
    for (let i = 1; i <= 4; i++) {
        icons[`practice-ticket${i}`] =
            `https://storage.exmeaning.com/sekai-jp-assets/thumbnail/practice_ticket/ticket${i}.png`;
    }
    icons[`tone`] =
        "https://storage.exmeaning.com/sekai-jp-assets/mysekai/thumbnail/material/item_tone_8.png";
    for (let i = 1; i <= 5; i++) {
        for (const type of [
            ["ax", "axe"],
            ["pickax", "pickaxe"]
        ]) {
            icons[`${type[1]}${i}`] =
                `https://storage.exmeaning.com/sekai-jp-assets/mysekai/thumbnail/tool/${type[0]}000${i}.png`;
            icons[`${type[1]}${i}-bare`] =
                `https://storage.exmeaning.com/sekai-jp-assets/mysekai/thumbnail/tool/${type[0]}000${i}_t.png`;
        }
    }
    for (let i = 1; i <= 10; i++) {
        icons[`item-mineral${i}`] =
            `https://storage.exmeaning.com/sekai-jp-assets/mysekai/thumbnail/material/item_mineral_${i}.png`;
    }
    for (let i = 1; i <= 4; i++) {
        icons[`item-plant${i}`] =
            `https://storage.exmeaning.com/sekai-jp-assets/mysekai/thumbnail/material/item_plant_${i}.png`;
    }
    icons[`item-blueprint`] =
        `https://storage.exmeaning.com/sekai-jp-assets/mysekai/thumbnail/item/item_blank_blueprint.png`;
    icons[`item-material-storageadd`] =
        `https://storage.exmeaning.com/sekai-jp-assets/mysekai/thumbnail/player_status/item_material_storageadd.png`;
    icons["heartcrystal-bare"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/common_event/heart/icon_heartcrystal.png";
    icons["heartpiece-bare"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/common_event/heart/icon_heartpiece.png";
    icons["coinset"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_gr_coinset.png";
    icons["coinmiddleset"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_gr_coinmiddleset.png";
    icons["coinsmallset"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_gr_coinsmallset.png";
    icons["boostitemset"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_gr_boostitemset.png";
    icons["gardeningset"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_gr_gardeningset.png";
    icons["kirakiraset"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_gr_kirakiraset.png";
    icons["skillpracticeset"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_gr_skillpracticeset.png";
    icons["jem-set"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/resource_box/material_jem_set.png";
    icons["jewel"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/common_material/jewel.png";
    icons["virtual-coin"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/common_material/virtual_coin.png";
    icons["coin"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/common_material/coin.png";
    icons["gacha-ticket"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/gacha_ticket/gacha_ticket.png";
    icons["gacha-ticket-cn-free"] =
        "https://storage.exmeaning.com/sekai-cn-assets/thumbnail/gacha_ticket/gacha_ticket_cn_free.png";
    icons["gacha-ticket-star4"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/gacha_ticket/gacha_ticket_star4.png";
    icons["item-expset-25"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_expset_25.png";
    icons["item-expset-ln"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_expset_ln.png";
    icons["item-expset-mmj"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_expset_mj.png";
    icons["item-expset-vbs"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_expset_vb.png";
    icons["item-expset-vs"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_expset_vs.png";
    icons["item-expset-ws"] =
        "https://storage.exmeaning.com/sekai-jp-assets/thumbnail/material_exchange/item_expset_ws.png";

    for (const name of ["shiho"]) {
        for (let i = 1; i <= 4; i++) {
            icons[`eventbadge-${name}${i}`] =
                `https://storage.exmeaning.com/sekai-jp-assets/thumbnail/common_event/badge_${name}/icon_eventbadge_${i}.png`;
        }
    }

    function scanIcons(currentDir: string, relativePath: string[] = []) {
        if (!fs.existsSync(currentDir)) return;

        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                scanIcons(fullPath, [...relativePath, entry.name]);
            } else {
                const ext = path.extname(entry.name).toLowerCase();
                if ([".webp", ".png", ".jpg", ".svg"].includes(ext)) {
                    const fileName = path.parse(entry.name).name;
                    const iconKey = [...relativePath, fileName].join("-");
                    icons[iconKey] = ["/assets/icons", ...relativePath, entry.name].join("/");
                }
            }
        }
    }

    scanIcons(iconsDir);

    let cssContent = `@utility icon-base{
    width: ${iconSize};
    height: ${iconSize};
    display: inline-block;
    vertical-align: middle;
    margin: 4px;

    &::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
}
@utility icon-text-* {
    container-type: inline-size;
    
    @apply icon-base;

    &::after {
        content: --value([*]);

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-style: normal;

        width: 100%;
        max-width: calc(var(--cols, 2) * 1.15em);
        margin: 0 auto;
        word-break: break-all;

        line-height: 1.25;

        letter-spacing: 0.08em;
        text-indent: 0.08em;

        font-size: calc(100cqi / var(--cols, 2) * 0.72);
        font-weight: 400;
        user-select: none;
    }
}`;
    for (const [iconName, filePath] of Object.entries(icons)) {
        cssContent += `
@utility icon-${iconName} {
    @apply icon-base;

    &::after {
        background-image: url('${filePath}');
    }
}
`;
    }
    cssContent = `${cssContent}`;
    fs.writeFileSync(outputCss, cssContent.trim());
}

export default function vitePluginIcon(options = {}): Plugin {
    return {
        name: "icon-css-generator",
        buildStart() {
            generateIconCSS(options);
        },
        configureServer(server) {
            // server.watcher 就是 chokidar 的实例

            // 监听新增文件
            server.watcher.on("add", (filePath) => {
                if (filePath.includes("src/assets/icons")) {
                    generateIconCSS(options);
                }
            });

            // 监听删除文件
            server.watcher.on("unlink", (filePath) => {
                if (filePath.includes("src/assets/icons")) {
                    generateIconCSS(options);
                }
            });
        }
    };
}
