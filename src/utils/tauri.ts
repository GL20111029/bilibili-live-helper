import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
// import { WebviewWindow, appWindow } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import { NaiveMessage } from "./navie";
import { routes } from "@/router";
import type { Path } from "@/types/router";

/**
 * 开启一个新的窗口
 * @param url 窗口的路由地址
 */
const openNewWindow = async (url: Path) => {
  // 找到与 url 匹配到相关路由信息
  const findRoute = routes.find(({ path }) => path === url);
  // 窗口 label
  const label = findRoute?.name!;
  // 窗口 option
  const option = findRoute?.meta?.tauriOption;

  // 查找是否存在窗口 存在就显示并获取焦点 不存在则新建
  const newWindow = WebviewWindow.getByLabel(label);
  if (newWindow) {
    newWindow.show();
  } else {
    await new WebviewWindow(label, {
      url,
      ...(option || {})
    });
  }
};

/**
 * 最小化当前窗口
 */
const minimizeWindow = () => appWindow.minimize();

/**
 * 关闭当前窗口
 */
const closeWindow = () => appWindow.close();

/**
 * 隐藏当前窗口
 */
const hideWindow = () => appWindow.hide();

/**
 * 设置当前窗口置顶状态
 * @param value 是否置顶
 */
const setWindowOnTop = (value: boolean) => appWindow.setAlwaysOnTop(value);

/**
 * 复制文本
 * @param text 需要复制的文字
 */
const copyText = async (text: string) => {
  try {
    await writeText(text);

    NaiveMessage.success("复制成功");
  } catch (error) {
    NaiveMessage.error("复制失败");
  }
};

export {
  openNewWindow,
  minimizeWindow,
  closeWindow,
  hideWindow,
  setWindowOnTop,
  copyText
};