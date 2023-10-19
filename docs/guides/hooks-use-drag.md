---
order: 8
group:
  title: Hooks
  order: 3
title: useDrag
description: ''
keywords: []
---

# useDrag

useDrag 钩子提供了一种将您的组件作为拖曳源连接到 DnD 系统的方法。通过向 useDrag 传递规范，您可以声明性地描述正在生成的可拖动类型、代表拖动源的项目对象、要收集的 props 等。useDrag 钩子会返回几个关键项：一组收集到的 Props，以及可附加到拖动源和拖动预览元素的引用

``` tsx | pure
import { useDrag } from 'react-dnd'

function DraggableComponent(props) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type,
    item: { id }
  }))
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div ref={drag} {...collected}>
      ...
    </div>
  )
}
```

## 参数

spec 一个规范对象或一个创建规范对象的函数。有关规范对象的详细信息，请参阅下文
deps 用于备忘录化的依赖关系数组。其行为类似于内置的 useMemo React 钩子。对于函数规格，默认值为空数组；对于对象规格，默认值为包含规格的数组。

## 返回值数组

* [0] - Collected Props： 包含从 collect 函数中收集的属性的对象。如果未定义收集函数，则返回空对象。
* [1] - DragSource Ref：拖动源的连接器函数。它必须连接到 DOM 的可拖动部分。
* [2] - DragPreview Ref：拖动预览的连接器函数。该函数可以连接到 DOM 的预览部分。

## 规格对象成员

* type：必须填写。必须是字符串或符号。只有注册了相同类型的下拉目标才会对该项目做出反应。[阅读概述](/guides)，了解有关项目和类型的更多信息。
* item：必填（对象或函数）。
  * 如果是对象，则是描述被拖动数据的普通 JavaScript 对象。这是向拖放目标提供的关于拖放源的唯一信息，因此必须选择他们需要知道的最小数据。您可能很想在这里放置一个复杂的引用，但应尽量避免这样做，因为这样会将拖动源和拖动目标联系起来。最好使用类似 { id } 的内容。
  * 如果这是一个函数，它会在拖动操作开始时触发，并返回一个代表拖动操作的对象（见第一点）。如果返回 null，拖动操作将被取消。
* previewOptions：可选项。描述拖动预览选项的纯 JavaScript 对象。
* options： 可选项。描述拖动预览选项的纯 JavaScript 对象。
  * dropEffect：可选项： 在此拖动中使用的拖放效果类型。(移动 "或 "复制 "都是有效值）。
* end(item, monitor)：可选。拖动停止时，会调用结束。保证每次开始调用都有相应的结束调用。您可以调用 monitor.didDrop() 来检查是否由兼容的拖放目标处理了拖放。如果已处理，且投放目标通过从其 drop()方法返回一个纯对象指定了投放结果，则该结果将作为 monitor.getDropResult() 可用。该方法是触发 Flux 操作的好地方。注意：如果组件在拖动过程中被卸载，组件参数将被设置为空。
* canDrag(monitor)： 可选。用它来指定当前是否允许拖动。如果想始终允许拖动，只需省略此方法。如果你想根据Props的某些谓词来禁止拖动，指定它将非常方便。注意：不得在此方法中调用 monitor.canDrag()。
* isDragging(monitor)：可选。默认情况下，只有启动拖动操作的拖动源才被视为正在拖动。您可以通过定义自定义的 isDragging 方法来覆盖此行为。其返回值可能类似 props.id === monitor.getItem().id。如果原始组件在拖动过程中可能会被卸载，随后又以不同的父组件 "复活"，则可以这样做。例如，当在看板的列表中移动卡片时，你希望它保留拖动时的外观--尽管从技术上讲，每次将组件移动到另一个列表时，组件都会被卸载，并装入一个不同的组件。注意：不得在此方法中调用 monitor.isDragging()。
* collect： 可选。收集函数。它应返回一个纯Props对象，以便注入到组件中。它接收两个参数：监控器和Props。请阅读概述以了解监控器和收集函数。下一节将详细介绍收集函数。
