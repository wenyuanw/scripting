import { I18nData } from "./en"

const data: I18nData = {
  mainPage: "主页",
  done: "完成",
  openNewPage: "打开新页面",
  newPageTitle: "新页面",
  newPageText: "这是新页面",
  increment: "增加",
  decrement: "减少",
  widgetText: "这是一个小部件",
  noShortcutParameterFound: "没有找到快捷参数",
  shortcutTextParamOnly: "快捷参数必须是文本",
  myInfoSuccessful: (
    name: string,
    age: number,
    email: string
  ) => `我的信息是 ${name} ${age} ${email}。`,
}

export default data