const data = {
  mainPage: "Main Page",
  done: "Done",
  openNewPage: "Open New Page",
  newPageTitle: "New Page",
  newPageText: "This is a new page",
  increment: "Increment",
  decrement: "Decrement",
  widgetText: "This is a widget",
  noShortcutParameterFound: "No shortcut parameter found",
  shortcutTextParamOnly: "Shortcut parameter must be a text",
  myInfoSuccessful: (
    name: string,
    age: number,
    email: string
  ) => `My info is ${name} ${age} ${email}.`,
}

export type I18nData = typeof data

export default data