---
order: 8
group:
  title: Hooks
  order: 3
title: 概述
---

# Using the Hooks API

拖放交互本质上是有状态的。因此，React DnD 在设计上利用了 Flux 数据模式，并使用动作和还原器（独立于 React）对拖放状态进行建模。钩子是在 React 中使用有状态数据源的完美方式。事实上，这也是 React 中许多状态管理库所采用的方法！

我们提供了三个主要钩子，用于将您的组件连接到 React DnD，第四个钩子则为您提供了 React DnD 的接缝（用于测试或开发目的）

* [useDrag](/guides/hooks-use-drag)
* [useDrop](/guides/hooks-use-drop)
* [useDragLayer](/guides/hooks-use-drag-layer)
* [useDragDropManager(dev/test hook)](/guides/hooks-use-drag-drop-manager)

## 基本示例

要开始使用钩子，让我们制作一个可拖动的方框。

```tsx | pure
import { useDrag } from 'react-dnd'

function Box() {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
    type: 'BOX',
		// The collect function utilizes a "monitor" instance (see the Overview for what this is)
		// to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    {/* This is optional. The dragPreview will be attached to the dragSource by default */}
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1}}>
        {/* The drag ref marks this node as being the "pick-up" node */}
        <div role="Handle" ref={drag} />
    </div>
  )
}
```

现在，让我们来为这一切做点什么吧。

```tsx | pure
function Bucket() {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div
      ref={drop}
      role={'Dustbin'}
      style={{ backgroundColor: isOver ? 'red' : 'white' }}
    >
      {canDrop ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}
```

要进一步了解，请阅读各个挂钩 API 文档，或查看 GitHub 上的[示例](https://github.com/react-dnd/react-dnd/tree/main/packages/examples)。
