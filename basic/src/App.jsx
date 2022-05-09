import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { Layout, Menu } from 'antd';

import { MENUITEMS } from './contants';

import 'antd/dist/antd.css';
import './app.css';

const { Content, Sider } = Layout;

const App = () => (
  <BrowserRouter>
    <Layout hasSider>
      <Sider 
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={MENUITEMS}
        />
      </Sider>
      <Layout className="site-layout" style={{
        marginLeft: 200,
      }}>
        <Content
          className="site-layout-background"
          id="micro-content"
        />
      </Layout>
    </Layout>
  </BrowserRouter>
)

export default App