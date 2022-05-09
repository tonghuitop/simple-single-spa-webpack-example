import React from 'react';
import { Link } from "react-router-dom";

import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const MENUITEMS = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: <Link to="/app1">nav 1</Link>,
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: <Link to="/app2">nav 2</Link>,
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: <Link to="/app3">nav 3</Link>,
  },
]

export { MENUITEMS }