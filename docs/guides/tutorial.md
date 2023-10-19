---
group:
  title: 主题
  order: 0
order: 2
title: 教程
description: '使用React DnD构建一个国际象棋游戏'
keywords:
  [
    '初始化',
    '构建游戏',
    '添加拖放交互',
    '设置拖放上下文',
    '定义拖放类型',
    '让骑士可拖动',
    '使棋盘方块可拖放',
    '添加拖放预览图片',
    '结束语',
  ]

nav:
  title: 指南
  order: 2
  second:
    title: 主题
    order: 1
---

现在，您已经阅读了概述，冒险时间到了！

<image src="https://media.giphy.com/media/132qeyvgJ2Al3i/giphy.gif"/>

在本教程中，我们将使用 React 和 React DnD 构建一个国际象棋游戏。开个玩笑！编写一个完整的国际象棋游戏完全超出了本教程的范围。我们要构建的是一个[带有国际象棋棋盘和孤独骑士的小应用程序](https://react-dnd.github.io/react-dnd/examples/tutorial)。根据国际象棋的规则，骑士是可以拖动的。

如果您已经熟悉 React，请跳至最后一节： [添加拖放交互](https://react-dnd.github.io/react-dnd/docs/tutorial#adding-drag-and-drop-interaction)

我们将通过这个示例来演示 react-dnd 的数据驱动理念。您将学习如何创建拖放源和拖放目标，将它们与 React 组件连接起来，并根据拖放事件改变它们的外观。

现在，让我们构建一些东西！

## 目录

- [初始化](#初始化)
- [构建游戏](#构建游戏)
  - [确定组件](#确定组件)
  - [创建组件](#创建组件)
  - [添加游戏状态](#添加游戏状态)
- [添加拖放交互](#添加拖放交互)
  - [设置拖放上下文](#设置拖放上下文)
  - [定义拖放类型](#定义拖放类型)
  - [让骑士可拖动](#让骑士可拖动)
  - [使棋盘方块可拖放](#使棋盘方块可拖放)
  - [添加拖放预览图片](#添加拖放预览图片)
- [结束语](#结束语)

## 初始化

本教程中的代码示例使用了函数组件和现代 JavaScript 语法。建议使用构建步骤将这些功能移植到目标环境中。我们推荐使用 [create-react-app](https://github.com/facebook/create-react-app)。

本网站提供了我们要构建的[应用程序示例](https://react-dnd.github.io/react-dnd/examples/tutorial)。

## 构建游戏

### 确定组件

我们将首先创建一些 React 组件，不考虑拖放交互。我们的 "孤独骑士 "应用程序将由哪些组件组成？我能想到几个：

骑士，我们孤独的骑士棋子；
方格，棋盘上的一个方格；
Board （棋盘），整个棋盘的 64 个方格。

让我们考虑一下他们的道具。

- 骑士可能不需要道具。它有一个位置，但骑士没有理由知道它的位置，因为它可以作为一个子节点被放置到 Square 中。

- 我们很想通过道具来确定 Square 的位置，但这同样没有必要，因为它在渲染时真正需要的信息只有颜色。我将默认把 Square 设为白色，并添加一个黑色布尔值道具。当然，Square 只接受一个子组件：当前在它上面的棋子。我选择白色作为默认背景色，以符合浏览器的默认设置。

- 棋盘很棘手。将 Squares 作为子代传递给它毫无意义，因为棋盘还能包含什么呢？因此，它可能拥有正方形。但是，它还需要拥有骑士，因为这家伙需要被放置在其中一个正方形内。这意味着棋盘需要知道马的当前位置。在真正的国际象棋游戏中，棋盘会接受一个描述所有棋子、颜色和位置的数据结构，但对我们来说，一个骑士位置参数就足够了。我们将使用双项数组作为坐标，其中 [0, 0] 指的是 A8 格。为什么是 A8 而不是 A1？为了与浏览器的坐标方向相匹配。我试过另一种方法，结果让我头疼不已。

当前状态放在哪里？我真的不想把它放在 Board 组件中。尽可能减少组件中的状态是个好主意，而且因为 Board 已经有了一些布局逻辑，我不想再让它承担管理状态的负担。

好消息是，这一点并不重要。我们只需编写组件，就好像状态存在于某个地方一样，并确保它们在通过道具接收状态时能正确呈现，之后再考虑管理状态的问题！

### 创建组件

我更喜欢自下而上地开始，因为这样我总是在使用已经存在的东西。如果我先做棋盘，在完成方格之前，我不会看到我的成果。另一方面，我可以在不考虑木板的情况下直接制作并看到方形。我认为即时反馈回路很重要（你可以从我做的[另一个项目](https://gaearon.github.io/react-hot-loader/)中看出这一点）。

事实上，我打算从 "骑士 "开始。它根本没有任何道具，而且是最容易制作的：

```jsx | pure
import React from 'react';

export default function Knight() {
  return <span>♘</span>;
}
```

是的，♘ 是 Unicode 的骑士！它真漂亮。我们本可以把它的颜色作为道具，但在我们的例子中，我们不会有任何黑色骑士，所以没有必要这样做。
渲染似乎没有问题，但为了确保万无一失，我立即更改了入口点进行测试：

```jsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Knight from './Knight';

ReactDOM.render(<Knight />, document.getElementById('root'));
```

每当我编写另一个组件时，我都会这样做，这样我就总是有东西可以渲染。在一个较大的应用程序中，我会使用像 cosmos 这样的组件游乐场，这样我就不会在黑暗中编写组件了。

我在屏幕上看到了我的骑士！是时候继续实现 Square 了。这是我的第一次尝试：

```jsx | pure
import React from 'react';

export default function Square({ black }) {
  const fill = black ? 'black' : 'white';
  return <div style={{ backgroundColor: fill }} />;
}
```

现在，我改变入口点代码，看看骑士在广场内的样子：

```jsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Knight from './Knight';
import Square from './Square';

ReactDOM.render(
  <Square black>
    <Knight />
  </Square>,
  document.getElementById('root'),
);
```

遗憾的是，屏幕上空空如也。我犯了几个错误：

- 我忘了给 **Squareany** 定尺寸，所以它只是折叠起来。我不想让它有任何固定尺寸，所以我给它**width："100%"**和**height："100%"**来填充容器。

- 我忘了把 **{children}** 放在 **Square** 返回的 **div** 内，所以它忽略了 **Knight** 。

即使改正了这两个错误，当 Square 变成黑色时，我仍然看不到我的骑士。这是因为页面正文的默认颜色是黑色，所以在黑色正方形上看不到。我本可以通过给 Knight 添加颜色道具来解决这个问题，但更简单的办法是在设置 backgroundColor 的地方设置相应的颜色样式。这个版本的 Square 修正了这些错误，而且在使用两种颜色时效果都很好：

```jsx | pure
import React from 'react';

export default function Square({ black, children }) {
  const fill = black ? 'black' : 'white';
  const stroke = black ? 'white' : 'black';

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
}
```

终于可以开始使用棋盘了！我将从一个极其幼稚的版本开始，只画同样的一个正方形：

```jsx | pure
import React from 'react';
import Square from './Square';
import Knight from './Knight';

export default function Board() {
  return (
    <div>
      <Square black>
        <Knight />
      </Square>
    </div>
  );
}
```

到目前为止，我唯一的目的就是让它呈现出来，这样我就可以开始调整它了：

```jsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

ReactDOM.render(
  <Board knightPosition={[0, 0]} />,
  document.getElementById('root'),
);
```

的确，我看到了同样的单个方块。我现在要添加一大堆方块！但我不知道从哪里开始。我应该在 render 中加入什么？某种循环？某个数组上的 map？

老实说，我现在不想考虑这些。我已经知道如何渲染一个有骑士或没有骑士的单个方格。通过 knightPosition，我还知道了骑士的位置。这意味着我可以编写 renderSquare 方法，而不必担心渲染整个棋盘。

我对 renderSquare 的第一次尝试是这样的

```jsx | pure
function renderSquare(x, y, [knightX, knightY]) {
  const black = (x + y) % 2 === 1;
  const isKnightHere = knightX === x && knightY === y;
  const piece = isKnightHere ? <Knight /> : null;

  return <Square black={black}>{piece}</Square>;
}
```

我已经可以试一试了，把电路板的效果图改为

```jsx | pure
export default function Board({ knightPosition }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {renderSquare(0, 0, knightPosition)}
      {renderSquare(1, 0, knightPosition)}
      {renderSquare(2, 0, knightPosition)}
    </div>
  );
}
```

这时，我意识到我忘了给我的方格设计任何布局。我要使用 [Flexbox](https://developer.mozilla.org/en/CSS/Using_CSS_flexible_boxes)。我在根 **div** 中添加了一些样式，并将 Squares 封装到 **div** 中，这样我就可以对它们进行布局了。一般来说，让组件保持封装状态是个好主意，即使这意味着要添加封装 **div**，也不会影响它们的布局。

```jsx | pure
import React from 'react';
import Square from './Square';
import Knight from './Knight';
function renderSquare(i, [knightX, knightY]) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const isKnightHere = x === knightX && y === knightY;
  const black = (x + y) % 2 === 1;
  const piece = isKnightHere ? <Knight /> : null;

  return (
    <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
      <Square black={black}>{piece}</Square>
    </div>
  );
}

export default function Board({ knightPosition }) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {squares}
    </div>
  );
}
```

它看起来非常棒！我不知道如何限制 Board 保持正方形的长宽比，但以后应该很容易添加。

想一想吧。通过改变骑士的位置，我们刚刚从一无所知到能够在一个漂亮的棋盘上移动骑士：

```jsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

ReactDOM.render(
  <Board knightPosition={[7, 4]} />,
  document.getElementById('root'),
);
```

声明性非常棒！这就是人们喜欢使用 React 的原因。

### 添加游戏状态

我们想让**骑士**可移动。要做到这一点，我们需要将当前的**骑士位置**保存在某种状态存储器中，并有某种方法来改变它。

由于设置这种状态需要花些心思，我们不会同时尝试实现拖动。相反，我们将从一个更简单的实现开始。我们将在点击特定方格时移动**骑士**，但前提是国际象棋规则允许这样做。实现这一逻辑应该能让我们对状态管理有足够的了解，因此我们可以在处理好状态管理后用拖放来代替点击。

React 对状态管理或数据流没有意见；你可以使用 [Flux](https://facebook.github.io/flux/)、[Redux](https://github.com/reactjs/react-redux)、[Rx](https://github.com/Reactive-Extensions/RxJS) ~~甚至 Backbone~~，[但要避免肥胖的模型，并将读取和写入分离开来](http://martinfowler.com/bliki/CQRS.html)。

在这个简单的例子中，我不想费心安装或设置 Redux，所以我打算采用更简单的模式。它的扩展性不如 Redux，但我也不需要它。我还没有决定我的状态管理器的 API，但我打算把它叫做 Game，而且它肯定需要有某种方式向我的 React 代码发送数据变化信号。

既然知道了这么多，我就可以用一个还不存在的假想 Game 重写我的 index.jsx。请注意，这次我是盲写代码，还不能运行。这是因为我还在摸索 API：

```jsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import { observe } from './Game';

const root = document.getElementById('root');

observe((knightPosition) =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, root),
);
```

**observe**我导入的这个函数是什么？这只是我能想到的订阅变化状态的最简单的方法。我本可以做到这一点，但当我所需要的只是一个单一的变化事件时，**EventEmitter**到底为什么还要去那里呢？我本可以创建 Game 一个对象模型，但当我需要的只是值流时，为什么要这样做呢？

为了验证这个订阅 API 是否有意义，我将编写一个**Game**发出随机位置的假值：

```jsx | pure
export function observe(receive) {
  const randPos = () => Math.floor(Math.random() * 8);
  setInterval(() => receive([randPos(), randPos()]), 500);
}
```

<image src="https://s3.amazonaws.com/f.cl.ly/items/1K0s0n0r0C0e2P2N2D1d/Screen%20Recording%202015-05-15%20at%2012.06%20pm.gif"/>

这显然不是很有用。如果我们想要一些互动性，就需要一种方法来修改组件中的游戏状态。目前，我打算保持简单，暴露一个直接修改内部状态的 moveKnight 函数。在一个中等复杂度的应用程序中，不同的状态存储空间可能都有兴趣更新它们的状态以响应用户的一个操作，因此这种方法并不合适，但在我们的情况下，这样做就足够了：

```javascript
let knightPosition = [0, 0];
let observer = null;

function emitChange() {
  observer(knightPosition);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}
```

现在，让我们回到我们的组件。此时我们的目标是将骑士移动到被点击的方格中。有一种方法是从方格本身调用 moveKnight。然而，这需要我们传递方格的位置。这里有一个很好的经验法则：

```javascript
let knightPosition = [0, 0];
let observer = null;

function emitChange() {
  observer(knightPosition);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}
```

现在，让我们回到我们的组件。此时我们的目标是将骑士移动到被点击的方格中。有一种方法是从方格本身调用 moveKnight。然而，这需要我们传递方格的位置。这里有一个很好的经验法则：

> 如果一个组件在渲染时不需要某些数据，那么它就根本不需要这些数据。

正方形在渲染时不需要知道自己的位置。因此，此时最好避免将其与 moveKnight 方法耦合。取而代之的是，我们将在将正方形包裹在棋盘内的 div 中添加一个 onClick 处理程序：

```jsx | pure
import React from 'react';
import Square from './Square';
import Knight from './Knight';
import { moveKnight } from './Game';

/* ... */

function renderSquare(i, knightPosition) {
  /* ... */
  return <div onClick={() => handleSquareClick(x, y)}>{/* ... */}</div>;
}

function handleSquareClick(toX, toY) {
  moveKnight(toX, toY);
}
```

我们也可以为 Square 添加一个 onClick，并用它来代替，但既然我们稍后会移除点击处理程序，转而使用拖放界面，又何必多此一举呢。

现在缺少的最后一块是国际象棋规则检查。骑士不能随意移动到任意方格，它只能进行 L 形移动。我正在为游戏添加一个 canMoveKnight(toX, toY)函数，并将初始位置改为 B1，以符合国际象棋规则：

```jsx | pure
let knightPosition = [1, 7];

/* ... */

export function canMoveKnight(toX, toY) {
  const [x, y] = knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  );
}
```

最后，我在 handleSquareClick 中添加了 canMoveKnight 检查：

```js
import { canMoveKnight, moveKnight } from './Game';

/* ... */

function handleSquareClick(toX, toY) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}
```

<image src="https://s3.amazonaws.com/f.cl.ly/items/1F371u301l1H2X3o0g1h/Screen%20Recording%202015-05-15%20at%2012.08%20pm.gif"/>

目前运行良好！

## 添加拖放互动

这正是促使我编写本教程的原因。现在，我们将看到 React DnD 如何轻松地为现有组件添加拖放交互。

这部分内容假定您至少对[概述](https://react-dnd.github.io/react-dnd/docs/overview)中介绍的概念有一定程度的了解，例如后端、收集函数、类型、项目、拖动源和拖放目标。如果您没有完全理解，也没关系，但请确保在进入编码过程之前至少给自己一个机会。

我们将首先安装 React DnD 及其 HTML5 后端：

```shell
npm install react-dnd react-dnd-html5-backend
```

今后，您可能想探索其他第三方后端，如[触摸后端](https://npmjs.com/package/react-dnd-touch-backend)，但这不在本教程的范围之内。

### 设置拖放上下文

我们需要在应用程序中设置的第一件事就是 DndProvider。它应安装在应用程序的顶部附近。我们需要用它来指定我们将使用 HTML5Backend。

```jsx | pure
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Board() {
  /* ... */
  return <DndProvider backend={HTML5Backend}>...</DndProvider>;
}
```

### 定义拖动类型

接下来，我要为可拖动的物品类型创建常量。我们的游戏中只有一种物品类型，那就是 KNIGHT。我将创建一个常量模块来导出它：

```ts
export const ItemTypes = {
  KNIGHT: 'knight',
};
```

准备工作已经完成。让我们把骑士拖动起来吧！

### 让骑士可拖动

useDrag 接受一个 memoization 函数，该函数返回一个规范对象。在这个对象中，item.type 被设置为我们刚刚定义的常量，因此现在我们需要编写一个收集函数。

```typescript
const [{ isDragging }, drag] = useDrag(() => ({
  type: ItemTypes.KNIGHT,
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging(),
  }),
}));
```

让我们来分析一下：

- useDrag 接受一个规范对象。item.type 是必填项，用于指定被拖动物品的类型。我们还可以在这里附加额外的信息来识别被拖动物品的类型，但由于这是一个玩具应用程序，我们只需要定义类型。
- collect 定义一个收集器函数：基本上，这是一种将拖放系统中的状态转化为组件可用道具的方法。
- 结果数组包含
  - 作为第一项的道具对象--其中包含从拖放系统中收集到的属性。
  - 第二项是一个 ref 函数。它用于将 DOM 元素附加到 react-dnd。
    现在让我们看看整个 Knight 组件，包括 useDrag 和更新后的 render 方法：

```jsx | pure
import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'

function Knight() {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      ♘
    </div>,
  )
}

export default Knight
```

<image src="https://s3.amazonaws.com/f.cl.ly/items/3L1d0C203C0s1r1H2H0m/Screen%20Recording%202015-05-15%20at%2001.11%20pm.gif"/>

### 使棋盘方块可拖放

现在，"骑士 "是一个拖动源，但还没有处理空投的空投目标。我们现在要将正方形设为拖放目标。

这一次，我们无法避免将位置传递给方块。毕竟，如果正方形不知道自己的位置，它又怎么知道被拖动的骑士应该移动到哪里呢？另一方面，这仍然让人感觉不妥，因为在我们的应用程序中，方块作为一个实体并没有改变，既然它过去很简单，为什么要把它复杂化呢？面对这种两难境地，是时候将[智能组件和傻瓜组件](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)分开了。

我将介绍一个名为 BoardSquare 的新组件。它可以渲染老式的正方形，但也能意识到自己的位置。事实上，它封装了 Board 内的 renderSquare 方法曾经做过的一些逻辑。在合适的时候，React 组件通常会从这类呈现子方法中提取出来。

下面是我提取的 BoardSquare：

```jsx | pure
import React from 'react';
import Square from './Square';

export default function BoardSquare({ x, y, children }) {
  const black = (x + y) % 2 === 1;
  return <Square black={black}>{children}</Square>;
}
```

我还更换了 Board 来使用它：

```jsx | pure
/* ... */
import BoardSquare from './BoardSquare';

function renderSquare(i, knightPosition) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  return (
    <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  );
}

function renderPiece(x, y, [knightX, knightY]) {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}
```

现在让我们用一个 useDrophook 来包装 BoardSquare。我将编写一个只处理下降事件的下降目标规范：

```ts
const [, drop] = useDrop(
  () => ({
    accept: ItemTypes.KNIGHT,
    drop: () => moveKnight(x, y),
  }),
  [x, y],
);
```

看到了吗？drop 方法的作用域中包含了 BoardSquare 的道具，因此它知道当骑士下降时应将其移动到哪里。在真正的应用程序中，我可能还会使用 monitor.getItem()来获取拖动源从 beginDrag 返回的被拖动项，但由于整个应用程序中只有一个可拖动项，所以我并不需要它。

在我的收集函数中，我将询问监视器指针当前是否位于 BoardSquare 上，以便突出显示它：

```ts
const [{ isOver }, drop] = useDrop(
  () => ({
    accept: ItemTypes.KNIGHT,
    drop: () => moveKnight(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }),
  [x, y],
);
```

更改呈现功能以连接下拉目标并显示高亮叠加后，BoardSquare 就变成了这样：

```tsx | pure
import React from 'react'
import Square from './Square'
import { canMoveKnight, moveKnight } from './Game'
import { ItemTypes } from './Constants'
import { useDrop } from 'react-dnd'

function BoardSquare({ x, y, children }) {
  const black = (x + y) % 2 === 1
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.KNIGHT,
    drop: () => moveKnight(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [x, y])

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>,
  )
}

export default BoardSquare
```

<image src="https://s3.amazonaws.com/f.cl.ly/items/2U43301g421U3I2X2p0P/Screen%20Recording%202015-05-15%20at%2001.55%20pm.gif"/>

看起来效果不错！要完成本教程，只剩下一个改动了。我们要突出显示代表有效棋步的棋盘方格，只有当落子发生在其中一个有效棋盘方格上时，才会对落子进行处理。

值得庆幸的是，这在 React DnD 中很容易实现。我只需在下棋目标规范中定义一个 canDrop 方法即可：

```typescript
const [{ isOver, canDrop }, drop] = useDrop(
  () => ({
    accept: ItemTypes.KNIGHT,
    canDrop: () => canMoveKnight(x, y),
    drop: () => moveKnight(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }),
  [x, y],
);
```

我还在收集函数中添加了 monitor.canDrop()，并在组件中添加了一些叠加渲染代码：

```tsx | pure
import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';
import { canMoveKnight, moveKnight } from './Game';
import Square from './Square';

function BoardSquare({ x, y, children }) {
  const black = (x + y) % 2 === 1;
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      drop: () => moveKnight(x, y),
      canDrop: () => canMoveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y],
  );

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </div>
  );
}

export default BoardSquare;
```

<image src="https://s3.amazonaws.com/f.cl.ly/items/0X3c342g0i3u100p1o18/Screen%20Recording%202015-05-15%20at%2002.05%20pm.gif"/>

## 添加拖放预览图片

最后要演示的是拖动预览自定义。当然，浏览器会截图 DOM 节点，但如果我们想显示自定义图片呢？

我们又是幸运的，因为使用 React DnD 可以轻松做到这一点。我们只需使用 useDrag 提供的预览 ref 即可。

```jsx | pure
const [{ isDragging }, drag, preview] = useDrag(() => ({
  type: ItemTypes.KNIGHT,
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging(),
  }),
}));
```

react-dnd 还提供了一个实用组件 DragPreviewImage，它可以使用此 ref 将图像显示为拖动预览。

```jsx | pure
  const knightImage = 'data:image/png;base64,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';
  render() {
    return (
      <>
        <DragPreviewImage connect={preview} src={knightImage} />
        <div
          ref={drag}
          style={{
            ...knightStyle,
            opacity: isDragging ? 0.5 : 1,
          }}
        >
          ♘
        </div>
      </>
    )
  }
}
```

## 结束语

本教程将引导您创建 React 组件，对这些组件和应用程序状态进行设计决策，最后添加拖放交互。本教程的目的是向您展示 React DnD 与 React 的理念非常契合，而且您应该首先考虑应用程序的架构，然后再深入实施复杂的交互。

祝您拖放愉快。

现在[去玩吧](https://react-dnd.github.io/react-dnd/examples/tutorial)！
