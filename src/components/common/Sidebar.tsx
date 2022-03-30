import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import AccountMenu from './AccountMenu'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

const Sidebar: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  // const location = useLocation()

  /**
   * Handle toggle sider menu
   */
  const toggle = () => {
    setCollapsed((collapsed) => !collapsed)
  }

  return (
    <Layout id="components-layout-demo-custom-trigger" style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={220} className="site-layout-sider">
        <div className="logo" />
        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
          <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
            <Menu.Item key="/">
              <Link to={'/'}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/student">
              <Link to={'/student'}>Student</Link>
            </Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <AccountMenu />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '25px 20px 0 20px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ngoc Binh ©2022</Footer>
      </Layout>
    </Layout>
  )
}

export default Sidebar
