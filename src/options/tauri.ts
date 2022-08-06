import { getAvailWidth, getAvailHeight } from "@/utils/window";
import type { WindowOptions } from "@tauri-apps/api/window";
import type { Path } from "@/types/router";

const commonTitle = "直播助手-";

const commonOption: WindowOptions = {
  resizable: false,
  fullscreen: false,
  maximized: false,
  decorations: false,
  transparent: true
};

const windowOptions: Record<Path, WindowOptions> = {
  "/": {
    title: "main"
  },
  "/barrage": {
    title: commonTitle + "弹幕姬",
    center: true,
    width: 360,
    height: 420,
    ...commonOption
  },
  "/music": {
    title: commonTitle + "音乐姬",
    x: 0,
    y: getAvailHeight() - 170,
    width: 400,
    height: 170,
    alwaysOnTop: true,
    ...commonOption
  },
  "/fans": {
    title: commonTitle + "粉丝姬",
    x: 0,
    y: 0,
    width: 500,
    height: 260,
    ...commonOption
  },
  "/clock": {
    title: commonTitle + "时钟姬",
    x: getAvailWidth() - 500,
    y: getAvailHeight() - 200,
    width: 500,
    height: 200,
    ...commonOption
  },
  "/prompt": {
    title: commonTitle + "提示姬",
    x: getAvailWidth() - 350,
    y: 0,
    width: 350,
    height: 450,
    ...commonOption
  },
  "/splash-screen": {}
};

export { windowOptions };