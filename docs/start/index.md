---
order: 0
title: 开始
nav:
  title: 开始
  order: 0
---

React DnD 是一套 React 实用工具，可帮助您构建复杂的拖放界面，同时保持组件的解耦。它非常适合 Trello 和 Storify 等应用程序，在这些应用程序中，拖动会在应用程序的不同部分之间传输数据，而组件会根据拖放事件改变其外观和应用程序状态。

## 安装

```shell
npm install react-dnd react-dnd-html5-backend
```

第二个软件包将允许 React DnD 在引擎盖下使用 [HTML5 拖放 API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop)。您可以选择使用第三方后端，例如[touch backend](https://npmjs.com/package/react-dnd-touch-backend)。

## 用法

```tsx | pure
// Let's make <Card text='Write the docs' /> draggable!

import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Constants';

/**
 * Your Component
 */
export default function Card({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  );
}
```

## 特性

### 与组件配合使用

React DnD 不提供现成的部件，而是封装您的组件并将道具注入其中。如果您使用 React Router 或 Flummox，您就已经知道这种模式了。

### 单向数据流

React DnD 完全采用了 React 的声明式呈现范例，并且不会更改 DOM。它是 Redux 和其他单向数据流架构的绝佳补充。事实上，它就是基于 Redux 构建的。

### 隐藏平台的怪异之处

HTML5 拖放的应用程序接口非常笨拙，充满了陷阱和浏览器的不一致性。React DnD 会在内部为您处理这些问题，因此您可以专注于开发应用程序，而不是解决浏览器的 bug。

### 可扩展、可测试

React DnD 在引擎盖下使用 HTML5 拖放功能，但也允许您提供自定义 "后台"。您可以根据触摸事件、鼠标事件或其他事件创建自定义的 DnD 后端。例如，内置的模拟后端可让您在 Node 环境中测试组件的拖放交互。

## 触摸支持

如需触摸支持，请使用具有[touch backend](https://npmjs.com/package/react-dnd-touch-backend)的 React DnD，而不是 HTML5 后台。

## 非目标

React DnD 为您提供了一套功能强大的基元，但不包含任何现成的组件。它的级别低于 [jQuery UI](https://jqueryui.com/) 或 [interact.js](http://interactjs.io/)，并且专注于实现正确的拖放交互，而将轴约束或抓取等可视化方面的问题留给了您。例如，React DnD 并不打算提供合适的组件。相反，它为您提供了所需的工具，让您可以根据需要自定义构建自己的呈现方式。

## 支持和捐助

在 [GitHub](https://github.com/react-dnd/react-dnd/issues) 上讨论问题和潜在改进。

## 致谢

非常感谢 [BrowserStack](https://www.browserstack.com/) 允许维护者使用他们的服务来调试浏览器问题。

## 许可证

React DnD 采用 MIT 许可。请随意使用。
