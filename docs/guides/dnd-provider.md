---
order: 6
group:
  title: 组件
  order: 2
title: DndProvider
---

# DndProvider

React DnD 新手？请在阅读文档之前先[阅读概述](/guides)。

DndProvider 组件为您的应用程序提供 React-DnD 功能。它必须通过后端道具注入后端，但也可以注入窗口对象。

### 用法

```tsx | pure
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default class YourApp {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        /* Your Drag-and-Drop Application */
      </DndProvider>
    );
  }
}
```

### 属性

- backend： 需要。React DnD 后端。除非您正在编写自定义后端，否则您可能希望使用 React DnD 附带的 HTML5 后端。
- context： 可选。用于配置后台的后台上下文。这取决于后端实现。
- options： 可选项。用于配置后端的选项对象。这取决于后端实现。
