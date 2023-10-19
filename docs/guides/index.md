---
group:
  title: 主题
  order: 0
title: 概述
description: '关于React DnD'
keywords: ['监视器', '连接器', '拖动源和拖放目标', '后端', '钩子', 'hooks']
nav:
  title: 指南
  order: 1
  second:
    title: 主题
    order: 1
---

React DnD 与大多数拖放库不同，如果您从未使用过它，可能会对它望而生畏。不过，一旦您了解了其设计核心的几个概念，它就开始变得有意义了。我建议你在阅读其他文档之前先了解一下这些概念。

其中一些概念与 [Flux](http://facebook.github.io/flux/) 和 [Redux](https://github.com/reactjs/react-redux) 架构相似。
这并非巧合，因为 React DnD 在内部使用了 Redux。

## 项目和类型

与 Flux（或 Redux）一样，React DnD 将数据而非视图作为真相的来源。当您在屏幕上拖动某样东西时，我们不会说拖动的是一个组件或一个 DOM 节点。相反，我们会说某个类型的项目被拖动了。

什么是项目？项目是一个普通的 JavaScript 对象，用于描述被拖动的内容。例如，在看板应用程序中，当您拖动一张卡片时，项目可能看起来像 **_{ cardId： 42 }_**. 在国际象棋游戏中，当你拾起一个棋子时，项目可能看起来像 **_{ fromCell: 'C5', piece： queen' }_**。**将拖动数据描述为普通对象有助于保持组件之间的分离和互不关联**。

什么是类型？类型是一个字符串（或[符号](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol)），唯一标识应用程序中的整类项目。在看板应用程序中，您可能有一个 "卡 "类型，代表可拖动的卡，还有一个 "列表 "类型，代表这些卡的可拖动列表。在国际象棋中，您可能只有一个 "棋子 "类型。

类型非常有用，因为随着应用程序的增长，您可能想让更多的东西可以拖动，但不一定希望所有现有的拖放目标都突然开始对新项目做出反应。**通过这些类型，您可以指定哪些拖动源和下拉目标是兼容的**。您可能会在应用中枚举类型常量，就像您可能会枚举 Redux 操作类型一样。

## 监视器

拖放操作本身是有状态的。拖放操作要么正在进行，要么没有。要么有当前类型和当前项目，要么没有。这种状态必须存在于某个地方。

React DnD 通过内部状态存储（称为监控器）上的一些小封装，将此状态暴露给您的组件。**通过监控器，您可以根据拖放状态的变化更新组件的道具**。

对于需要跟踪拖放状态的每个组件，您都可以定义一个收集函数，用于从监视器中检索相关内容。然后，React DnD 会及时调用收集函数，并将其返回值合并到组件的道具中。

比方说，您想在拖动棋子时突出显示国际象棋单元格。Cellcomponent 的收集函数可能如下所示：

```javascript
function collect(monitor) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver(),
  };
}
```

它指示 React DnD 将 highlighted 和 hovered 的最新值作为道具传递给所有 Cellinstances。

## 连接器

如果后端处理 DOM 事件，但组件使用 React 来描述 DOM，那么后端如何知道要监听哪个 DOM 节点呢？这就要用到连接器了。**通过连接器，您可以为 render 函数中的 DOM 节点指定一个预定义角色（拖动源、拖动预览或下拉目标）。**

事实上，连接器会作为第一个参数传递给我们上面描述的收集函数。让我们看看如何使用它来指定拖放目标：

```javascript
function collect(connect, monitor) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver(),
    connectDropTarget: connect.dropTarget(),
  };
}
```

在组件的 render 函数中，我们可以访问从监视器获取的数据和从连接器获取的函数：

```jsx | pure
render() {
  const { highlighted, hovered, connectDropTarget } = this.props;

  return connectDropTarget(
    <div className={classSet({
      'Cell': true,
      'Cell--highlighted': highlighted,
      'Cell--hovered': hovered
    })}>
      {this.props.children}
    </div>
  );
}
```

connectDropTarget 调用告诉 React DnD，我们组件的根 DOM 节点是一个有效的下拉目标，其悬停和下拉事件应由后台处理。它的内部工作原理是将一个[回调 ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) 附加到您提供给它的 React 元素上。连接器返回的函数是 memoized 的，因此不会破坏 shouldComponentUpdate 优化。

## 拖动源和拖放目标

到目前为止，我们已经介绍了与 DOM 协作的后端、由项和类型表示的数据，以及收集功能（通过监视器和连接器，您可以描述 React DnD 应向组件注入哪些道具）。

但是，我们该如何配置我们的组件才能真正注入这些道具呢？如何执行副作用来响应拖放事件？这就是 React DnD 的主要抽象单元--拖动源和拖放目标。**它们真正将类型、项目、副作用和收集功能与您的组件联系在一起。**

无论何时您想让组件或组件的某些部分可被拖动，都需要将该组件封装到拖动源声明中。每个拖动源都针对特定类型进行了注册，并且必须实现一种方法，从组件的道具中生成一个项目。它还可以选择性地指定一些其他方法来处理拖放事件。拖动源声明还可以指定给定组件的收集功能。

拖放目标与拖放源非常相似。唯一不同的是，单个下拉目标可以同时为多个项目类型注册，而且它可以处理项目的悬停或下拉，而不是生成一个项目。

## 后端

React DnD 使用 [HTML5 拖放 API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop)。这是一个合理的默认设置，因为它会截图拖动的 DOM 节点，并将其用作开箱即用的 "拖动预览"。当光标移动时，您无需进行任何绘制，因此非常方便。该 API 也是处理文件拖放事件的唯一方法。

遗憾的是，HTML5 拖放 API 也有一些缺点。它无法在触摸屏上使用，而且与其他浏览器相比，它在 IE 上提供的自定义机会较少。

**这就是在 React DnD 中以可插拔方式实现 HTML5 拖放支持的原因。**您不必使用它。您可以根据触摸事件、鼠标事件或其他完全不同的事件编写不同的实现方式。在 React DnD 中，这种可插拔的实现被称为后端。

该库目前提供的是 [HTML 后端](https://react-dnd.github.io/react-dnd/docs/backends/html5)，对于大多数网络应用来说已经足够。还有一个[触摸后端](https://react-dnd.github.io/react-dnd/docs/backends/touch)可用于移动网络应用程序。

这些后端扮演的角色与 React 的合成事件系统类似：**它们抽象掉浏览器的差异，并处理本地 DOM 事件。**尽管有相似之处，React DnD 后端并不依赖于 React 或其合成事件系统。在引擎盖下，后端所做的只是将 DOM 事件转化为 React DnD 可以处理的内部 Redux 操作。

## 钩子 vs 高阶组件

现在，您应该对 React DnD 的各种活动部件有所了解了：

- 物品对象和类型
- 通过流量查看 DnD 状态
- 用于观察 DnD 状态的监控器
- 用于将监视器输出转化为可消耗道具的收集器函数
- 用于将 DnD 状态机附加到视图节点（如 DOM 元素）的连接器

## 钩子

现代 React 应用程序已经用钩子取代了高级组件模式。钩子是 React 在 16.8 中引入的一项功能，允许开发人员编写有状态的函数组件。钩子对于管理有状态组件以及与外部有状态系统（_cough_ 像拖放引擎*cough*）交互也非常有用。

如果您对 React 挂钩不熟悉，请参阅 React 博客文章[《钩子介绍》](https://reactjs.org/docs/hooks-intro.html)。

React-DnD 提供的钩子可将您的组件连接到 DnD 引擎，并允许您收集用于渲染的监控状态。

有关基于钩子的 API 的概述，请参阅[钩子概述](https://react-dnd.github.io/react-dnd/docs/api/hooks-overview)页面。

## 总结

现在您已经对 React DnD 有了足够的了解，可以探索文档的其余部分了！
您可以从[钩子概述](https://react-dnd.github.io/react-dnd/docs/api/hooks-overview)文档页面开始。或者直接进入[教程应用](https://react-dnd.github.io/react-dnd/docs/tutorial)，创建一个国际象棋游戏！
