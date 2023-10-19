---
group:
  title: 主题
  order: 0
order: 3
title: 测试
description: 'React DnD 测试'
keywords: ['测试', '测试后端', '模拟 DOM', 'Enzyme', 'React Testing Library']
nav:
  title: 指南
  order: 2
  second:
    title: 主题
    order: 1
---

React DnD 新手？请在阅读文档之前先阅读[概述](/guides)。

# 测试

React DnD 易于测试。整个拖放交互，包括组件的呈现，以及响应拖放事件的副作用，都可以进行测试。

测试 React 组件有几种不同的方法。React DnD 并不拘一格，您可以使用其中任何一种方法。**并非所有方法都要求浏览器事件系统可用。**

React DnD 的 **_examples_** 文件夹中包含了一些测试示例。在 **_react-dnd_** 根目录中运行 **_yarn install_** 和 **_yarn test_**，即可启动它们。

## 隔离测试组件

如果您只想孤立地测试组件的渲染，而不想测试它们之间的交互，那么您可以使用用 React DnD 封装的任何类上的 **_DecoratedComponent_** 静态属性来访问原始类。然后，您就可以使用不同的道具对其进行测试，而无需依赖 React DnD，只需提供一个身份函数来存根连接器方法即可。

```javascript
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';
import Box from './components/Box';

it('can be tested independently', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalBox = Box.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  const identity = (el) => el;

  // Render with one set of props and test
  let root = TestUtils.renderIntoDocument(
    <OriginalBox name="test" connectDragSource={identity} />,
  );
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.props.style.opacity).toEqual(1);

  // Render with another set of props and test
  root = TestUtils.renderIntoDocument(
    <OriginalBox name="test" connectDragSource={identity} isDragging />,
  );
  div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.props.style.opacity).toEqual(0.4);
});
```

## 测试拖放交互

### 测试后端

如果您想测试整个交互，而不仅仅是单个组件的渲染，可以使用[测试后端](/backends/test)。**_测试后端不需要 DOM_**，因此也可以与 **ReactShallowRenderer** 一起使用。

这是目前 React DnD 文档最少的部分，因为它公开了 [DnD Core](https://github.com/react-dnd/dnd-core) 的底层概念，而该库是 React DnD 的核心库。您可以从 [DnD Core 测试](https://github.com/react-dnd/dnd-core/tree/v1.1.0/src/__tests__)中了解有关测试后端及其方法的更多信息。

首先，您需要安装测试后端：

```shell
npm install --save-dev react-dnd-test-backend
```

这里有一些例子供您参考：

```javascript
import React from 'react';
import { wrapInTestContext } from 'react-dnd-test-utils';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';
import Box from './components/Box';

it('can be tested with the testing backend', () => {
  // Render with the test context that uses the test backend
  const [BoxContext, getBackend] = wrapInTestContext(Box);
  const root = TestUtils.renderIntoDocument(<BoxContext name="test" />);

  // Test that the opacity is 1
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.props.style.opacity).toEqual(1);

  // Find the drag source ID and use it to simulate the dragging operation
  const box = TestUtils.findRenderedComponentWithType(root, Box);
  getBackend().simulateBeginDrag([box.getHandlerId()]);

  // Verify that the div changed its opacity
  div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.style.opacity).toEqual(0.4);

  // See other TestBackend.simulate* methods for more!
});
```

### 模拟 DOM

您可以在测试库中使用 [HTML 5 后端](/backends/html5)或 [jsdom](https://github.com/jsdom/jsdom) [触摸后端](/backends/touch)测试拖放交互。许多测试库（如 Jest）默认使用 jsdom。

请注意，jsdom 没有 DragEvent 或 DataTransfer 对象，这将影响拖放和文件拖放测试过程中的预览图像。事件交互也没有与渲染有关的属性，如元素宽度或坐标。

不过，您可以自行在事件对象属性中添加这些值。

## Libraries

#### Enzyme

[Enzyme](https://github.com/airbnb/enzyme) 是测试 React 组件的常用工具。由于 [Enzyme 中的一个错误](https://github.com/airbnb/enzyme/issues/1852)，您需要在挂载组件时将其封装在一个片段中。然后，您可以存储一个指向被包装组件的 ref，并使用此 ref 访问当前 **_DragDropMananger_** 实例并调用其方法。

```javascript
const [BoxContext] = wrapInTestContext(Box);

const ref = React.createRef();
const root = Enzyme.mount(
  <>
    <BoxContext ref={ref} name="test" />
  </>,
);

// ...

const backend = ref.current.getManager().getBackend();
```

### React Testing Library

下面是一个使用 HTML5 后端直接测试 DOM 交互的示例：

```javascript
render(<Board />);
let boardSquares = screen.getAllByRole('gridcell');
let dropSquare = boardSquares[0];
let knight = boardSquares[18].firstChild;

fireEvent.dragStart(knight);
fireEvent.dragEnter(dropSquare);
fireEvent.dragOver(dropSquare);
fireEvent.drop(dropSquare);
```

如果需要数据传输属性，也可以[添加](https://testing-library.com/docs/dom-testing-library/api-events)这些属性。
