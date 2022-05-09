import { registerApplication } from 'single-spa'

import { loadApp } from './singleLoader'

window.__SINGLE_SPA__ = true

// 注册应用
export const apps = [
  {
    name: 'app1',
    app: loadApp('http://localhost:8081', 'app1', ['/js/app.js']),
    activeWhen: location => location.pathname.startsWith('/app1') || location.pathname === '/',
    customProps: {},
  }, {
    name: 'app2',
    app: loadApp('http://localhost:8082', 'app2', ['/js/app.js']),
    activeWhen: location => location.pathname.startsWith('/app2'),
    customProps: {},
  }, {
    name: 'app3',
    app: loadApp('http://localhost:8083', 'app3', ['/js/app.js']),
    activeWhen: location => location.pathname.startsWith('/app3'),
    customProps: {},
  }
]

// 注册子应用
for (let i = apps.length - 1; i >= 0; i--) {
  registerApplication(apps[i]);
}