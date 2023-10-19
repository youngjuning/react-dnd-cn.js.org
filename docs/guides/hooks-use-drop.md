---
order: 9
group:
  title: Hooks
  order: 3
title: useDrop
description: ''
keywords: []
---

# useDrop

useDrop 钩子为您提供了一种将您的组件作为投放目标接入 DnD 系统的方法。通过向 useDrop 钩子传递规范，您可以指定下拉目标将接受哪些类型的数据项、收集哪些道具等。此函数将返回一个数组，其中包含附加到下拉目标节点的 ref 和收集的道具。

``` tsx | pure
import { useDrop } from 'react-dnd'

function myDropTarget(props) {
  const [collectedProps, drop] = useDrop(() => ({
    accept
  }))

  return <div ref={drop}>Drop Target</div>
}
```

## Parameters

* spec： 规范对象或创建规范对象的函数。有关规范对象的详细信息，请参阅下文

* deps： 用于备忘录化的依赖关系数组。其行为类似于内置的 useMemo React 钩子。对于函数规格，默认值是一个空数组；对于对象规格，默认值是一个包含规格的数组。

## 返回值数组

* [0] - Collected Props：对象，其中包含从 collect 函数中收集的属性。如果没有定义 collect 函数，则返回一个空对象。
* [1] - DropTarget Ref：下拉目标的连接器函数。它必须连接到 DOM 的下拉目标部分。

## 规范对象成员

* accept： 必须填写。字符串、符号或二者的数组。该下拉目标只会对指定类型的拖动源产生的项目做出反应。请[阅读概述](/guides)，了解有关项目和类型的更多信息。
* options：可选项。一个普通对象。如果组件的某些道具不是标量（即不是原始值或函数），在选项对象中指定一个自定义的 arePropsEqual(props, otherProps)函数可以提高性能。除非你有性能问题，否则不用担心。
* drop(item, monitor)：可选。当目标上出现兼容项目时调用。您可以返回未定义的内容，也可以返回一个纯对象。如果返回一个对象，它将成为拖放结果，并在拖放源的 endDrag 方法中作为 monitor.getDropResult() 提供给拖放源。如果您想根据接收拖放的目标执行不同的操作，这将非常有用。如果您有嵌套的拖放目标，您可以通过检查 monitor.didDrop()和 monitor.getDropResult() 来测试嵌套目标是否已经处理过拖放。此方法和源的 endDrag 方法都是触发 Flux 操作的好地方。如果已定义 canDrop()，且返回 false，则不会调用此方法。
* hover(item, monitor)：可选。当一个项目悬停在组件上时调用。您可以检查 monitor.isOver({ shallow: true })，以测试悬停是否只发生在当前目标或嵌套目标上。与 drop() 不同，即使定义了 canDrop()，该方法也会被调用，并返回 false。您可以检查 monitor.canDrop()来测试情况是否如此。
* canDrop(item, monitor)：可选。用它来指定下拉目标是否能接受该项目。如果希望始终允许，请省略此方法。如果你想根据道具或 monitor.getItem() 的谓词来禁止丢弃，指定它将非常方便。注意：不得在此方法中调用 monitor.canDrop()。
* collect：可选。收集函数。它应返回一个纯道具对象，以便注入到组件中。它接收两个参数：监控器和道具。请[阅读概述](/guides)以了解监控器和收集函数。下一节将详细介绍收集函数。
