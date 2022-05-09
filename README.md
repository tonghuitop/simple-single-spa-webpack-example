# single-spa

single-spa 是一个将多个单页面应用聚合为一个整体应用的 Javascript 微前端框架。

- 在同一页面上使用多个前端架构 而不用刷新页面(React, AngularJS, Angular, Ember, Vue 等框架)
- 独立部署每一个单页面应用
- 新功能使用新框架，旧的单页面不用重写可以共存
- 改善初始加载时间，延迟加载代码。

### Single-spa 思想

借鉴了组件生命周期的思想，它为应用设置了针对路由的生命周期。当应用匹配路由处于激活状态时，应用会把自身的内容挂载到页面；反之则卸载。

核心功能：

- 加载器：用来调度子应用，决定何时展示哪一个子应用，可以把它理解为电源
- 包装器：可以把子应用进行包装，给子应用提供生命周期钩子，并将其导出，使得加载器可以使用

![架构图](https://image-static.segmentfault.com/477/354/47735431-bd116ac0b3df8074)

### api

**加载器** registerApplication 是 single-spa 提供的加载器

提供了四个参数

```
import { registerApplication, start } from 'single-spa';
registerApplication(
  'appName',
  () => System.import('appName'),
  location => location.pathname.startsWith('appName'),
);
```

- appName: string
  - single-spa 将注册和引用此应用程序的应用程序名称，并将在开发工具中标记为。
- applicationOrLoadingFn: () => <Function | Promise>
  - 必须是返回已解决的应用程序或承诺的加载函数。
- activityFn: (location) => boolean
  - 必须是纯函数。该函数`window.location`作为第一个参数调用，并且只要应用程序处于活动状态，就应该返回一个真值。
- customProps?: Object | () => Object
  - 将在每个生命周期方法期间传递给应用程序。

**加载器**: single-spa-react 是针对 react 项目的包装器

```typescript
// utils.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

const domElementGetter = () => {
  let el = document.getElementById('micro-content');
  if (!el) {
    el = document.createElement('div');
    el.id = 'micro-content';
    document.body.appendChild(el);
  }
  return el;
};

export const singleSpaPacker = (rootComponent: React.FC<any>) => {
  const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent,
    domElementGetter,
  });
  const bootstrap = (props: any) => {
    return reactLifecycles.bootstrap(props);
  };
  const mount = (props: any) => {
    return reactLifecycles.mount(props);
  };
  const unmount = (props: any) => {
    return reactLifecycles.unmount(props);
  };
  return { bootstrap, mount, unmount };
};
```

```tsx
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './config/routes';
import { Provider } from 'mobx-react';
import stores from './stores';
const App = () => {
  return (
    <HashRouter>
      <Provider {...stores}>{renderRoutes(routes)}</Provider>
    </HashRouter>
  );
};
export default App;
```

```tsx
import ReactDOM from 'react-dom';
import React from 'react';
import { singleSpaPacker } from './utils';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const { bootstrap, mount, unmount } = singleSpaPacker(App);
export { bootstrap, mount, unmount };
```
