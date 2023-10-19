---
order: 2
group:
  title: 后端
  order: 5
title: 触摸
description: ''
keywords: []
---

# 触摸后端

HTML5 后台不支持触摸事件。因此，它无法在平板电脑和移动设备上运行。您可以使用 react-dnd-touch-backend 来处理触摸设备。

## 安装

```sh
npm install react-dnd-touch-backend
```

## 用法

```tsx | pure
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'

class YourApp {
  <DndProvider backend={TouchBackend} options={opts}>
    {/* Your application */}
  </DndProvider>
}
```

## 选项

* enableTouchEvents(default: true)：指示是否启用触摸事件处理的标志。
* enableMouseEvents(default: false)：表示是否启用基于点击的事件处理的标志。
注意：由于 touchstart/touchend 事件传播与鼠标下移/鼠标上移/单击事件传播不同，因此会出现错误。
* enableKeyboardEvents (default: false)：表示是否启用键盘事件处理的标志。
* delay (default: 0)：延迟处理所有事件的毫秒数，
* delayTouchStart (default: 0)：延迟处理触摸事件的毫秒数，
* delayMouseStart (default: 0)：延迟处理鼠标事件的毫秒数。
* touchSlop (default: 0)：指定拖动信号发出前移动的像素距离。
* ignoreContextMenu (default: false)：为 true 时，可防止上下文菜单事件取消拖动。
* scrollAngleRanges: (default: undefined)：指定应忽略拖动事件的角度范围（单位：度）。这在允许用户沿特定方向滚动而不是拖动时非常有用。度数按顺时针方向移动，0/360 指向左侧。

```tsx | pure
// allow vertical scrolling
const options = {
  scrollAngleRanges: [
    { start: 30, end: 150 },
    { start: 210, end: 330 }
  ]
}
// allow horizontal scrolling
const options = {
  scrollAngleRanges: [{ start: 300 }, { end: 60 }, { start: 120, end: 240 }]
}
```

* enableHoverOutsideTarget: (default: undefined)：当指针离开 DropTarget 区域时，继续拖动当前拖动的元素。
* getDropTargetElementsAtPoint (default: undefined) - 使用 document.elementsFromPoint 或 polyfill：指定一个自定义函数，以便在给定点查找下拉目标元素。在 document.elementsFromPoint 不可用的环境（iOS Safari）中，该函数有助于提高性能。

```tsx | pure
const hasNative =
  document && (document.elementsFromPoint || document.msElementsFromPoint)

function getDropTargetElementsAtPoint(x, y, dropTargets) {
  return dropTargets.filter((t) => {
    const rect = t.getBoundingClientRect()
    return (
      x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top
    )
  })
}

// use custom function only if elementsFromPoint is not supported
const backendOptions = {
  getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint
}

;<DndProvider backend={TouchBackend} options={backendOptions}>
  /* your react application */
</DndProvider>
```
