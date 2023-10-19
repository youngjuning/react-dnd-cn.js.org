---
group:
  title: 主题
  order: 0
order: 5
title: 故障排除
description: '故障排除'
keywords:
  [
    '无法在上下文中找到拖放管理器',
    '用 DragDropContext 封装顶层组件',
    '在单元测试中存根上下文',
    '确保没有重复的 React',
  ]
nav:
  title: 指南
  order: 2
  second:
    title: 主题
    order: 1
---

# 故障排除

本页专门讨论您在使用 React DnD 时可能遇到的问题。

## 无法在上下文中找到拖放管理器

出现这种错误有几种可能：

1. 您用 DragSource、DropTarget 或 DragLayer 封装了某些组件，但忘记用 DragDropContext 封装顶层组件。

2. 您用 DragDropContext 封装了顶层组件，但错误地导出了未封装的版本。

3. 您正在单元测试等隔离环境中使用组件。有关存根的说明，请参阅第二点。

4. 由于其他原因，上下文丢失了。如果能在小型项目中重现，[请提交问题](https://github.com/react-dnd/react-dnd/issues/new)。

### 用 DragDropContext 封装顶层组件

要修复此错误，请找到应用程序中的顶级组件。通常，这是根路由处理程序。它不一定是最顶层的组件，但必须在层次结构中高于使用 React DnD 的任何组件。使用 DragDropContext 调用来封装该组件。在调用中指定一个后端作为唯一的参数是很重要的。目前，React DnD 只提供 [HTML5 后端](/backends/html5)，但未来会支持触摸后端。

### 在单元测试中存根上下文

如果您在测试中遇到此错误，请阅读[测试指南](/guides/testing)，了解如何存根上下文。

### 确保没有重复的 React

如果您在 Browserify 或 Webpack 构建中重复安装了 React，也可能会出现此问题。[这篇文章](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375)将解释该问题及其解决方案。

## 你要检查 Redux 内部发生了什么。

在提供程序中添加 debugMode（值为 true）道具，即可启用 Redux DevTools。

```tsx | pure
<DndProvider debugMode={true} backend={HTML5Backend}>
```
