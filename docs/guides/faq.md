---
group:
  title: 主题
  order: 0
order: 4
title: FAQ
description: 'FAQ'
keywords:
  [
    '如何安装 React DnD?',
    '如何测试 React DnD 组件及其交互?',
    '如何使组件只能通过一个小手柄拖动?',
    '如何限制拖动预览的移动?',
    '当类型依赖于道具时，如何注册拖动源或拖放目标?',
    '如何在一个组件中组合多个拖放源和拖放目标?',
    '如何注册本地文件的拖动目标?',
    '如何编写自定义后台?',
    '我收到了 "超级表达式必须为空或函数，而不是未定义 "的错误信息',
    '为什么我的静态方法和属性不起作用?',
    '这是《龙与地下城》吗?',
    '它有多稳定?',
    '谁做的，为什么?',
    'How Do I Contribute?',
  ]
nav:
  title: 指南
  order: 2
  second:
    title: 主题
    order: 1
---

# FAQ

## 使用

### 如何安装 React DnD？

```shell
npm install --save react-dnd
npm install --save react-dnd-html5-backend
```

### 如何测试 React DnD 组件及其交互？

有关示例，请参阅[测试教程](/guides/testing)。

### 如何使组件只能通过一个小手柄拖动？

指定容器节点作为 dragPreview，但只将拖动句柄设置为 dragSource()。

### 如何限制拖动预览的移动？

默认情况下，您无法限制拖动预览的移动，因为拖动预览是由浏览器绘制的。不过，您可以使用`自定义拖动图层`，在该图层中，您可以自由渲染任何内容，也可以使用任何捕捉或限制。

### 当类型依赖于道具时，如何注册拖动源或拖放目标？

useDrag 和 useDrop 都可以接受一个类型参数。这可以根据您的道具值进行更改，类似于 useMemo() React 内置钩子的工作方式。

### 如何在一个组件中组合多个拖放源和拖放目标？

useDrag 和 useDrop 返回的函数都可以在节点的 ref 函数中连锁使用。例如

```tsx | pure
const [, drag] = useDrag(...args);
const [, drop] = useDrop(...args);

return <div ref={(node) => drag(drop(node))}></div>;
```

### 如何注册本地文件的拖动目标？

如果使用的是 [HTML5 后端](/backends/html5)，则可以为其导出的 NativeType 之一注册下拉目标：

```tsx | pure
export const TargetBox = ({ onDrop }) => {
  const [, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        if (onDrop) {
          onDrop(item);
        }
      },
    }),
    [onDrop],
  );
  return <div ref={drop}>Drop Here</div>;
};
```

### 如何编写自定义后台？

目前还没有这方面的文档，但您可以从 HTML5 和测试后端实现中得到启发。后端合同包括 setup()和 teardown() 方法，以及 connectDragSource()、connectDragPreview() 和 connectDropTarget() 方法，这些方法可将 DOM 节点传递给后端。欢迎对文档投稿。

### 我收到了 "超级表达式必须为空或函数，而不是未定义 "的错误信息

React DnD 需要 React 16.8。请确保您使用的至少是该版本。

### 为什么我的静态方法和属性不起作用？

请看这个例子：

```tsx | pure
class Page {
  static willTransitionTo(transition, params) {
    /* ... */
  }

  render() {
    /* ... */
  }
}

export default DragDropContext(HTML5Backend)(Page);
```

在这种情况下，路由处理程序的 willTransitionTo（或类似方法）不会被触发，这可能会让您大吃一惊！React DnD 不会代理组件的静态方法和属性。这太脆弱且充满边缘情况，因此您必须自己来做。为此，请将您的静态方法放到 React DnD 返回的组件上：

```tsx | pure
class Page {
  render() {
    /* ... */
  }
}

Page = DragDropContext(HTML5Backend)(Page);
Page.willTransitionTo = function (transition, params) {
  /* ... */
};

export default Page;
```

## 元数据

### 这是《龙与地下城》吗？

虽然只是拖放，[但我很喜欢](http://www.youtube.com/watch?v=JGaBlygm0UY)。

### 它有多稳定？

Stampsy 自 2013 年以来一直在使用该库以及它的非 React 前身。它是 Stampsy 用户体验的核心，因为所有内容都是在使用 React DnD 的拖放式帖子编辑器中创建的。

### 谁做的，为什么？

React DnD 由 [Dan Abramov](http://github.com/gaearon) 创建。

其目的是提供一个功能强大的 API，该 API 与浏览器无关，以数据为中心，可与 React 和 Flux 完美配合，并具有可测试性和可扩展性。请阅读《拖放应用程序接口的未来》（[The Future of the Drag and Drop API](https://medium.com/@dan_abramov/the-future-of-drag-and-drop-apis-249dfea7a15f)）了解一些背景情况。

它大致基于安德鲁-库兹涅佐夫（[Andrew Kuznetsov](https://github.com/cavinsmith)）在 Stampsy 编写的 React 前代码。后来，[Alexander Kuznetsov](https://github.com/alexkuz) 和 [Nathan Hutchison](https://github.com/nelix) 为它做出了宝贵贡献。

如果没有以下各方的慷慨捐助，React DnD 不可能发布到 1.0 版本：

- [Macropod](https://macropod.com/)，一家开发团队生产力软件的公司；
- [Webflow](https://webflow.com/)，一家开发专业响应式网站构建工具的公司。
  [Gadzhi Kharkharov](http://kkga.me/) 设计了网站风格，[fixed-data-table](https://github.com/facebook/fixed-data-table)项目提供了网站模板。

## How Do I Contribute?

为底层的 [DnD Core](https://github.com/react-dnd/dnd-core) 库提供文档将大有帮助，因为它目前根本没有文档，但其概念在一些高级场景（如[编写测试](https://react-dnd.github.io/react-dnd/docs/testing)）中会泄露。

我们也希望能将该库移植到其他现代框架，如 Cycle、Mercury 或 Deku。这样的移植可以重用 DnD Core 逻辑和现有的后端。

如果您创建了看板应用程序等高级示例，或者撰写了关于 React DnD 的博文或录制了截屏视频，请通过[问题跟踪器](https://github.com/react-dnd/react-dnd/issues)告诉我，以便我可以链接到这些示例。

虽然 DnD Core 已经过全面测试，但 React DnD 目前还没有任何单元测试。编写单元测试是一项伟大而急需的贡献。
