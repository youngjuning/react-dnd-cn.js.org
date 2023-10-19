---
order: 1
group:
  title: 后端
  order: 5
title: HTML5
description: ''
keywords: []
---

# HTML5

这是 React-DnD 支持的主要后端。它在引擎盖下使用 [HTML5 拖放 API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop)，并隐藏其[怪异之处](http://quirksmode.org/blog/archives/2009/09/the_html5_drag.html)。

## 安装

```shell
npm install react-dnd-html5-backend
```

## 扩展

除默认导出外，HTML5 后端模块还提供一些额外功能：

* getEmptyImage()：是一个返回透明空图像的函数。使用 DragSourceConnector 的 connect.dragPreview() 功能可完全隐藏浏览器绘制的拖动预览。这对使用 DragLayer 绘制自定义拖动图层非常有用。请注意，自定义拖动预览在 IE 中不起作用。
* NativeTypes：是一个由三个常量组成的枚举：NativeTypes.FILE, NativeTypes.URL 和 NativeTypes.TEXT。您可以为这些类型注册下拉目标，以处理本地文件、URL 或常规页面文本的下拉。

## 用法

```tsx | pure
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function MyReactApp() {
  return (
    <DndProvider backend={HTML5Backend}>
      /* your drag-and-drop application */
    </DndProvider>
  )
}
```

在监视器上调用 getItem() 时，HTML5 后端会根据下拉类型从事件中获取各种数据：

* NativeTypes.FILE：
  * getItem().files：文件数组
  * getItem().items： event.dataTransfer.items（您可以用它来在删除目录时列出文件）
* NativeTypes.URL：
  * getItem().urls：URL 数组
* NativeTypes.TEXT：
  * getItem().text：文本字符串
