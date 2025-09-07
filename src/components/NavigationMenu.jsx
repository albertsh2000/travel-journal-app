import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Drawer, Button, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import useAuthStore from "../stores/useAuthStore";
import { MENU_KEYS } from "../constants";
import { useState, useEffect } from "react";

const { useBreakpoint } = Grid;

const NavigationMenu = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const [rightSelectedKey, setRightSelectedKey] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const screens = useBreakpoint();

  useEffect(() => {
    if (location.pathname === MENU_KEYS.LOGIN) {
      setRightSelectedKey(MENU_KEYS.LOGIN);
    } else {
      setRightSelectedKey("");
    }
  }, [location.pathname]);

  const leftMenuItems = [
    { key: MENU_KEYS.HOME, label: <Link to={MENU_KEYS.HOME}>Home</Link> },
    {
      key: MENU_KEYS.EXPLORE,
      label: <Link to={MENU_KEYS.EXPLORE}>Explore</Link>,
    },
    ...(isAuthenticated
      ? [
          {
            key: MENU_KEYS.MY_JOURNAL,
            label: <Link to={MENU_KEYS.MY_JOURNAL}>My Journal</Link>,
          },
          {
            key: MENU_KEYS.ADD_TRIP,
            label: <Link to={MENU_KEYS.ADD_TRIP}>Add Trip</Link>,
          },
        ]
      : []),
  ];

  const rightMenuItems = isAuthenticated
    ? [{ key: MENU_KEYS.LOGOUT, label: <span>Logout</span> }]
    : [
        {
          key: MENU_KEYS.LOGIN,
          label: <Link to={MENU_KEYS.LOGIN}>Login</Link>,
        },
      ];

  const handleMenuClick = ({ key }) => {
    if (key === MENU_KEYS.LOGOUT) {
      logout();
      navigate(MENU_KEYS.HOME);
      setRightSelectedKey("");
      setDrawerVisible(false);
    } else {
      setRightSelectedKey(key);
      setDrawerVisible(false);
    }
  };

  const combinedMenuItems = [...leftMenuItems, ...rightMenuItems];

  return (
    <nav>
      {!screens.md && (
        <>
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
          />
          <Drawer
            title="Menu"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            styles={{ body: { padding: 0 } }}
          >
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname, rightSelectedKey]}
              items={combinedMenuItems}
              onClick={handleMenuClick}
            />
          </Drawer>
        </>
      )}

      {screens.md && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Menu
            mode="horizontal"
            theme="dark"
            items={leftMenuItems}
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            style={{ flex: 1 }}
          />

          <Menu
            mode="horizontal"
            theme="dark"
            items={rightMenuItems}
            selectedKeys={[rightSelectedKey]}
            onClick={handleMenuClick}
            style={{ minWidth: 80, justifyContent: "flex-end" }}
          />
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;
