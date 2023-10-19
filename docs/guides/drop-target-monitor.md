---
order: 2
group:
  title: 监控状态
  order: 4
title: DropTargetMonitor
description: ''
keywords: []
---

# DropTargetMonitor

DropTargetMonitor 是一个传递给拖放目标的收集函数的对象。通过该对象的方法，您可以获取特定拖放目标的拖放状态信息。绑定到该监视器的特定下拉目标在下面称为监视器的所有者。

## 方法

* canDrop()： 如果正在进行拖动操作，且所有者的 canDrop()返回 true 或未定义，则返回 true。
* isOver(options)： 如果正在进行拖动操作，且指针当前悬停在所有者上方，则返回 true。您可以选择传递 { shallow: true }，以严格检查是否只有所有者被悬停，而不是嵌套目标。
* getItemType()：返回一个字符串或符号，用于标识当前拖动项目的类型。如果没有项目被拖动，则返回空值。
* getItem()：返回一个普通对象，表示当前拖动的项目。每个拖动源必须通过其 beginDrag()方法返回一个对象来指定该对象。如果没有项目被拖动，则返回空值。
* getDropResult()：返回一个纯对象，代表最后记录的投放结果。空投目标可选择通过其 drop() 方法返回一个对象来指定该对象。当对嵌套目标自下而上发送 drop() 时，任何明确从 drop()方法返回自己结果的父目标都会覆盖子目标之前设置的 drop 结果。如果在 drop() 之外调用，则返回空值。
* didDrop()：如果某个丢弃目标处理了丢弃事件，则返回 true，否则返回 false。即使目标没有返回投放结果，didDrop() 也会返回 true。在 drop() 内使用它可测试任何嵌套的丢弃目标是否已处理过丢弃事件。如果在 drop() 之外调用，则返回 false。
* getInitialClientOffset()：返回当前拖动操作开始时指针的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
* getInitialSourceClientOffset()： 返回当前拖动操作开始时拖动源组件根 DOM 节点的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
* getClientOffset()： 返回拖动操作进行时指针最后记录的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
* getDifferenceFromInitialOffset()： 返回指针上次记录的客户端偏移量与当前拖动操作开始时的客户端偏移量之间的 { x, y } 差值。如果没有正在拖动的项目，则返回空值。
* getSourceClientOffset()：根据拖动源组件在当前拖动操作开始时的位置和移动差异，返回拖动源组件根 DOM 节点的投影 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
