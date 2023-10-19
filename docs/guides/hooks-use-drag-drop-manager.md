---
order: 11
group:
  title: Hooks
  order: 3
title: useDragDropManager
description: ''
keywords: []
---

# useDragDropManager

此钩子可让用户访问 DnD 系统。DragDropManager 实例是 React DnD 创建的一个单例，它包含对状态、监控器、后台等的访问。

```tsx | pure
import { useDragDropManager } from 'react-dnd'

function Example() {
  // The manager provides access to all of React DnD's internals
  const dragDropManager = useDragDropManager()

  return <div>Example</div>
}
```
