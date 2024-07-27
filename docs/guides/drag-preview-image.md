---
order: 7
group:
  title: 组件
  order: 2
title: DragPreviewImage
---

# DragPreviewImage

用于将 HTML 图像元素渲染为断开的拖动预览的组件。

### 用法

```tsx | pure
import { DragPreviewImage, DragSource } from 'react-dnd';

function DraggableHouse({ connectDragSource, connectDragPreview }) {
  return (
    <>
      <DragPreviewImage src="house_dragged.png" connect={connectDragPreview} />
      <div ref={connectDragSource}>🏠</div>
    </>
  );
}
export default DragSource(
  /* ... */
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  }),
);
```

### 属性

- connect: 需要。拖动预览连接器功能。
