---
order: 1
group:
  title: 监控状态
  order: 4
title: DragSourceMonitor
---

# DragSourceMonitor

DragSourceMonitor 是传递给[拖动源收集函数](/guides/hooks-use-drag)的对象。通过其方法，您可以获取特定拖动源的拖动状态信息。与该监视器绑定的特定拖动源在下面称为监视器的所有者。

## 方法

* canDrag()： 如果没有拖动操作，且所有者的 canDrag()返回 true 或未定义，则返回 true。
* isDragging()：如果正在进行拖动操作，且所有者启动了拖动操作，或者定义了 isDragging() 并返回 true，则返回 true。
* getItemType()：返回一个字符串或符号，用于标识当前拖动项目的类型。如果没有项目被拖动，则返回空值。
* getItem()：返回一个普通对象，表示当前拖动的项目。每个拖动源必须通过其 beginDrag()方法返回一个对象来指定该对象。如果没有项目被拖动，则返回空值。
* getDropResult()：返回一个纯对象，代表最后记录的投放结果。空投目标可选择通过其 drop()方法返回一个对象来指定该对象。在为嵌套目标自下而上发送 drop()时，任何明确从 drop()方法返回自己结果的父目标都会覆盖子目标先前设置的下降结果。如果在 endDrag() 之外调用，则返回空值。
* didDrop()： 如果某个丢弃目标处理了丢弃事件，则返回 true，否则返回 false。即使目标没有返回下降结果，didDrop() 也会返回 true。在 endDrag() 中使用它可测试是否有目标已处理了下落事件。如果在 endDrag() 之外调用，则返回 false。
* getInitialClientOffset()：返回当前拖动操作开始时指针的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
* getInitialSourceClientOffset()：返回当前拖动操作开始时拖动源组件根 DOM 节点的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
* getClientOffset()：返回拖动操作进行时指针最后记录的 { x, y } 客户端偏移量。如果没有项目被拖动，则返回空值。
* getDifferenceFromInitialOffset()：返回指针上次记录的客户端偏移量与当前拖动操作开始时的客户端偏移量之间的 { x, y } 差值。如果没有项目被拖动，则返回空值。
* getSourceClientOffset()：根据拖动源组件在当前拖动操作开始时的位置和移动差异，返回拖动源组件根 DOM 节点的投影 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回空值。
