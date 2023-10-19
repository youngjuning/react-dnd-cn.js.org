---
order: 3
group:
  title: 监控状态
  order: 4
title: DragLayerMonitor
description: ''
keywords: []
---

# DragLayerMonitor

DragLayerMonitor 是传递给拖动层收集函数的对象。通过[其方法](/guides/hooks-use-drag-layer)，您可以获取有关全局拖动状态的信息。

## 方法

* isDragging()： 如果正在进行拖动操作，则返回 true。否则返回 false。
* getItemType()：返回一个字符串或符号，用于标识当前拖动项目的类型。如果没有项目被拖动，则返回空值。
* getItem()：返回一个普通对象，表示当前拖动的项目。每个拖动源必须通过其 beginDrag()方法返回一个对象来指定该对象。如果没有项目被拖动，则返回空值。
* getInitialClientOffset()： 返回当前拖动操作开始时指针的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
* getInitialSourceClientOffset()：返回当前拖动操作开始时拖动源组件根 DOM 节点的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
* getClientOffset()： 返回拖动操作进行时指针最后记录的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
* getDifferenceFromInitialOffset()： 返回指针上次记录的客户端偏移量与当前拖动操作开始时的客户端偏移量之间的 { x, y } 差值。如果没有正在拖动的项目，则返回空值。
* getSourceClientOffset()：根据拖动源组件在当前拖动操作开始时的位置和移动差异，返回拖动源组件根 DOM 节点的投影 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
