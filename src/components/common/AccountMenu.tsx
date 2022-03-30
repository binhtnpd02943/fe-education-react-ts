import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import { useDispatch } from 'react-redux'

const AccountMenu: React.FC = () => {
  const dispatch = useDispatch()

  /**
   * Handle logout account
   */
  const logoutHandler = () => {
    // dispatch(authActions.logout())
  }

  /**
   * Handle show modal change password
   */
  const showChangePassword = () => {
    // dispatch(uiActions.toggleChangePassword(true))
  }

  const menu = (
    <Menu>
      <Menu.Item key={1} onClick={showChangePassword}>
        Change password
      </Menu.Item>
      <Menu.Item key={2} danger onClick={logoutHandler}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <a style={{ float: 'right', marginRight: '25px' }} href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Account <DownOutlined />
      </a>
    </Dropdown>
  )
}

export default AccountMenu
