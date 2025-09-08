import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Drawer, Button, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import useAuthStore from "../stores/useAuthStore";
import { MENU_KEYS } from "../constants";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const { useBreakpoint } = Grid;

const NavigationMenu = () => {
  const { t } = useTranslation();

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
    {
      key: MENU_KEYS.HOME,
      label: <Link to={MENU_KEYS.HOME}>{t("home")}</Link>,
    },
    {
      key: MENU_KEYS.EXPLORE,
      label: <Link to={MENU_KEYS.EXPLORE}>{t("explore")}</Link>,
    },
    ...(isAuthenticated
      ? [
          {
            key: MENU_KEYS.MY_JOURNAL,
            label: <Link to={MENU_KEYS.MY_JOURNAL}>{t("myJournal")}</Link>,
          },
          {
            key: MENU_KEYS.ADD_TRIP,
            label: <Link to={MENU_KEYS.ADD_TRIP}>{t("addTrip")}</Link>,
          },
        ]
      : []),
  ];

  const rightMenuItems = isAuthenticated
    ? [{ key: MENU_KEYS.LOGOUT, label: <span>{t("logout")}</span> }]
    : [
        {
          key: MENU_KEYS.LOGIN,
          label: <Link to={MENU_KEYS.LOGIN}>{t("login")}</Link>,
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
            title={t("menu")}
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
            <div style={{ padding: 16 }}>
              <LanguageSwitcher />
            </div>
          </Drawer>
        </>
      )}

      {screens.md && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Menu
            mode="horizontal"
            theme="dark"
            items={leftMenuItems}
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            style={{ flex: 1 }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LanguageSwitcher />

            <Menu
              mode="horizontal"
              theme="dark"
              items={rightMenuItems}
              selectedKeys={[rightSelectedKey]}
              onClick={handleMenuClick}
              style={{ minWidth: 80 }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;
