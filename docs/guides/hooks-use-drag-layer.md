---
order: 10
group:
  title: Hooks
  order: 3
title: useDragLayer
description: ''
keywords: []
---

# useDragLayer

通过 useDragLayer 钩子，您可以将一个组件作为拖曳层连接到 DnD 系统中。

```tsx | pure
import { useDragLayer } from 'react-dnd'

function DragLayerComponent(props) {
  const collectedProps = useDragLayer(
    monitor => /* Collected Props */
  )
  return <div>...</div>
}
```

## 参数

* collect： 必须填写。收集函数。它应返回一个纯道具对象，以便注入到组件中。它接收两个参数：monitor 和 props。请[阅读概述](/guides)以了解监控器和收集函数。下一节将详细介绍收集函数。

## 返回值

从收集函数中收集的属性对象。
